import { useAuthenticator } from "@aws-amplify/ui-react";

function App() {
	const { signOut, user } = useAuthenticator();

	return (
		<main>
			<h1>Hi {user?.username} todos</h1>

			<button type="button" onClick={signOut}>
				Sign out
			</button>
		</main>
	);
}

export default App;
