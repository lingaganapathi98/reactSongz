import React, { useContext } from 'react';
import Mapper from './Mapper.json'
import { FunctionContext } from "./FunctionProvider";
const ListOfSongs = () => {

    const {play} = useContext(FunctionContext);

    return (
        <div> 
            <h1>songs</h1>
            <button  onClick={{/*() => play('hukkum')*/}}>Hukkum</button>
            
        </div>
    )
}

export default ListOfSongs;