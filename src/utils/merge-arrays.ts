import { EventData, Events, MergedEvents } from "../interfaces/stadistics.interface";

export const mergeEventsByDate = (eventsArray: Events[]) => {
  const mergedEvents: { [date: string]: EventData[] } = {};

  for (const eventObj of eventsArray) {
    const { Fecha, eventData } = eventObj;

    if (!mergedEvents[Fecha]) {
      mergedEvents[Fecha] = [];
    }

    const eventNames = Object.keys(eventData);

    for (const eventName of eventNames) {
      if (eventName !== 'event' && eventName !== 'scope' && eventData[eventName] !== undefined) {
        const newEventData: EventData = {
          event: eventData.event, 
          scope: eventData.scope,
        };
        newEventData[eventName] = eventData[eventName];

        mergedEvents[Fecha].push(newEventData);
      }
    }
  }

  const mergedEventsArray: MergedEvents[] = Object.entries(mergedEvents).map(([Fecha, eventData]) => ({
    Fecha,
    eventData,
  }));


  return mergedEventsArray;
};