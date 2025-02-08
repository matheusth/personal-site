import { Octokit, App } from "https://esm.sh/octokit";
const octokit = new Octokit({});

document.body.onload = getProjects;

function getProjects() {
	octokit.request('GET /users/{username}/repos', {
		username: 'matheusth',
		per_page: 5,
		sort: 'updated',
		headers: {
			'X-Github-Api-Version': '2022-11-28'
		}
	}).then(
		response => {
			const repos = response.data;
			repos.forEach(repo => {
				const projeto = document.createElement("section");
				const projetoTitulo = document.createElement("h1");
				const projetoDescricao = document.createElement("p");
				const projetoImage = document.createElement("img");
				const projetoTexto = document.createElement("div");

				projeto.classList.add('projeto');
				projetoTexto.classList.add('projetotexto');
				projetoImage.classList.add('projetoimg');

				projetoImage.src = repo.owner.avatar_url;
				projetoTitulo.textContent = repo.name;
				projetoDescricao.textContent = repo.description;

				projetoTexto.appendChild(projetoTitulo);
				projetoTexto.appendChild(projetoDescricao);
				projeto.appendChild(projetoTexto);
				projeto.appendChild(projetoImage);

				document.getElementById("projetos").appendChild(projeto);
			});
		});
}
