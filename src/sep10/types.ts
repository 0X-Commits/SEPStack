export interface Sep10Config {
  /** Anchor domain, e.g. "example-anchor.com" */
  anchorDomain: string;
  network: 'mainnet' | 'testnet';
  /** Override the web auth endpoint (auto-discovered from TOML if omitted) */
  webAuthEndpoint?: string;
}

export interface Sep10Challenge {
  transaction: string;
  network_passphrase: string;
}

export interface Sep10TokenResponse {
  token: string;
}
