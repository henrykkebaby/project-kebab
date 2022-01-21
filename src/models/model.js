class Model {

    constructor(observers = [], connection = null, connectionStatus = "red", username = "", password = "") {
        this.observers = observers;
        this.connection = connection;
        this.connectionStatus = connectionStatus;
        this.username = username;
        this.password = password;
    }

    setUsername(username) {
        this.username = username;
        this.notifyObservers();
    }

    setPassword(password) {
        this.password = password;
        this.notifyObservers();
    }

    setAuth(username, password) {
        this.username = username;
        this.password = password;
        this.notifyObservers();
    }

    setConnection(newConnection) {
        this.connection = newConnection;
        this.notifyObservers();
    }

    setConnectionStatus(newStatus) {
        this.connectionStatus = newStatus;
        this.notifyObservers();
    }

    addObserver(callback) {
        this.observers.push(callback);
    }

    removeObserver(callback) {
        this.observers = this.observers.filter(ob => callback.toString() !== ob.toString());
    }

    notifyObservers() {
        this.observers.forEach(cb => cb());
    }

};

export default Model;