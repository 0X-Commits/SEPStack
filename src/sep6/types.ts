export interface Sep6InfoResponse {
  deposit: Record<string, Sep6AssetInfo>;
  withdraw: Record<string, Sep6AssetInfo>;
  fee?: { enabled: boolean };
  features?: { account_creation: boolean; claimable_balances: boolean };
}

export interface Sep6AssetInfo {
  enabled: boolean;
  min_amount?: number;
  max_amount?: number;
  fee_fixed?: number;
  fee_percent?: number;
  fields?: Record<string, Sep6Field>;
}

export interface Sep6Field {
  description: string;
  optional?: boolean;
  choices?: string[];
}

export interface Sep6DepositParams {
  asset_code: string;
  account: string;
  memo_type?: 'text' | 'id' | 'hash';
  memo?: string;
  email_address?: string;
  type?: string;
  [key: string]: unknown;
}

export interface Sep6WithdrawParams {
  asset_code: string;
  type: string;
  dest?: string;
  dest_extra?: string;
  account?: string;
  memo?: string;
  [key: string]: unknown;
}

export interface Sep6DepositResponse {
  how: string;
  id?: string;
  eta?: number;
  min_amount?: number;
  max_amount?: number;
  fee_fixed?: number;
  fee_percent?: number;
  extra_info?: { message?: string };
}

export interface Sep6WithdrawResponse {
  account_id: string;
  memo_type?: string;
  memo?: string;
  id?: string;
  eta?: number;
  min_amount?: number;
  max_amount?: number;
  fee_fixed?: number;
  fee_percent?: number;
}
