`use strict`

export interface HeaderModal {
  uniqueDataKey: string; //important as this maps to Data Model's key.
  numeric: boolean;
  label: string;
}

export interface DataModal {
  id: number|string;
  [key:string]: number|string;
}
