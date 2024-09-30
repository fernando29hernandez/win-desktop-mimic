import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };
const ResumeViewer = ({ }) =>  {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Document file="/assets/icons/CV-FernandoHernandez.pdf" onLoadSuccess={onDocumentLoadSuccess} options={options} 
            renderMode="canvas" >
        <Page pageNumber={pageNumber} scale={1} renderAnnotationLayer={false}
              renderTextLayer={false}
              />
      </Document>

      <div style={{display:"flex",position:"absolute",bottom:10,left:"40%", background:"white",zIndex:10,boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",paddingLeft:15,paddingRight:15,paddingTop:10,paddingBottom:10,flexDirection:"row"}}>
        <button onClick={()=>setPageNumber(prev=>prev==1?prev:prev-1)} style={{background:"white"}}>
          {'<'}
        </button>
        <div style={{paddingLeft:5,paddingRight:5}} >
          Page {pageNumber} of {numPages}
        </div>
        <button  onClick={()=>setPageNumber(prev=>prev==2?prev:prev+1)}   style={{background:"white"}}>
          {'>'}
        </button>
      </div>
      
    </div>
  );
}

export default ResumeViewer;