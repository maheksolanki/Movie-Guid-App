const searchform = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');
// const movieDetails = document.querySelector('.movie-details');


//function to fetch movie details using OMDB API
const getMovieInfo = async(movie) => {
    try {
        const myApiKey = "988b0c7";

        const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${myApiKey}&t=${movie}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch movie data.");
        }
        const data = await response.json();
        // console.log(data);
        showMovieData(data);
    } catch (error) {
        showErrorMessage("No movie found!!");
    }
}

//function to show movie dataa

const showMovieData = (data) => {

        movieContainer.innerHTML = "";
        movieContainer.classList.remove('noBackground');
        //use destructuring assignment to extract property from data object
        const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;


        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-info');
        movieElement.innerHTML = `<h2>${Title}</h2> 
                           <p><strong>Rating : &#11088;</strong>${imdbRating}</p> `;

        //movie genre add
        const movieGenreElement = document.createElement('div');
        movieGenreElement.classList.add('movie-genre');

        Genre.split(",").forEach(ele => {
            const p = document.createElement('p');
            p.innerText = ele;
            movieGenreElement.appendChild(p);

        });
        movieElement.appendChild(movieGenreElement);


        movieElement.innerHTML += `<p><strong>Released Date :</strong>${Released}</p>
                            <p><strong>Duration :</strong>${Runtime}</p>
                            <p><strong>Cast :</strong>${Actors}</p>
                            <p><strong>Plot :</strong>${Plot}</p>`;



        //creating a div for poster
        const moviePoster = document.createElement('div');
        moviePoster.classList.add('movie-poster');
        moviePoster.innerHTML = `<img src = "${Poster}"/>`;

        movieContainer.appendChild(moviePoster);

        movieContainer.appendChild(movieElement);

    }
    //function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`
    movieContainer.classList.add('noBackground');
}

//Function to handle form submission

const handleFormSubmission = (e) => {
        e.preventDefault();
        // console.log(inputBox.value);
        const moviename = inputBox.value.trim();
        if (moviename != "") {
            showErrorMessage("Fetching Movie Information")
            getMovieInfo(moviename);
        } else {
            showErrorMessage("Enter movie name to get movie information")
        }
    }
    //adding event listerner to submit form
searchform.addEventListener('submit', handleFormSubmission);