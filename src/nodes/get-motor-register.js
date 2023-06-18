/*
    GetMotorRegister node
        * input: message (any).
        * command: get a value of a motor register on configured robot.
        * output:  response with the value of the asked motor.
*/

module.exports = function(RED) {
	function GetMotorRegisterNode(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const Logger = require('../logger/debug_logger');
		this.logger = new Logger(this, this.config.debugMode);

		const ButterResponseParser = require('../butter-client/motor-register-response-parser');
		this.butterResponseParser = new ButterResponseParser(this.config.debugMode);

		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
		
		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let motorName = this.config.motorName;
			let registerName = this.config.registerName;

			// check if message has correct json payload - if yes run it instead.
			if (
				msg.payload.robotIp != undefined &&
				msg.payload.motorName != undefined &&
				msg.payload.registerName != undefined
			) {
				this.logger.debug(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

				if (msg.payload.robotIp != this.config.robotIp) {
					this.butterHttpClient = butterClientProvider.GetClient(msg.payload.robotIp);
				}

				robotIp = msg.payload.robotIp;
				motorName = msg.payload.motorName;
				registerName = msg.payload.registerName;
			} else {
				this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
			}

			this.logger.debug(
				`Getting the value of register ${registerName} of motor ${motorName} of robot ${robotIp}`
			);

			try {
				// getting motor register value.
				butterResponse = await this.butterHttpClient.getMotorRegister(motorName, registerName);
				this.logger.debug(butterResponse);
				parsedResponse = this.butterResponseParser.parse(butterResponse);

				this.logger.debug(`Butter response: ${JSON.stringify(butterResponse.data, null, 2)}`);
				this.logger.debug(`Parsed motor register value is ${parsedResponse}`);

				this.send({ payload: { register: registerName, value: parsedResponse } });
			} catch (error) {
				this.logger.debug(`Failed to get register ${registerName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('get-motor-register', GetMotorRegisterNode);
};
