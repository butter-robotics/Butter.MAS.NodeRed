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

		const butter = require('@butter-robotics/mas-javascript-api');
		const butterClientProvider = require('butter-client/butter-client-provider');

		node.on('input', async function(msg) {
			// create butter client.
			const butterHttpClient = butterClientProvider.GetClient(node.config.robotIp);

			let robotIp = node.config.robotIp;
			let motorName = node.config.motorName;
			let registerName = node.config.registerName;
			let value = node.config.value;
			let isDebugMode = node.config.debugMode;

			// check if message has correct json payload - if yes run it instead.
			if (
				msg.payload.robotIp != undefined &&
				msg.payload.motorName != undefined &&
				msg.payload.registerName != undefined &&
				msg.payload.value != undefined
			) {
				robotIp = msg.payload.robotIp;
				motorName = msg.payload.motorName;
				registerName = msg.payload.registerName;
				value = msg.payload.value;
			}

			// play animation.
			try {
				if (isDebugMode)
					this.warn(
						`setting the register ${registerName} of motor ${motorName} of robot ${robotIp} to ${value}`
					);

				butter_response = await butterHttpClient.setMotorRegister(motorName, registerName, value);

				if (isDebugMode) this.warn(`butter response is ${butter_response.data}`);
				// send operation result.
				node.send({ payload: butter_response.data });
			} catch (error) {
				if (isDebugMode) this.warn(`failed to set register ${registerName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('set-motor-register', SetMotorRegisterNode);
};
