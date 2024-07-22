import { DEFAULT_EVENTS_LABELS_KEYS } from "../../../../config";
import { EventLabels, LevelBucket } from "../../../../interfaces/stadistics.interface";
import { setColor } from "../../../../utils";

export const generateEventData = (bucket: LevelBucket, eventLabels: EventLabels ) => {
    return [
      { value: bucket.downloads.value, 
        name: eventLabels.downloads, 
        itemStyle: { color: setColor(bucket.key, DEFAULT_EVENTS_LABELS_KEYS.D) } 
      },
      { value: bucket.views.value, 
        name: eventLabels.views, 
        itemStyle: { color: setColor(bucket.key, DEFAULT_EVENTS_LABELS_KEYS.V) } 
      },
      { value: bucket.outlinks.value, 
        name: eventLabels.outlinks, 
        itemStyle: { color: setColor(bucket.key, DEFAULT_EVENTS_LABELS_KEYS.O) } 
      },
    ];
  };