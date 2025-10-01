import {
	Authenticator,
	Button,
	Heading,
	Image,
	PhoneNumberField,
	Text,
	useAuthenticator,
	useTheme,
	View,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";
import {
	confirmSignIn,
	type SignInInput,
	type SignUpInput,
	signIn,
	signUp,
} from "aws-amplify/auth";

Amplify.configure(outputs);

const components = {
	Header() {
		const { tokens } = useTheme();

		return (
			<View textAlign="center" padding={tokens.space.large}>
				<Image
					alt="Amplify logo"
					src="https://docs.amplify.aws/assets/logo-dark.svg"
				/>
			</View>
		);
	},

	Footer() {
		const { tokens } = useTheme();

		return (
			<View textAlign="center" padding={tokens.space.large}>
				<Text color={tokens.colors.neutral[80]}>
					&copy; All Rights Reserved
				</Text>
			</View>
		);
	},

	SignIn: {
		Header() {
			const { tokens } = useTheme();
			console.log("SignIn Header is being called!");

			return (
				<Heading
					padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
					level={3}
				>
					🔴 SIGNIN FORM - Sign in to your account
				</Heading>
			);
		},
		FormFields() {
			console.log("SignIn FormFields is being called!");
			return (
				<PhoneNumberField
					autoComplete="username"
					name="username"
					label="Phone Number"
					defaultDialCode="+1"
					dialCodeName="dial_code"
					dialCodeLabel="Dial Code"
					onDialCodeChange={(e) =>
						alert(`Dial Code changed to: ${e.target.value}`)
					}
				/>
			);
		},
		Footer() {
			const { toSignUp } = useAuthenticator();

			return (
				<View textAlign="center">
					<Button
						fontWeight="normal"
						onClick={toSignUp}
						size="small"
						variation="link"
					>
						Back to Sign Up
					</Button>
				</View>
			);
		},
	},

	SignUp: {
		Header() {
			const { tokens } = useTheme();
			console.log("SignUp Header is being called!");

			return (
				<Heading
					padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
					level={3}
				>
					🔵 SIGNUP FORM - Create a new account
				</Heading>
			);
		},
		FormFields() {
			console.log("SignUp FormFields is being called!");
			return (
				<PhoneNumberField
					autoComplete="phone"
					id={"phone_number"}
					name="phone_number"
					label="Phone Number"
					defaultDialCode="+1"
					dialCodeName="dial_code"
					dialCodeLabel="Dial Code"
					onDialCodeChange={(e) =>
						alert(`Dial Code changed to: ${e.target.value}`)
					}
				/>
				// <>
				// 	<Input name="dial_code" id={"dial_code"} type="tel" />
				// 	<Input name="phone_number" id={"phone_number"} type="tel" />
				// </>
			);
		},
		Footer() {
			const { toSignIn } = useAuthenticator();

			return (
				<View textAlign="center">
					<Button
						fontWeight="normal"
						onClick={toSignIn}
						size="small"
						variation="link"
					>
						Back to Sign In
					</Button>
				</View>
			);
		},
	},
	ConfirmSignUp: {
		Header() {
			const { tokens } = useTheme();
			return (
				<Heading
					padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
					level={3}
				>
					Enter Information:
				</Heading>
			);
		},
		Footer() {
			return <Text>Footer Information</Text>;
		},
	},
	ConfirmSignIn: {
		Header() {
			const { tokens } = useTheme();
			return (
				<Heading
					padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
					level={3}
				>
					Enter Information:
				</Heading>
			);
		},
		Footer() {
			return <Text>Footer Information</Text>;
		},
	},
};

const services = {
	async handleSignUp(input: SignUpInput) {
		console.log("handleSignUp is being called! Input: ", input);
		console.log("Input.username: ", input.username);
		console.log("Input.password: ", input.password);
		console.log("Input.options: ", input.options);
		const { username } = input;
		const result = await signUp({
			username: username, // This will be the phone number from the form
			options: {
				userAttributes: {
					phone_number: username, // Use the same phone number as username
				},
			},
		});
		console.log("handleSignUp Result: ", result);

		if (result.nextStep.signUpStep === "DONE") {
			console.log(`SignUp Complete`);
		}

		if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
			console.log(
				`Code Delivery Medium: ${result.nextStep.codeDeliveryDetails.deliveryMedium}`,
			);
			console.log(
				`Code Delivery Destination: ${result.nextStep.codeDeliveryDetails.destination}`,
			);
		}

		return result;
	},
	async handleSignIn(input: SignInInput) {
		const { username } = input;
		const result = await signIn({
			username,
			options: {
				authFlowType: "USER_AUTH",
				preferredChallenge: "SMS_OTP",
			},
		});
		if (result.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE") {
			// prompt user for otp code delivered via SMS
			const { nextStep: confirmSignInNextStep } = await confirmSignIn({
				challengeResponse: "123456",
			});

			if (confirmSignInNextStep.signInStep === "DONE") {
				console.log("Sign in successful!");
			}
		}

		return result;
	},
};

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Authenticator
			components={components}
			services={services}
			loginMechanisms={["phone_number"]}
		>
			<App />
		</Authenticator>
	</React.StrictMode>,
);
