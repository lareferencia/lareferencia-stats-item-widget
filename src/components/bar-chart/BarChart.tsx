import { useEffect, useRef, useState } from "react";

import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

import { BarChartProps } from "../../interfaces/stadistics.interface";
import { getEvents, transformDataForChart, mergeEventsByDate, setColor } from "../../utils";

import style from './barchart.module.css';

interface EventCount {
  [key: string]: any[];
}


export const BarChart: React.FC<BarChartProps> = ({ data, scopeLabels, eventLabels }) => {

  const [timeInterval, setTimeIntervale] = useState({ type: 'slider', start: 95, end: 100});
  const chartRef = useRef(null);

  const events = getEvents(data, scopeLabels, eventLabels); 
  const mergedEvents = mergeEventsByDate(events);  
  
    
  useEffect(() => {
    
    if ( chartRef.current ){

      const myChart = echarts.init(chartRef.current);
      const xAxis = mergedEvents.map( event => event.Fecha)
      const series: any[] = [];
      //agregale el tipo a la serie


      // start transforming the data for the chart
      const objectForChart = transformDataForChart(mergedEvents);
      
      // eventCount is the quantity of interactions for the event
      const eventCount: EventCount = {};

      // Preparing the data for the chart
      objectForChart.forEach(( data ) => {

        //Ignore the "Fecha"
        if (data.eventName !== 'Fecha') {
          
          eventCount[data.eventName] = mergedEvents.map( item  => {

            const eventData = item.eventData.find((event) => event.hasOwnProperty(data.eventName));
            return eventData ? eventData[data.eventName] : 0;
          });          

          series.push({
            name: data.eventName,
            type: 'bar',
            stack: 'eventos',
            emphasis: {
              focus: 'series',
            },
            data: eventCount[data.eventName],
            itemStyle: {
              color: setColor( data ),
            }
          });
        }
      });

      // Options for the chart
      const option: EChartsOption = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { orient: 'vertical', align: 'right', right: 10 },
        grid: { left: '5%', right: '3%', bottom: '12%', containLabel: true },
        dataZoom: [ timeInterval, { type: 'inside', start: 50, end: 70 } ],
        xAxis: [ { type: 'category', data: xAxis } ],
        yAxis: [ { type: 'value', splitLine: { show: false } } ],      
        series: series,
        textStyle:{ fontFamily: "Inter", fontWeight: 700, },
      };
  
      //Responsive for the chart
      const handleResize = () => { if (myChart) myChart.resize() };
      window.addEventListener("resize", handleResize);
      
      //Setting the options
      myChart.setOption(option);

      return () => {
        //Removing when the component is destroyed to prevent memory leaks
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    } 
  }, [mergedEvents, timeInterval]); 
  

  
  const handleSetTimeInterval = (interval: number) => {
    setTimeIntervale({
      type: 'slider',
      start: interval === 95 ? 95  : interval === 84  ? 84  : 69, end: 100 })
  };

  const handleActiveInteraval = (interval: number) => timeInterval.start === interval  ? style.spanActive  : '';


  return (
    <>
      <div ref={chartRef} className={style.container} ></div>
      
        <div className={style.spanContainer}>

          <span 
            className={`${handleActiveInteraval(95)} ${style.timeUnitSpan}`}
            onClick={() =>handleSetTimeInterval(95)}>
              1m
          </span>
          <span 
            className={`${handleActiveInteraval(84)} ${style.timeUnitSpan}`}
            onClick={() =>handleSetTimeInterval(84)}>
              3m
          </span>
          <span 
            className={`${handleActiveInteraval(69)} ${style.timeUnitSpan}`}
            onClick={() =>handleSetTimeInterval(69)}>
              6m
          </span>
        </div>
    </>
  )
}


