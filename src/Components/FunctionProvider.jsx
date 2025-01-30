// // // export function getSrcByName(name) {
// // //     const song = Mapper.songs.find((song) => song.name === name);
// // //     return song ? song.src : "Not found";
// // //   };

// // // export function play(name) {
// // //     console.log("before playing");

// // //     var audio = new Audio(getSrcByName(name));
    
// // //     console.log("after fetching");
// // //     audio.play();
// // // }

// import React, { createContext } from "react";
// import Mapper from './Mapper.json'

// export const FunctionContext = createContext();

// const FunctionProvider = ({ children }) => {
//   // Define multiple shared functions
//   const sharedFunctionA = (message) => {
//     alert(`Function A says: ${message}`);
//   };

//   const getSrcByName = (name) => {
//     const song = Mapper.songs.find((song) => song.name === name);
//     return song ? song.src : "Not found";
//   };

//   const play = (name) => {
//     console.log("before playing");

//     var audio = new Audio(getSrcByName(name));
    
//     console.log("after fetching");
//     audio.play();
// }

//   // Group functions into a single object
//   const functions = {
//     sharedFunctionA,
//     getSrcByName,
//     play,
//   };

//   return (
//     <FunctionContext.Provider value={functions}>
//       {children}
//     </FunctionContext.Provider>
//   );
// };

// export default FunctionProvider;