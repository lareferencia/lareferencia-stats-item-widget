import {
  EventLabels,
  LevelBucket,
  LevelBucketProperty,
  ScopeLabels,
  Statistics,
} from "../../../interfaces/stadistics.interface";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { setColor } from "../../../utils";
import { useEffect, useState } from "react";

type DashboardProps = {
  data: Statistics;
  scopeLabels: ScopeLabels;
  activeScope: string;
  eventLabels: EventLabels;
};

export const Dashboard = ({
  data,
  scopeLabels,
  eventLabels,
  activeScope,
}: DashboardProps) => {
  const [scopeData, setScopeData] = useState<LevelBucket[]>(
    data.level.buckets.filter((bucket) => bucket.key === activeScope)
  );

  useEffect(() => {
    const totalData: LevelBucket[] = [
      {
        key: "ALL",
        doc_count: 0,
        views: { value: data.views.value },
        outlinks: { value: data.outlinks.value },
        downloads: { value: data.downloads.value },
        conversions: { value: data.conversions.value },
      },
    ];
    const scopeData = data.level.buckets.filter(
      (bucket) => bucket.key === activeScope
    );
    activeScope === "ALL" ? setScopeData(totalData) : setScopeData(scopeData);
  }, [activeScope]);

  return (
    <Grid templateColumns="repeat(12, 1fr)">
      {scopeData.map((bucket, index) => (
        <GridItem colSpan={12} key={index}>
          <Grid templateColumns="repeat(12,1fr)" mt="1rem">
            {/* scope or total */}
            <GridItem
              colSpan={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="1rem"
              fontWeight="bold"
              borderRadius="6px 0px 0px 0px"
              bgColor={setColor(bucket.key, bucket.key, "filtered")}
            >
              <Text as="span" fontSize="12px">
                {scopeLabels[bucket.key as keyof ScopeLabels]
                  .charAt(0)
                  .toUpperCase() +
                  scopeLabels[bucket.key as keyof ScopeLabels].slice(1)}
              </Text>
              <Text as='span' fontSize="12px">
                {(
                  bucket.downloads.value +
                  bucket.views.value +
                  bucket.outlinks.value
                ).toLocaleString()}
              </Text>
            </GridItem>

            {/* Events, views, downloads, outlinks */}
            <GridItem colSpan={7}>
              <Grid
                templateColumns="repeat(12,1fr)"
                templateRows="repeat(3,1fr)"
              >
                {["views", "downloads", "outlinks"].map(
                  (event, metricIndex) => (
                    <GridItem
                      key={metricIndex}
                      fontWeight="bold"
                      fontSize="12px"
                      display="flex"
                      padding="0.3rem"
                      alignItems="center"
                      justifyContent="center"
                      bgColor={setColor(bucket.key, event, "filtered")}
                      borderRadius={
                        metricIndex === 0 ? "0px 6px 0px 0px" : "0px"
                      }
                      colSpan={12}
                      rowSpan={1}
                    >
                      <Box>
                        <Text as="span">
                          {`${eventLabels[event as keyof EventLabels]}: ${
                            bucket[event as LevelBucketProperty].value
                          }`}
                        </Text>
                      </Box>
                    </GridItem>
                  )
                )}
              </Grid>
            </GridItem>

            {/* Conversions */}
            <GridItem
              colSpan={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontWeight="bold"
              fontSize="12px"
              padding="0.3rem"
              borderRadius="0px 0px 6px 6px"
              bgColor={setColor(bucket.key, "conversions", "filtered")}
            >
              <Text
                as="span"
                textAlign="center"
              >{`${eventLabels["conversions"]}: ${bucket.conversions.value}`}</Text>
            </GridItem>
          </Grid>
        </GridItem>
      ))}
    </Grid>
  );
};
