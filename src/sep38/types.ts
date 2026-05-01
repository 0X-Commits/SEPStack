export interface Sep38Config {
  anchorQuoteServer: string;
  authToken?: string;
}

export interface Sep38PricesParams {
  sell_asset: string;
  sell_amount: string;
  sell_delivery_method?: string;
  buy_delivery_method?: string;
  country_code?: string;
}

export interface Sep38BuyAsset {
  asset: string;
  price: string;
  decimals: number;
}

export interface Sep38PricesResponse {
  buy_assets: Sep38BuyAsset[];
}

export interface Sep38QuoteParams {
  sell_asset: string;
  buy_asset: string;
  sell_amount?: string;
  buy_amount?: string;
  expire_after?: string;
  sell_delivery_method?: string;
  buy_delivery_method?: string;
  country_code?: string;
  context: 'sep6' | 'sep24' | 'sep31';
}

export interface Sep38Quote {
  id: string;
  expires_at: string;
  price: string;
  sell_asset: string;
  sell_amount: string;
  buy_asset: string;
  buy_amount: string;
  fee: {
    total: string;
    asset: string;
    details?: Array<{ name: string; description?: string; amount: string }>;
  };
}
