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

			return (
				<Heading
					padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
					level={3}
				>
					Sign in to your account
				</Heading>
			);
		},
		FormFields() {
			return <PhoneNumberField label="Phone Number" defaultDialCode="+34" />;
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

			return (
				<Heading
					padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
					level={3}
				>
					Create a new account
				</Heading>
			);
		},
		FormFields() {
			return <PhoneNumberField label="Phone Number" defaultDialCode="+34" />;
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

const formFields = {
	signIn: {
		username: {
			dialCode: "+34",
		},
	},
	signUp: {
		phone_number: {
			dialCode: "+34",
		},
	},
};

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Authenticator
			loginMechanisms={["phone_number"]}
			initialState="signUp"
			formFields={formFields}
			components={components}
		>
			<App />
		</Authenticator>
	</React.StrictMode>,
);
