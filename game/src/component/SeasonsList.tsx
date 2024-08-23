import { FC } from "react";
import { SeasonsListDOM } from "../model/Season.model";

export const SeasonsList: FC<SeasonsListDOM> = (props) => {
  
  return (
    <div>
      {props.seasons[0].seasonName}
    </div>
  );
}