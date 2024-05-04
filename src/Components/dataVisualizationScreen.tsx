import React from "react";
import { useState } from "react";
import { WellData } from "../Models/data";
import { HeatmapDataFromD3 } from "./headmapDataFromD3.tsx";
import { HeatmapDataFromPlot } from "./headmapDataFromPlot.tsx";
import Tooltip from "./tooltip.tsx";

const metrics = [ // Just to show information about what is the metric selected
    {
        name:'QC_cell_count',
        description: 'Represents the cell count in a specific well. It is a direct quantitative measure of cell number, useful for assessing cell density or proliferation under varied experimental conditions.'
    },
    {
        name:'QC_cell_count_cov',
        description: 'Indicates the covariance or coefficient of variation of the cell count. It is a measure of the relative spread of the cell count data, providing an indication of the variability in measurements between wells.'
    },
    {
        name:'QC_position_effect',
        description: 'It reflects the effect that the position within the plate has on the experimental results. This value can be crucial to identify if there is any bias due to the position of the wells on the plate, such as temperature gradients or differences in reagent distribution.'
    },
]

type Props = {
    data: WellData[],
}

export const DataVisualizationScreen = ({ data }: Props) => {
    const [selectedMetric, setSelectedMetric] = useState('QC_cell_count');
    const [isActiveHover, setIsActiveHover] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState(false);
    const [dataForTooltip, setDataForTooltip] = useState<Array<string>>([]);

    const toggleSwitch = () => {
        setIsActiveHover(!isActiveHover); // Changes the state every time the user clicks the switch
    };

    // Function to show tooltip with data received from the component HeatmapDataFromD3. In the .on('mouseover')
    const handleHoverWell = (toggle: boolean, QC_cell_count?: string, QC_cell_count_cov?: string, QC_position_effect?: string) => {
        setActiveTooltip(toggle);
        if (toggle && QC_cell_count && QC_cell_count_cov && QC_position_effect) {
            setDataForTooltip([QC_cell_count, QC_cell_count_cov, QC_position_effect])
        }
    }
    
    return (
        <div className="DataVisualizationScreen">
            
            <h1>Data visualization screen</h1>

            <div className="selector-container">
                <label className="selector-label" htmlFor="metric-selector" >Select a metric:</label>
                <select id="metric-selector" value={ selectedMetric } onChange={ (event)=> setSelectedMetric(event.target.value) }>
                    { metrics.map(metric => (
                        <option key={ metric.name } value={ metric.name }>{ metric.name }</option>
                    )) }
                </select>
            </div>

            <div>
                { metrics.map(el => (el.name === selectedMetric)? 
                    <div key={ el.name }>
                        <p><b>Description:</b> { el.name } { el.description }</p>
                    </div>
                    : null)}
            </div>

            <div className="toggle">
                <p>Toggle to active hover in headmap</p>
                <div className={`switch-container ${isActiveHover ? 'active' : ''}`} onClick={toggleSwitch}>
                    <div className="switch-handle"></div>
                </div>
            </div>

            <div>
                { isActiveHover ?
                    // D3 library Allows hover but Plot looks better
                    <HeatmapDataFromD3 data = { data } selectedMetric = { selectedMetric }  handleHoverWell = { handleHoverWell }/>
                :   
                    <HeatmapDataFromPlot data = { data } selectedMetric = { selectedMetric }/>
                }
            </div>

            { activeTooltip && <Tooltip QC_cell_count={ dataForTooltip[0] } QC_cell_count_cov={ dataForTooltip[1] } QC_position_effect={ dataForTooltip[2] } /> }
        
        </div>
    )
}