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

export const MID_COORDINATES = [140, 140];
export const BOTTOM_COORDINATES = [240, 235];
export const TOP_COORDINATES = [35, 35];
export const DRAGON_COORDINATES = [185, 195];
export const BARON_COORDINATES = [90, 80];

//TURRET COORDINATES Team 1
export const TURRETT1C1 = [40, 245];
export const TURRETT1C2 = [30, 230];
export const TURRETT1C3 = [70, 205];
export const TURRETT1C4 = [90, 185];
export const TURRETT1C5 = [115, 160];
export const TURRETT1L1 = [17, 195];
export const TURRETT1L2 = [20, 150];
export const TURRETT1L3 = [20, 75];
export const TURRETT1R1 = [80, 255];
export const TURRETT1R2 = [130, 255];
export const TURRETT1R3 = [200, 255];

//TURRET COORDINATES Team 2
export const TURRETT2C1 = [235, 30];
export const TURRETT2C2 = [250, 40];
export const TURRETT2C3 = [210, 65];
export const TURRETT2C4 = [190, 90];
export const TURRETT2C5 = [165, 115];
export const TURRETT2L1 = [195, 18];
export const TURRETT2L2 = [150, 20];
export const TURRETT2L3 = [75, 20];
export const TURRETT2R1 = [260, 80];
export const TURRETT2R2 = [260, 130];
export const TURRETT2R3 = [260, 200];
