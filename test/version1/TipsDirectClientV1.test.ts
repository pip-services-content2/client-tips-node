import { Descriptor } from 'pip-services3-commons-nodex';;
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { TipsMemoryPersistence } from 'service-tips-node';
import { TipsController } from 'service-tips-node';
import { TipsDirectClientV1 } from '../../src/version1/TipsDirectClientV1';
import { TipsClientFixtureV1 } from './TipsClientFixtureV1';

suite('TipsDirectClientV1', ()=> {
    let client: TipsDirectClientV1;
    let fixture: TipsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new TipsMemoryPersistence();
        let controller = new TipsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-tips', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-tips', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new TipsDirectClientV1();
        client.setReferences(references);

        fixture = new TipsClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
