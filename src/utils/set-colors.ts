import { EventData } from "../interfaces/stadistics.interface";

type ColorMap = {
    [key: string]: string;
  };

export const setColor = (eventData: EventData) => {
    const colorMap:ColorMap = {
      'R-download': '#F88DB6',
      'R-view': '#F1686A',
      'R-outlink': '#FBDEFF',
      'N-download': '#06B5B7',
      'N-view': '#037FA3',
      'N-outlink': '#44CF9D',
      'L-download': '#7C3E7B',
      'L-view': '#8F70A0',
      'L-outlink': '#ADB3D7',
    };
    const key = `${eventData.scope}-${eventData.event}`;
    return colorMap[key] || 'gray';
  };