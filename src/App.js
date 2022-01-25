import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client";

import "./styles/styles.css"
import Model from "./models/model";
import Index from './presenters/indexPresenter';
import KebabStorage from './presenters/kebabStoragePresenter';
import Login from './presenters/loginPresenter';
import Appbar from "./presenters/appbarPresenter";

const model = new Model();

if (window.location.href.includes("localhost"))
  model.setConnection(io(process.env.REACT_APP_SERVERIP));
else
  model.setConnection(io("kebabdatabase.servebeer.com"));

model.connection.on("connect", () => { model.setConnectionStatus("green") })
model.connection.on("disconnect", () => { model.setConnectionStatus("red") })

//npm run deploy  -- deploy to github pages
//npm start

//window.navigator.userAgentData.platform
//Windows
//Android

function App() {

  return (

    <div>

      <Appbar model={model} />

      <Routes>

        <Route path="/" element={
          <Index model={model} />
        } />

        <Route path="/project-kebab/" element={
          <Index model={model} />
        } />

        <Route path="/project-kebab/login/" element={
          <Login model={model} />
        } />

        <Route path="/project-kebab/kebabstorage/" element={
          <KebabStorage model={model} />
        } />

        <Route path="*" element={
          <div>Not Found</div>
        } />

      </Routes>

    </div>

  );

}

export default App;
