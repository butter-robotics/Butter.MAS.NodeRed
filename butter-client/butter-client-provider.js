const butter = require('@butter-robotics/mas-javascript-api');

class ButterClientProvider {
	constructor() {
		if (!ButterClientProvider.instance) {
			ButterClientProvider.instance = this;
		}

		this.ipToClientMap = new Map();

		return ButterClientProvider.instance;
	}

	GetClient(ip) {
		if (!this.ipToClientMap.has(ip)) {
			this.ipToClientMap.set(ip, new butter.HttpClient(ip));
		}

		return this.ipToClientMap.get(ip);
	}

	get Instance() {
		return client_instance;
	}
}

const instance = new ButterClientProvider();
Object.freeze(instance);

export default instance;
