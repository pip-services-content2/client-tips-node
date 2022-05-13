import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';
import { TipsLambdaClientV1 } from '../version1';

import { TipsDirectClientV1 } from '../version1/TipsDirectClientV1';
import { TipsHttpClientV1 } from '../version1/TipsHttpClientV1';

export class TipsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-tips', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-tips', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-tips', 'client', 'http', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('service-help', 'client', 'lambda', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(TipsClientFactory.DirectClientV1Descriptor, TipsDirectClientV1);
		this.registerAsType(TipsClientFactory.HttpClientV1Descriptor, TipsHttpClientV1);
		this.registerAsType(TipsClientFactory.LambdaClientV1Descriptor, TipsLambdaClientV1);
	}
	
}
