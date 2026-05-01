📦 SEPStack
The definitive TypeScript SDK for Stellar Ecosystem Proposal (SEP) compliance — implement SEP-1 through SEP-38 with a single, well-tested library.

📖 Overview
SEPStack is a comprehensive, production-grade TypeScript SDK that implements the full suite of Stellar Ecosystem Proposals (SEPs) — the open standards defined by the Stellar Development Foundation for interoperability between wallets, anchors, and applications on the Stellar network.
Rather than each project re-implementing SEP client logic from scratch — with all the edge cases, spec drift, and testing burden that entails — SEPStack provides a single authoritative implementation. It's the shared compliance foundation consumed by AnchorHub, AnchorForge, FiatFlow Widget, StellarEscrow Protocol, and any other project in the Stellar OSS ecosystem that touches anchor or interop flows.

✨ Key Features
📋 Full SEP Coverage — SEP-1, SEP-6, SEP-9, SEP-10, SEP-12, SEP-24, SEP-31, SEP-38 implemented and tested
🔐 SEP-10 Web Auth — Complete challenge-response authentication with JWT management
💱 SEP-38 Quote Engine — RFQ (Request for Quote) client with price comparison utilities
🌐 SEP-1 TOML Parsing — Robust stellar.toml discovery, parsing, and validation
📡 SEP-6 / SEP-24 Client — Full deposit/withdrawal lifecycle orchestration
🔒 SEP-12 KYC — Customer info PUT/GET/DELETE with field validation
✅ SEP-31 Cross-Border — Direct payments API client for sending across corridors
🧩 Tree-Shakeable — Import only the SEPs you need; no bloat
🔁 Auto-Retry & Circuit Breaker — Built-in resilience for anchor API calls
📝 Full TypeScript Types — Comprehensive type definitions for all SEP request/response shapes

🛠 Tech Stack
Layer
Technology
Language
TypeScript 5.x
Runtime
Node.js >= 20 · Browser (ESM)
HTTP Client
ky (lightweight, fetch-based)
JWT Handling
jose
TOML Parsing
@iarna/toml
Stellar SDK
@stellar/stellar-sdk
Testing
Vitest · MSW (Mock Service Worker)
Build
tsup (ESM + CJS dual output)
Docs
TypeDoc

🗂 Project Structure
sepstack/
│
├── src/
│   ├── sep1/                       # Stellar TOML (stellar.toml discovery & parsing)
│   │   ├── fetchToml.ts
│   │   ├── parseToml.ts
│   │   └── types.ts
│   │
│   ├── sep6/                       # Deposit & Withdrawal (non-interactive)
│   │   ├── deposit.ts
│   │   ├── withdraw.ts
│   │   ├── info.ts
│   │   └── types.ts
│   │
│   ├── sep9/                       # Standard KYC Fields (shared types)
│   │   └── fields.ts
│   │
│   ├── sep10/                      # Web Authentication
│   │   ├── challenge.ts            # Challenge fetch & validation
│   │   ├── auth.ts                 # Challenge signing & JWT retrieval
│   │   └── types.ts
│   │
│   ├── sep12/                      # KYC / Customer Info
│   │   ├── customer.ts             # PUT / GET / DELETE customer
│   │   └── types.ts
│   │
│   ├── sep24/                      # Interactive Deposit & Withdrawal
│   │   ├── deposit.ts
│   │   ├── withdraw.ts
│   │   ├── transaction.ts          # Transaction status & history
│   │   └── types.ts
│   │
│   ├── sep31/                      # Cross-Border Payments
│   │   ├── send.ts
│   │   ├── transaction.ts
│   │   └── types.ts
│   │
│   ├── sep38/                      # Anchor RFQ / Quotes
│   │   ├── quote.ts
│   │   ├── prices.ts
│   │   └── types.ts
│   │
│   ├── http/                       # Shared HTTP client with retry/circuit breaker
│   │   ├── client.ts
│   │   └── errors.ts
│   │
│   ├── utils/                      # Shared utilities
│   │   ├── jwt.ts
│   │   ├── signing.ts
│   │   └── validation.ts
│   │
│   └── index.ts                    # Public API barrel export
│
├── tests/
│   ├── sep1/
│   ├── sep6/
│   ├── sep10/
│   ├── sep24/
│   ├── sep38/
│   └── mocks/                      # MSW mock anchor servers
│
├── docs/                           # TypeDoc generated API docs
├── examples/                       # Usage examples per SEP
│   ├── sep10-auth.ts
│   ├── sep24-deposit.ts
│   └── sep38-quote.ts
│
├── .env.example
├── package.json
└── README.md
🏗 Architecture Overview
SEPStack is organized as a modular, tree-shakeable library where each SEP is an independent, importable module. All SEPs share a common HTTP client layer with configurable retry policies, timeout handling, and error normalization.
┌───────────────────────────────────────────┐
│              Consumer Code                │
│  import { Sep10Auth } from 'sepstack/sep10'│
└────────────────────┬──────────────────────┘
                     │
┌────────────────────▼──────────────────────┐
│           SEPStack Modules                │
│  [sep1] [sep6] [sep10] [sep12]            │
│  [sep24] [sep31] [sep38]                  │
└────────────────────┬──────────────────────┘
                     │
