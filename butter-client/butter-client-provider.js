const butter = require('@butter-robotics/mas-javascript-api');

/*
    This class defines a singleton implementation for a butter client provider.
    All other nodes can use this singleton to obtain a butter client connected to a specific ip.
    The provider manages the pool of existing butter clients in the flow, and creates them lazily upon request.
*/
class ButterClientProvider {
	constructor() {
		if (!ButterClientProvider.instance) {
			ButterClientProvider.instance = this;
		}

		this.ipToClientMap = new Map();

		return ButterClientProvider.instance;
	}

	/*
        Gets a butter HTTP client connected to given ip.
        If client does not exists, it creates it.
    */
	GetClient(ip) {
		if (!this.ipToClientMap.has(ip)) {
			const client = new butter.HttpClient(ip);
			// lengthen timeout.
			client.timeout = 120;
			this.ipToClientMap.set(ip, client);
		}

		return this.ipToClientMap.get(ip);
	}
}

const instance = new ButterClientProvider();
Object.freeze(instance);

module.exports = instance;
