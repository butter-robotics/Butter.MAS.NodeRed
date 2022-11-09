/*
    GetAvailableAnimations  node
        * input: message (any).
        * command: get all available animations  of a the configured robot.
        * output:  response with the list of tha available animations.
*/

module.exports = function(RED) {
	function getAvailableMotorRegisters(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		// create butter client.
		const butterClientProvider = require('../butter-client/butter-client-provider');
		const butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let reload = this.config.reload;
			let isDebugMode = this.config.debugMode;

			// check if message has correct json payload - if yes run it instead.
			if (this.config.robotIp != undefined) {
				robotIp = this.config.robotIp;
				readableRegistersOnly = this.config.readableOnly || false;
			}

			// getting Available Motor Registers.
			try {
				if (isDebugMode) this.warn(`getting the Available get Available Motor Registers of robot: ${robotIp}`);

				butterResponse = await butterHttpClient.getAvailableMotorRegisters(motorName, readableRegistersOnly);

				if (isDebugMode) this.warn(`butter response is ${JSON.stringify(butterResponse.data)}`);

				// prints operation result.
				console.log(butterResponse.data);
				node.send({ payload: butterResponse.data });
			} catch (error) {
				if (isDebugMode) this.warn(`failed to get the robot available motor registers \n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('get-available-motor-register', getAvailableMotorRegisters);
};
