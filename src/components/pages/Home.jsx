import React from 'react'
// import { useState, useEffect } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {
    const [recipe, setRecipe ] = useState([])
    const [results, setResults ] = useState('')
    // const apiNinjaKey = process.env.API_KEY 

    // useEffect(() => {
    //     const fetchResults = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://api.api-ninjas.com/v1/cocktail?name=${name}`,
    //                 {
    //                     method: "GET",
    //                     headers: {
    //                         'X-Api-Key': apiNinjaKey,
    //                     }
    //                 }
    //             )
    //             const results = await response.json()
    //             console.log(results)
    //         } catch (error) {
    //             console.warn(error)
    //         }
    //     }
    // })

    const fetchResults = async () => {
        try {
            // const url = `https://api.api-ninjas.com/v1/cocktail?name=${results}`
            const config = { headers: { 'X-Api-Key': API_KEY}} 
            const response = await axios.get(`https://api.api-ninjas.com/v1/cocktail?name=${results}`, config)
            setRecipe(response.data)
            console.log(fetchResults)
        } catch (error) {
            console.warn(error)
        }
    }

    const recipeResults = recipe.map((cocktail, idx) => {
        return (
            <div key={`cocktail-${idx}`}>
                <h3>{cocktail.name}</h3>
                <p>Ingredients: {cocktail.ingredients}</p>
                <p>Instructions: {cocktail.instructions}</p>
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
                        // value={recipe}
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