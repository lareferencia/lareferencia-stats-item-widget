import React from "react";
import {
  EventLabels,
  ScopeLabels,
  Statistics,
} from "../../interfaces/stadistics.interface";
import { Dashboard } from "./dashboard/Dashboard";
import { TFunction } from "i18next";
const RingsChart = React.lazy(() => import("./rings-chart/RingsChart"));
const StackedBarChart = React.lazy(
  () => import("./stacked-barchart/StackedBarChart")
);

type ChartsContainerProps = {
  data: Statistics;
  scopeLabels: ScopeLabels;
  eventLabels: EventLabels;
  translate: TFunction;
  tabIndex: number;
  activeScope: string;
  setActiveScope: (scope: string) => void;
};

const ChartsContainer = ({
  data,
  scopeLabels,
  eventLabels,
  tabIndex,
  activeScope,
  setActiveScope,
}: ChartsContainerProps) => {
  return (
    <>
      <RingsChart
        data={data}
        scopeLabels={scopeLabels}
        eventLabels={eventLabels}
        setActiveScope={setActiveScope}
        tabIndex={tabIndex}
      />

      <StackedBarChart
        data={data}
        scopeLabels={scopeLabels}
        eventLabels={eventLabels}
        activeScope={activeScope}
        setActiveScope={setActiveScope}
      />

      <Dashboard
        data={data}
        scopeLabels={scopeLabels}
        eventLabels={eventLabels}
        activeScope={activeScope}
      />
    </>
  );
};

export default ChartsContainer;
