import { LiveAbility } from "./LiveAbility.model";
import { LiveChampionStats } from "./LiveChampiontStats.model"
import { LiveRune } from "./LiveRune.model";

export interface ActivePlayerData {
  abilities: {
    [key: string]: LiveAbility
  }
  championStats: LiveChampionStats
  currentGold: number;
  fullRunes : {
    generalRunes: LiveRune[],
    keyStone: LiveRune,
    primaryRuneTree: LiveRune,
    secondaryRuneTree: LiveRune,
    statRunes: LiveRune[]
  }
  level: number;
  summonerName: string
}
