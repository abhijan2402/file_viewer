import React from "react";
import "./styles.css";
import FileViewer from "react-file-viewer";
import { resizeImg, resizePDF } from "./helpers";

const getFileType = fileName => fileName.split(".").pop();

export default function App() {
  const [filePath, setFilePath] = React.useState("");
  const [fileType, setFileType] = React.useState("");

  const containerRef = React.useRef(null);

  const handleInputChange = e => {
    const file = e.target.files[0];

    setFilePath(URL.createObjectURL(file));
    setFileType(getFileType(file.name));
  };

  const zoomIn = event => {
    // library has no support for refs...
    const container = document.getElementById("pg-viewer");

    // match the driver viewer
    if (container.firstChild.className === "photo-viewer-container") {
      // detect image

      const image = container.firstChild.firstChild;

      // BUGGY
      resizeImg(event, image);
    } else if (container.firstChild.className === "pdf-viewer-container") {
      // detect pdf

      var canvasList = container.getElementsByClassName("pdf-canvas");

      // WIP
      resizePDF(event, canvasList);
    }
  };

  return (
    <div className="App">
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.docx,.csv,.xslx,.pdf"
        onChange={handleInputChange}
      />

      {filePath && fileType && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              ref={containerRef}
              style={{
                width: "500px",
                height: "500px"
              }}
            >
              <FileViewer
                key={filePath}
                fileType={fileType}
                filePath={filePath}
                errorComponent={<p>errorComponent</p>}
                onError={error =>
                  console.error("FileViewer error: ", { error })
                }
              />
            </div>
          </div>

          {/* <button onClick={zoomIn}>zoom in</button> */}
        </>
      )}
    </div>
  );
}

/*
react-file-viewer claims to support following file types:

pdf
csv
xslx
docx
Video: mp4, webm
Audio: mp3
*/

/*
if it's photo viewer, it'll gonna have id of 
pg-photo-container

pdf:
pdf-viewer-container
pdf-viewer
pdf-canvas x2?
*/
