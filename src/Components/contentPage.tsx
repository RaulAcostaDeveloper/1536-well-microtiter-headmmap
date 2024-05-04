import React from "react";
import { useEffect, useState } from "react";
import { DataLoadingScreen } from "./dataLoadingScreen.tsx"
import { DataVisualizationScreen } from "./dataVisualizationScreen.tsx"
import { HeaderNav } from "./headerNav.tsx"
import { WellData } from "../Models/data.tsx";

export const ContentPage = () => {
    const [isLoadingScreen, setIsLoadingScreen] = useState(true);
    const [dataFromMicrotiter, setDataFromMicrotiter] = useState<Array<WellData>>([]);
    const [fileName, setFileName] = useState('');

    useEffect(()=>{ // on loaded file
        if (dataFromMicrotiter.length > 0) {
            console.log('data ',dataFromMicrotiter);
        } else {
            console.log('No data from file loaded');
        }
    },[dataFromMicrotiter]);
    return (
        <div className='contentPage'>
            <HeaderNav setIsLoading = { setIsLoadingScreen }/>
            { isLoadingScreen ?
                <DataLoadingScreen setData = { setDataFromMicrotiter } setFileName = { setFileName } fileName = { fileName }/>
                :
                <DataVisualizationScreen data = { dataFromMicrotiter }/>
            }
        </div>
    )
}