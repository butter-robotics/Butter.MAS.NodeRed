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

		const Logger = require('../logger/logger');
		this.logger = new Logger(this, this.config.debugMode);

		// create butter client.
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let reload = this.config.reload;

			// check if message has correct json payload - if yes run it instead.
			if (msg.payload.robotIp != undefined ) {
				this.logger.debug(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

				if (msg.payload.robotIp != this.config.robotIp) {
					this.butterHttpClient = butterClientProvider.GetClient(msg.payload.robotIp);
				}

				robotIp = msg.payload.robotIp;
				reload = msg.payload.reload || this.config.reload || false;
			} else {
				this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
			}

			// getting Available Animations.
			try {
				this.logger.debug(`Getting the Available Animations of robot ${robotIp}`);

				butterResponse = await butterHttpClient.getAvailableAnimations(reload);

				this.logger.debug(`Butter response: ${butterResponse.data}`);

				node.send({ payload: butterResponse.data });
			} catch (error) {
				this.logger.debug(`Failed to get the robot animations \n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('get-available-animations', GetAvailableAnimationsNode);
};
