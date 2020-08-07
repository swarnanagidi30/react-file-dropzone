import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import './style.scss';
import DropZone from './components/DropZone';
import FileTile from './components/FileTile';

interface AppProps { }
interface AppState {
  name: string;
}


const App: React.FC<AppProps> = ({ }) => {
const [uploadPercent,setUploadPercent] = useState(0);
  const [uploadFiles,setUploadFiles] = useState([]);

  const handleFile = async (file: File, id: string) => {
    const { name, size, type, lastModified } = file;
    const percent = 100;
    setUploadFiles([...uploadFiles,
    { name, size, type, 
    lastModified, 
    percent
    }])
  };

  const handleDropFiles = (files) =>{
      files.forEach((f, i) => handleFile(f, `${new Date().getTime()}-${i}`))
  };

  const updateProgerss = (p) =>{
    const intervel = setTimeout(() =>{
      console.log(p);
      if(p > 100){
        console.log('cleared');
        clearInterval(intervel);
        return;
      }
      
      uploadFiles.forEach((f) => f.percent = p);
      setUploadPercent(p + 1);
      updateProgerss(p + 1);
      //setUploadFiles([...uploadFiles]);
    },100)
  };

  const handleSubmit = () => {
    setUploadPercent(0);
    updateProgerss(uploadPercent);
  };

  const handleRemove = (f) => {
    setUploadFiles(uploadFiles.filter(x => x.name !== f.name));
  };
 return (
      <div className="app">
        <h1>React file select</h1>
        <p>
        </p>
        <DropZone files={uploadFiles} onDropFiles={handleDropFiles}/>
        <p/>
        <div className="file-list">
        <label>Selected Files</label>
        {
          uploadFiles.map((f, i) => 
            <FileTile key={i} file={f} onRemove={handleRemove} />
          )
        }
        </div>
        <p>
        <button onClick={handleSubmit} > Submit </button>
        </p>
      </div>
    );
};


render(<App />, document.getElementById('root'));
