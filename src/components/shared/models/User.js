/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.participantID = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.licenseNumber = null;
    this.status = null;
    Object.assign(this, data);
  }
}
export default User;
