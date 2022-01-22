import React, { useEffect, useState } from "react";
import AppbarView from "../views/appbarView";
import { useNavigate } from "react-router-dom";

function AppbarPresenter(props) {

  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState(props.model.connectionStatus);
  const [username, setUsername] = useState(null)

  useEffect(() => {
    props.model.addObserver(() => { setConnectionStatus(props.model.connectionStatus) })
    props.model.addObserver(() => { setUsername(props.model.username) })

    return () => {
      props.model.removeObserver(() => { setConnectionStatus(props.model.connectionStatus) })
      props.model.removeObserver(() => { setUsername(props.model.username) })
    }
  }, [])

  function logout() {
    props.model.connection.emit("logout");
    props.model.remAuth();

    navigate("/project-kebab/")
  }

  return <AppbarView
    navigate={navigate}
    connectionStatus={connectionStatus}
    username={username}
    logout={logout}
  />

}

export default AppbarPresenter;