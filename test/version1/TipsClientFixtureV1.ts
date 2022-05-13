const assert = require('chai').assert;

import { MultiString } from 'pip-services3-commons-nodex';

import { ITipsClientV1 } from '../../src/version1/ITipsClientV1';
import { PartyReferenceV1 } from '../../src/version1/PartyReferenceV1';
import { TipV1 } from '../../src/version1/TipV1';

let TIP1 = <TipV1>{
    id: '1',
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 1' }),
    content: new MultiString({ en: 'Sample Tip #1' })
};
let TIP2 = <TipV1>{
    id: '2',
    tags: ['TAG 1'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 2' }),
    content: new MultiString({ en: 'Sample Tip #2' })
};

export class TipsClientFixtureV1 {
    private _client: ITipsClientV1;
    
    constructor(client: ITipsClientV1) {
        this._client = client;
    }
        
    public async testCrudOperations() {
        let tip1, tip2;

        // Create one tip
        let tip = await this._client.createTip(null, TIP1);

        assert.isObject(tip);
        assert.sameMembers(tip.topics, TIP1.topics);
        // assert.equal(tip.content.get('en'), TIP1.content.get('en'));

        tip1 = tip;

        // Create another tip
        tip = await this._client.createTip(null, TIP2);

        assert.isObject(tip);
        assert.sameMembers(tip.topics, TIP2.topics);
        // assert.equal(tip.content.get('en'), TIP2.content.get('en'));

        tip2 = tip;

        // Get all tips
        let page = await this._client.getTips(null, null, null);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the tip
        tip1.content = new MultiString({ en: 'Updated Content 1' });

        tip = await this._client.updateTip(null, tip1);

        assert.isObject(tip);
        // assert.equal(tip.content.get('en'), 'Updated Content 1');
        assert.sameMembers(tip.topics, TIP1.topics);

        tip1 = tip;

        // Delete tip
        await this._client.deleteTipById(null, tip1.id);

        // Try to get delete tip
        tip = await this._client.getTipById(null, tip1.id);


        assert.isNull(tip || null);
    }
}
