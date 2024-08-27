import { useParams } from "react-router-dom";

export const SeasonDetails = () => {
  const { seasonId } = useParams();

  // do the fetch 

  // then pass to child component or something

  return (
    <div>
      <h1>Season Details</h1>
    </div>
  );
}