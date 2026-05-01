import { http, HttpResponse } from 'msw';

export const MOCK_ANCHOR_DOMAIN = 'mock-anchor.example.com';
export const MOCK_TOML_URL = `https://${MOCK_ANCHOR_DOMAIN}/.well-known/stellar.toml`;

export const MOCK_TOML = `
VERSION = "2.0.0"
NETWORK_PASSPHRASE = "Test SDF Network ; September 2015"
AUTH_SERVER = "https://${MOCK_ANCHOR_DOMAIN}/auth"
TRANSFER_SERVER = "https://${MOCK_ANCHOR_DOMAIN}/sep6"
TRANSFER_SERVER_SEP0024 = "https://${MOCK_ANCHOR_DOMAIN}/sep24"
KYC_SERVER = "https://${MOCK_ANCHOR_DOMAIN}/kyc"
DIRECT_PAYMENT_SERVER = "https://${MOCK_ANCHOR_DOMAIN}/sep31"
ANCHOR_QUOTE_SERVER = "https://${MOCK_ANCHOR_DOMAIN}/sep38"
SIGNING_KEY = "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGZS4BPQC4SPIN1ZF7QDNR"
`;

export const sep1Handlers = [
  http.get(MOCK_TOML_URL, () => HttpResponse.text(MOCK_TOML)),
];
