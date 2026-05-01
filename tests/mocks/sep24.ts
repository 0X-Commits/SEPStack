import { http, HttpResponse } from 'msw';
import { MOCK_ANCHOR_DOMAIN } from './sep1.js';

const BASE = `https://${MOCK_ANCHOR_DOMAIN}/sep24`;

export const sep24Handlers = [
  http.post(`${BASE}/transactions/deposit/interactive`, () =>
    HttpResponse.json({
      type: 'interactive_customer_info_needed',
      url: `https://${MOCK_ANCHOR_DOMAIN}/interactive/deposit?token=abc`,
      id: 'txn_001',
    }),
  ),

  http.post(`${BASE}/transactions/withdraw/interactive`, () =>
    HttpResponse.json({
      type: 'interactive_customer_info_needed',
      url: `https://${MOCK_ANCHOR_DOMAIN}/interactive/withdraw?token=abc`,
      id: 'txn_002',
    }),
  ),

  http.get(`${BASE}/transaction`, ({ request }) => {
    const id = new URL(request.url).searchParams.get('id');
    return HttpResponse.json({
      transaction: {
        id,
        kind: 'deposit',
        status: 'completed',
        started_at: '2024-01-01T00:00:00Z',
      },
    });
  }),
];
