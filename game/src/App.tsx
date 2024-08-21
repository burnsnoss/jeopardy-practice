import axios from 'axios';
import './App.css';
import graphic from './resources/jeopardy-graphic.jpg';


function App() {
  
  // const apiCall = () => {
  //   axios.get('http://localhost:5000/seasons').then((response) => {
  //     console.log(response)
  //   }).catch((error) => {
  //     console.log(error)
  //   });
  // }

  return (
    <div className="app">
      <header className="app-header">
        {/* <button onClick={apiCall}>Make API Call</button> */}
        <img src={graphic} className="app-logo"></img>
        <button className="start-button">START GAME</button>
      </header>
    </div>
  );
}

export default App;
