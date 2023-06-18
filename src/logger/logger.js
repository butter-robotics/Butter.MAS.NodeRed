/*
    This class defines logger that logs iff the node is configured to debug mode.
*/

class Logger {
	constructor(node, verbose) {
		this.node = node;
		this.verbose = verbose;
	}

	/*
        Logs only those errors which make the application unusable should be recorded.
    */
	fatal(msg) {
		this.node.fatal(msg);
	}

	/*
        Logs errors which are deemed fatal for a particular request.
    */
	error(msg) {
		this.node.error(msg);
	}

	/*
        Logs errors which are deemed fatal for a particular request.
    */
	warn(msg) {
		this.node.warn(msg);
	}

	/*
        Logs information about the general running of the application. level override if node is in debug mode.
    */
	info(msg) {
		this.verbose ? this.node.warn(msg) : this.node.info(msg);
	}

	/*
        Logs information which is more verbose than info. level override if node is in debug mode.
    */
	debug(msg) {
		this.verbose ? this.node.warn(msg) : this.node.debug(msg);
	}
}

module.exports = Logger;
