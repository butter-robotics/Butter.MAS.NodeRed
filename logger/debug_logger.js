/*
    This class defines logger that logs iff the node is configured to debug mode.
*/

class DebugLogger {
	constructor(node, isDebugMode) {
		this.node = node;
		this.isDebugMode = isDebugMode;
	}

	/*
        Logs the given message if node is in debug mode.
    */
	logIfDebugMode(msg) {
		if (this.isDebugMode) this.node.warn(msg);
	}
}

module.exports = DebugLogger;
