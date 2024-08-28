import { Link } from 'react-router-dom';
import { SeasonsListProps } from '../model/Season.model';
import '../styles/SeasonsList.css';

export const SeasonsList = ({seasons}: SeasonsListProps) => {

  const seasonListComponents = seasons.map((season) => {
    const startDate = new Date(season.startDate);
    const endDate = new Date(season.endDate);
    return (
      <Link to={`/season/${season.seasonId}`}>
        <div className="season-data-container">
          <p className="season-title">{season.seasonName}</p>
          <p className="date-range">
            {startDate.getMonth() + 1}/{startDate.getDate()}/{startDate.getFullYear()}
            &nbsp;-&nbsp;
            {endDate.getMonth() + 1}/{endDate.getDate()}/{endDate.getFullYear()}</p>
          <p className="episode-count">{season.episodeCount} episodes</p>
        </div>
      </Link>
    );
  });

  
  return (
    <div className="seasons-list-container">
        {seasonListComponents.map((season) => season)}
    </div>
  );
}