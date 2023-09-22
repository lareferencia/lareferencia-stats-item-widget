import React, { useState, useEffect, startTransition } from 'react';

const BarChart = React.lazy( () => import('./components/bar-chart/BarChart'))
const Loading = React.lazy( () => import('./components/loading/Loading'))
const PreviewImage = React.lazy( () => import('./components/PreviewImage'))
const ErrorView = React.lazy( () => import('./components/ErrorView'))

import style from './styles/app.module.css';

import axios from 'axios';
import { Stadistics } from './interfaces/stadistics.interface';
import { baseUrl } from './api/api';


function App() {

  const embbedFunction = 'lrhw';
  const widgetParams = (window as any)[embbedFunction];

  const scopeLabels = widgetParams && widgetParams.scope_labels || {
    L: 'La Referencia',
    N: 'nodo nacional',
    R: 'repositorio'
  }
  const eventLabels = widgetParams && widgetParams.event_labels || {
    download: 'Descargas',
    view: 'Vistas',
    outlink: 'Enalces'
  }
 
  const preview: boolean = widgetParams && widgetParams.preview !== false ? true : false;
  // const preview: boolean = true;
  const sourceId = widgetParams && widgetParams.repository_source || 'SITEID::59'

  const [data, setData] = useState<Stadistics>();
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(false)
  

  const [timeUnit, setTimeUnit] = useState('week');
  const [previewImage, setPreviewImage] = useState(preview);

  const fetchData = async () => { 

    const params = {
      // identifier: 'oai:sedici.unlp.edu.ar:10915/74434',
      source: sourceId,
      start_date: 'now-20y',
      end_date: 'now',
      time_unit: timeUnit
    };
    
    if(previewImage === true) return;
    setIsLoading(true);
      
    axios({
      method: 'GET',
      url: baseUrl,
      params: params,
    }).then(response => {
      if(response.data.level){
        setData(response.data);
      } else {
        console.log('Vino objeto vacio'); 
        setError(true);
      }
    setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setError(true);
    });
  
  }
    
  useEffect(() => {
    fetchData();
  }, [ timeUnit, previewImage, sourceId ]);


  const handleChangeTimeUnit = (timeUnitType: string) => {
    setTimeUnit(
      timeUnitType === 'day' 
      ? 'day' 
      : timeUnitType === 'month' 
      ? 'month' 
      : 'week');
  };

  const isButtonActive = (buttonTimeUnit: string) => {
    return timeUnit === buttonTimeUnit 
      ? style.buttonActive 
      : '';
  };

  const handleDeletePreview = () =>{
    startTransition(() => {
      setPreviewImage(false);
    });
  }


  return (
    <>
  {!error ? 
    ( <div className={style.container}>
      {previewImage ? (
        <div onClick={handleDeletePreview}>
          <PreviewImage />
        </div>
      ) : (
        <>
          <div>
            <button
              onClick={() => handleChangeTimeUnit('day')}
              className={`${isButtonActive('day')} ${style.timeUnitButton}`}
            >
              Day
            </button>
            <button
              onClick={() => handleChangeTimeUnit('week')}
              className={`${isButtonActive('week')} ${style.timeUnitButton}`}
            >
              Week
            </button>
            <button
              onClick={() => handleChangeTimeUnit('month')}
              className={`${isButtonActive('month')} ${style.timeUnitButton}`}
            >
              Month
            </button>
          </div>
          { isLoading || !data ? <Loading /> : <BarChart data={data} scopeLabels={scopeLabels} eventLabels={eventLabels} /> }
        </>
      )}
    </div> ) : 
      ( <ErrorView/>
    )}
  </>
  );
}

export default App;