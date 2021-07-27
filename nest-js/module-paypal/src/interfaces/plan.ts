export interface IPlan {
  id: string;
  product_id: string;
  name: string;
  status: string;
  description: string;
  usage_type: string;
  billing_cycles: [
    {
      pricing_scheme: {
        version: number;
        fixed_price: {
          currency_code: string;
          value: string;
        };
        create_time: string;
        update_time: string;
      };
      frequency: {
        interval_unit: string;
        interval_count: number;
      };
      tenure_type: string;
      sequence: number;
      total_cycles: number;
    },
  ];
  payment_preferences: {
    service_type: string;
    auto_bill_outstanding: boolean;
    setup_fee: {
      currency_code: string;
      value: string;
    };
    setup_fee_failure_action: string;
    payment_failure_threshold: number;
  };
  quantity_supported: boolean;
  create_time: string;
  update_time: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
    encType: string;
  }>;
}
