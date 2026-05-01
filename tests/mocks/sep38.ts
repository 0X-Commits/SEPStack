import { http, HttpResponse } from 'msw';
import { MOCK_ANCHOR_DOMAIN } from './sep1.js';

const BASE = `https://${MOCK_ANCHOR_DOMAIN}/sep38`;

export const sep38Handlers = [
  http.get(`${BASE}/prices`, () =>
    HttpResponse.json({
      buy_assets: [
        { asset: 'iso4217:KES', price: '130.25', decimals: 2 },
      ],
    }),
  ),

  http.post(`${BASE}/quote`, () =>
    HttpResponse.json({
      id: 'quote_001',
      expires_at: '2024-01-01T01:00:00Z',
      price: '130.25',
      sell_asset: 'stellar:USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
      sell_amount: '100',
      buy_asset: 'iso4217:KES',
      buy_amount: '13025',
      fee: { total: '1', asset: 'stellar:USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN' },
    }),
  ),

  http.get(`${BASE}/quote/:id`, ({ params }) =>
    HttpResponse.json({
      id: params['id'],
      expires_at: '2024-01-01T01:00:00Z',
      price: '130.25',
      sell_asset: 'stellar:USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
      sell_amount: '100',
      buy_asset: 'iso4217:KES',
      buy_amount: '13025',
      fee: { total: '1', asset: 'stellar:USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN' },
    }),
  ),
];
