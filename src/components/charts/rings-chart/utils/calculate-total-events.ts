import { Statistics } from "../../../../interfaces/stadistics.interface";

export const calculateTotalEvents = ( data:Statistics ) => {
    return data.level.buckets.reduce((acc, bucket) => {
      return acc + bucket.downloads.value + bucket.views.value + bucket.outlinks.value;
    }, 0);
  };