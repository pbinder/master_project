import {ChampionGuide} from "../models/ChampionGuide.model";
import {AATROX} from "./championguides/aatrox";
import {AHRI} from "./championguides/ahri";
import {AKALI} from "./championguides/akali";
import {AKSHAN} from "./championguides/akshan";
import {ALISTAR} from "./championguides/alistar";
import {AMUMU} from "./championguides/amumu";
import {ANIVIA} from "./championguides/anivia";
import {ANNIE} from "./championguides/annie";

export const ChampionGuides: {[id: string]: ChampionGuide} = {
	aatrox: AATROX,
	ahri: AHRI,
	akali: AKALI,
	akshan: AKSHAN,
	alistar: ALISTAR,
	amumu: AMUMU,
	anivia: ANIVIA,
	annie: ANNIE,
};
