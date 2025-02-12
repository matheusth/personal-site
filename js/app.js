import { Octokit, App } from "https://esm.sh/octokit";
const octokit = new Octokit({});

document.body.onload = getProjects;

let filterrepo = [
	'alura-space',
];

function buildCards(repo) {
	const projeto = document.createElement("section");
	const projetoTitulo = document.createElement("h1");
	const projetoDescricao = document.createElement("p");
	const projetoImage = document.createElement("img");
	const projetoTexto = document.createElement("div");
	const projetoStars = document.createElement('p');

	projeto.classList.add('projeto');
	projetoTexto.classList.add('projetotexto');
	projetoImage.classList.add('projetoimg');
	projetoStars.classList.add('info');


	projetoImage.src = `https://raw.githubusercontent.com/matheusth/${repo.name}/refs/heads/main/thumb.png`;
	projetoTitulo.textContent = repo.name;
	projetoDescricao.textContent = repo.description;
	projetoStars.textContent = repo.stargazers_count;

	projetoTexto.appendChild(projetoTitulo);
	projetoTexto.appendChild(projetoDescricao);
	projetoTexto.appendChild(projetoStars);
	projeto.appendChild(projetoTexto);
	projeto.appendChild(projetoImage);

	document.getElementById("projetos").appendChild(projeto);
}

function getProjects() {
	octokit.request('GET /users/{username}/repos', {
		username: 'matheusth',
		sort: 'updated',
		headers: {
			'X-Github-Api-Version': '2022-11-28'
		}
	}).then(
		response => {
			const repos = response.data;
			repos.filter(repo => filterrepo.includes(repo.name)).forEach(repo => {
				buildCards(repo);
			});
		});
}
