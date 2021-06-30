const d = document;


const url = "https://api.jikan.moe/v3";

function guardar(datos) {
  localStorage.sMangas = JSON.stringify(datos);
}

const btnManga = document.getElementById("btnBuscar");
const contAnime = document.getElementById("mangas");
const nombre = document.getElementById("buscar");


if (localStorage.sMangas) {
  const guardado = JSON.parse(localStorage.sMangas);

  mostrar(guardado);
}

btnManga.addEventListener("click", () => {
  if (!navigator.onLine) {
    msgError();
  } else {
       if (validInputs() == true) {
        buscarAnime(nombre.value);
      }
  }
});

function  buscarAnime(anime) {
  console.log("Palabra", anime);

  const fetchPromise = fetch(`${url}/search/manga?q=${nombre.value}`);

  fetchPromise
    .then((Response) => {
      console.log("resultado", Response);
      return Response.json();
    })
    .then((result) => {
      mostrar(result);
    })
    .catch((err) => {
      console.log("Upss", err);
    });
}

function mostrar(datos) {

  const mangas = datos.results.map(
    anime => `<a href="${anime.url}" target="_blank"
                class="btn cardi tarjeta col-12 col-md-8 col-lg-4 my-4 mx-5 p-0  bg-white shadow">
                <article class="d-flex flex-column-reverse">
                    <div class="col-12 bd-highlight texto-card p-2 text-center h-100 d-inline-block">
                        <h3>${anime.title}</h3>
                        <p>${anime.synopsis}</p>
                        <span class="score">${anime.score}</span>
                    </div>
                    <div class="col-12 bd-highlight pb-2 text-center p-0">
                        <img src="${anime.image_url}"
                            v-bind:alt="Poster de ${anime.title}">
                    </div>
                </article>
            </a>`).join("\n");
 
  guardar(datos);
  contAnime.innerHTML = mangas;

}

function validInputs() {
  let enviar = true;
  {
    if (nombre.value.length == 0) {
      enviar = false;
      nombre.classList.add("error");
    } else {
      nombre.classList.remove("error");
    }
  }

  return enviar;
}

