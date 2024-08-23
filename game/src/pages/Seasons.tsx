import axios from 'axios';
import { SeasonsListDOM } from '../model/Season.model';
import { useState, useEffect, useCallback } from 'react';
import { SeasonsList } from '../component/SeasonsList';
import { config } from '../config';
import { useLocation } from 'react-router-dom';

export const Seasons = () => {

  // let seasons = useLocation();

  return (
    <div>
      {/* <ol>
        {seasons.map((season) => {
          return (<li key={season.seasonId}>{season.seasonName}</li>);}
        )}
      </ol> */}
      <SeasonsList /> 
    </div>
  );
}