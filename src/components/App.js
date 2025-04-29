
import React, { useState } from "react";
import axios from 'axios'
import './../styles/App.css';

const App = () => {
  const [input, setInput] = useState('')
  const [movie, setMovie] = useState([])
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (input) {
      axios.get('http://www.omdbapi.com', {
        params: {
          apikey: "99eb9fd1",
          s: input
        }
      })
        .then(info => {
          if(info.data.Response == "True"){
            setMovie(info.data.Search)
            setError(false)
          }
          else{
            setMovie([])
            setError(true)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search movie" onChange={(e) => {
          setInput(e.target.value)
        }} />
        <button>Search</button>
      </form>
      {
        <ul>
          {
            movie.map(item => {
              return (
                <div key={item.imdbID}>
                  <li>
                    <p>{item.Title} ({item.Year})</p>
                    <img src={item.Poster} alt={item.Title} />
                  </li>
                </div>
              )
            })
          }
        </ul>
      }
      {
        error == true && <p className="error">Invalid movie name. Please try again.
        </p>
      }
    </div>
  )
}

export default App
