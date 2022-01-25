import React, { useEffect, useState } from "react";
import AppbarView from "../views/appbarView";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AppbarPresenter(props) {

  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState(props.model.connectionStatus);
  const [username, setUsername] = useState(null)
  const [cookie, setCookie, remCookie] = useCookies(["username", "password"]);


  useEffect(() => {
    props.model.addObserver(() => { setConnectionStatus(props.model.connectionStatus) })
    props.model.addObserver(() => { setUsername(props.model.username) })
    props.model.addObserver(() => {
      if (!props.model.cookie) { props.model.assignCookies(cookie, setCookie, remCookie); }
      if (cookie.username && cookie.password) { props.model.connection.emit("credentials", cookie.username, cookie.password); }
    })

    return () => {
      props.model.removeObserver(() => { setConnectionStatus(props.model.connectionStatus) })
      props.model.removeObserver(() => { setUsername(props.model.username) })
      props.model.removeObserver(() => {
        if (!props.model.cookie) { props.model.assignCookies(cookie, setCookie, remCookie); }
        if (cookie.username && cookie.password) { props.model.connection.emit("credentials", cookie.username, cookie.password); }
      })
    }
  }, [props.model, cookie, setCookie, remCookie])

  async function logout() {

    props.model.remAuth();

    setTimeout(function () {
      props.model.connection.emit("logout");
      navigate("/project-kebab/")
    }, 200);

  }

  return <AppbarView
    navigate={navigate}
    connectionStatus={connectionStatus}
    username={username}
    logout={logout}
  />

}

export default AppbarPresenter;