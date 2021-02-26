/*
Test class for ButterClientProvider.
*/

let should;
let butter;
let clientProviderUnderTest;

describe('The_butter_client_provider', () => {
	beforeAll(() => {
		butter = require('@butter-robotics/mas-javascript-api');
		clientProviderUnderTest = require('../butter-client/butter-client-provider');
		should = require('should');
	});

	test('Is_singleton', () => {
		const secondProvider = require('../butter-client/butter-client-provider');
		clientProviderUnderTest.should.be.exactly(secondProvider);
	});

	test('Gets_butter_client_for_given_ip', () => {
		const butterClient = clientProviderUnderTest.GetClient('192.168.0.0');
		butterClient.should.be.instanceOf(butter.HttpClient);
	});
});
