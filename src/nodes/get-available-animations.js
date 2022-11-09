/*
    GetAvailableAnimations  node
        * input: message (any).
        * command: get all available animations  of a the configured robot.
        * output:  response with the list of tha available animations.
*/

module.exports = function(RED) {
	function GetAvailableAnimationsNode(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const butterClientProvider = require('../butter-client/butter-client-provider');

		node.on('input', async function(msg) {
			// create butter client.
			const butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

			let robotIp = this.config.robotIp;
			let reload = this.config.reload;
			let isDebugMode = this.config.debugMode;

			// check if message has correct json payload - if yes run it instead.
			if (this.config.robotIp != undefined ) {
				robotIp = this.config.robotIp;
				reload = this.config.reload || false;
			}

			// getting Available Animations.
			try {
				if (isDebugMode)
					this.warn(`getting the Available Animations of robot ${robotIp}`);

				butterResponse = await butterHttpClient.getAvailableAnimations(reload);

				if (isDebugMode) this.warn(`butter response is ${butterResponse.data}`);

				// prints operation result.
				console.log(butterResponse.data);
				node.send({ payload: butterResponse.data });
			} catch (error) {
				if (isDebugMode) this.warn(`failed to get the robot animations \n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('get-available-animations', GetAvailableAnimationsNode);
};
