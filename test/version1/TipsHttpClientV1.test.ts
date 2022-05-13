import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { TipsMemoryPersistence } from 'service-tips-node';
import { TipsController } from 'service-tips-node';
import { TipsHttpServiceV1 } from 'service-tips-node';
import { TipsHttpClientV1 } from '../../src/version1/TipsHttpClientV1';
import { TipsClientFixtureV1 } from './TipsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('TipsHttpClientV1', ()=> {
    let service: TipsHttpServiceV1;
    let client: TipsHttpClientV1;
    let fixture: TipsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new TipsMemoryPersistence();
        let controller = new TipsController();

        service = new TipsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-tips', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-tips', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-tips', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new TipsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new TipsClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
