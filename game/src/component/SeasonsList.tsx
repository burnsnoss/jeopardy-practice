import { useState, useEffect } from "react";
import axios from 'axios';
import { SeasonsListDOM, SeasonMetadata } from "../model/Season.model";
import {config} from '../config';

export const SeasonsList = () => {
  const [seasonsData, setSeasonsData] = useState({seasons: [] as SeasonMetadata[]});

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
    <div>
      <ol>
        {seasonsData.seasons.map((season) => {
          return (<li key={season.seasonId}>{season.seasonName}</li>);}
        )}
      </ol>
    </div>
  );
}