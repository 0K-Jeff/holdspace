export class SessionStoreAPI {
    ticker: number;
}

export interface DisposalTransactionData {
    date: Date;
    facility: JSON;
    sourceWeight: boolean;
    sourceVolume: boolean;
    volume: number;
    conversionItem: JSON;
    conversionRate: number;
    pounds: number;
    costRevenue: boolean;
    weight: number;
    costperpound: number;
    tenant: JSON;
    invoice: number;
    localUse: JSON;
}
