import graphic from '../resources/jeopardy-graphic.jpg';
import './styles/Splash.css';
import { Link } from 'react-router-dom';

export const Splash = () => {
  return (
    <div className="app-splash">
      <img src={graphic} className="app-logo"></img>
      <div className="start-button-container">
        <Link to="/seasons">
          <button className="start-button">START GAME</button>
        </Link>
      </div>
      <div className="footer">
        <p>
          Created by&nbsp;
          <a href="https://github.com/burnsnoss">Casey Burns</a> 
          &nbsp;using clues from the&nbsp;
          <a href="https://j-archive.com">J-Archive</a>. 
          Intended for personal use only.
        </p>
      </div>
    </div>
  );
}