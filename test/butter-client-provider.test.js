const butter = require('@butter-robotics/mas-javascript-api');
const clientProviderUnderTest = require('../butter-client/butter-client-provider');

test('Gets_butter_client_for_given_ip', () => {
	const butterClient = clientProviderUnderTest.GetClient('192.168.0.0');
	expect(butterClient).toBeInstanceOf(butter.HttpClient);
});
