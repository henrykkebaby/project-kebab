class Model {

    constructor(observers = [], connection = null, connectionStatus = "red", username = null) {
        this.observers = observers;
        this.connection = connection;
        this.connectionStatus = connectionStatus;
        this.username = username;
    }

    assignCookies(cookie, setCookie, remCookie) {
        this.cookie = cookie
        this.setCookie = setCookie
        this.remCookie = remCookie

        if (cookie.username) { this.username = cookie.username }

        this.notifyObservers();
    }

    setAuth(username, password) {
        this.setCookie("username", username, { path: "/" });
        this.setCookie("password", password, { path: "/" });
        this.username = username

        this.notifyObservers();
    }

    remAuth() {
        this.remCookie("username", { path: '/' })
        this.remCookie("password", { path: '/' })
        this.username = null

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