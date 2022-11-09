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

		const DebugLogger = require('../logger/debug_logger');
		this.debugLogger = new DebugLogger(this, this.config.debugMode);
		
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let animationName = this.config.animationName;

			// check if message has correct json payload - if yes run it instead.
			if (this.config.robotIp != undefined && this.config.animationName != undefined) {
				robotIp = this.config.robotIp;
				animationName = this.config.animationName;
				lenient = this.config.lenient || false;
				relative = this.config.relative || false;
			}


			// play animation.
			try {
				this.debugLogger.logIfDebugMode(`attempting to play animation - ${animationName}`);
				butterResponse = await this.butterHttpClient.playAnimation(animationName, lenient, relative);

				this.debugLogger.logIfDebugMode(`butter response is ${butterResponse.data}`);
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.debugLogger.logIfDebugMode(`failed to play animation - ${animationName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('play-animation', PlayAnimationNode);
};
