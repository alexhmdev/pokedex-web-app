import React, { useEffect, useState } from 'react'

const axios = require('axios').default

export default function Pokedex() {
    const [currentPokemon, setcurrentPokemon] = useState({})
    const [number, setnumber] = useState(1)
    const next = () => {
        setnumber(current => current + 1)
    }
    const prev = () => {
        setnumber(current => current - 1)
    }

    useEffect(() => {
        let currentPokemonNumber = localStorage.getItem('currentPokemonNumber')
        if(currentPokemonNumber) setnumber(currentPokemonNumber)
        console.log('Hola');
    }, [])

    useEffect(() => {

        axios.get(`https://pokeapi.co/api/v2/pokemon/${number}/`).then((result) => {
            setcurrentPokemon(result.data);
            console.log(result.data);
            localStorage.setItem('currentPokemonNumber',number);
        }).catch((err) => {
            console.log(err);
        });
    }, [number]);

    return (
            <div className="container bg-red-600 box-border h-96 w-56">
            <div className="grid grid-cols-4 ">
                <div className="mx-auto mt-3 ring-4 rounded-full ring-white"><div className="transition animate-pulse bg-blue-400 rounded-full w-10 h-10"></div></div>
                <div className="transform mt-3 bg-red-500 rounded-full w-3 h-3"></div>
                <div className="transform -translate-x-10 mt-3  bg-yellow-500 rounded-full w-3 h-3"></div>
                <div className="transform -translate-x-20 mt-3 bg-green-500 rounded-full w-3 h-3"></div>
            </div>
            <div className="grid grid-cols-3">
            <div>
                <hr className="mt-3 w-24 border-2 border-black" />
            </div>
            <div>
                <hr className="mt-1 ml-9 w-12 transform -rotate-45 -translate-x-6 -translate-y-2 border-2 border-black" />
            </div>
            <div>
                <hr style={{width: 100}} className="mt-1 w-24 transform -translate-y-6 -translate-x-6 border-2 border-black" />
            </div>
            </div>
            
            <div className="container">
                <label className="capitalize font-semibold">{currentPokemon.name} {currentPokemon.id}</label>
            </div>
            
            <div className="container flex border-8 border-gray-400 bg-white">
                <button onClick={prev} disabled={number == 1} className="rounded-lg ring-4 ring-indigo-400 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <img className="w-40 h-40 mx-auto" src={currentPokemon.sprites?.front_default} alt={currentPokemon.name} />
               <button onClick={next} className="  rounded-lg ring-4 ring-indigo-400 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>

            </div>

            <div>
                
            </div>
             

        </div>
    )
}

