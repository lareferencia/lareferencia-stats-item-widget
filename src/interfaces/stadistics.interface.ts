export interface Events {
    Fecha: string;
    eventData: EventData
}

export interface MergedEvents {
    Fecha: string;
    eventData: EventData[]
}

export interface EventData {
    scope: "L" | "R" | "N" ;
    event: string;
    [key: string]: string | number | undefined ;
}

export interface BarChartProps {
    data: Stadistics;
    scopeLabels: ScopeLabels;
    eventLabels: EventLabels
    styles?: any;
}

export interface ScopeLabels{
    L: string;
    N: string;
    R: string;
}

export interface EventLabels{
    view: string;
    download: string;
    outlink: string;
}

export interface Stadistics {
    level: Level;
}

export interface Level {
    doc_count_error_upper_bound: number;
    sum_other_doc_count:         number;
    buckets:                     LevelBucket[];
}

export interface LevelBucket {
    key:       'R' | 'N' | 'L';
    doc_count: number;
    action:    Action;
}

export interface Action {
    doc_count_error_upper_bound: number;
    sum_other_doc_count:         number;
    buckets:                     ActionBucket[];
}

export interface ActionBucket {
    key:       'view' | 'download' | 'outlink';
    doc_count: number;
    time:      Time;
}

export interface Time {
    buckets: TimeBucket[];
}

export interface TimeBucket {
    key_as_string: Date;
    key:           number;
    doc_count:     number;
}
