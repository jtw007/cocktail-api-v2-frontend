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
            <div className='max-w-[350px] h-[600px] shadow-lg p-4 md:m-5 rounded-3xl hover:scale-105 duration-300 border-4 border-[#d72d5c] bg-slate-100/[.85]' key={`cocktail-${idx}`}>
                <h3 className='text-xl border-b-4 border-b-black text-center font-bold py-2' style={{textTransform: 'capitalize'}}>{cocktail?.name}</h3>
                <ul className=''>
                    <p className='text-center font-bold pt-2 text-lg'>Ingredients:</p>
                    <p className='border-b-[3px] border-black p-2 text-lg'>{ingredientsArray(cocktail?.ingredients)}</p>
                    <p className='text-center font-bold pt-2 text-lg'>Instructions:</p>
                    <p className='p-2 text-lg'>{instructionArray(cocktail?.instructions)}</p>
                </ul>
                {/* <button className='bg-[#00d] text-white rounded-md font-medium w-[150px] px-6 py-3'>Button</button> */}
            </div>
        )
    })

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='sm:max-w-[350px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px] shadow-2xl flex flex-col p-4 md:my-12 sm:my-5 rounded-3xl border-[5px] border-[#d72d5c] bg-slate-100/[.85]'>
                <h2 className='text-3xl font-bold py-4 text-center'>Search for a recipe</h2>
                <h4 className='text-center'>Please drink responsibly</h4>
                <p className="text-xl text-center py-2">Include one of the following search parameters: </p>
                <p className="text-xl py-2">Name: name of cocktail. This parameter supports partial matches (e.g. bloody will match bloody mary and bloody margarita) </p>
                <p className="text-xl py-2">Ingredients: Only cocktails containing all listed ingredients will be returned. For example, to search cocktails containing Vodka and lemon juice, use: vodka, lemon juice.</p>

                 <div className="">
                    <form className="flex sm:flex-col md:flex-row items-center justify-center w-full" 
                    onSubmit={handleSubmit}>
                        <input 
                            className="p-3 flex w-full rounded-full text-black border-4 border-[#0000a3] md:w-[50%]" 
                            autoComplete="off" 
                            name="search" 
                            type="text" 
                            placeholder="Search for a recipe" 
                            aria-label="Search" 
                            value={results}
                            onChange={e => setResults(e.target.value)}
                        />

                        <button className="bg-[#0000a3] text-white rounded-md font-medium w-[150px] ml-4 my-6 px-6 py-3 hover:bg-[#7500a2]" 
                            type="submit" 
                            onClick={fetchResults}
                        >
                            Search</button>
                    </form>
                </div>
            </div>
            <div className='mx-auto grid 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 md:p-10 sm:py-5 gap-8 content-center'>
                {recipeResults} 
            </div>
        </div>
    )
}

export default Home