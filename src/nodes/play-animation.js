/*
    PlayAnimation node
        * input: message (any).
        * command: play animation on configured robot.
        * output: operation success/failure response.
*/
module.exports = function(RED) {
	function PlayAnimationNode(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const Logger = require('../logger/debug_logger');
		this.logger = new Logger(this, this.config.debugMode);
		
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let animationName = this.config.animationName;
			let lenient = this.config.lenient;
			let relative = this.config.relative;

			// check if message has correct json payload - if yes run it instead.
			if (msg.payload.robotIp != undefined && msg.payload.animationName != undefined) {
				this.logger.debug(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

				if (msg.payload.robotIp != this.config.robotIp) {
					this.butterHttpClient = butterClientProvider.GetClient(msg.payload.robotIp);
				}

				robotIp = msg.payload.robotIp;
				animationName = msg.payload.animationName;
				lenient = msg.payload.lenient || this.config.lenient || false;
				relative = msg.payload.relative || this.config.relative || false;
			} else {
				this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
			}


			// play animation.
			try {
				this.logger.debug(`Attempting to play ${animationName} animation on robot ${robotIp}`);
				butterResponse = await this.butterHttpClient.playAnimation(animationName, lenient, relative);

				this.logger.debug(`Butter response: ${butterResponse.data}`);
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.logger.debug(`Failed to play animation - ${animationName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('play-animation', PlayAnimationNode);
};
