import { ScopeLabels } from "../../../../interfaces/stadistics.interface";

export const findScopeKey = ( scopeLabels: ScopeLabels, scopeName:string | undefined ) =>  {
    for (const key in scopeLabels) {
      if (scopeLabels.hasOwnProperty(key) && scopeLabels[key as keyof ScopeLabels] === scopeName) {
        return key;
      }
    }
    return 'ALL';
  } 