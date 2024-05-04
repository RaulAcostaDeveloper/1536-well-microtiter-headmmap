import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { HeatMapData, WellData } from '../Models/data';

type Props = {
    data: WellData[],
    selectedMetric: string,
    handleHoverWell: (toggle: boolean, QC_cell_count?: string, QC_cell_count_cov?: string, QC_position_effect?: string) => void
}

export const HeatmapDataFromD3 = ({ data, selectedMetric, handleHoverWell }: Props) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [renderSize, setRenderSize] = useState(320);

    useEffect(() => {

      if (data.length === 0 || !svgRef.current) return;

        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove();

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Metadata_Col))
            .range([0, 800])
            .padding(0.05);
  
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Metadata_Row))
            .range([0, 600])
            .padding(0.05);

        const colorScale = d3.scaleSequential()
            .interpolator(d3.interpolateMagma)
            .domain([0, d3.max(data, d => {
                const val = parseFloat(d[selectedMetric as keyof HeatMapData]);
                return isNaN(val) ? undefined : val;
            }) || 0]);

        svg.append('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.Metadata_Col)!)
            .attr('y', d => yScale(d.Metadata_Row)!)
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => colorScale(parseFloat(d[selectedMetric as keyof HeatMapData])))
            .on('mouseover', (event, data) => { // Here
                // hover to activate tooltip, and send data from
                handleHoverWell(true, data.QC_cell_count, data.QC_cell_count_cov, data.QC_position_effect);
            })
            .on('mouseout', () => {
                handleHoverWell(false);  // !this sometimes just does not work, you have to hover the mouse "away" from the svg to disable tooltip
                // This issue can be fixed easily (but i just had 2 days to develop this project, this is just an example project for TechMahindra by https://www.raulacostadeveloper.com/dev)
            });
            
    }, [data, selectedMetric, handleHoverWell]);

    // to control the size of the D3 headmap element
    useEffect(() => {
        updateSize(); // first render
        window.addEventListener('resize', updateSize);
        // Cleanup the event listener when the component unmounts
        return () => window.removeEventListener('resize', updateSize);
      }, []);
      
    const updateSize  = () =>  {
        if (window.innerWidth <= 768) {
            setRenderSize(window.innerWidth - 50);
        } else {
            setRenderSize(700);
        }
    }
    return (
        <div className='HeatmapDataFromD3'>
            <h3>Cell Counting Heat Map (Hover active)</h3>
            <svg ref={ svgRef } width={ renderSize } height="600"></svg>
        </div>
    );
};