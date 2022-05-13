"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipsClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const version1_1 = require("../version1");
const TipsDirectClientV1_1 = require("../version1/TipsDirectClientV1");
const TipsHttpClientV1_1 = require("../version1/TipsHttpClientV1");
class TipsClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(TipsClientFactory.DirectClientV1Descriptor, TipsDirectClientV1_1.TipsDirectClientV1);
        this.registerAsType(TipsClientFactory.HttpClientV1Descriptor, TipsHttpClientV1_1.TipsHttpClientV1);
        this.registerAsType(TipsClientFactory.LambdaClientV1Descriptor, version1_1.TipsLambdaClientV1);
    }
}
exports.TipsClientFactory = TipsClientFactory;
TipsClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-tips', 'factory', 'default', 'default', '1.0');
TipsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-tips', 'client', 'direct', 'default', '1.0');
TipsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-tips', 'client', 'http', 'default', '1.0');
TipsClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-help', 'client', 'lambda', 'default', '1.0');
//# sourceMappingURL=TipsClientFactory.js.map