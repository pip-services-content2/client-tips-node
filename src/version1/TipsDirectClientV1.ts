import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { TipV1 } from './TipV1';
import { ITipsClientV1 } from './ITipsClientV1';
//import { ITipsController } from 'service-tips-nodex';

export class TipsDirectClientV1 extends DirectClient<any> implements ITipsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-tips", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public async getTips(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>> {
        let timing = this.instrument(correlationId, 'tips.get_tips');
        
        try {
            return await this._controller.getTips(correlationId, filter, paging);
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
            return await this._controller.getRandomTip(correlationId, filter);
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
            return await this._controller.getTipById(correlationId, tipId);
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
            return await this._controller.createTip(correlationId, tip);
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
            return await this._controller.updateTip(correlationId, tip);
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
            return await this._controller.deleteTipById(correlationId, tipId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}