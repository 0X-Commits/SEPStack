/**
 * SEP-38 Quote Request example
 *
 * Run: npx tsx examples/sep38-quote.ts
 */
import { Sep38Client } from '../src/sep38/index.js';

const client = new Sep38Client({
  anchorQuoteServer: 'https://testanchor.stellar.org/sep38',
  authToken: process.env['AUTH_TOKEN'],
});

// Get available prices
const { buy_assets } = await client.getPrices({
  sell_asset: 'stellar:USDC:GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
  sell_amount: '100',
});
console.log('Available buy assets:', buy_assets);

// Request a firm quote
const quote = await client.requestQuote({
  sell_asset: 'stellar:USDC:GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
  buy_asset: 'iso4217:KES',
  sell_amount: '100',
  context: 'sep24',
});

console.log(`1 USDC = ${quote.price} KES`);
console.log('Quote expires at:', quote.expires_at);
