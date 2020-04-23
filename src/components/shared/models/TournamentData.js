/**
 * TournamentData model
 */
class TournamentData {
    constructor(data = {}) {
        this.tournamentId = null;
        this.tournamentName = null;
        this.tournamentState = null;
        this.startTime = null;
        this.gameDuration = null;
        this.breakDuration = null;
        this.tournamentCode = null;
        this.amountOfPlayer = null;
        this.numberOfTables = null;
        this.bracket = null;
        this.leaderboard = null;
        this.activePlayers = null;
        Object.assign(this, data);
    }
}
export default TournamentData;