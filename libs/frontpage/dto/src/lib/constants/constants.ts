import {ChampionGuide} from "../models/ChampionGuide.model";
import {AATROX} from "./championguides/aatrox";
import {AHRI} from "./championguides/ahri";
import {AKALI} from "./championguides/akali";
import {AKSHAN} from "./championguides/akshan";

export const ChampionGuides: {[id: string]: ChampionGuide} = {
	aatrox: AATROX,
	ahri: AHRI,
	akali: AKALI,
	akshan: AKSHAN,
};
