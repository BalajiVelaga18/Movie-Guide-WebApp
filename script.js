const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

//Function to fetch movie details using OMDB API

const getMovieInfo = async (movie) => {
  try{
    const myAPI ='39dc50af';
    const url = `https://www.omdbapi.com/?apikey=${myAPI}&t=${movie}`;

    const response =await fetch(url);
    const data = await response.json();
    
    // console.log(data);

    showMovieData(data);
  }
  catch(error){
    showErrorMessage("No Movie Found");
  } 
}

//Function to show movie data on sccreen

const showMovieData = (data) => {

    movieContainer.innerHTML="";
    movieContainer.classList.remove("no-background");

    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;
    
    const movieElememt= document.createElement('div');
    movieElememt.classList.add("movie-info");
    movieElememt.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
                            
    const movieGenreElememt= document.createElement('div');
    movieGenreElememt.classList.add("movie-genre");

    Genre.split(",").forEach(element => {
        const p=document.createElement("p");
        p.innerText=element;
        movieGenreElememt.appendChild(p);
    });

    movieElememt.appendChild(movieGenreElememt);

    movieElememt.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
                            <p><strong>Duration:</strong>${Runtime}</p>
                            <p><strong>Cast:</strong>${Actors}</p>
                            <p><strong>Plot:</strong>${Plot}</p>`;
                      
          
    const moviePosterElement= document.createElement('div'); 
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML=`<img src="${Poster}"/>`;                  
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElememt);                     


}

//Function to show Error Message

const showErrorMessage = (message) => {
    movieContainer.innerHTML=`<h2>${message}</h2>`;
    movieContainer.classList.add("no-background");
}

//Function to handle form submission

const handleFormSub = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information....")
        getMovieInfo(movieName);
    }
    else if(movieName === ''){
        showErrorMessage("Enter Movie Name To Get Information");
    }
}

//Adding evnet listener to search form
searchForm.addEventListener('submit',handleFormSub);