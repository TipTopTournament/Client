/**
 * LeaderBoardUser model
 */
class LeaderBoardUser {
    constructor(data = {}) {
        this.vorname = null;
        this.nachname = null;
        this.licenseNumber = null;
        this.status = null;
        this.stats = null;
        this.wins = null;
        this.elo = null;
        this.ParticipantId = null;
        Object.assign(this, data);
    }
}
export default LeaderBoardUser;
