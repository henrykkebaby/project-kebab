class Model {

    constructor(observers = [], connection = null, connectionStatus = "red") {
        this.observers = observers;
        this.connection = connection;
        this.connectionStatus = connectionStatus;
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