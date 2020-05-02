import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { TournamentGuard } from "../routeProtectors/TournamentGuard";
import TournamentRouter from "./TournamentRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import HomeScreen from "../../homescreen/HomeScreen";
import Registration from "../../register/Registration";
import TournamentCode from "../../tournamentCode/TournamentCode";
import Tournament from "../../tournament/Tournament";
import LeaderBoard from "../../leaderboard/LeaderBoard";
import Bracket from "../../bracket/Bracket";
import PlayerProfile from "../../playerProfile/PlayerProfile";
import CreateTournament from "../../tournament/CreateTournament";
import { BracketGuard } from "../routeProtectors/BracketGuard";
import { LeaderBoardGuard } from "../routeProtectors/LeaderBoardGuard";
import { CreateTournamentGuard } from "../routeProtectors/CreateTournamentGuard";
import PlayerList from "../../playerProfile/PlayerList";
import TournamentInfo from "../../tournament/TournamentInfo";
import ManagerMenu from "../../managerMenu/ManagerMenu";
import ParticipantMenu from "../../participantMenu/ParticipantMenu";
import {ManagerMenuGuard} from "../routeProtectors/ManagerMenuGuard";
import {TournamentCodeGuard} from "../routeProtectors/TournamentCodeGuard";
import {PlayerProfileGuard} from "../routeProtectors/PlayerProfileGuard";
import {PlayerListGuard} from "../routeProtectors/PlayerListGuard";
import {TournamentInfoGuard} from "../routeProtectors/TournamentInfoGuard";
import {ParticipantMenuGuard} from "../routeProtectors/ParticipantMenuGuard";

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
              render={() => (<Registration />)}
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
              path="/manager/menu/:managerID"
              render={() => (
                <ManagerMenuGuard>
                  <ManagerMenu />
                </ManagerMenuGuard>
              )}
            />
            <Route
              path="/manager/createTournament/:managerID"
              render={() =>(
                <CreateTournamentGuard>
                  <CreateTournament/>
                </CreateTournamentGuard>
              )}
                />
            <Route path="/" exact render={() => <Redirect to={"/home"} />} />

            <Route path="/tournamentCode" render={() => (
                <TournamentCodeGuard>
                  <TournamentCode />
                </TournamentCodeGuard>
            )} />
            <Route
              path="/tournaments/:tournamentCode"
              render={() => (
                <TournamentGuard>
                  <Tournament />
                </TournamentGuard>
              )}
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
              path="/:tournamentCode/participants/:participantID"
              render={() => (
                <PlayerProfileGuard>
                  <PlayerProfile />
                </PlayerProfileGuard>
              )}
            />

            <Route
              path="/:tournamentCode/playerList"
              render={() => (
                <PlayerListGuard>
                  <PlayerList />
                </PlayerListGuard>
              )}
            />

            <Route
              path="/:tournamentCode/tournamentInfo"
              render={() => (
                <TournamentInfoGuard>
                  <TournamentInfo />
                </TournamentInfoGuard>
              )}
            />
            <Route
              path="/:tournamentCode/participantMenu"
              render={() => (
                <ParticipantMenuGuard>
                  <ParticipantMenu />
                </ParticipantMenuGuard>
              )}
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
