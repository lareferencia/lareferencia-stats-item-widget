import { TFunction } from "i18next";
import { EventLabels, ScopeLabels } from "../interfaces/stadistics.interface";
import { DEFAULT_SCOPE_LABELS } from "../config";

export const getScopeLabels = (widgetParams: any, translate:TFunction) => {

    let scopeLabels: ScopeLabels;

    if (widgetParams && widgetParams.parameters.scope_labels) {
      scopeLabels = {
        L: "LA Referencia",
        N: widgetParams.parameters.scope_labels.N,
        R: widgetParams.parameters.scope_labels.R,
        ALL: `${translate("total-events")}`
      }
    } else {
      scopeLabels = {
        L: DEFAULT_SCOPE_LABELS.L,
        N: DEFAULT_SCOPE_LABELS.N, // Traducir esto luego.
        R: `${translate("repository")}`,
        ALL: `${translate("total-events")}`
      }
    }
    return scopeLabels;
  }

export const getEventLabels = (translate:TFunction) => {
    const eventLabels: EventLabels = {
        views: `${translate("views")}`,
        downloads:`${translate("downloads")}`,
        outlinks: `${translate("outlinks")}`,
        conversions: `${translate("conversions")}`
    };
    return eventLabels;
}