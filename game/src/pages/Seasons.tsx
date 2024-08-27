import axios from 'axios';
import { SeasonsListDOM, SeasonMetadata } from '../model/Season.model';
import { useState, useEffect } from 'react';
import { SeasonsList } from '../component/SeasonsList';
import { config } from '../config';
import '../styles/Seasons.css';

export const Seasons = () => {

  const [seasonsData, setSeasonsData] = useState({seasons: [] as SeasonMetadata[]} as SeasonsListDOM);

  useEffect(() => {
    async function getSeasons() { 
      try {
        const seasons = (await axios.get(`${config.serverUrl}/seasons`)).data.seasons;
        setSeasonsData({ seasons: seasons });
      } 
      catch (error) {
        throw new Error('Failed to retrieve seasons: ' + error);
      }
    }

    if (seasonsData.seasons.length === 0) {
      getSeasons();
    }
  }, []);

  return (
    <div className="seasons-container">
      <p className="seasons-page-title">Select Season</p>
      <SeasonsList seasons={seasonsData.seasons} /> 
    </div>
  );
}