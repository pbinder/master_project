import { LiveRune } from "./LiveRune.model"
import { LiveSummonerSpell } from "./LiveSummonerSpell.model";

export interface LivePlayerData {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: [];
  level: number;
  position: string;
  rawChampionName: string;
  respawnTimer: number;
  runes: {
    keystone: LiveRune;
    primaryRuneTree: LiveRune;
    secondaryRuneTree: LiveRune;
  };
  scores: {
    assists: number;
    creepScore: number;
    deaths: number;
    kills: number;
    wardScore: number;
  };
  skinID: number;
  skinName: string;
  summonerName: string;
  summonerSpells: {
    summonerSpellOne: LiveSummonerSpell;
    summonerSpellTwo: LiveSummonerSpell;
  };
  team: string;
}
