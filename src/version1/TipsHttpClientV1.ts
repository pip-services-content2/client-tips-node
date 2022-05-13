import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { TipV1 } from './TipV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { ITipsClientV1 } from './ITipsClientV1';

export class TipsHttpClientV1 extends CommandableHttpClient implements ITipsClientV1 {

    constructor(config?: any) {
        super('v1/tips');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public async getTips(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>> {
        let timing = this.instrument(correlationId, 'tips.get_tips');

        try {
            return await this.callCommand(
                'get_tips',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getRandomTip(correlationId: string, filter: FilterParams): Promise<TipV1> {
        let timing = this.instrument(correlationId, 'tips.get_random_tip');

        try {
            return await this.callCommand(
                'get_random_tip',
                correlationId,
                {
                    filter: filter
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getTipById(correlationId: string, tipId: string): Promise<TipV1> {
        let timing = this.instrument(correlationId, 'tips.get_tip_by_id');

        try {
            return await this.callCommand(
                'get_tip_by_id',
                correlationId,
                {
                    tip_id: tipId
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async createTip(correlationId: string, tip: TipV1): Promise<TipV1> {
        let timing = this.instrument(correlationId, 'tips.create_tip');

        try {
            return await this.callCommand(
                'create_tip',
                correlationId,
                {
                    tip: tip,
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async updateTip(correlationId: string, tip: TipV1): Promise<TipV1> {
        let timing = this.instrument(correlationId, 'tips.update_tip');

        try {
            return await this.callCommand(
                'update_tip',
                correlationId,
                {
                    tip: tip,
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async deleteTipById(correlationId: string, tipId: string): Promise<TipV1> {
        let timing = this.instrument(correlationId, 'tips.delete_tip_by_id');
        
        try {
            return await this.callCommand(
                'delete_tip_by_id',
                correlationId,
                {
                    tip_id: tipId
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}
