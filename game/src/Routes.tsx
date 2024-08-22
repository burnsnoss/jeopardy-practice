import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { Splash } from './pages/Splash';
import { Seasons } from './pages/Seasons';
import { SeasonDetails } from './pages/SeasonDetails';
import { Game } from './pages/Game';
import { NotFound } from './pages/NotFound';


export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route 
          path="/"
          element={<Splash />}
        />
        <Route 
          path="/seasons" 
          element={<Seasons />}
        />
        <Route 
          path="/season/:seasonId"
          element={<SeasonDetails />}
        />
        <Route 
          path="/game/:gameId"
          element={<Game />}
        />
        <Route
          element={<NotFound />}
        />
      </Switch>
    </Router>
  );
}