import '../component/nav-bar.js';
const url ='https://api.themoviedb.org/3/search/movie?api_key=96f50c49d171168162f5c4c5cf645bef';
const IMAGE_url ='https://image.tmdb.org/t/p/w500';
const movieSearchable = document.querySelector("#movie-searchable");
const searchElement = document.querySelector("nav-bar");

const main = () => {
    const onButtonSearchClicked = (event) => {
        event.preventDefault();  
        searchMovie(searchElement.value)
    };


function generateUrl(path){
  const url =`https://api.themoviedb.org/3${path}?api_key=96f50c49d171168162f5c4c5cf645bef`
  return url;
}
 function sectionMovie(movies){
    return movies.map((movie)=>{
       if(movie.poster_path){
        return `<img src=${IMAGE_url + movie.poster_path} 
        data-movie-id=${movie.id}
        />`;
       }
     
     })
    }

    function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');
 
    const movieTemplate = `
      <section class="section">
         ${sectionMovie(movies)}
      </section>
      <div class="content">
        <p id="content-close">X</p>
      </div>
    `;
 
 
    movieElement.innerHTML = movieTemplate;
    return movieElement ;
 }
 
function renderSearchMovie(data){
    movieSearchable.innerHTML='';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('data :',data);
}


 function searchMovie(keyword) {
  const path ='/search/movie/';
  const newUrl = generateUrl(path) + '&query=' + keyword;
  fetch(newUrl)
    .then((res)=>res.json())
    .then(renderSearchMovie)
    .catch((error)=>{
      console.log('error:',error)
  });
  console.log('value:',keyword);
  }



  function createVideoTemplate(data,content){
    content.innerHTML =`<p id='content-close'>X</p>`;
    console.log('video:',data);
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length
    const iframeContainer = document.createElement('div');


    for(let i =0 ;i<length;i++){
      const video = videos[i];
      const iframe =createIframe(video);
      iframeContainer.appendChild(iframe);
      content.appendChild(iframeContainer);
    }
}


  function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height= 315;
    iframe.allowFullscreen =true;
    return iframe;
  
  }




  document.onclick = function (event){
    const target =event.target;
    if(target.tagName.toLowerCase()=== 'img'){
      const movieId =target.dataset.movieId;
      console.log('movieid:',movieId)
      const section =event.target.parentElement;
      const content =section.nextElementSibling;
      content.classList.add('content-display');

      const path =`/movie/${movieId}/videos`;
      const url = generateUrl(path);
      fetch(url)
      .then((res)=>res.json())
      .then((data)=> createVideoTemplate(data,content))
      .catch((error)=>{
        console.log('error:',error)
    });
    }
    if(target.id === 'content-close'){
      const content =target.parentElement;
      content.classList.remove('content-display');
    }
  }
searchElement.clickEvent = onButtonSearchClicked;   
};


 export default main;