import React, { useState, useEffect, startTransition, Suspense } from "react";
import { fetchData, itemWs } from "./api/api";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Box,
} from "@chakra-ui/react";

const Loading = React.lazy(() => import("./components/loading/Loading"));
const PreviewImage = React.lazy(() => import("./components/PreviewImage"));
const ErrorView = React.lazy(() => import("./components/ErrorView"));
const ChartsContainer = React.lazy(
  () => import("./components/charts/ChartsContainer")
);
const ByCountryChartsContainer = React.lazy(
  () => import("./components/charts/by-country-charts/ByCountryChartsContainer")
);

import helpImage from "./assets/usage-stats-help.png";
import logo from "./assets/logo-la-referencia.png";

import { Statistics } from "./interfaces/stadistics.interface";

import { useTranslation } from "react-i18next";
import { getEventLabels, getScopeLabels } from "./utils/scopes-and-events";
import {
  DEFAULT_EMBED_FUNCTION_NAME,
  DEFAULT_END_DATE,
  DEFAULT_SOURCE_ID,
  DEFAULT_START_DATE,
  DEFAULT_TIME_UNIT,
} from "./config";
import { ScopeButtons } from "./components/charts/ScopeButtons";
import { DateButtons } from "./components/charts/DateButtons";
import { getIdentifier } from "./utils";

function App() {
  const { t: translate, i18n } = useTranslation();

  // DATA, LOADING AND ERROR STATES
  const [data, setData] = useState<Statistics>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [activeScope, setActiveScope] = useState("ALL");
  const [isByCountryChartsLoaded, setIsByCountryChartsLoaded] = useState(false);

  // DATE STATE
  const [startDate, setStartDate] = useState("now-1y");

  // WIDGET PARAMS
  const embbedFunction = DEFAULT_EMBED_FUNCTION_NAME;
  const widgetParams = (window as any)[embbedFunction];
  const lang = (widgetParams && widgetParams.parameters.lang) || "es";

  const sourceId =
    (widgetParams && widgetParams.parameters.repository_source) ||
    DEFAULT_SOURCE_ID;

  const preview: boolean =
    widgetParams && widgetParams.parameters.preview !== false ? true : true;
  const [previewImage, setPreviewImage] = useState(preview);

  // Fetch data from API

  const fetchDataAsync = async () => {
    const identifier = getIdentifier(widgetParams);
    if (previewImage === true) return;
    setIsLoading(true);

    try {
      const resp = await fetchData(
        itemWs,
        identifier, // TODO: Quitar el DEFAULT_IDENTIFIER
        DEFAULT_SOURCE_ID,
        startDate || DEFAULT_START_DATE,
        DEFAULT_END_DATE,
        DEFAULT_TIME_UNIT
      );

      if (resp.level.buckets.length > 0) {
        setData(resp);
      } else {
        setError(true);
      }
      setIsLoading(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    i18n.changeLanguage(lang);
    fetchDataAsync();
  }, [previewImage, sourceId, startDate]);

  const handleDeletePreview = () => {
    startTransition(() => {
      setPreviewImage(false);
    });
  };
  const handleTabChange = (index: number) => {
    if (index === 1) {
      setIsByCountryChartsLoaded(true);
    }
    handleTabIndexChanged(index);
  };

  const handleTabIndexChanged = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box as="main" className="widget-container">
      {/* Show preview only the preview img */}
      {previewImage ? (
        <Box onClick={handleDeletePreview}>
          <PreviewImage />
        </Box>
      ) : (
        <>
          {data && (
            <Box bgColor="#f1fbf697">
              <Box display="flex" justifyContent="space-between" px="1" py="3">
                <ScopeButtons
                  data={data}
                  tabIndex={tabIndex}
                  activeScope={activeScope}
                  setActiveScope={setActiveScope}
                  scopeLabels={getScopeLabels(widgetParams, translate)}
                />
                <DateButtons
                  translate={translate}
                  setStartDate={setStartDate}
                  startDate={startDate}
                />
              </Box>
            </Box>
          )}

          {/* The tabs with the charts and the help img */}
          <Tabs
            bgColor="#f1fbf697"
            onChange={handleTabChange}
            borderBottom="1px solid #edddddaa"
          >
            <TabList>
              <Tab fontSize="sm" fontWeight="500">
                {translate("general-tab")}
              </Tab>
              <Tab fontSize="sm" fontWeight="500">
                {translate("by-country-tab")}
              </Tab>
              <Tab fontSize="sm" fontWeight="500">
                {translate("help-img-tab")}
              </Tab>
            </TabList>

            <TabPanels>
              {/* General tab */}
              <TabPanel>
                {!error ? (
                  <Box>
                    {isLoading || !data ? (
                      <Loading />
                    ) : (
                      <ChartsContainer
                        data={data}
                        translate={translate}
                        scopeLabels={getScopeLabels(widgetParams, translate)}
                        eventLabels={getEventLabels(translate)}
                        tabIndex={tabIndex}
                        activeScope={activeScope}
                        setActiveScope={setActiveScope}
                      />
                    )}
                  </Box>
                ) : (
                  <ErrorView />
                )}
              </TabPanel>

              {/* By country tab */}
              <TabPanel>
                {isByCountryChartsLoaded ? (
                  <Suspense fallback={<Loading />}>
                    <Box>
                      <ByCountryChartsContainer
                        tabIndex={tabIndex}
                        startDate={startDate}
                      />
                    </Box>
                  </Suspense>
                ) : (
                  <Box>Click the tab to load content</Box>
                )}
              </TabPanel>

              {/* Help tab */}
              <TabPanel padding={0}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Image objectFit="cover" src={helpImage} alt="" />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Footer img */}
          <Box p="1rem" display="flex" justifyContent="center">
            <Image src={logo} w="55%" alt="La referencia" />
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
