import { useEffect, useRef } from "react";

import * as echarts from "echarts";
import {
  EventLabels,
  ScopeLabels,
  Statistics,
} from "../../../interfaces/stadistics.interface";
import { setColor } from "../../../utils";
import { processDataForScope } from "./utils/processDataForScope";
import {
  DEFAULT_EVENTS_LABELS,
  DEFAULT_EVENTS_LABELS_KEYS,
  DEFAULT_SCOPES_KEYS,
} from "../../../config";
import { Box } from "@chakra-ui/react";

type StackedBarProps = {
  data: Statistics;
  scopeLabels: ScopeLabels;
  eventLabels: EventLabels;
  activeScope: string;
  setActiveScope: (value: string) => void;
};

const StackedBarChart = ({
  data,
  scopeLabels,
  eventLabels,
  activeScope,
}: StackedBarProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    if (chartRef.current) {
      const series: any[] = [];

      if (activeScope === "ALL") {
        DEFAULT_SCOPES_KEYS.map((scope) => {
          if (scopeLabels[scope as keyof ScopeLabels] === "Eventos totales")
            return;
          series.push({
            name: `${scopeLabels[scope as keyof ScopeLabels]} - Eventos totales`,
            type: "bar",
            stack: "total",
            itemStyle: { color: setColor(scope, "ALL") },
            data: processDataForScope(data, scope),
          });
        });
      } else {
        const scopesAndEvents = DEFAULT_EVENTS_LABELS.map((event) => ({
          scope: activeScope,
          event,
        }));
        scopesAndEvents.forEach((scopeAndEvent) => {
          series.push({
            name: `${scopeLabels[scopeAndEvent.scope as keyof ScopeLabels]} - ${
              eventLabels[scopeAndEvent.event as keyof EventLabels]
            }`,
            type: `${
              scopeAndEvent.event === DEFAULT_EVENTS_LABELS_KEYS.C
                ? "line"
                : "bar"
            }`,
            yAxisIndex: `${
              scopeAndEvent.event === DEFAULT_EVENTS_LABELS_KEYS.C ? 1 : 0
            }`,
            stack: `${
              scopeAndEvent.event === DEFAULT_EVENTS_LABELS_KEYS.C
                ? ""
                : "total"
            }`,
            itemStyle: {
              color: setColor(scopeAndEvent.scope, scopeAndEvent.event),
            },
            data: processDataForScope(data, scopeAndEvent),
          });
        });
      }
      const xAxisData = data.time.buckets.map((entry) =>
        entry.key_as_string.toString().slice(0, 7)
      );

      const maxViews = Math.max(...series[0].data);
      const maxDownloads = Math.max(...series[1].data);
      const maxOutlinks = Math.max(...series[2].data);
      const sum = maxViews + maxDownloads + maxOutlinks;

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: "2%",
          top: "0%",
          right: "2%",
          bottom: "20%",
          containLabel: false,
        },
        yAxis: [
          {
            type: "value",
            max: sum,
            name: "Total Access",
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 13,
            },
            show: false,
          },
          {
            type: "value",
            max: sum,
            name: DEFAULT_EVENTS_LABELS_KEYS.C,
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 13,
            },
            show: false,
            alignTicks: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#6e9ef1",
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],

        xAxis: {
          type: "category",
          data: xAxisData,
        },
        series: series,
      };

      const handleResize = () => {
        if (myChart) myChart.resize();
      };
      window.addEventListener("resize", handleResize);

      option && myChart.setOption(option);

      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, [activeScope]);

  return <Box id="bar-chart" ref={chartRef} height="180px"></Box>;
};

export default StackedBarChart;
