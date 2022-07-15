import {Injectable} from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class DataDragonService {
	getChampionSkinTile(championName: string, skinNumber: number | undefined): string {
		return `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${championName + "_" + skinNumber}.jpg`;
	}
}
