import React from 'react';
import './FileTile.scss';
//import removeImg from '../../assets/remove.svg'
interface FileTileProps {
 file: any;
 onRemove: any;
}


const formatBytes = (b: number) => {
  const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let l = 0
  let n = b

  while (n >= 1024) {
    n /= 1024
    l += 1
  }

  return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)}${units[l]}`
}

const FileTile: React.FC<FileTileProps> = ({ file, onRemove }) => {
  const { name, size, type, lastModified, percent } = file;
 return (<div className="file-tile">
 <label style={{ display : 'flex'}}>
  <span style={{width:'100%'}} >{name}, {formatBytes(size)} </span>
  <span className="remove-icon" onClick={() => onRemove(file)} >
    </span>
  </label>
  <progress max={100} value={percent} />
  </div>);
};

export default FileTile;