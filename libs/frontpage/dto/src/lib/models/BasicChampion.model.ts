import { ChampionStats } from "./ChampionStats.model";
import { Image } from "./Image.model";
import { Skin } from "./Skin.model";
import { Spell } from "./Spell.model";

export interface BasicChampion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number
  };
  image: Image
  skins: Skin[];
  allytips: string[],
  enemytips: string[],
  tags: string[];
  partype: string;
  stats: ChampionStats;
  spells: Spell[];
  passive: {
    name: string;
    description: string;
    image: Image
  }
}
