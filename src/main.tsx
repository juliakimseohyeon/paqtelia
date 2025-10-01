import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

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
		>
			<App />
		</Authenticator>
	</React.StrictMode>,
);
