import { createHttpClient } from '../http/client.js';
import type {
  Sep12Config,
  Sep12GetParams,
  Sep12CustomerResponse,
  Sep12PutParams,
  Sep12PutResponse,
} from './types.js';

export class Sep12Client {
  private readonly client: ReturnType<typeof createHttpClient>;

  constructor(config: Sep12Config) {
    this.client = createHttpClient({
      baseUrl: config.kycServer,
      authToken: config.authToken,
    });
  }

  /** GET /customer — retrieve customer KYC status */
  async getCustomer(params: Sep12GetParams): Promise<Sep12CustomerResponse> {
    return this.client
      .get('customer', { searchParams: params as Record<string, string> })
      .json<Sep12CustomerResponse>();
  }

  /** PUT /customer — submit or update KYC fields */
  async putCustomer(params: Sep12PutParams): Promise<Sep12PutResponse> {
    // TODO: handle binary fields (photo_id_front etc.) via multipart/form-data
    return this.client
      .put('customer', { json: params })
      .json<Sep12PutResponse>();
  }

  /** DELETE /customer — request customer data deletion */
  async deleteCustomer(account: string): Promise<void> {
    await this.client.delete(`customer/${account}`);
  }
}
