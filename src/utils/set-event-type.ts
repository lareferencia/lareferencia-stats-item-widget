import { ActionBucket, EventLabels, ScopeLabels } from "../interfaces/stadistics.interface";

export const setEventType = (scope: string, eventLabels: EventLabels, scopeLabels: ScopeLabels, bucket: ActionBucket) => {
    
    const labelMap = {
      download: eventLabels.download,
      view: eventLabels.view,
      outlink: eventLabels.outlink,
    };
  
    const label = labelMap[bucket.key] || '';
  
    if (label && (scope === 'L' || scope === 'N' || scope === 'R')) {
      return `${label} ${scopeLabels[scope] || ''}`;
    }
  
    return '';
  };


