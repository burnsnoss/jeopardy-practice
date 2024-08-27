import { Link } from 'react-router-dom';
import { EpisodesListDOM } from '../model/Season.model'
import '../styles/EpisodesList.css';

export const EpisodesList = ({episodes}: EpisodesListDOM) => {

  const episodeListComponents = episodes.map((episode) => {
    const airDate = new Date(episode.airDate);
    return (
      <Link to={`/game/${episode.id}`}>
        <div className="episode-data-container">
          <p className="episode-title"># {episode.number}</p>
          <p className="contestants">{episode.contestants}</p>
          <p className="air-date">{airDate.getMonth() + 1}/{airDate.getDate()}/{airDate.getFullYear()}</p>
          <p className="note">{episode.note}</p>
        </div>
      </Link>
    );
  });

  return (
  <div className="episodes-list-container">
    {episodeListComponents.map((episode) => episode)}
  </div>);
}