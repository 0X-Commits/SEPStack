export interface Sep31Config {
  directPaymentServer: string;
  authToken: string;
}

export interface Sep31SendParams {
  amount: string;
  asset_code: string;
  asset_issuer?: string;
  destination_asset?: string;
  quote_id?: string;
  sender_id: string;
  receiver_id: string;
  fields?: {
    transaction?: Record<string, string>;
  };
  lang?: string;
}

export interface Sep31SendResponse {
  id: string;
  stellar_account_id: string;
  stellar_memo_type: string;
  stellar_memo: string;
}

export type Sep31TransactionStatus =
  | 'pending_sender'
  | 'pending_stellar'
  | 'pending_customer_info_update'
  | 'pending_transaction_info_update'
  | 'pending_receiver'
  | 'pending_external'
  | 'completed'
  | 'refunded'
  | 'expired'
  | 'error';

export interface Sep31Transaction {
  id: string;
  status: Sep31TransactionStatus;
  status_eta?: number;
  amount_in?: string;
  amount_in_asset?: string;
  amount_out?: string;
  amount_out_asset?: string;
  amount_fee?: string;
  amount_fee_asset?: string;
  stellar_account_id?: string;
  stellar_memo_type?: string;
  stellar_memo?: string;
  started_at: string;
  completed_at?: string;
  stellar_transaction_id?: string;
  external_transaction_id?: string;
  message?: string;
  required_info_message?: string;
  required_info_updates?: Record<string, unknown>;
}
