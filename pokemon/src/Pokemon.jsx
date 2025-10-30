import { useState } from "react";
import "./index.css" ;
import {PokemonCards} from  "./PokemonCards.jsx"
export const Pokemon=()=>{
    const   API="https://pokeapi.co/api/v2/pokemon?limit=24";
    const  fetchPokemon=async()=>{
        const[pokemon,setPokemon]=useState([]);
        const[loading,setLoading]=useState(true); 
        const[error,setError]=useState(null);  
        const[search,setSearch]=useState("");
        try{
            const   res=await fetch(API) ; 
            const   data=await  res.json();

            const   detailedPokemonData=data.results.map(async(curPokemon)=>{
                const   res=await   fetch(curPokemon.url);
                const   data=await  res.json();
                return  data;
                });
            const   detailedResponses=await Promise.all(detailedPokemonData);    
            setPokemon(detailedResponses);
            setLoading(false);
        
        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
        }
    } 
    useEffect(()=>{
        fetchPokemon();
    },[]);
    // search
    const searchData=pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase()))  
    if(loading){
        return  <div>
            <h1>Loading...</h1>
        </div>
    }
    if(error){
        return  <div>
            <h1>{error.message}</h1>
        </div>
    }
    return(
        <>
        <section  className="container" >
            <header>
                <h1>Lets Catch Pokemon  </h1>
            </header>
            {/* search */}
            <div  className="pokemon-search"  >
            <input  type="text" placeholder="Search Pokemon" value={search}  onChange={(e)=>{
                setSearch(e.target.value)
            }} />

            </div>
            <div>
                <ul className="cards">{
                    searchData.map((curPokemon)=>{
                       return <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                    })
                }
                </ul>
            </div>
        </section> 
        </>
    )
}
