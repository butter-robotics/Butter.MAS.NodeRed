/*
    MoveMotor node
        * input: message (any).
        * command: move motor on configured robot.
        * output: operation success/failure response.
*/
module.exports = function(RED) {
	function MoveMotorNode(config) {
		RED.nodes.createNode(this, config);
		this.config = config;
		var node = this;

		const Logger = require('../logger/logger');
		this.logger = new Logger(this, this.config.debugMode);
		
		const butterClientProvider = require('../butter-client/butter-client-provider');
		this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);

		node.on('input', async function(msg) {
			let robotIp = this.config.robotIp;
			let motorName = this.config.motorName;
			let position = this.config.position;
			let units = this.config.units;
			let mode = this.config.mode;
			let velocity = this.config.velocity;
			let acceleration = this.config.acceleration;
			let duration = this.config.duration;

			// check if message has correct json payload - if yes run it instead.
			if (msg.payload.robotIp != undefined && msg.payload.motorName != undefined && msg.payload.position != undefined && msg.payload.units != undefined) {
				this.logger.debug(`Overriding node configuration with incoming payload [ID: ${msg._msgid}]`);

				if (msg.payload.robotIp != this.config.robotIp) {
					this.butterHttpClient = butterClientProvider.GetClient(msg.payload.robotIp);
				}

				robotIp = msg.payload.robotIp;
				motorName = msg.payload.motorName;
				position = msg.payload.position;
				units = msg.payload.units;
				mode = msg.payload.mode || this.config.mode;
				velocity = msg.payload.velocity || this.config.velocity;
				acceleration = msg.payload.acceleration || this.config.acceleration;
				duration = msg.payload.duration || this.config.duration;
			} else {
				this.butterHttpClient = butterClientProvider.GetClient(this.config.robotIp);
			}

			velocity = velocity > 0 ? velocity : undefined;
			acceleration = acceleration > 0 ? acceleration : undefined;
			duration = duration > 0 ? duration : undefined;
			mode = !mode || mode === "" ? (duration ? "temporal" : "profile") : mode;

			// move motor.
			try {
				this.logger.debug(`Attempting to move motor ${motorName} of robot ${robotIp}`);

				switch (mode) {
					case "temporal":
						butterResponse = await this.butterHttpClient.moveMotorInTime(motorName, position, duration, units);
						break;
					case "profile":
					default:
						butterResponse = await this.butterHttpClient.moveMotorToPosition(motorName, position, velocity, acceleration, units);
						break;
					}

				this.logger.debug(`Butter response: ${butterResponse.data}`);
				this.send({ payload: butterResponse.data });
			} catch (error) {
				this.logger.debug(`Failed to move motor - ${motorName}\n${error}`);
			}
		});
	}

	// register node type.
	RED.nodes.registerType('move-motor', MoveMotorNode);
};
