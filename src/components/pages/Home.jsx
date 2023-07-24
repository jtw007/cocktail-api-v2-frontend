import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {
    const API_KEY = import.meta.env.VITE_API_KEY

    const [recipe, setRecipe ] = useState([])
    const [results, setResults ] = useState('')

    const navigate = useNavigate()

    const fetchResults = async () => {
        try {
            // e.preventDefault()
            const response = await axios.get(`https://api.api-ninjas.com/v1/cocktail?name=${results}`, { headers: { 'X-Api-Key': API_KEY}} )
            setRecipe(response.data)
            console.log(`response.data ${response.data}`)
        } catch (error) {
            console.warn(error.response.data)
        }
    }
    useEffect(() => {fetchResults()}, [])

    const recipeResults = recipe.map((cocktail, idx) => {
        return (
            <div key={`cocktail-${idx}`}>
                <h3>{cocktail?.name}</h3>
                <p>Ingredients: {cocktail?.ingredients}</p>
                <p>Instructions: {cocktail?.instructions}</p>
            </div>
        )
    })
    console.log(recipeResults)
    
    return (
        <div className='home'>
            <div className='card-body'>
                <h2 className=''>Search for a recipe</h2>
                <h4 className=''>Please drink responsibly</h4>
                <p className="card-text">Include one of the following search parameters: </p>
                <p className="card-text">Name: name of cocktail. This parameter supports partial matches (e.g. bloody will match bloody mary and bloody margarita) </p>
                <p className="card-text">Ingredients: comma-separated string of ingredients to search. Only cocktails containing all listed ingredients will be returned. For example, to search cocktails containing Vodka and lemon juice, use vodka, lemon juice.</p>
            </div>

            <div className="">
                <form className="">
                    <input 
                        className="" 
                        autoComplete="off" 
                        name="search" 
                        type="text" 
                        placeholder="Search for a recipe" 
                        aria-label="Search" 
                        value={results}
                        onChange={(e) => setResults(e.target.value)}
                    />

                    <button className="" 
                        type="submit" 
                        onClick={fetchResults}
                    >
                        Search</button>
                </form>
            </div>

            {recipeResults}

        </div>
    )
}

export default Home