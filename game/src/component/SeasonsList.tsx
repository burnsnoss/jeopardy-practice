import { FC } from "react";
import { SeasonsListDOM } from "../model/Season.model";

export const SeasonsList: FC<SeasonsListDOM> = ({seasons}) => {

  console.log(seasons)
  
  return (
    <div>
      <p>{seasons[0].seasonName}</p>
    </div>
  );
}