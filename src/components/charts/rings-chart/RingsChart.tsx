import { useEffect, useRef } from "react";

import * as echarts from "echarts";
import {
  EventLabels,
  ScopeLabels,
  Statistics,
} from "../../../interfaces/stadistics.interface";
import { findScopeKey } from "./utils/find-scope-key";
import { calculateTotalEvents, generateEventData } from "./utils";
import { Box, Text } from "@chakra-ui/react";

type RingsChartProps = {
  data: Statistics;
  scopeLabels: ScopeLabels;
  eventLabels: EventLabels;
  setActiveScope: (value: string) => void;
  tabIndex: number;
};

const RingsChart = ({
  data,
  scopeLabels,
  eventLabels,
  setActiveScope,
  tabIndex,
}: RingsChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    if (chartRef.current) {
      const seriesData: any[] = [];

      data.level.buckets.map((bucket, index) => {
        seriesData.push({
          name: scopeLabels[bucket.key as keyof ScopeLabels],
          type: "pie",
          animation: false,
          selectedMode: false,
          radius: [`${43 + 18 * index}%`, `${58 + 18 * index}%`],
          label: {
            show: false,
          },
          data: generateEventData(bucket, eventLabels),
        });
      });

      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
        },
        grid: {
          containLabel: false,
        },
        series: seriesData,
      };

      const handleResize = () => {
        if (myChart) myChart.resize();
      };
      window.addEventListener("resize", handleResize);

      option && myChart.setOption(option);
      setEventHandlers(myChart);

      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, [tabIndex]);

  const setEventHandlers = (myChart: echarts.EChartsType) => {
    myChart.on("mouseover", ({ seriesName }) => {
      const label = findScopeKey(scopeLabels, seriesName);
      setActiveScope(label);
    });
    myChart.on("mouseout", () => {
      setActiveScope("ALL");
    });
  };

  return (
    <Box position='relative' height='300px'>

      <Box position='absolute' top='50%' left='50%' transform='translate(-45%, -50%)'>

        <Box display='flex' flexDir='column' >
          <Text as='span' fontWeight='bold' textAlign='center'>
            Total
          </Text>
          <Text as='span' fontWeight='bold' textAlign='center'>
            {calculateTotalEvents(data)}
          </Text>
        </Box>

      </Box>

      <Box id="ring-chart" ref={chartRef} height='100%'></Box>

    </Box>
  );
};

export default RingsChart;
