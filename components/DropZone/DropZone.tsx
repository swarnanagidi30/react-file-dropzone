import React, { useState, useEffect, useRef } from 'react';
import FileInput from '../FileInput';
import './DropZone.scss';

interface DropZoneProps {
 onDropFiles: any,
 files: any[]
}

const getFilesFromEvent = (
  event: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>,
): Array<File | DataTransferItem> => {
  let items = null

  if ('dataTransfer' in event) {
    const dt = event.dataTransfer

    // NOTE: Only the 'drop' event has access to DataTransfer.files, otherwise it will always be empty
    if ('files' in dt && dt.files.length) {
      items = dt.files
    } else if (dt.items && dt.items.length) {
      items = dt.items
    }
  } else if (event.target && event.target.files) {
    items = event.target.files
  }

  return Array.prototype.slice.call(items)
}

const DropZone: React.FC<DropZoneProps> = ({ children, onDropFiles, files}) => {
const [dragging,setDragging] = useState(false);
const [dragCounter, setDragCounter] = useState(0);
const divElemant = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter( dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }
  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter( dragCounter - 1);
    if (dragCounter === 0) {
      setDragging(false);
    }
  }
  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false);
    const chosenFiles = (await getFilesFromEvent(e)) as File[];
    onDropFiles(chosenFiles);
  }

  const handleFileEvent = async (e) =>{
    const chosenFiles = await getFilesFromEvent(e);
    onDropFiles(chosenFiles);
  }

useEffect(() =>{
    const div = divElemant.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);

    // Cleanup
    return () =>{
      div.removeEventListener('dragenter', handleDragIn)
      div.removeEventListener('dragleave', handleDragOut)
      div.removeEventListener('dragover', handleDrag)
      div.removeEventListener('drop', handleDrop);
    }
},[divElemant, handleDragIn,handleDragOut, handleDrag, handleDrop])

 return (<div
        className="drop-zone"
        ref={divElemant}
      >
       <FileInput onFiles={handleFileEvent} hasFiles={files.length !== 0} />
        {dragging &&
          <div 
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0, 
              right: 0,
              zIndex: 9999
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        }
        {children}

      </div>);
};

export default DropZone;