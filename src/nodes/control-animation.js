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
			if (this.config.robotIp != undefined && this.config.action != undefined) {
				robotIp = this.config.robotIp;
				action = this.config.action;
			}


			// manipulate animation.
			try {
				this.debugLogger.logIfDebugMode(`attempting to ${action} animation`);
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
						this.debugLogger.logIfDebugMode(`unknown action ${action}`);
						butterResponse = {};
				}

				this.debugLogger.logIfDebugMode(`butter response is ${butterResponse.data}`);
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.debugLogger.logIfDebugMode(`failed to ${action} animation\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('control-animation', ControlAnimationNode);
};
