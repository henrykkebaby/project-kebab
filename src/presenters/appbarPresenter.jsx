import React, { useEffect, useState } from "react";
import AppbarView from "../views/appbarView";
import { useNavigate } from "react-router-dom";

function AppbarPresenter(props) {

  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState(props.model.connectionStatus);

  useEffect(() => {
    props.model.addObserver(() => { setConnectionStatus(props.model.connectionStatus) })

    return () => {
      props.model.removeObserver(() => { setConnectionStatus(props.model.connectionStatus) })
    }
  }, [])

  function logout() {
    props.model.connection.emit("logout");
    props.model.setAuth("", "");

    props.model.setCookie("username", "")
    props.model.setCookie("password", "")

    navigate("/project-kebab/")
  }

  return <AppbarView
    navigate={navigate}
    connectionStatus={connectionStatus}
    model={props.model}
    logout={logout}
  />

}

export default AppbarPresenter;