export interface StellarToml {
  VERSION?: string;
  NETWORK_PASSPHRASE?: string;
  FEDERATION_SERVER?: string;
  AUTH_SERVER?: string;
  TRANSFER_SERVER?: string;
  TRANSFER_SERVER_SEP0024?: string;
  KYC_SERVER?: string;
  DIRECT_PAYMENT_SERVER?: string;
  ANCHOR_QUOTE_SERVER?: string;
  SIGNING_KEY?: string;
  CURRENCIES?: TomlCurrency[];
  VALIDATORS?: TomlValidator[];
}

export interface TomlCurrency {
  code: string;
  issuer?: string;
  status?: 'live' | 'dead' | 'test' | 'private';
  display_decimals?: number;
  name?: string;
  desc?: string;
  anchor_asset_type?: string;
  anchor_asset?: string;
  redemption_instructions?: string;
}

export interface TomlValidator {
  ALIAS?: string;
  DISPLAY_NAME?: string;
  PUBLIC_KEY?: string;
  HOST?: string;
  HISTORY?: string;
}
