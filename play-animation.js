/*
    PlayAnimation node
        * input: message (any).
        * command: play set animation on configured robot.
        * output: operation success/failure response.
*/
module.exports = function (RED) {
  function PlayAnimationNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    const butter = require("@butter-robotics/mas-javascript-api");

    node.on("input", function (msg) {
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

  // register node type.
  RED.nodes.registerType("play-animation", PlayAnimationNode);
};
