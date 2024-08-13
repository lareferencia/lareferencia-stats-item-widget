import { Box, Card, Grid, Text } from "@chakra-ui/react";
import { ByCountryStats } from "../../../../interfaces/by-country-stats.interface";
import { useMemo } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { processRawData } from "../../../../utils/process-raw-data";

countries.registerLocale(enLocale);

const StatsPanels = (data: ByCountryStats) => {
  const processedData = processRawData(data);

  const handleTotalEvents = useMemo(() => {
    return processedData.reduce((acc, cn) => {
      return acc + cn.downloads + cn.views + cn.outlinks;
    }, 0);
  }, [processedData]);

  const topThreeCountries = useMemo(() => {
    return processedData
      .map((cn) => ({
        country: cn.name,
        total: cn.downloads + cn.views + cn.outlinks,
        conversions: cn.downloads,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  }, [processedData]);

  return (
    <Box>
      <Card mb="3" px="4" p="3" variant="filled">
        <Text
          as="span"
          fontWeight="bold"
          fontSize="1rem"
          textAlign="center"
        >{`Eventos totales: ${handleTotalEvents}`}</Text>
      </Card>

      <Grid templateColumns="repeat(1, 1fr)" gap={3}>
        {topThreeCountries.map((country, index) => (
          <Card key={index} px="4" py="2" variant="filled" display="flex" flexDir='row'>
            
            <Box>

            <Text
              as="span"
              fontWeight="bold"
              fontSize="0.8rem"
              overflow="hidden"
              whiteSpace="nowrap"
              isTruncated
              >
              {country.country}
            </Text>
              </Box>
              <Box>


            <Text
              as="span"
              fontSize="14px"
              >{`: ${country.total}`}
            </Text>

              </Box>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsPanels;
