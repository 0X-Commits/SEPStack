import { fetchToml } from '../sep1/fetchToml.js';
import { sep24Deposit } from './deposit.js';
import { sep24Withdraw } from './withdraw.js';
import { getSep24Transaction, getSep24Transactions } from './transaction.js';
import type {
  Sep24Config,
  Sep24DepositParams,
  Sep24WithdrawParams,
  Sep24InteractiveResponse,
  Sep24Transaction,
} from './types.js';

export class Sep24Client {
  private readonly config: Sep24Config;

  constructor(config: Sep24Config) {
    this.config = config;
  }

  async deposit(params: Sep24DepositParams): Promise<Sep24InteractiveResponse> {
    const url = await this.resolveTransferServer();
    return sep24Deposit(url, params, this.config.authToken);
  }

  async withdraw(params: Sep24WithdrawParams): Promise<Sep24InteractiveResponse> {
    const url = await this.resolveTransferServer();
    return sep24Withdraw(url, params, this.config.authToken);
  }

  async getTransaction(id: string): Promise<Sep24Transaction> {
    const url = await this.resolveTransferServer();
    return getSep24Transaction(url, id, this.config.authToken);
  }

  async getTransactions(params: Record<string, string>): Promise<Sep24Transaction[]> {
    const url = await this.resolveTransferServer();
    return getSep24Transactions(url, params, this.config.authToken);
  }

  private async resolveTransferServer(): Promise<string> {
    if (this.config.transferServerUrl) return this.config.transferServerUrl;
    const toml = await fetchToml(this.config.anchorDomain);
    if (!toml.TRANSFER_SERVER_SEP0024) {
      throw new Error(`No TRANSFER_SERVER_SEP0024 in stellar.toml for ${this.config.anchorDomain}`);
    }
    return toml.TRANSFER_SERVER_SEP0024;
  }
}

export { sep24Deposit, sep24Withdraw, getSep24Transaction, getSep24Transactions };
export type {
  Sep24Config,
  Sep24DepositParams,
  Sep24WithdrawParams,
  Sep24InteractiveResponse,
  Sep24Transaction,
} from './types.js';
