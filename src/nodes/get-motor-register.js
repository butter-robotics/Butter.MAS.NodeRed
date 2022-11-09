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

		const DebugLogger = require('../logger/debug_logger');
		const ButterResponseParser = require('../butter-client/motor-register-response-parser');
		const butterClientProvider = require('../butter-client/butter-client-provider');

		this.debugLogger = new DebugLogger(this, this.config.debugMode);
		this.butterResponseParser = new ButterResponseParser(this.config.debugMode);
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let motorName = this.config.motorName;
			let registerName = this.config.registerName;

			// check if message has correct json payload - if yes run it instead.
			if (
				this.config.robotIp != undefined &&
				this.config.motorName != undefined &&
				this.config.registerName != undefined
			) {
				robotIp = this.config.robotIp;
				motorName = this.config.motorName;
				registerName = this.config.registerName;
			}

			this.debugLogger.logIfDebugMode(
				`getting the value of register ${registerName} of motor ${motorName} of robot ${robotIp}`
			);

			try {
				// getting motor register value.
				butterResponse = await this.butterHttpClient.getMotorRegister(motorName, registerName);
				this.debugLogger.logIfDebugMode(butterResponse);
				parsedResponse = this.butterResponseParser.parse(butterResponse);

				this.debugLogger.logIfDebugMode(`butter response is ${JSON.stringify(butterResponse.data, null, 2)}`);
				this.debugLogger.logIfDebugMode(`parsed motor register value is ${parsedResponse}`);

				this.send({ payload: { register: registerName, value: parsedResponse } });
			} catch (error) {
				this.debugLogger.logIfDebugMode(`failed to get register ${registerName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('get-motor-register', GetMotorRegisterNode);
};
