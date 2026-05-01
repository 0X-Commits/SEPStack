import ky, { type KyInstance, type Options } from 'ky';
import { SepError, SepAuthError, SepNotFoundError } from './errors.js';

export interface HttpClientConfig {
  baseUrl: string;
  authToken?: string;
  retry?: number;
  timeout?: number;
}

/**
 * Shared HTTP client wrapping `ky` with:
 * - Bearer token injection
 * - Retry on 5xx / network errors
 * - Normalised SepError on failure
 */
export function createHttpClient(config: HttpClientConfig): KyInstance {
  return ky.create({
    prefixUrl: config.baseUrl,
    timeout: config.timeout ?? 15_000,
    retry: {
      limit: config.retry ?? 2,
      statusCodes: [408, 429, 500, 502, 503, 504],
      backoffLimit: 3_000,
    },
    hooks: {
      beforeRequest: [
        (request) => {
          if (config.authToken) {
            request.headers.set('Authorization', `Bearer ${config.authToken}`);
          }
        },
      ],
      afterResponse: [
        async (_request, _options, response) => {
          if (!response.ok) {
            let body: unknown;
            try {
              body = await response.clone().json();
            } catch {
              body = await response.clone().text();
            }
            if (response.status === 401) throw new SepAuthError();
            if (response.status === 404) throw new SepNotFoundError();
            throw new SepError(
              `HTTP ${response.status}`,
              response.status,
              body,
            );
          }
        },
      ],
    },
  });
}

export type { Options as HttpOptions };
