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

		const DebugLogger = require('../logger/debug_logger');
		this.debugLogger = new DebugLogger(this, this.config.debugMode);
		
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let action = this.config.action;

			// check if message has correct json payload - if yes run it instead.
			if (msg.payload.robotIp != undefined && msg.payload.action != undefined) {
				this.debugLogger.logIfDebugMode(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

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
				this.debugLogger.logIfDebugMode(`Attempting to ${action} animation`);
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
						this.debugLogger.logIfDebugMode(`Unknown action ${action}`);
						butterResponse = {};
				}

				this.debugLogger.logIfDebugMode(`Butter response: ${butterResponse.data}`);
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.debugLogger.logIfDebugMode(`Failed to ${action} animation\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('control-animation', ControlAnimationNode);
};
