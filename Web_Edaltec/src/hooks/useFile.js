import { useState } from "react"; 

export const useFile = (descriptionControl) => {

    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState( descriptionControl);
    const [cleanfiles, setClearfiles] = useState(false);
    const [disableInputFile, setDisableInputFile] = useState(false);

    const assignFiles =(file)=>{
        setFiles(file);
    }
    const assignFileDescription =(fileDescription )=>{
        setSelectedFiles(fileDescription);
    }
    const assignCleanfiles =(cleanUp)=>{
        setClearfiles(cleanUp);
    }
    const assignDisabledInputFile =(toDisable)=>{
        setDisableInputFile(toDisable);
    } 
    return [ files, assignFiles, selectedFiles, assignFileDescription, cleanfiles , assignCleanfiles , disableInputFile , assignDisabledInputFile]
}
