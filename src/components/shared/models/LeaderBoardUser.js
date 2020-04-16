/**
 * LeaderBoardUser model
 */
class LeaderBoardUser {
    constructor(data = {}) {
        this.name = null;
        this.licenseNumber = null;
        this.status = null;
        this.stats = null;
        this.elo = null;
        Object.assign(this, data);
    }
}
export default LeaderBoardUser;
