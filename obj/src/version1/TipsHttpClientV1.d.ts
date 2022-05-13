import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';
import { TipV1 } from './TipV1';
import { ITipsClientV1 } from './ITipsClientV1';
export declare class TipsHttpClientV1 extends CommandableHttpClient implements ITipsClientV1 {
    constructor(config?: any);
    getTips(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>>;
    getRandomTip(correlationId: string, filter: FilterParams): Promise<TipV1>;
    getTipById(correlationId: string, tipId: string): Promise<TipV1>;
    createTip(correlationId: string, tip: TipV1): Promise<TipV1>;
    updateTip(correlationId: string, tip: TipV1): Promise<TipV1>;
    deleteTipById(correlationId: string, tipId: string): Promise<TipV1>;
}
