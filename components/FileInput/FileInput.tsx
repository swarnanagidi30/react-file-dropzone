import React from 'react';
import './FileInput.scss';

interface FileInputProps {
 onFiles: any,
 hasFiles:boolean
}

const FileInput: React.FC<FileInputProps> = ({ onFiles, hasFiles }) => {
 return (<label className="file-input">
  {"Drag file or click to select"}
  <input
        type="file"
        style={{display:'none'}}
        multiple
        onChange={async e => {
          const target = e.target
          
          onFiles(e)
          //@ts-ignore
          target.value = null
        }}
      />
  </label>);
};

export default FileInput;