import { BasicChampion } from "./BasicChampion.model";

export interface ChampionList {
  version: string;
  type: string;
  format: string;
  data: {
    [key: string]: BasicChampion;
  }
}
