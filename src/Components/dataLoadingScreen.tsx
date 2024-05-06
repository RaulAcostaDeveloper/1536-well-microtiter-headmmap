import React from "react";
import { useState } from "react";
import Papa from 'papaparse'; // use Papa library to transform data from .csv file into an array of values
import { WellData } from "../Models/data.tsx";
import { DownLoadATestFile } from "./downLoadATestFile.tsx";

type Props = {
    setData: (data:WellData[]) => void,
    setFileName: (name: string) => void,
    fileName: string,
}

export const DataLoadingScreen = ({ setData, setFileName, fileName }: Props) => {
    const [error, setError] = useState<string|boolean>(''); // handle errors and shows in screen

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files) {

            const file = event.target.files[0];

            if (file) {
                Papa.parse(file, {
                    header: true, // Column names comes from the first row of the CSV file
                    complete: function(results) {
                        const expectedHeaders = ['Metadata_Col', 
                        'Metadata_Row', 'Metadata_Well', 'Metadata_perturbation_id', 
                        'Metadata_perturbation_type', 'QC_cell_count', 'QC_cell_count_cov', 
                        'QC_cov_failed', 'QC_position_effect'];

                        const headers = results.meta.fields;

                        const hasAllRequiredHeaders = expectedHeaders.every(header => headers?.includes(header));
                        
                        if (hasAllRequiredHeaders) { // Validation to expect the correct file format
                            // Load the data to the main component (page)
                            setFileName(file.name);
                            setData(results.data as WellData[]);
                            setError(false);
                        } else {
                            setError('The csv file does not have the correct headers ');
                            console.error('The csv file does not have the correct headers: ', expectedHeaders);
                        }
                    },
                    error: function(error) {
                        setError('Error parsing file');
                        console.error("Error parsing file:", error);
                    }
                });
            } else {
                console.error('File not found')
                setError('File not found');
            }
        } else {
            console.error('The file could not be loaded');
            setError('The file could not be loaded');
        }
    };

    return (
        <div className="DataLoadingScreen">
            <h1>Data loading screen</h1>
            <div>
                <input type="file" accept=".csv" onChange={ handleFileChange } />
                { fileName && <p>File loaded: { fileName }</p>}
                { error && <div> { error } </div> }
                <DownLoadATestFile/>
            </div>
        </div>
    )
}