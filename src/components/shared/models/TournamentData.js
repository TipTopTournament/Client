/**
 * TournamentData model
 */
class TournamentData {
    constructor(data = {}) {
        this.tournamentId = null;
        this.tournamentName = null;
        this.tournamentCode = null;
        this.startTime = null;
        this.gameDuration = null;
        this.breakDuration = null;
        this.tournamentCode = null;
        this.amountOfPlayers = null;
        this.tournamentMode = null;
        this.numberOfTables = null;
        Object.assign(this, data);
    }
}
export default TournamentData;