import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { WellData } from '../Models/data.tsx';
import { useState } from 'react';

type Props = {
    data: WellData[],
    selectedMetric: string,
}

export const HeatmapDataFromPlot = ({ data, selectedMetric }: Props) => {
  const [renderSize, setRenderSize] = useState(320);

  // Extract unique sorted values from columns
  const xValues = Array.from( new Set( data.map( item => item.Metadata_Col ))).sort( (a, b) => parseInt(a) - parseInt(b) );
  // Extract unique sorted values from rows
  const yValues = Array.from( new Set( data.map( item => item.Metadata_Row))).sort().reverse();
  // Generates a 2d matrix of the 1536-well-microtiter data to make the heat map
  const zValues = yValues.map(row => 
    xValues.map(col => {
      // Get the element that matches the values of the current position
      const item = data.find( item => item.Metadata_Row === row && item.Metadata_Col === col);
      if (item) {
        switch (selectedMetric) { // return the value depending on the metric selected
          case 'QC_cell_count':
            return parseFloat(item.QC_cell_count);
          case 'QC_cell_count_cov':
            return parseFloat(item.QC_cell_count_cov);
          case 'QC_position_effect':
            return parseFloat(item.QC_position_effect);
          default:
              return null;
        }
      } else {
        return null;
      }
    })
  );

  // to control the size of the Plot headmap element
  useEffect(() => { 
    updateSize(); // on first render
    window.addEventListener('resize', updateSize);
    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const updateSize = () => {
    if (window.innerWidth <= 768) {
      setRenderSize(window.innerWidth);
    } else {
      setRenderSize(700);
    }
  }
  return (
    <div className='HeatmapDataFromPlot'>
      <Plot // Hover does not work in headmap from Plot library

        data={[
          {
            x: xValues,
            y: yValues,
            z: zValues, // 2D array of numerical values representing heat map data
            type: 'heatmap',
            colorscale: 'YlOrRd',
            hoverinfo: 'all'
          }
        ]}

        layout={{ // graph configuration
          width: renderSize, // Handles dynamic heatmap resolution
          height: 600,
          title: 'Cell Counting Heat Map',

          xaxis: { // X behavior
            title: 'Column',
            tickmode: 'array',
            tickvals: xValues.map((val, idx) => idx),
            ticktext: xValues
          },

          yaxis: { title: 'Row' }, // Y behavior
          dragmode: false, // mouse drag behavior
          hovermode: 'closest'
        }}

        config={{
          staticPlot: false,
          displayModeBar: true,  // Allows interaction if needed
        }}

      />
    </div>
  );
};