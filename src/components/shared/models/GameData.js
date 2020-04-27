/**
 * Game model
 */
class GameData {
    constructor(data = {}) {
        this.participant1 = null;
        this.participant2 = null;
        this.score1 = null;
        this.score2 = null;
        this.gameId = null;
        this.gameState = null;
        this.startTime = null;
        this.tournamentCode = null;
        Object.assign(this, data);
    }
}
export default GameData;