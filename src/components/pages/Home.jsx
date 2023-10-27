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
        //function splits the ingredients at the periods at the commas and lists them as bullet points instead
        let ingredientsArray = (ingredient) =>  {
            let stringSplit = ingredient.toString().split(',')
            let splitMap = stringSplit.map((string, idx) => (
                <li key={idx}>{string}</li>
            ));
            return splitMap;
        }
        //function splits the instructions at the periods at the end of the sentence and lists them as bullet points instead
        let instructionArray = (instruction) =>  {
            let stringSplit = instruction.toString().split('.')
            let splitMap = stringSplit.map((string, idx) => (
                <li key={idx}>{string}</li>
            ));
            return splitMap;
        }
        return (
            <div className='md:w-[75%] md:h-full max-w-full shadow-lg p-4 my-4 rounded-lg hover:scale-105 duration-300 border border-blue-500' key={`cocktail-${idx}`}>
                <h3 className='text-xl border-b border-b-black' style={{textTransform: 'capitalize'}}>{cocktail?.name}</h3>
                <ul className=''>
                    <li className='border-b border-b-black'>Ingredients: {ingredientsArray(cocktail?.ingredients)}</li>
                    <li className='border-b border-b-black'>Instructions: {instructionArray(cocktail?.instructions)}</li>
                </ul>
                
            </div>
        )
    })

    return (
        <div className='w-full'>

            <div className='max-w-[1240px] md:w-full shadow-2xl flex flex-col p-4 my-4 items-center rounded-3xl border border-red-700'>
                <h2 className='text-3xl py-4 text-center'>Search for a recipe</h2>
                <h4 className='text-center'>Please drink responsibly</h4>
                <p className="card-text text-center py-2">Include one of the following search parameters: </p>
                <p className="card-text py-2">Name: name of cocktail. This parameter supports partial matches (e.g. bloody will match bloody mary and bloody margarita) </p>
                <p className="card-text py-2">Ingredients: comma-separated string of ingredients to search. Only cocktails containing all listed ingredients will be returned. For example, to search cocktails containing Vodka and lemon juice, use vodka, lemon juice.</p>

                 <div className="">
                    <form className="flex flex-col sm:flex-row items-center justify-between w-full" onSubmit={handleSubmit}>
                        <input 
                            className="p-3 flex w-full rounded-md text-black border-4 border-blue-700" 
                            autoComplete="off" 
                            name="search" 
                            type="text" 
                            placeholder="Search for a recipe" 
                            aria-label="Search" 
                            value={results}
                            onChange={e => setResults(e.target.value)}
                        />

                        <button className="bg-[#00d] text-white rounded-md font-medium w-[150px] ml-4 my-6 px-6 py-3" 
                            type="submit" 
                            onClick={fetchResults}
                        >
                            Search</button>
                    </form>
                </div>
            </div>
            <div className='mx-auto grid lg:grid-cols-5 sm:grid-cols-2 px-4 gap-8'>
                {recipeResults} 
            </div>
        </div>
    )
}

export default Home