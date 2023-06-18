/*
    getAvailableMotorRegisters  node
        * input: message (any).
        * command: get all accessible registers for a given motor.
        * output:  accessible registers for a given motor
*/

module.exports = function(RED) {
	function getAvailableMotorRegisters(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const DebugLogger = require('../logger/debug_logger');
		this.debugLogger = new DebugLogger(this, this.config.debugMode);

		// create butter client.
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;

			// check if message has correct json payload - if yes run it instead.
			if (msg.payload.robotIp != undefined) {
				this.debugLogger.logIfDebugMode(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

				if (msg.payload.robotIp != this.config.robotIp) {
					this.butterHttpClient = butterClientProvider.GetClient(msg.payload.robotIp);
				}

				robotIp = msg.payload.robotIp;
				readableRegistersOnly = msg.payload.readableOnly || this.config.readableOnly || false;
			} else {
				this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
			}

			// getting Available Motor Registers.
			try {
				this.debugLogger.logIfDebugMode(`Getting the Available get Available Motor Registers of robot: ${robotIp}`);

				butterResponse = await butterHttpClient.getAvailableMotorRegisters(motorName, readableRegistersOnly);

				this.debugLogger.logIfDebugMode(`Butter response: ${JSON.stringify(butterResponse.data)}`);

				// prints operation result.
				console.log(butterResponse.data);
				node.send({ payload: butterResponse.data });
			} catch (error) {
				this.debugLogger.logIfDebugMode(`Failed to get the robot available motor registers \n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('get-available-motor-registers', getAvailableMotorRegisters);
};
