import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { TournamentGuard } from "../routeProtectors/TournamentGuard";
import TournamentRouter from "./TournamentRouter";
import { ParticipantLoginGuard } from "../routeProtectors/ParticipantLoginGuard";
import ParticipantLogin from "../../login/ParticipantLogin";
import HomeScreen from "../../homescreen/HomeScreen";
import Registration from "../../register/Registration";
import TournamentCode from "../../tournament/TournamentCode";
import Tournament from "../../tournament/Tournament";
import LeaderBoard from "../../tournament/leaderboard/LeaderBoard";
import Bracket from "../../tournament/bracket/Bracket";
import PlayerProfile from "../../playerProfile/PlayerProfile";
import CreateTournament from "../../tournament/CreateTournament";
import { BracketGuard } from "../routeProtectors/BracketGuard";
import { LeaderBoardGuard } from "../routeProtectors/LeaderBoardGuard";
import { CreateTournamentGuard } from "../routeProtectors/CreateTournamentGuard";
import PlayerList from "../../playerProfile/PlayerList";
import ParticipantMenu from "../../participantMenu/ParticipantMenu";
import ManagerMenu from "../../managerMenu/ManagerMenu";
import { ManagerMenuGuard } from "../routeProtectors/ManagerMenuGuard";
import { TournamentCodeGuard } from "../routeProtectors/TournamentCodeGuard";
import { PlayerProfileGuard } from "../routeProtectors/PlayerProfileGuard";
import { PlayerListGuard } from "../routeProtectors/PlayerListGuard";
import { ParticipantMenuGuard } from "../routeProtectors/ParticipantMenuGuard";
import ManagerLogin from "../../login/ManagerLogin";
import { ManagerLoginGuard } from "../routeProtectors/ManagerLoginGuard";
import Info from "../../homescreen/Info";
import ManagerNavBar from "../ManagerNavBar";
import ParticipantNavBar from "../ParticipantNavBar";
import ManagerNavBarExtended from "../ManagerNavBarExtended";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/tournament".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /tournament renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */

const ManagerViewExtended = () => {
  return (
    <>
      <ManagerNavBarExtended />
      <Switch>
        <Route
          path="/emanager/tournaments/:tournamentCode"
          render={() => (
            <TournamentGuard>
              <Tournament />
            </TournamentGuard>
          )}
        />
        <Route
          path="/emanager/:tournamentCode/participants/:participantID"
          render={() => (
            <PlayerProfileGuard>
              <PlayerProfile />
            </PlayerProfileGuard>
          )}
        />
        <Route
          path="/emanager/:tournamentCode/participants/:participantID"
          render={() => (
            <PlayerProfileGuard>
              <PlayerProfile />
            </PlayerProfileGuard>
          )}
        />
        <Route
          path="/emanager/:tournamentCode/leaderBoard"
          render={() => (
            <LeaderBoardGuard>
              <LeaderBoard />
            </LeaderBoardGuard>
          )}
        />
        <Route
          path="/emanager/:tournamentCode/playerList"
          render={() => (
            <PlayerListGuard>
              <PlayerList />
            </PlayerListGuard>
          )}
        />
        <Route
          path="/emanager/:tournamentCode/bracket"
          render={() => (
            <BracketGuard>
              <Bracket />
            </BracketGuard>
          )}
        />
      </Switch>
    </>
  );
};

const ManagerView = () => {
  return (
    <>
      <ManagerNavBar />
      <Switch>
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
          render={() => (
            <CreateTournamentGuard>
              <CreateTournament />
            </CreateTournamentGuard>
          )}
        />
      </Switch>
    </>
  );
};

const ParticipantView = () => {
  return (
    <>
      <ParticipantNavBar />
      <Switch>
        <Route
          path="/participant/:tournamentCode/participantMenu"
          render={() => (
            <ParticipantMenuGuard>
              <ParticipantMenu />
            </ParticipantMenuGuard>
          )}
        />
        <Route
          path="/participant/:tournamentCode/playerList"
          render={() => (
            <PlayerListGuard>
              <PlayerList />
            </PlayerListGuard>
          )}
        />
        <Route
          path="/participant/:tournamentCode/participants/:participantID"
          render={() => (
            <PlayerProfileGuard>
              <PlayerProfile />
            </PlayerProfileGuard>
          )}
        />
        <Route
          path="/participant/:tournamentCode/leaderBoard"
          render={() => (
            <LeaderBoardGuard>
              <LeaderBoard />
            </LeaderBoardGuard>
          )}
        />
        <Route
          path="/participant/:tournamentCode/bracket"
          render={() => (
            <BracketGuard>
              <Bracket />
            </BracketGuard>
          )}
        />
      </Switch>
    </>
  );
};

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" render={() => <HomeScreen />} />
          <Route path="/info" render={() => <Info />} />

          <Route
            path="/tournament"
            render={() => (
              <TournamentGuard>
                <TournamentRouter base={"/tournament"} />
              </TournamentGuard>
            )}
          />
          <Route path="/register" render={() => <Registration />} />
          <Route
            path="/login/participant"
            exact
            render={() => (
              <ParticipantLoginGuard>
                <ParticipantLogin />
              </ParticipantLoginGuard>
            )}
          />
          <Route
            path="/login/manager"
            exact
            render={() => (
              <ManagerLoginGuard>
                <ManagerLogin />
              </ManagerLoginGuard>
            )}
          />

          <Route path="/manager" component={ManagerView} />

          <Route path="/emanager" component={ManagerViewExtended} />

          <Route path="/participant" component={ParticipantView} />

          <Route path="/" exact render={() => <Redirect to={"/home"} />} />

          <Route
            path="/tournamentCode"
            render={() => (
              <TournamentCodeGuard>
                <TournamentCode />
              </TournamentCodeGuard>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
 * Don't forget to export your component!
 */
export default AppRouter;
