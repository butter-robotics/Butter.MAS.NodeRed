/*
    PlayAnimation node
        * input: message (any).
        * command: play set animation on configured robot.
        * output: operation success/failure response.
*/
module.exports = function(RED) {
	function PlayAnimationNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		const butter = require('@butter-robotics/mas-javascript-api');

		node.on('input', async function(msg) {
			// create butter client.
			this.warn('creating butter http client.');
			const butterHttpClient = new butter.HttpClient(node.robotIp);

			// play animation.
			// TODO: fix node.animationName is undefined.
			this.warn(`playing animation - ${node.animationName}`);
			const resp = await butterHttpClient.playAnimation(node.animationName);
			this.warn(resp);
			// send operation result.
			var respMsg = { payload: 'success' };
			node.send(respMsg);
		});
	}

	// register node type.
	RED.nodes.registerType('play-animation', PlayAnimationNode);
};
