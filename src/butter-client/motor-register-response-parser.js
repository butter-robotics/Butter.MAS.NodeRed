const ButterException = require('../exceptions/butter_exception');

class MotorRegisterResponseParser {
	constructor() {}

	parse(resp) {
		let respData = typeof resp.data === 'string' ? JSON.parse(resp.data) : resp.data;

		if ('exception' in respData) {
			throw new ButterException(respData.exception);
		}

		const result = respData.Result;

		if (result.includes('Failed')) {
			return null;
		}

		const registerValue = result.split('|')[1].trim();

		return parseInt(registerValue);
	}
}

module.exports = MotorRegisterResponseParser;
