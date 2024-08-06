import React, { useEffect, useState } from "react";

const StatsPanels = React.lazy(() => import("./components/StatsPanels"));

import { byCountryWs, fetchData } from "../../../api/api";
import {
  DEFAULT_EMBED_FUNCTION_NAME,
  DEFAULT_END_DATE,
  DEFAULT_SOURCE_ID,
  DEFAULT_START_DATE,
  DEFAULT_TIME_UNIT,
} from "../../../config";
import { Box } from "@chakra-ui/react";
import { ByCountryStats } from "../../../interfaces/by-country-stats.interface";
import Loading from "../../loading/Loading";
import { PieChart } from "./components/PieChart";
import { getIdentifier } from "../../../utils";

interface ByCountryChartsContainerProps {
  tabIndex: number;
  startDate: string;
}

const ByCountryChartsContainer = ({
  tabIndex,
  startDate
}: ByCountryChartsContainerProps) => {
  const [data, setData] = useState<ByCountryStats>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const embbedFunction = DEFAULT_EMBED_FUNCTION_NAME;
  const widgetParams = (window as any)[embbedFunction];

  const fetchDataAsync = async () => {
    setIsLoading(true);
    const identifier = getIdentifier(widgetParams);
    try {
      const resp: ByCountryStats = await fetchData(
        byCountryWs,
        identifier,
        DEFAULT_SOURCE_ID,
        startDate || DEFAULT_START_DATE,
        DEFAULT_END_DATE,
        DEFAULT_TIME_UNIT
      );
      if (resp.country) {
        setData(resp);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDataAsync();
  }, [startDate]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && !error && data && <StatsPanels {...data} />}
      {!isLoading && !error && data && (
        <PieChart data={data} tabIndex={tabIndex} />
      )}
      {error && <Box>Error fetching data</Box>}
    </>
  );
};

export default ByCountryChartsContainer;
