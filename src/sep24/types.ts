export interface Sep24Config {
  anchorDomain: string;
  authToken: string;
  network: 'mainnet' | 'testnet';
  /** Override transfer server URL (auto-discovered from TOML if omitted) */
  transferServerUrl?: string;
}

export interface Sep24DepositParams {
  asset_code: string;
  account: string;
  memo_type?: 'text' | 'id' | 'hash';
  memo?: string;
  lang?: string;
  [key: string]: unknown;
}

export interface Sep24WithdrawParams {
  asset_code: string;
  account: string;
  memo_type?: 'text' | 'id' | 'hash';
  memo?: string;
  lang?: string;
  [key: string]: unknown;
}

export interface Sep24InteractiveResponse {
  type: 'interactive_customer_info_needed';
  url: string;
  id: string;
}

export type Sep24TransactionStatus =
  | 'incomplete'
  | 'pending_user_transfer_start'
  | 'pending_user_transfer_complete'
  | 'pending_external'
  | 'pending_anchor'
  | 'pending_stellar'
  | 'pending_trust'
  | 'pending_user'
  | 'completed'
  | 'refunded'
  | 'expired'
  | 'no_market'
  | 'too_small'
  | 'too_large'
  | 'error';

export interface Sep24Transaction {
  id: string;
  kind: 'deposit' | 'withdrawal';
  status: Sep24TransactionStatus;
  status_eta?: number;
  more_info_url?: string;
  amount_in?: string;
  amount_out?: string;
  amount_fee?: string;
  started_at: string;
  completed_at?: string;
  stellar_transaction_id?: string;
  external_transaction_id?: string;
  message?: string;
  refunded?: boolean;
}
