import { Box, Card, Grid, Text } from "@chakra-ui/react";
import { ByCountryStats } from "../../../../interfaces/by-country-stats.interface";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

import { processRawData } from "../../../../utils/process-raw-data";

type Country = {
  name: string;
  value: number;
  views: number;
  downloads: number;
  outlinks: number;
  conversions: number;
};

interface PieChartProps {
  data: ByCountryStats;
  tabIndex: number;
}


export const PieChart = ({ data, tabIndex }: PieChartProps) => {
  const [showedCountry, setShowedCountry] = useState<Country>();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    if (chartRef.current) {
      const pieData = processRawData(data).map((country) => ({
        name: country.name,
        value:
          country.downloads +
          country.views +
          country.outlinks,
        views: country.views,
        downloads: country.downloads,
        outlinks: country.outlinks,
        conversions: country.conversions,
      }));

      setShowedCountry(pieData[0]);

      const option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Eventos totales del país",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: true,
              position: "outer",
              alignTo: "edge",
              edgeDistance: 0,
              width: "100",
              overflow: "truncate",
              ellipsis: "...",
              fontWeight: "bold",
              color: "#395182",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            data: pieData,
          },
        ],
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
    myChart.on("mouseover", (event) => {
      setShowedCountry(event.data as Country);
    });
  };

  return (
    <Box mt={0}>
      <Box id="pie-chart" ref={chartRef} height="400px"></Box>

      <Grid gridTemplateColumns="repeat(1,1fr)" gap="2">
        <Card
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="2"
          variant="filled"
        >
          <Text as="span" fontWeight="bold">
            {showedCountry?.name}
          </Text>
        </Card>

        <Grid gridTemplateColumns="repeat(2,1fr)" gap="2">
          <Card display="flex" justifyContent="center" p="2" variant="filled">
            <Text as="span" fontSize="12px" fontWeight="semibold" ml="1rem">
              Vistas: {showedCountry?.views}
            </Text>
          </Card>
          <Card display="flex" justifyContent="center" p="2" variant="filled">
            <Text as="span" fontSize="12px" fontWeight="semibold" ml="1rem">
              Descargas: {showedCountry?.downloads}
            </Text>
          </Card>
          <Card display="flex" justifyContent="center" p="2" variant="filled">
            <Text as="span" fontSize="12px" fontWeight="semibold" ml="1rem">
              Enlaces: {showedCountry?.outlinks}
            </Text>
          </Card>
          <Card display="flex" justifyContent="center" p="2" variant="filled">
            <Text as="span" fontSize="12px" fontWeight="semibold" ml="1rem">
              Conversiones: {showedCountry?.conversions}
            </Text>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
