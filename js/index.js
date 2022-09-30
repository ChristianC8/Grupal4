const const_url = "https://japceibal.github.io/japflix_api/movies-data.json"


let buscador = document.getElementById("inputBuscar")

document.getElementById("btnBuscar").addEventListener("click",filtrar)









/* 
let peliculas = []
function obtenerPeli(array){
  peliculas += JSON.stringify(array)

} */

async function filtrar(){
/*   
  document.getElementById("lista").innerHTML = append
  let pelis = JSON.parse(peliculas)
 */


  let append = " "
  const result = await getJSONData(const_url)
  let pelis = result.data
    console.log(pelis)

  pelis.filter(function(movies,index){
    console.log(movies)
      let titleR = movies.title.toLowerCase().includes(buscador.value.toLowerCase())
      let taglineR =   movies.tagline.toLowerCase().includes(buscador.value.toLowerCase())
      let overview =   movies.overview.toLowerCase().includes(buscador.value.toLowerCase())

      let contadorGenres = 0
      for(let i = 0;i < Object.keys(movies.genres).length;i++ ){
        var genresR = movies.genres[i].name.toLowerCase().includes(buscador.value.toLowerCase()) 
        if(genresR){
          contadorGenres++
        }
        localStorage.setItem(`mo${movies.title}`,JSON.stringify(movies.genres[i]))
/*         console.log(movies.title) */
      }

      if((titleR || taglineR || overview || contadorGenres != 0) && buscador.value.length != 0 ){

        
  
          append += `
          <li class="list-group-item d-flex justify-content-between align-items-start bg-dark" id="peli${index}"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop-${index}" aria-controls="offcanvasTop-${index}">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">${movies.title}</div>
                  <p class="fst-italic text-muted"> ${movies.tagline}</p>
                </div>
                ${mostrarEstrellas(movies.vote_average)}





                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop-${index}" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title blackLetter" id="offcanvasTopLabel">${movies.title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                <p class="blackLetter"> ${movies.overview}</p>
                <hr>
                <p class="blackLetterS">${movies}</p>
                </div>
              </div>












              </li>
          `


document.getElementById("lista").innerHTML += append
      } 

    
  })

}


function mostrarEstrellas(votos){

/* 0-1   = 0       2-3 = 1     4-5  = 2  6-7 = 3   8-9 = 4   10 = 5 */
  if(Math.round(votos) == 0 || Math.round(votos) == 1 ) {                              
    return ` <span class="fa fa-star-o">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o"></span>         `


  }
  if(Math.round(votos) == 2 || Math.round(votos) == 3 ) {                              
    return `    <span class="fa fa-star checked">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o"></span>      `


  }
  if(Math.round(votos) == 4 || Math.round(votos) == 5 ) {                              
    return `          <span class="fa fa-star checked">
    </span>  <span class="fa fa-star checked">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o"></span>          `


  }
  if(Math.round(votos) == 6 || Math.round(votos) == 7 ) {                              
    return `          <span class="fa fa-star checked">
    </span>  <span class="fa fa-star checked">
    </span><span class="fa fa-star checked">
    </span><span class="fa fa-star-o">
    </span><span class="fa fa-star-o"></span>          `


  }
  if(Math.round(votos) == 8 || Math.round(votos) == 9 ) {                              
    return `   <span class="fa fa-star checked">
    </span>  <span class="fa fa-star checked">
    </span><span class="fa fa-star checked">
    </span><span class="fa fa-star checked">
    </span><span class="fa fa-star-o"></span>                  `


  }
  if(Math.round(votos) == 10) {                              
    return `      <span class="fa fa-star checked">
    </span>  <span class="fa fa-star checked">
    </span><span class="fa fa-star checked">
    </span><span class="fa fa-star checked">
    </span><span class="fa fa-star checked"></span>               `


  }
  



}






















let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
        
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}
/* 
document.addEventListener("DOMContentLoaded", function(){
  getJSONData(const_url).then(function(resultObj){
      if (resultObj.status === "ok")
      {

          MoviesArray = resultObj.data;
        obtenerPeli(MoviesArray)

      }
  });
});
 */