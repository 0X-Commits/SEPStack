import type { Keypair } from '@stellar/stellar-sdk';
import { fetchToml } from '../sep1/fetchToml.js';
import { createHttpClient } from '../http/client.js';
import { signChallengeTransaction } from '../utils/signing.js';
import { fetchChallenge } from './challenge.js';
import type { Sep10Config, Sep10TokenResponse } from './types.js';

export class Sep10Auth {
  private readonly config: Sep10Config;

  constructor(config: Sep10Config) {
    this.config = config;
  }

  /**
   * Full SEP-10 authentication flow:
   * 1. Discover web auth endpoint from stellar.toml (unless overridden)
   * 2. Fetch challenge transaction
   * 3. Sign challenge with keypair
   * 4. POST signed transaction to get JWT
   */
  async authenticate(keypair: Keypair): Promise<Sep10TokenResponse> {
    const webAuthEndpoint = await this.resolveWebAuthEndpoint();
    const account = keypair.publicKey();

    // 1. Fetch challenge
    const challenge = await fetchChallenge(
      webAuthEndpoint,
      account,
      this.config.anchorDomain,
    );

    // 2. Sign challenge
    const signedXdr = signChallengeTransaction(
      challenge.transaction,
      keypair,
      challenge.network_passphrase,
    );

    // 3. Exchange signed transaction for JWT
    const client = createHttpClient({ baseUrl: webAuthEndpoint });
    return client
      .post('', { json: { transaction: signedXdr } })
      .json<Sep10TokenResponse>();
  }

  private async resolveWebAuthEndpoint(): Promise<string> {
    if (this.config.webAuthEndpoint) return this.config.webAuthEndpoint;
    const toml = await fetchToml(this.config.anchorDomain);
    if (!toml.AUTH_SERVER) {
      throw new Error(`No AUTH_SERVER in stellar.toml for ${this.config.anchorDomain}`);
    }
    return toml.AUTH_SERVER;
  }
}
