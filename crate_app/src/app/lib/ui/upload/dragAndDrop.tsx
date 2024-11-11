'use client'

import React, { useState } from 'react';

const DragAndDropUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileToBig, setFileToBig] = useState<boolean>(false);
    const [successfullyUploaded, setSuccessfullyUploaded] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    const MAX_FILE_SIZE = 5 * 1024 * 1024 //5MB


    const validateFileSize = (selectedFile: File) => {
        console.log(selectedFile.size);
        if(selectedFile.size > MAX_FILE_SIZE){
            setFileToBig(true);
            return false
        }else{
            setFileToBig(false)
            return true;
        }
    }

    const postFileToServer = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => setSuccessfullyUploaded(true))
        .catch(error => console.error(error));
    }

    // Handle file drop
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        if (event.dataTransfer.files && event.dataTransfer.files.length === 1) {
            if(validateFileSize(event.dataTransfer.files[0])) {
                setFile(event.dataTransfer.files[0]);
                postFileToServer(event.dataTransfer.files[0]);
                event.dataTransfer.clearData();
            }
        }
    };
    // Handle file selection via input
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            if(validateFileSize(event.target.files[0])) {
                setFile(event.target.files[0]);
                postFileToServer(event.target.files[0]);
            }
        }
    };

    // Styling for drag-over effect
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="flex flex-col items-center p-6">
            {/* Drag-and-drop area */}
            <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full max-w-md p-8 border-2 border-dashed rounded-lg 
                        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}
                        flex flex-col items-center justify-center cursor-pointer transition-all`}
            >
            <p className="text-gray-700 text-center mb-4">
                {file&&!fileToBig ? `Selected file: ${file.name}` : 'Drag and drop your rekordbox xml file here or click to select it'}
            </p>

            {/* File input for selecting files */}
            <input
                type="file"
                onChange={handleFileInputChange}
                className="hidden"
                id="fileUpload"
                accept='.xml'
            />
            <label htmlFor="fileUpload" className="cursor-pointer text-blue-500 underline">
                Choose a file
            </label>
            </div>

            {file && (fileToBig === false) ? (
            <div className="mt-4 p-2 bg-green-50 border border-green-400 rounded">
                <p>File ready for upload: <strong>{file.name}</strong></p>
            </div> 
            ): <></>}

            {fileToBig && (
            <div className="mt-4 p-2 bg-red-50 border border-red-400 rounded">
                <p>File to Big!  <strong>(max 5GB)</strong></p>
            </div>
            )}
        </div>
    );
};

export default DragAndDropUpload;
