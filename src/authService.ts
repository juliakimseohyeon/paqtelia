import { confirmSignIn, confirmSignUp, signIn, signUp } from "aws-amplify/auth";

// Sign up using a phone number
const { nextStep: signUpNextStep } = await signUp({
	username: "hello",
	options: {
		userAttributes: {
			phone_number: "+15555551234",
		},
	},
});

if (signUpNextStep.signUpStep === "DONE") {
	console.log(`SignUp Complete`);
}

if (signUpNextStep.signUpStep === "CONFIRM_SIGN_UP") {
	console.log(
		`Code Delivery Medium: ${signUpNextStep.codeDeliveryDetails.deliveryMedium}`,
	);
	console.log(
		`Code Delivery Destination: ${signUpNextStep.codeDeliveryDetails.destination}`,
	);
}

// Confirm sign up with the OTP received
const { nextStep: confirmSignUpNextStep } = await confirmSignUp({
	username: "hello",
	confirmationCode: "123456",
});

if (confirmSignUpNextStep.signUpStep === "DONE") {
	console.log(`SignUp Complete`);
}

// Sign in with a phone number
const { nextStep: signInNextStep } = await signIn({
	username: "+15551234567",
	options: {
		authFlowType: "USER_AUTH",
		preferredChallenge: "SMS_OTP",
	},
});

if (signInNextStep.signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE") {
	// prompt user for otp code delivered via SMS
	const { nextStep: confirmSignInNextStep } = await confirmSignIn({
		challengeResponse: "123456",
	});

	if (confirmSignInNextStep.signInStep === "DONE") {
		console.log("Sign in successful!");
	}
}
