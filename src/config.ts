// API CONFIG
export const DEFAULT_EMBED_FUNCTION_NAME = 'lrw';
export const DEFAULT_BASE_URL = 'https://stats.lareferencia.info/api/usage_stats/v2';
export const DEFAULT_ITEM_WS = '/report/itemWidget';
export const DEFAULT_BY_COUNTRY_WS = '/report/itemWidgetByCountry';

export const DEFAULT_IDENTIFIER = 'oai:sedici.unlp.edu.ar:10915/133341'
export const DEFAULT_SOURCE_ID = 'opendoar::1329';
export const DEFAULT_START_DATE = 'now-1y';
export const DEFAULT_END_DATE = 'now';
export const DEFAULT_TIME_UNIT = 'year';

// SCOPES CONFIG
export const DEFAULT_SCOPES_KEYS = ['L', 'N', 'R', 'ALL'];
export const DEFAULT_SCOPE_LABELS = {
    L: 'LA Referencia',
    N: 'Nodo Nacional',
    R: 'Repositorio',
    ALL: 'Total de eventos'
};

// EVENTS CONFIG
export const DEFAULT_EVENTS_LABELS = ['views', 'downloads', 'outlinks', 'conversions'];
export const DEFAULT_EVENTS_LABELS_KEYS = {
    V: 'views',
    D: 'downloads',
    O: 'outlinks',
    C: 'conversions'
};
