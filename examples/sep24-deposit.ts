/**
 * SEP-24 Interactive Deposit example
 *
 * Run: npx tsx examples/sep24-deposit.ts
 */
import { Sep24Client } from '../src/sep24/index.js';

const jwtToken = process.env['AUTH_TOKEN'] ?? 'your-jwt-here';

const client = new Sep24Client({
  anchorDomain: 'testanchor.stellar.org',
  authToken: jwtToken,
  network: 'testnet',
});

const { url, id } = await client.deposit({
  asset_code: 'USDC',
  account: 'GABC...XYZ',
});

console.log('Open this URL in a browser/popup:', url);
console.log('Transaction ID:', id);

// Poll for status
const tx = await client.getTransaction(id);
console.log('Status:', tx.status);
