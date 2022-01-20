import { Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client"

import Model from "./models/model";
import Index from './presenters/indexPresenter';
import KebabStorage from './presenters/kebabStoragePresenter';
import Appbar from "./presenters/appbarPresenter";

const model = new Model();
model.setConnection(io(process.env.REACT_APP_SERVERIP));
//model.setConnection(io("http://localhost:3024"));
model.connection.on("connect", () => { model.setConnectionStatus("green") })
model.connection.on("disconnect", () => { model.setConnectionStatus("red") })

//npm run deploy  -- deploy to github pages
//npm start


function App() {

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

      <Route path="/kebabstorage/" element={
        <div>
          <Appbar model={model} />
          <KebabStorage model={model} />
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
