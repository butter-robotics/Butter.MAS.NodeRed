/*
    SetMotorRegister node
        * input: message (any).
        * command: set a value to a motor register on configured robot.
        * output: operation success/failure response.
*/
module.exports = function(RED) {
	function SetMotorRegisterNode(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const Logger = require('../logger/logger');
		this.logger = new Logger(this, this.config.debugMode);
		
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let motorName = this.config.motorName;
			let registerName = this.config.registerName;
			let value = this.config.value;

			// check if message has correct json payload - if yes run it instead.
			if (
				msg.payload.robotIp != undefined &&
				msg.payload.motorName != undefined &&
				msg.payload.registerName != undefined &&
				msg.payload.value != undefined
			) {
				this.logger.debug(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

				if (msg.payload.robotIp != this.config.robotIp) {
					this.butterHttpClient = butterClientProvider.GetClient(msg.payload.robotIp);
				}

				robotIp = msg.payload.robotIp;
				motorName = msg.payload.motorName;
				registerName = msg.payload.registerName;
				value = msg.payload.value;
			} else {
				this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
			}

			// sets the motor.
			this.logger.debug(
				`Setting the register ${registerName} of motor ${motorName} of robot ${robotIp} to ${value}`
			);

			try {
				butterResponse = await this.butterHttpClient.setMotorRegister(motorName, registerName, value);

				this.logger.debug(`Butter response: ${JSON.stringify(butterResponse.data)}`);
				// send operation result.
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.logger.debug(`Failed to set register ${registerName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('set-motor-register', SetMotorRegisterNode);
};
