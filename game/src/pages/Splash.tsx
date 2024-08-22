import graphic from '../resources/jeopardy-graphic.jpg';
import './css/Splash.css';

export const Splash = () => {
  return (
    <div className="app-splash">
      <img src={graphic} className="app-logo"></img>
      <button className="start-button">START GAME</button>
    </div>
  );
}