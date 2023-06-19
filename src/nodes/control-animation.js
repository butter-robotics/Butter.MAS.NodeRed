/*
    ControlAnimation node
        * input: message (any).
        * command: manipulate animation on configured robot.
        * output: operation success/failure response.
*/
module.exports = function(RED) {
	function ControlAnimationNode(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const Logger = require('../logger/logger');
		this.logger = new Logger(this, this.config.debugMode);
		
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let action = this.config.action;

			// check if message has correct json payload - if yes run it instead.
			if (msg.payload.robotIp != undefined && msg.payload.action != undefined) {
				this.logger.debug(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

				if (msg.payload.robotIp != this.config.robotIp) {
					this.butterHttpClient = butterClientProvider.GetClient(msg.payload.robotIp);
				}

				robotIp = msg.payload.robotIp;
				action = msg.payload.action;
			} else {
				this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
			}


			// manipulate animation.
			try {
				this.logger.debug(`Attempting to ${action} animation on robot ${robotIp}`);
				switch (action) {
					case "stop":
						butterResponse = await this.butterHttpClient.stopAnimation();
						break;
					case "pause":
						butterResponse = await this.butterHttpClient.pauseAnimation();
						break;
					case "resume":
						butterResponse = await this.butterHttpClient.resumeAnimation();
						break;
					case "clear":
						butterResponse = await this.butterHttpClient.clearAnimation();
						break;
					default:
						this.logger.debug(`Unknown action ${action}`);
						butterResponse = {};
				}

				this.logger.debug(`Butter response: ${butterResponse.data}`);
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.logger.debug(`Failed to ${action} animation\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('control-animation', ControlAnimationNode);
};
