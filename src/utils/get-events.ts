
import { setEventType } from ".";
import { EventLabels, Events, ScopeLabels, Stadistics } from "../interfaces/stadistics.interface";



export const getEvents = (data: Stadistics, scopeLabels: ScopeLabels, eventLabels: EventLabels ) => {
    
    let events: Events[] = [];
    
    data.level.buckets.forEach(bucket => {

    const scope = bucket.key

        bucket.action.buckets.forEach( bucket => {


            bucket.time.buckets.forEach( event => {

                const month = new Date(event.key).toLocaleString('default', { month: 'long' }).slice(0,3);
                const year = new Date(event.key).getFullYear().toString().slice(2);
                const date = new Date(event.key);
                const day = date.getDate();


                if (bucket.key === 'download'){
                    const eventName = setEventType(scope, eventLabels, scopeLabels, bucket);

                    events.push({
                        Fecha: `${day}.${month} ${year}'`,
                        eventData:{
                            [eventName]: event.doc_count,
                            scope: scope,
                            event: bucket.key
                        },
                    })      
                    
                } else if (bucket.key === 'view'){
                    const eventName = setEventType(scope, eventLabels, scopeLabels, bucket);
                    events.push({
                        Fecha: `${day}.${month} ${year}'`,
                        eventData:{
                            [eventName]: event.doc_count,
                            scope: scope,
                            event: bucket.key
                        },

                    })   
                } else {
                    const eventName = setEventType(scope, eventLabels, scopeLabels, bucket);
                    events.push({
                        Fecha: `${day}.${month} ${year}'`,
                        eventData:{
                            [eventName]: event.doc_count,
                            scope: scope,
                            event: bucket.key
                        },

                    })  
                }      
            })
        }) 
    })    
    
    
    return events;
}


