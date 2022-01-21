import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";

import Model from "./models/model";
import Index from './presenters/indexPresenter';
import KebabStorage from './presenters/kebabStoragePresenter';
import Login from './presenters/loginPresenter';
import Appbar from "./presenters/appbarPresenter";
import Contextmenu from './components/contextmenu';

const model = new Model();
//model.setConnection(io(process.env.REACT_APP_SERVERIP));
model.setConnection(io("http://localhost:3024"));
model.connection.on("connect", () => { model.setConnectionStatus("green") })
model.connection.on("disconnect", () => { model.setConnectionStatus("red") })

//npm run deploy  -- deploy to github pages
//npm start

function App() {

  const [cookies, setCookie] = useCookies(["username", "password"]);
  model.assignCookie(setCookie)
  if (cookies.username !== "" || cookies.password !== "") {
    model.setAuth(cookies.username, cookies.password);
    model.connection.emit("credentials", cookies.username, cookies.password);
  }

  const navigate = useNavigate()
  useEffect(() => {
    navigate("/project-kebab/")
  }, [])

  /*


  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setPosX(event.pageX)
    setPosY(event.pageY)
    console.log('Right Click at X:', event.pageX, "Y:", event.pageY);
  };
  React.useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
  */

  return (

    <Routes>

      <Route path="/" element={
        <div>
          <Appbar model={model} />
          <Index model={model} />
        </div>
      } />

      <Route path="/project-kebab/" element={
        <div>
          <Appbar model={model} />
          <Index model={model} />
        </div>
      } />

      <Route path="/project-kebab/login/" element={
        <div>
          <Appbar model={model} />
          <Login model={model} />
        </div>
      } />

      <Route path="/project-kebab/kebabstorage/" element={
        <div>
          <Appbar model={model} />
          <KebabStorage model={model} />
        </div>
      } />

      <Route path="*" element={
        <div>
          <text>Not Found</text>
        </div>
      } />

    </Routes>

  );

}

export default App;
