'use client';

import HeroText from "@/app/ui/hero-text";
import UploadBox from "@/app/ui/upload-box";
import RotateSection from "@/app/ui/rotate-section";
import '@/app/ui/body.css';

import { useState} from 'react';

import { pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type PDFFile = string | File | null | undefined;

export default function Body() {

  const [filePDF, setFilePDF] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number| undefined>();
  const [isDragging, setIsDragging] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [rotation, setRotation] = useState<Record<number, number>>({});

  const rotateAll = () => {
    if (!numPages) return; 

    setRotation((prev) => {
      const newRotation = { ...prev };
      for (let i = 1; i <= numPages; i++) {
        newRotation[i] = (newRotation[i] || 0) + 90;
      }
      return newRotation;
    });
  };

  const rotatePage = (pageNumber: number) => {
    setRotation((prev) => ({
      ...prev,
      [pageNumber]: ((prev[pageNumber] || 0) + 90),
    }));
  };

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  function removePDF(): void {
    setFilePDF(null);
    setNumPages(0);
    setIsDrop(false);
    setRotation({});
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFilePDF(nextFile);
    }
    console.log(nextFile);
    setIsDrop(true);
  }

  function onDragEnter(event: React.DragEvent<HTMLElement>) : void {
    event.stopPropagation();
    event.preventDefault();
    setIsDragging(true);
  }
  
  function onDragOver(event: React.DragEvent<HTMLElement>) : void {
    event.stopPropagation();
    event.preventDefault();
    setIsDragging(true);
    //console.log("Drag over...");
  }

  function onDragLeave(event: React.DragEvent<HTMLElement>): void {
    event.stopPropagation();
    event.preventDefault();
    setIsDragging(false); 
  }

  function onDrop(event: React.DragEvent<HTMLElement>) : void {
    event.stopPropagation();
    event.preventDefault();
    setIsDragging(false);
    setIsDrop(true);
  
    const dt = event.dataTransfer;
    const files = dt.files;
    const nextFile = files?.[0];

    if (nextFile) {
      setFilePDF(nextFile);
    }
    //console.log(nextFile);
  }

  return (
    <div className="text-black min-h-screen">
      <div className="container mx-auto py-20 space-y-5">
        <HeroText />
        {!isDrop ? 
          <UploadBox 
            onFileChange={onFileChange} 
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            isDragging={isDragging} 
          /> 
          :
          <RotateSection 
            filePDF={filePDF || null}
            numPages={numPages || undefined}
            rotation={rotation}
            rotateAll={rotateAll}
            removePDF={removePDF}
            rotatePage={rotatePage}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
          />
        } 
      </div>
    </div>
  );
}