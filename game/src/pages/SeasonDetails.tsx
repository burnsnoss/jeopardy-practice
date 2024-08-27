import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { EpisodeMetadata, SeasonDOM } from "../model/Season.model";
import { config } from '../config';
import { EpisodesList } from '../component/EpisodesList';
import '../styles/SeasonDetails.css';

export const SeasonDetails = () => {
  const { seasonId } = useParams();

  const [seasonData, setSeasonData] = useState({episodes: [] as EpisodeMetadata[], name: ''} as SeasonDOM);

  useEffect(() => {
    async function getSeason() { 
      try {
        const data = (await axios.get(`${config.serverUrl}/seasons/${seasonId}`)).data;
        setSeasonData({
          episodes: data.episodes, // TODO: ternaries for this to check if exists?
          name: data.name
        });
      }
      catch (error) {
        throw new Error('Failed to retrieve seasons: ' + error);
      }
    }

    if (seasonData.episodes.length === 0) {
      getSeason();
    }
  }, []);

  // then pass to child component or something

  return (
    <div className="season-details-container">
      <p className="season-list-title">{seasonData.name}</p>
      <p className="select-episode-text">Select Episode</p>
      <EpisodesList episodes={seasonData.episodes} />
    </div>
  );
}