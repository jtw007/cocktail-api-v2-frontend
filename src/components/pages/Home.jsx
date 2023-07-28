import React from 'react'
import { useNavigate, Navigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {
    const API_KEY = import.meta.env.VITE_API_KEY

    const [recipe, setRecipe ] = useState([])
    const [results, setResults ] = useState('')

    const navigate = useNavigate()


    const fetchResults = async () => {
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/cocktail?name=${results}`, { headers: { 'X-Api-Key': API_KEY}} )
            setRecipe(response.data)
        } catch (error) {
            console.warn(error.response.data)
        }
    }

    useEffect(() => {
        // console.log(`useEffect-ed`)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(`i was submitted`)
        // console.log(`recipeResults console.log ${recipeResults}`)
    }

    const recipeResults = recipe?.map((cocktail, idx) => {
        let ingredientsArray = (ingredient) =>  {
            let stringSplit = ingredient.toString().split(',')
            let splitMap = stringSplit.map((string, idx) => (
                <li key={idx}>{string}</li>
            ));
            return splitMap;
        }
        let instructionArray = (instruction) =>  {
            let stringSplit = instruction.toString().split('.')
            let splitMap = stringSplit.map((string, idx) => (
                <li key={idx}>{string}</li>
            ));
            return splitMap;
        }
        return (
            <div key={`cocktail-${idx}`}>
                <h3 style={{textTransform: 'capitalize'}}>{cocktail?.name}</h3>
                <ul className='list'>
                    Ingredients: {ingredientsArray(cocktail?.ingredients)}
                    Instructions: {instructionArray(cocktail?.instructions)}
                </ul>
                
            </div>
        )
    })

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
                <form className="" onSubmit={handleSubmit}>
                    <input 
                        className="" 
                        autoComplete="off" 
                        name="search" 
                        type="text" 
                        placeholder="Search for a recipe" 
                        aria-label="Search" 
                        value={results}
                        onChange={e => setResults(e.target.value)}
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