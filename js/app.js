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
	/*
		<section id="projeto1" class="projeto">
			<div class="projetotexto">
				<h1 id="projeto1titulo">Projetos cli</h1>
				<p id="projeto1descricao">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et
					dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip
					ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu
					fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</p>
			</div>
			<img src="img/profile_square.png" id="projetoimg" class="projetoimg" />
		</section>
	*/
	const repos = response.data;
	repos.forEach(repo => {
	const projeto = document.createElement("section");
	projeto.classList.add('projeto');
	const projetoTexto = document.createElement("div");
	projetoTexto.classList.add('projetotexto');
	const projetoTitulo = document.createElement("h1");
	const projetoDescricao = document.createElement("p");
	const projetoImage = document.createElement("img");
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
