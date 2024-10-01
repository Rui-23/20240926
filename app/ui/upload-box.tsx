interface UploadBoxProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDrop:(event: React.DragEvent<HTMLElement>) => void;
  onDragLeave:(event: React.DragEvent<HTMLElement>) => void;
  isDragging:boolean;
}

export default function UploadBox({onFileChange, onDragEnter, onDragOver, onDrop, onDragLeave, isDragging} : UploadBoxProps) {

  return (
    <div 
      className="w-full flex justify-center">
      <div 
        className="h-[350px] relative text-center w-[275px]"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input 
          className="cursor-pointer hidden" 
          type="file" id="input-file-upload" accept=".pdf"
          onChange={onFileChange}
        /> 

        <label 
          className={`h-full flex items-center justify-center border rounded transition-all border-stone-300 ${isDragging ? 'bg-stone-100 border-solid' : 'bg-white border-dashed'}`} 
          htmlFor="input-file-upload">
          <div 
            className="cursor-pointer flex flex-col items-center space-y-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
            </svg>
            <p 
              className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">Click to upload or drag and drop
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}