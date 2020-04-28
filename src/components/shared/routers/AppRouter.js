import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { TournamentGuard } from "../routeProtectors/TournamentGuard";
import TournamentRouter from "./TournamentRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import HomeScreen from "../../homescreen/HomeScreen";
import Registration from "../../register/Registration";
import TournamentCode from "../../tournamentCode/TournamentCode";
import { TournamentCodeGuard } from "../routeProtectors/TournamentCodeGuard";
import Tournament from "../../tournament/Tournament";
import LeaderBoard from "../../leaderboard/LeaderBoard";
import Bracket from "../../bracket/Bracket";
import PlayerProfile from "../../playerProfile/PlayerProfile";
import CreateTournament from "../../tournament/CreateTournament";
import { BracketGuard } from "../routeProtectors/BracketGuard";
import { LeaderBoardGuard } from "../routeProtectors/LeaderBoardGuard";
import { CreateTournamentGuard } from "../routeProtectors/CreateTournamentGuard";
import { RegistrationGuard } from "../routeProtectors/RegistrationGuard";
import PlayerList from "../../playerProfile/PlayerList";
import TournamentInfo from "../../tournament/TournamentInfo";
import ManagerMenu from "../../managerMenu/ManagerMenu";
import ParticipantMenu from "../../participantMenu/ParticipantMenu";
import ScoreReport from "../../bracket/ScoreReport";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/tournament".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /tournament renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route path="/home" render={() => <HomeScreen />} />
            <Route
              path="/createTournament"
              render={() => (
                <CreateTournamentGuard>
                  <CreateTournament />
                </CreateTournamentGuard>
              )}
            />
            <Route
              path="/tournament"
              render={() => (
                <TournamentGuard>
                  <TournamentRouter base={"/tournament"} />
                </TournamentGuard>
              )}
            />
            <Route
              path="/register"
              render={() => (
                <RegistrationGuard>
                  <Registration />
                </RegistrationGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
              path="/managerMenu/:managerID"
              render={() => <ManagerMenu />}
            />
            <Route path="/" exact render={() => <Redirect to={"/home"} />} />
            <Route path="/tournamentCode" render={() => <TournamentCode />} />
            <Route
              path="/tournaments/:tournamentCode"
              render={() => <Tournament />}
            />
            <Route
              path="/:tournamentCode/leaderBoard"
              render={() => (
                <LeaderBoardGuard>
                  <LeaderBoard />
                </LeaderBoardGuard>
              )}
            />
            <Route
              path="/:tournamentCode/bracket"
              render={() => (
                <BracketGuard>
                  <Bracket />
                </BracketGuard>
              )}
            />
            <Route
              path="/:tournamentCode/participants/:playerID"
              render={() => <PlayerProfile />}
            />

            <Route
              path="/:tournamentCode/playerList"
              render={() => <PlayerList />}
            />

            <Route
              path="/:tournamentCode/tournamentInfo"
              render={() => <TournamentInfo />}
            />
            <Route
              path="/:tournamentCode/participantMenu"
              render={() => <ParticipantMenu />}
            />
            <Route 
              path="/:tournamentCode/:matchID"
              render={() => <ScoreReport />}
            />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
 * Don't forget to export your component!
 */
export default AppRouter;
