const ButterException = require('../exceptions/butter_exception');

class MotorRegisterResponseParser {
	constructor() {}

	parse(resp) {
		let respData = JSON.parse(resp.data);

		if ('exception' in respData) {
			throw new ButterException(respData.exception);
		}

		const result = respData.Result;

		if ('Failed' in result) {
			return null;
		}

		const registerValue = result.split('|')[1].trim();

		return parseInt(registerValue);
	}
}

module.exports = MotorRegisterResponseParser;
