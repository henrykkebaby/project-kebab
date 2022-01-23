import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import KebabStorageView from '../views/kebabStorageView'
import mime from 'mime'

function KebabStoragePresenter(props) {

  const navigate = useNavigate();

  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isListLoading, setIsListLoading] = useState(true)
  const [path, setPath] = useState("/")
  const [selectedFile, setSelectedFile] = useState(null)

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

    if (props.model.username === null) { navigate("/project-kebab/login/"); return; }

    props.model.connection.on("gotDir", (value) => {
      setIsListLoading(false);
      isLoading(false);
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
      isLoading(false);
      setSelectedFile(null)
      setList([])
      setPath("/")
      alert("ERROR: Directory Error\n\npress OK to auto-fix")
      getDir("/")
    })

    props.model.connection.on("gotFile", (value, name) => {
      setIsListLoading(false);
      isLoading(false);
      var dataURL = mime.getType(name)
      const linkSource = `data:${dataURL};base64,${value}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = name;
      downloadLink.click();
    })

    props.model.connection.on("gotFileOpen", (value, name) => {
      setIsListLoading(false);
      isLoading(false);
      var dataURL = mime.getType(name)
      const linkSource = `data:${dataURL};base64,${value}`;

      fetch(linkSource)
        .then(response => response.blob())
        .then(data => {
          var fileURL = URL.createObjectURL(data);
          window.open(fileURL)
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
      props.model.connection.emit("remFile", (path + file), path);
    }
    else
      remFolder(file)
  }

  function remFolder(folder) {
    props.model.connection.emit("removeFolder", path, folder);
  }

  function createFolder() {
    var element = document.getElementById("folderInput")
    if (element.value === null) return
    if (element.value === "") return
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

  function handleClick(item) {
    if (item.includes(".")) { setSelectedFile(item) }
    else { setSelectedFile(item) }

    //element.style.backgroundColor = "rgb(130, 190, 240)"
  }

  function handleDoubleClick(item) {
    if (item.includes(".")) { openFile(item) }
    else { setSelectedFile(null); addPath(item); }
  }

  return (
    <KebabStorageView
      model={props.model}
      list={list}
      path={path}
      addPath={addPath}
      subPath={subPath}
      getFile={getFile}
      openFile={openFile}
      remFile={remFile}
      remFolder={remFolder}
      createFolder={createFolder}
      fileUpload={fileUpload}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      handleClick={handleClick}
      handleDoubleClick={handleDoubleClick}
      isLoading={isLoading}
      isListLoading={isListLoading}
    />
  );
}

export default KebabStoragePresenter;