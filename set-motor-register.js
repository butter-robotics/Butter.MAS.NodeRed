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

		node.on('input', function(msg) {
			// create butter client.
			this.debug('creating butter http client.');
			const butterHttpClient = new butter.HttpClient(node.config.robotIp);

			// play animation.
			this.debug(
				`setting the register ${node.config.registerName} of motor ${node.config.motorName} of robot ${node
					.config.robotIp} to ${node.value}`
			);

			butterHttpClient.setMotorRegister(node.config.motorName, node.config.registerName, node.config.value);

			// send operation result.
			var respMsg = { payload: 'success' };
			node.send(respMsg);
		});
	}

	// register node type.
	RED.nodes.registerType('set-motor-register', SetMotorRegisterNode);
};
