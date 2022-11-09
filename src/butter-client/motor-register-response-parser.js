const ButterException = require('../exceptions/butter_exception');

class MotorRegisterResponseParser {
	constructor(debugMode=false) {
		this.debugMode = debugMode;
	}

	parse(response) {
		if (this.debugMode) console.log(`${response.status} - ${response.statusText}`);

		if (response.statusText == 'Failed') {
			return null;
		}

		let responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		if ('exception' in responseData) {
			throw new ButterException(respData.exception);
		}

		const registerValue = responseData.response.data;

		return parseInt(registerValue);
	}
}

module.exports = MotorRegisterResponseParser;
