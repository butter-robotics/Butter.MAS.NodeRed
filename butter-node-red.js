/*
Butter.js Node-Red Nodes.
*/

import { HttpClient } from '@butter-robotics/mas-javascript-api';


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
        node.on('input', function(msg) {
            // create butter client.
            this.debug("creating butter http client.");
            const butterHttpClient = new HttpClient(node.robotIp);

            // play animation.
            this.debug(`playing animation - ${node.animationName}`);
            butterHttpClient.playAnimation(node.animationName);

            // send operation result.
            var respMsg = { payload: "success" };
            node.send(respMsg);
        });
    }
    RED.nodes.registerType("butter-play-animation", PlayAnimationNode);
}