import axios from 'axios';
import { Routes } from './Routes';
// import './App.css';


function App() {
  
  // const apiCall = () => {
  //   axios.get('http://localhost:5000/seasons').then((response) => {
  //     console.log(response)
  //   }).catch((error) => {
  //     console.log(error)
  //   });
  // }

  return (
    // <div className="app">
    //   <header className="app-header">
    //     {/* <button onClick={apiCall}>Make API Call</button> */}
        
    //   </header>
    // </div>
   <Routes />
  );
}

export default App;
