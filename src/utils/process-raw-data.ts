import { DEFAULT_EVENTS_LABELS } from "../config";
import { ByCountryStats } from "../interfaces/by-country-stats.interface";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { ProcessedData } from "../interfaces/process-data.interface";
countries.registerLocale(enLocale);

type MetricKey = "views" | "downloads" | "outlinks" | "conversions";

export const processRawData = (data: ByCountryStats) => {


    let result: ProcessedData[] = [];

    const countryKeys = data.country.conversions.buckets.map((country) => country.key);

    countryKeys.forEach((country) => {
        const name = countries.getName(country, "en") || country;
        const countryData = {
            name,
            value: 0,
            views: 0,
            downloads: 0,
            outlinks: 0,
            conversions: 0,
        }

        const events = DEFAULT_EVENTS_LABELS as MetricKey[];

        events.forEach((metric) => {
            const event = data.country[metric];
            const value =
                event.buckets.find((bucket) => bucket.key === country)?.count
                    .value || 0;
            countryData[metric] = value;
        });

        result.push(countryData);

    })

    return result;
}