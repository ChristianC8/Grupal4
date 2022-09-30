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
   /*  console.log(pelis) */

  pelis.filter(function(movie,index){
/*     console.log(movie) */
      let titleR = movie.title.toLowerCase().includes(buscador.value.toLowerCase())
      let taglineR =   movie.tagline.toLowerCase().includes(buscador.value.toLowerCase())
      let overview =   movie.overview.toLowerCase().includes(buscador.value.toLowerCase())

      let contadorGenres = 0
      for(let i = 0;i < Object.keys(movie.genres).length;i++ ){
        var genresR = movie.genres[i].name.toLowerCase().includes(buscador.value.toLowerCase()) 
        if(genresR){
          contadorGenres++
        }

      }

      if((titleR || taglineR || overview || contadorGenres != 0) && buscador.value.length != 0 ){

        
  
          append += `
    

          <li class="list-group-item  align-items-start bg-dark" id="peli${index}"> 

          <a  data-bs-toggle="offcanvas" href="#offcanvasExample${index}"  aria-controls="offcanvasExample" class="d-flex justify-content-between" >
          
          <div class="ms-2 me-auto">
          <div class="fw-bold">${movie.title}</div>
          <p class="fst-italic text-muted"> ${movie.tagline}</p>
        </div>
        ${mostrarEstrellas(movie.vote_average)}
          </a>


<div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasExample${index}" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title blackLetter" id="offcanvasExampleLabel">${movie.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="btnD"></button>
  </div>
  <div class="offcanvas-body" style="overflow-y: visible;">
    <div>
    <p class="blackLetter"> ${movie.overview}</p>
    <hr class="blackLine">
    </div>
    
    
    <div class="dropdown mt-3 d-flex justify-content-between">
    <p class="blackLetterS">${mostrarGeneros(movie)}</p>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      More
    </button>
    <ul class="dropdown-menu">
      <li><p class="dropdown-item" href="#">Year: ${movie.release_date.slice(0, 4)} </p></li>
      <li><p class="dropdown-item" href="#">Runtime:${movie.runtime} min </p></li>
      <li><p class="dropdown-item" href="#">Budget:$${movie.budget} </p></li>
      <li><p class="dropdown-item" href="#">Revenue:$${movie.revenue} </p></li>
    </ul>
  </div>
    </div>
  </div>
</div>
    



              </li>
          `


document.getElementById("lista").innerHTML = append
/* console.log(append) */
      } 

    
  })

}





function mostrarGeneros(array){
    let genresArray = []
   for(let i = 0;i < Object.keys(array.genres).length;i++ ){
      genresArray.push(array.genres[i].name)
    }
 return`${genresArray.join('-')}`
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