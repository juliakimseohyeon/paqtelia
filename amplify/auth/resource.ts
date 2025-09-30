import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
	loginWith: {
		email: true,
		externalProviders: {
			signInWithApple: {
				clientId: secret("SIWA_CLIENT_ID"),
				teamId: secret("SIWA_TEAM_ID"),
				keyId: secret("SIWA_KEY_ID"),
				privateKey: secret("SIWA_PRIVATE_KEY"),
			},
			loginWithAmazon: {
				clientId: secret("LOGINWITHAMAZON_CLIENT_ID"),
				clientSecret: secret("LOGINWITHAMAZON_CLIENT_SECRET"),
			},
			facebook: {
				clientId: secret("FACEBOOK_CLIENT_ID"),
				clientSecret: secret("FACEBOOK_CLIENT_SECRET"),
			},
			google: {
				clientId: secret("GOOGLE_CLIENT_ID"),
				clientSecret: secret("GOOGLE_CLIENT_SECRET"),
			},
			callbackUrls: [
				"http://localhost:3000/profile",
				"https://mywebsite.com/profile",
			],
			logoutUrls: ["http://localhost:3000/", "https://mywebsite.com"],
		},
	},
});
