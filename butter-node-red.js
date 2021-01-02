/*
Butter.js Node-Red Nodes.
*/

module.exports = function(RED) {
    /*
    PlayAnimation node
        * input: message (any).
        * command: play set animation on configured robot.
        * output: operation success/failure response.
    */
    function PlayAnimationNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        const butter = require('@butter-robotics/mas-javascript-api');

        node.on('input', function(msg) {
            // create butter client.
            this.debug("creating butter http client.");
            const butterHttpClient = new butter.HttpClient(node.robotIp);

            // play animation.
            this.debug(`playing animation - ${node.animationName}`);
            butterHttpClient.playAnimation(node.animationName);

            // send operation result.
            var respMsg = { payload: "success" };
            node.send(respMsg);
        });
    }

    /*
    SetMotorRegister node
        * input: message (any).
        * command: set a value to a motor register on configured robot.
        * output: operation success/failure response.
    */
   function SetMotorRegisterNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    const butter = require('@butter-robotics/mas-javascript-api');

    node.on('input', function(msg) {
        // create butter client.
        this.debug("creating butter http client.");
        const butterHttpClient = new butter.HttpClient(node.robotIp);

        // play animation.
        this.debug(`setting the register ${node.registerName} of motor ${node.motorName} of robot ${node.robotIp} to ${node.value}`);
        butterHttpClient.setMotorRegister(node.motorName, node.registerName, node.value);

        // send operation result.
        var respMsg = { payload: "success" };
        node.send(respMsg);
    });
}


// Register node types.
RED.nodes.registerType("play-animation", PlayAnimationNode);
RED.nodes.registerType("set-motor-register", SetMotorRegisterNode);
}