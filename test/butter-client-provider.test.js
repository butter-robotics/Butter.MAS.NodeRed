/*
Test class for ButterClientProvider.
*/

let butter;
let clientProviderUnderTest;

describe('The_butter_client_provider', () => {
	beforeAll(() => {
		butter = require('@butter-robotics/mas-javascript-api');
		clientProviderUnderTest = require('../butter-client/butter-client-provider');
	});

	test('Is_singleton', () => {
		const secondProvider = require('../butter-client/butter-client-provider');
		expect(clientProviderUnderTest).toBe(secondProvider);
	});

	test('Gets_butter_client_for_given_ip', () => {
		const butterClient = clientProviderUnderTest.GetClient('192.168.0.0');
		expect(butterClient).toBeInstanceOf(butter.HttpClient);
	});
});
