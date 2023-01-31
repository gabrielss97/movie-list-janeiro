const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const formEl = document.querySelector("#form");
const searchEl = document.querySelector("#search");
const mainEl = document.querySelector("#main");

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results); // recebe uma lista de filmes
}

function showMovies(movies = []) {
  // movies é uma lista de filmes (filmes são objetos)
  mainEl.innerHTML = "";
  movies.forEach((movie) => {
    // o que tiver aqui dentro sempre vai acontecer nesse caso 20x
    const { poster_path, title, vote_average, overview } = movie;
    // movie é cada objeto um de cada vez

    // criar um card no html de forma dinamica
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${
                  vote_average >= 8
                    ? "green"
                    : vote_average >= 6
                    ? "orange"
                    : "red"
                }">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
    `;

    mainEl.appendChild(movieEl);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchEl.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    searchEl.value = "";
  }
});

// searchEl.addEventListener("keyup", () => {
//   const searchTerm = searchEl.value;

//   getMovies(SEARCHAPI + searchTerm);

//   if (searchTerm === "") {
//     getMovies(APIURL);
//   }
// });
