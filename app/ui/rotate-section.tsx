'use client';

import { Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useState, useCallback } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { PDFDocument, degrees } from 'pdf-lib'; 
import { saveAs } from 'file-saver';

type PDFFile = string | File | null;

const minZoom = 100;
const maxZoom = 500;

const resizeObserverOptions = {};

interface rotationProps {
  filePDF:  PDFFile;
  numPages: number | undefined;
  rotation: Record<number, number>;
  removePDF:() => void;
  rotateAll: () => void;
  rotatePage: (pageNumber: number)=> void;
  onDocumentLoadSuccess: ({ numPages}: PDFDocumentProxy) => void;
}

export default function RotateSection({filePDF, onDocumentLoadSuccess, numPages, rotation, rotateAll, rotatePage, removePDF} : rotationProps) {
  const [pageWidth, setPageWidth] = useState<number>(250); 
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setPageWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const zoomIn = () => {
    setPageWidth((prevWidth) => Math.min(prevWidth + 50, maxZoom)); 
  };

  const zoomOut = () => {
    setPageWidth((prevWidth) => Math.max(prevWidth - 50, minZoom));
  };

  const handleDownload = async () => {
    if (!filePDF || !(filePDF instanceof File)) return;

    const fileArrayBuffer = await filePDF.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileArrayBuffer);

    // Loop through all pages and apply the rotation
    const totalPages = pdfDoc.getPageCount();
    for (let i = 0; i < totalPages; i++) {
      const page = pdfDoc.getPage(i);
      const currentRotation = page.getRotation().angle; 
      const rotationDegrees = rotation[i + 1] || 0;
      page.setRotation(degrees((currentRotation + rotationDegrees) % 360));
    }

    const pdfBytes = await pdfDoc.save();

    // Trigger the download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    //saveAs(blob, filePDF.name); 
    const originalFileName = filePDF.name.replace(/\.pdf$/i, ''); 
    const newFileName = `${originalFileName}(pdf.ai-rotated).pdf`; 
    saveAs(blob, newFileName);
  };
  
  return (
    <>
      <div>
        <div 
          className="flex justify-center items-center space-x-3 text-[16px] font-medium select-none">
          <button 
            className="bg-[#FF612F] rounded text-white !w-auto px-[12px] py-[10px]"
            onClick={rotateAll}
          >Rotate all</button>

          <button 
            className="relative group !w-auto !bg-gray-800 text-white px-3 py-[10px] rounded" 
            aria-label="Remove this PDF and select a new one" 
            role="tooltip"
            onClick={removePDF}
            >
            Remove PDF
          </button>

          <button 
            className="shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 bg-white" 
            aria-label="Zoom in" 
            role="tooltip"
            onClick={zoomIn}
            disabled={pageWidth >= maxZoom}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"></path>
            </svg>
          </button>

          <button 
            className="shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 bg-white" 
            aria-label="Zoom out" 
            role="tooltip"
            onClick={zoomOut}
            disabled={pageWidth <= minZoom}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"></path>
            </svg>
          </button>
        </div>

        <Document
          file={filePDF}
          onLoadSuccess={onDocumentLoadSuccess}
          rotate={0}
          loading="Loading PDF…" 
          className='flex flex-wrap justify-center mt-5'
        >
          {Array.from(new Array(numPages), (el, index) => ( 
            <div 
              className="m-3"
              style={{ maxWidth: `${pageWidth}px`, flex: `0 0 ${pageWidth}px`}}
              key={index}
              ref={setContainerRef}
              >
                <div 
                  className="relative cursor-pointer"
                >
                  <div 
                    className="absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white"
                    onClick={() => rotatePage(index + 1)}
                  >
                    <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"></path>
                    </svg>
                  </div>
                  <div 
                    className="overflow-hidden transition-transform"
                  >
                    <div 
                      className="relative w-full h-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50"
                    >
                      <div 
                        className="rotate-0 shrink"
                        style={{
                          width:'100%',
                          objectFit: 'contain',
                          transitionProperty: 'transform',transitionTimingFunction: 'ease-in-out', 
                          transitionDuration: '150ms', 
                          transform: `rotate(${rotation[index+1]}deg)`
                        }}
                      >
                        <Page 
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          renderAnnotationLayer = {false}
                          renderTextLayer={false}
                          width={pageWidth-30}
                          onClick={() => rotatePage(index + 1)}
                        />
                      </div>
                      <div className="w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap">{index+1}</div>
                    </div>
                  </div>
                </div>
            </div> ),
          )}
        </Document> 

        <div 
          className="flex flex-col justify-center items-center space-y-3 select-none text-[16px] font-medium mt-5">
          <button 
            className="relative group bg-[#FF612F] rounded text-white !w-auto px-[12px] py-[10px] shadow" 
            aria-label="Split and download PDF" 
            role="tooltip"
            onClick={handleDownload}
          >Download
          </button>
        </div> 
      </div>
    </>
  );
}