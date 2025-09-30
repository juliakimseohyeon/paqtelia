import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

const client = generateClient<Schema>();
Amplify.configure(outputs);

function App() {
	const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
	const { signOut, user } = useAuthenticator();
	useEffect(() => {
		client.models.Todo.observeQuery().subscribe({
			next: (data) => setTodos([...data.items]),
		});
	}, []);

	function createTodo() {
		client.models.Todo.create({ content: window.prompt("Todo content") });
	}

	return (
		<main>
			<h1>{user?.username} todos</h1>
			<button type="button" onClick={createTodo}>
				+ new
			</button>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.content}</li>
				))}
			</ul>
			<div>
				🥳 App successfully hosted. Try creating a new todo.
				<br />
				<a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
					Review next step of this tutorial.
				</a>
			</div>
			<button type="button" onClick={signOut}>
				Sign out
			</button>
		</main>
	);
}

export default App;