┌────────────────────▼──────────────────────┐
│         Shared HTTP Client Layer          │
│   Retry · Timeout · Error Normalization   │
└────────────────────┬──────────────────────┘
                     │
            Anchor SEP API Endpoints
🔗 Inter-Project Dependencies
SEPStack is the foundational dependency consumed by multiple projects in the Stellar OSS ecosystem. It has no internal project dependencies itself.


✅ Prerequisites
Node.js >= 20.x
pnpm >= 9.x (for development)
@stellar/stellar-sdk (peer dependency — install in your project)
🚀 Installation & Setup
# npm
npm install @stellar-oss/sepstack @stellar/stellar-sdk

# pnpm
pnpm add @stellar-oss/sepstack @stellar/stellar-sdk

# yarn
yarn add @stellar-oss/sepstack @stellar/stellar-sdk
💡 Quick Start Examples
SEP-10 Web Authentication
import { Sep10Auth } from '@stellar-oss/sepstack/sep10';
import { Kepair } from '@stellar/stellar-sdk';

const auth = new Sep10Auth({
  anchorDomain: 'example-anchor.com',
  network: 'testnet',
});

const keypair = Keypair.fromSecret('S...');
const { token } = await auth.authenticate(keypair);

console.log('JWT:', token);
SEP-24 Interactive Deposit
import { Sep24Client } from '@stellar-oss/sepstack/sep24';

const client = new Sep24Client({
  anchorDomain: 'example-anchor.com',
  authToken: jwtToken,
  network: 'testnet',
});

const { interactiveUrl, id } = await client.deposit({
  assetCode: 'USDC',
  account: 'GABC...XYZ',
});

// Open interactiveUrl in a popup/iframe for the user
const status = await client.getTransaction(id);
SEP-38 Quote Request
import { Sep38Client } from '@stellar-oss/sepstack/sep38';

const client = new Sep38Client({
  anchorDomain: 'example-anchor.com',
  authToken: jwtToken,
});

const quote = await client.requestQuote({
  sellAsset: 'stellar:USDC:GA5...',
  buyAsset: 'iso4217:KES',
  sellAmount: '100',
});

console.log(`1 USDC = ${quote.price} KES`);

🔑 Environment Variables
SEPStack is a library — environment variables apply to the development/test environment only. Configuration is passed programmatically in production.
Variable
Required
Description
TEST_ANCHOR_DOMAIN
⬜
Anchor domain for integration tests
TEST_STELLAR_SECRET
⬜
Keypair secret for SEP-10 integration tests
TEST_NETWORK
⬜
testnet (default) for integration tests
▶️ Running the Project
# Development (watch mode)
pnpm dev

# Build (ESM + CJS)
pnpm build

# Generate API docs
pnpm docs
📜 Available Scripts
Script
Description
pnpm dev
Build in watch mode
pnpm build
Production build (ESM + CJS + types)
pnpm test
Run Vitest unit tests
pnpm test:integration
Run integration tests against live testnet
pnpm test:coverage
Coverage report
pnpm lint
ESLint
pnpm typecheck
TypeScript strict check
pnpm docs
Generate TypeDoc API documentation
pnpm size
Bundle size analysis
🧪 Testing
# Unit tests (MSW mocks — no network needed)
pnpm test

# Integration tests (hits Stellar testnet anchors)
TEST_NETWORK=testnet pnpm test:integration

# Coverage
pnpm test:coverage
All unit tests use MSW (Mock Service Worker) to mock anchor API responses — the test suite runs fully offline against spec-compliant mock servers in tests/mocks/.

🔒 SEP Compliance Notes
SEPStack strictly follows the latest published SEP specifications from the Stellar Development Foundation
Breaking SEP spec changes are tracked in CHANGELOG.md with migration guides
The test suite validates against the official Stellar Anchor Tests test vectors where available
SEP-10 signing uses @stellar/stellar-sdk Keypair primitives — private keys never leave the consumer's code

🚢 Deployment
SEPStack is a published npm package — no server deployment required. Publish a new version with:
pnpm build
pnpm publish --access public
CI/CD automatically publishes tagged releases to npm via GitHub Actions.

🤝 Contributing
See CONTRIBUTING.md. When contributing new SEP implementations, please include:
Full TypeScript types for all request/response shapes
MSW mock handlers in tests/mocks/
Unit tests with >90% coverage
Usage example in examples/

📋 Code of Conduct
See CODE_OF_CONDUCT.md. Report issues to conduct@stellar-oss.dev.

📄 License
Licensed under the Apache License 2.0 — see LICENSE.
Why Apache 2.0? As a shared protocol SDK consumed by the entire ecosystem, Apache 2.0 ensures unrestricted use in both OSS and commercial contexts, with critical patent protections for downstream implementers.

🙏 Acknowledgments
Stellar Development Foundation — SEP specification authors
Stellar Anchor Tests — Compliance test vectors
MSW — Mock Service Worker for elegant API testing

🗺 Roadmap
[ ] v1.0 — SEP-1/6/10/12/24/31/38 stable, full test coverage
[ ] v1.1 — SEP-30 (Account Recovery) support
[ ] v1.2 — SEP-45 (Stellar Web Authentication 2.0) when ratified
[ ] v1.3 — React hooks package (@stellar-oss/sepstack-react)
[ ] v2.0 — SEP compliance validation CLI tool

📝 Changelog
See CHANGELOG.md.

