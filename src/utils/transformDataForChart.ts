import { MergedEvents } from "../interfaces/stadistics.interface";


export const transformDataForChart = (mergedEventsArray: MergedEvents[]) => {

  const longestEvent = mergedEventsArray.reduce((prev: any, current: any) => {
    const currentEventData = current.eventData;
    if (currentEventData && currentEventData.length) {
      return currentEventData.length > (prev.eventData?.length || 0) ? current : prev;
    } else {
      return prev;
    }
  });

  const propertiesWithValue = [];

  for (const eventDataItem of longestEvent.eventData) {
    for (const eventName in eventDataItem) {
      if (eventName !== "event" && eventName !== "scope") {
        const obj = { eventName: eventName, scope: eventDataItem.scope, event: eventDataItem.event };
        propertiesWithValue.push(obj);
      }
    }
  }

  return propertiesWithValue;
};