import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {
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
            <form className="" method="GET" action="/">
                <input className="" autocomplete="off" name="search" type="text" placeholder="Search for a recipe" aria-label="Search" />
                <button className="" type="submit">Search</button>
            </form>
        </div>
    </div>
    
  )
}

export default Home