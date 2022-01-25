import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import KebabStorageListView from '../views/kebabStorageViews/kebabStorageListView'
import KebabStorageMenuView from '../views/kebabStorageViews/kebabStorageMenuView'
import KebabStorageMenuMobileView from '../views/kebabStorageViews/kebabStorageMenuMobileView'

import mime from 'mime'

function KebabStoragePresenter(props) {

  const navigate = useNavigate();

  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isListLoading, setIsListLoading] = useState(true)
  const [path, setPath] = useState("/")
  const [selectedFile, setSelectedFile] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState(props.model.connectionStatus);
  const [isMobile, setIsMobile] = useState(window.navigator.userAgentData.platform === "Android");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const [longPress, setLongPress] = useState(false);
  const longPressRef = useRef(longPress);
  longPressRef.current = longPress;

  function handleDrag(e) {
    e.preventDefault()
  }
  function handleDrop(e) {
    if (!e.dataTransfer.files) { return; }
    fileUpload(e.dataTransfer.files)
    e.preventDefault();
  }

  useEffect(() => {

    window.addEventListener("dragover", handleDrag)
    window.addEventListener("drop", handleDrop)
    return () => {
      window.removeEventListener("dragover", handleDrag)
      window.removeEventListener("drop", handleDrop)
    }
  }, [path, handleDrop])

  useEffect(() => {
    if (connectionStatus === "red") {
      setIsLoading(false)
      setIsListLoading(false)
      alert("Connection to server lost...")
      navigate("/project-kebab/")
    }
  }, [connectionStatus])

  useEffect(() => {
    props.model.addObserver(() => { setConnectionStatus(props.model.connectionStatus) })

    return () => {
      props.model.removeObserver(() => { setConnectionStatus(props.model.connectionStatus) })
    }
  }, [props.model])

  useEffect(() => {

    if (props.model.username === null) { navigate("/project-kebab/login/"); return; }

    props.model.connection.on("gotDir", (value) => {
      setIsListLoading(false);
      setIsLoading(false);
      if (!value) { return }
      if (value === null) { return }
      var folderList = []
      var fileList = []
      value.forEach(element => {
        if (element.includes(".")) { fileList.push(element) }
        else { folderList.push(element) }
      });
      setList(folderList.concat(fileList))
    })

    props.model.connection.on("gotDirError", () => {
      setIsListLoading(false);
      setIsLoading(false);
      setSelectedFile(null)
      setList([])
      setPath("/")
      alert("ERROR: Directory Error\n\npress OK to auto-fix")
      getDir("/")
    })

    props.model.connection.on("gotFile", (value, name) => {
      var dataURL = mime.getType(name)
      const linkSource = `data:${dataURL};base64,${value}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = name;
      downloadLink.click();
      setIsListLoading(false);
      setIsLoading(false);
    })

    props.model.connection.on("gotFileOpen", (value, name) => {
      var dataURL = mime.getType(name)
      const linkSource = `data:${dataURL};base64,${value}`;

      fetch(linkSource)
        .then(response => response.blob())
        .then(data => {
          var fileURL = URL.createObjectURL(data);
          window.open(fileURL);
          setIsListLoading(false);
          setIsLoading(false);
        })
    })

    getDir("/")

    return () => {
      props.model.connection.off('gotFiles');
      props.model.connection.off('gotFile');
      props.model.connection.off('gotFileOpen');
      props.model.connection.off('gotDirError');
    }
  }, [])

  function getDir(path) {
    setIsListLoading(true)
    props.model.connection.emit("getDir", path);
  }

  function getFile(file) {
    if (!file.includes(".")) { return; }
    setIsLoading(true)
    props.model.connection.emit("getFile", (path + file));
  }

  function openFile(file) {
    if (file.includes(".")) {
      setIsLoading(true);
      props.model.connection.emit("getFileOpen", (path + file));
    }
    else { setSelectedFile(null); addPath(file); }
  }

  function remFile(file) {
    if (file.includes(".")) {
      var answer = window.confirm(`Delete the file "${file}"?`);
      if (answer) { props.model.connection.emit("remFile", (path + file), path); setSelectedFile(null); }
    }
    else {
      remFolder(file)
    }
  }

  function remFolder(folder) {
    var answer = window.confirm(`Delete the folder "${folder}"?`);
    if (answer) { props.model.connection.emit("removeFolder", path, folder); setSelectedFile(null); }
  }

  function createFolder() {
    var element = document.getElementById("folderInput")
    if (element.value === null && element.value === "") return
    props.model.connection.emit("createFolder", path, element.value);
    element.value = null
  }

  function createFolderMobile() {
    var element = document.getElementById("folderInputMobile")
    if (element.value === null && element.value === "") return
    props.model.connection.emit("createFolder", path, element.value);
    element.value = null
  }

  function addPath(add) {
    getDir(path + add + "/")
    setPath(path + add + "/")
  }

  function subPath() {

    if (path === "/") { return }

    var newPath = path
    newPath = newPath.substring(0, newPath.length - 1);

    while (newPath.slice(-1) !== "/") {
      newPath = newPath.substring(0, newPath.length - 1);
      if (newPath.length <= 1) { newPath = "/"; break; }
    }

    getDir(newPath)
    setPath(newPath)
  }

  function fileUpload(uploadFile) {
    setIsLoading(true)
    if (uploadFile == null) { return; }
    [...uploadFile].forEach(file => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        props.model.connection.emit("uploadFile", baseURL, path + file.name, path);
        document.getElementById("fileUploader").value = null;
      }
    })
  }

  function handleClick(item, e) {

    setIsListLoading(false);
    setIsLoading(false);

    if (e.nativeEvent.pointerType === "touch") {
      if (item.includes(".")) { openFile(item) }
      else { setSelectedFile(null); addPath(item); }
      return;
    }
    if (item.includes(".")) { setSelectedFile(item) }
    else { setSelectedFile(item) }

  }

  function handleDoubleClick(item, e) {

    setIsListLoading(false);
    setIsLoading(false);

    if (e.nativeEvent.pointerType === "touch") { return; }
    if (item.includes(".")) { openFile(item) }
    else { setSelectedFile(null); addPath(item); }
  }

  function handleTouchStart(item) {
    console.log("start")
    setLongPress(true)
    setTimeout(() => {
      if (longPressRef.current) { getFile(item) }
    }, 500);
  }

  function handleTouchEnd(e) {
    console.log("end")
    setLongPress(false)
  }

  function handleTouchMove() {
    console.log("drag")
    setLongPress(false)
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: "0px", top: "1.5cm", left: "0px", right: "0px" }}>

      {isMobile && isCreatingFolder &&
        <div style={{ position: "fixed", width: "100%", left: "50%", ight: "60px", bottom: "1.5cm", transform: "translate(-50%, 0)", display: "flex" }}>
          <input id="folderInputMobile" type="text" autoComplete="off" style={{ height: "60px", flex: "6", fontSize: "0.5cm" }} placeholder="Create a folder here..." onKeyPress={event => { if (event.key === 'Enter') { createFolderMobile(); setIsCreatingFolder(false); } }} />
          <button style={{ flex: 1, backgroundColor: "red", fontSize: "0.8cm" }} onClick={() => setIsCreatingFolder(false)}>X</button>
        </div>
      }

      {isMobile &&

        <KebabStorageMenuMobileView
          fileUpload={fileUpload}
          isLoading={isLoading}
          isListLoading={isListLoading}
          getDir={getDir}
          path={path}
          setIsCreatingFolder={setIsCreatingFolder}
        />
      }

      <KebabStorageListView
        isMobile={isMobile}
        isListLoading={isListLoading}
        path={path} list={list}
        subPath={subPath}
        setSelectedFile={setSelectedFile}
        handleClick={handleClick}
        handleDoubleClick={handleDoubleClick}
        remFile={remFile}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
        handleTouchMove={handleTouchMove}
      />

      {!isMobile &&
        <KebabStorageMenuView
          path={path}
          getFile={getFile}
          openFile={openFile}
          remFile={remFile}
          createFolder={createFolder}
          fileUpload={fileUpload}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          isLoading={isLoading}
        />
      }

    </div>
  );
}

export default KebabStoragePresenter;