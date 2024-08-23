import axios from 'axios';
import { SeasonsListDOM } from '../model/Season.model';
import { useState, useEffect } from 'react';
import { SeasonsList } from '../component/SeasonsList';


export const Seasons = () => {

  const getSeasons = async (): Promise<SeasonsListDOM> => {
    const data = axios.get('http://localhost:5000/seasons').then((response) => {
      console.log(response);
      return response.data;
    }).catch((error) => {
      console.log(error);
      throw new Error('Failed to retrieve seasons');
    });
    return data;
  }

  const [seasonsData, setSeasonsData] = useState(() => await getSeasons());

  return (
    <div>
      <SeasonsList seasonsData={seasonsData} />
    </div>
  );
}