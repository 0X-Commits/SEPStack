/**
 * SEP-10 Web Authentication example
 *
 * Run: npx tsx examples/sep10-auth.ts
 */
import { Sep10Auth } from '../src/sep10/index.js';
import { Keypair } from '@stellar/stellar-sdk';

const auth = new Sep10Auth({
  anchorDomain: 'testanchor.stellar.org',
  network: 'testnet',
});

const keypair = Keypair.fromSecret(process.env['TEST_STELLAR_SECRET'] ?? 'S...');

const { token } = await auth.authenticate(keypair);
console.log('JWT:', token);
