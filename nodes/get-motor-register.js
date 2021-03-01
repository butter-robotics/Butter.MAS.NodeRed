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

		const butterClientProvider = require('../butter-client/butter-client-provider');

		node.on('input', async function(msg) {
			// create butter client.
			const butterHttpClient = butterClientProvider.GetClient(node.config.robotIp);

			let robotIp = node.config.robotIp;
			let motorName = node.config.motorName;
			let registerName = node.config.registerName;
			let isDebugMode = node.config.debugMode;

			// check if message has correct json payload - if yes run it instead.
			if (
				msg.payload.robotIp != undefined &&
				msg.payload.motorName != undefined &&
				msg.payload.registerName != undefined
			) {
				robotIp = msg.payload.robotIp;
				motorName = msg.payload.motorName;
				registerName = msg.payload.registerName;
			}

			// getting motor register value.
			try {
				if (isDebugMode)
					this.warn(
						`getting the value of register ${registerName} of motor ${motorName} of robot ${robotIp} `
					);

				butter_response = await butterHttpClient.getMotorRegister(motorName, registerName);

				if (isDebugMode) this.warn(`butter response is ${butter_response.data}`);
				// prints operation result.
				console.log(butter_response.data);
				node.send({ payload: butter_response.data });
			} catch (error) {
				if (isDebugMode) this.warn(`failed to get register ${registerName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('get-motor-register', GetMotorRegisterNode);
};
