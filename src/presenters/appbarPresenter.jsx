import React, { useEffect, useState } from "react";
import AppbarView from "../views/appbarView";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AppbarPresenter(props) {

  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState(props.model.connectionStatus);
  const [cookies, setCookie] = useCookies(["username", "password"]);

  useEffect(() => {
    props.model.addObserver(() => { setConnectionStatus(props.model.connectionStatus) })
  }, [])

  function logout() {
    props.model.connection.emit("logout");
    props.model.setAuth("", "");
    setCookie("username", "", {
      path: "/"
    });
    setCookie("password", "", {
      path: "/"
    });
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