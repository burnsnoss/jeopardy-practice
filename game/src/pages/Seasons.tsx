import axios from 'axios';
import { SeasonsListDOM } from '../model/Season.model';
import { useState, useEffect, useCallback } from 'react';
import { SeasonsList } from '../component/SeasonsList';

export const Seasons = () => {

  const [seasonsData, setSeasonsData] = useState({} as SeasonsListDOM);

  const getSeasons = useCallback(async () => {
    const data = await axios.get('http://localhost:5000/seasons').then((response) => {
      console.log(response);
      return response.data;
    }).catch((error) => {
      console.log(error);
      throw new Error('Failed to retrieve seasons');
    });
    console.log('testsets' + data);
    //setSeasonsData(data);
    return data;
  }, []);

  useEffect(() => {
    getSeasons();
  }, [getSeasons]);

  return (
    <div>
      <SeasonsList seasons={seasonsData.seasons} />
    </div>
  );
}