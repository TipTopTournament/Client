/**
 * Manager model
 */
class Manager {
    constructor(data = {}) {
        this.managerID = null;
        this.name = null;
        this.username = null;
        this.token = null;
        Object.assign(this, data);
    }
}
export default Manager;