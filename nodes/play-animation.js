/*
    PlayAnimation node
        * input: message (any).
        * command: play set animation on configured robot.
        * output: operation success/failure response.
*/
module.exports = function(RED) {
	function PlayAnimationNode(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const butterClientProvider = require('../butter-client/butter-client-provider');

		node.on('input', async function(msg) {
			// get butter client.
			const butterHttpClient = butterClientProvider.GetClient(node.config.robotIp);

			let robotIp = node.config.robotIp;
			let animationName = node.config.animationName;
			let isDebugMode = node.config.debugMode;

			// check if message has correct json payload - if yes run it instead.
			if (msg.payload.robotIp != undefined && msg.payload.animationName != undefined) {
				robotIp = msg.payload.robotIp;
				animationName = msg.payload.animationName;
			}

			// play animation.
			try {
				if (isDebugMode) this.warn(`attempting to play animation - ${animationName}`);
				butter_response = await butterHttpClient.playAnimation(animationName);

				if (isDebugMode) this.warn(`butter response is ${butter_response.data}`);
				node.send({ payload: butter_response.data });
			} catch (error) {
				if (isDebugMode) this.warn(`failed to play animation - ${animationName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('play-animation', PlayAnimationNode);
};
