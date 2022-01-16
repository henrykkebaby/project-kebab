import React, { useEffect, useState } from "react";
import AppbarView from "../views/appbarView";
import { useNavigate } from "react-router-dom";

function AppbarPresenter(props) {

  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState(props.model.connectionStatus);

  useEffect(() => {
    props.model.addObserver(() => { setConnectionStatus(props.model.connectionStatus) })
  }, [])

  return <AppbarView
    navigate={navigate}
    connectionStatus={connectionStatus}
  />

}

export default AppbarPresenter;