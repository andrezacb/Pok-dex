import Jogo from '../imagem/pokedex.png'
import { useState, useEffect } from 'react'
import './Pokedex.css'
function Pokedex(){
    const [pok, setPok] = useState("")
    const [numDoPok, setNumDoPok] = useState(1)
    const [name,setName] = useState("")
    const [img, setImg] = useState()

    useEffect(() => {
        fetchPokemon(numDoPok)
    },[numDoPok])

    const fetchPokemon = async (pokemon) =>{
        setName('Loading...')
        const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if (APIresponse.status === 200){
        const data = await APIresponse.json()
        setImg(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'])
        setNumDoPok(data.id)
        setName(data.name)
        }else{
            setName('nao encontado')
            setNumDoPok(0)
            setImg()
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetchPokemon(pok.toLowerCase())
      }
      function BtnNext() {
        setNumDoPok(numDoPok+ 1)
        fetchPokemon(numDoPok)
      }
      function BtnPrev() {
        setNumDoPok(numDoPok- 1)
        fetchPokemon(numDoPok)
      }
    
    

    return(
        <main>
             <img src={img} alt="pokedex" className="pokeimagem"/>
            <img src={Jogo} alt="pokedex" className="pok"/>
            <h1 className="pokemonData">
                <span className="pokemonNumber">{numDoPok} -</span>
                <span className="pokemonName">{name}</span>
            </h1>
            <form id="form" onSubmit={handleSubmit}>
                <input type="search" className="inputSearch" placeholder="Name or Number" required onChange={(e) => setPok(e.target.value)}/>
            </form>
            <div className="button">
           <button className="botao BtnPrev" onClick={BtnPrev}>Prev &lt;</button>
           <button className="botao BtnNext"onClick={BtnNext}>Next &gt;</button>
        </div>

        </main>
    )
}
export default Pokedex