import { requestQuote, getQuote } from './quote.js';
import { getPrices } from './prices.js';
import type {
  Sep38Config,
  Sep38PricesParams,
  Sep38PricesResponse,
  Sep38QuoteParams,
  Sep38Quote,
} from './types.js';

export class Sep38Client {
  private readonly config: Sep38Config;

  constructor(config: Sep38Config) {
    this.config = config;
  }

  getPrices(params: Sep38PricesParams): Promise<Sep38PricesResponse> {
    return getPrices(this.config, params);
  }

  requestQuote(params: Sep38QuoteParams): Promise<Sep38Quote> {
    return requestQuote(this.config, params);
  }

  getQuote(quoteId: string): Promise<Sep38Quote> {
    return getQuote(this.config, quoteId);
  }
}

export { requestQuote, getQuote, getPrices };
export type {
  Sep38Config,
  Sep38PricesParams,
  Sep38PricesResponse,
  Sep38QuoteParams,
  Sep38Quote,
} from './types.js';
