import type { Sep9KycFields } from '../sep9/fields.js';

export interface Sep12Config {
  kycServer: string;
  authToken: string;
}

export interface Sep12GetParams {
  id?: string;
  account?: string;
  memo?: string;
  memo_type?: string;
  type?: string;
  lang?: string;
}

export interface Sep12Field {
  type: string;
  description?: string;
  choices?: string[];
  optional?: boolean;
}

export interface Sep12CustomerResponse {
  id: string;
  status: 'NEEDS_INFO' | 'WAITING_FOR_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'PROCESSING';
  fields?: Record<string, Sep12Field>;
  provided_fields?: Record<string, Sep12Field & { status: string; error?: string }>;
  message?: string;
}

export interface Sep12PutParams extends Sep9KycFields {
  id?: string;
  account?: string;
  memo?: string;
  memo_type?: string;
  type?: string;
}

export interface Sep12PutResponse {
  id: string;
}
