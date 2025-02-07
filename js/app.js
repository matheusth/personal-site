import { Octokit, App } from "https://esm.sh/octokit";
const octokit = new Octokit({});

octokit.request('GET /users/{username}/repos', {
	username: 'matheusth',
	headers: {
		'X-Github-Api-Version': '2022-11-28'
	}
}).then(response => console.log(response));

