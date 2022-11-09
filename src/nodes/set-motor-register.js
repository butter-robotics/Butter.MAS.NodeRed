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

		const DebugLogger = require('../logger/debug_logger');
		const butterClientProvider = require('../butter-client/butter-client-provider');

		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
		this.debugLogger = new DebugLogger(this, this.config.debugMode);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let motorName = this.config.motorName;
			let registerName = this.config.registerName;
			let value = this.config.value;

			// check if message has correct json payload - if yes run it instead.
			if (
				this.config.robotIp != undefined &&
				this.config.motorName != undefined &&
				this.config.registerName != undefined &&
				this.config.value != undefined
			) {
				robotIp = this.config.robotIp;
				motorName = this.config.motorName;
				registerName = this.config.registerName;
				value = this.config.value;
			}

			// sets the motor.
			this.debugLogger.logIfDebugMode(
				`setting the register ${registerName} of motor ${motorName} of robot ${robotIp} to ${value}`
			);

			try {
				butterResponse = await this.butterHttpClient.setMotorRegister(motorName, registerName, value);

				this.debugLogger.logIfDebugMode(`butter response is ${JSON.stringify(butterResponse.data)}`);
				// send operation result.
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.debugLogger.logIfDebugMode(`failed to set register ${registerName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('set-motor-register', SetMotorRegisterNode);
};
