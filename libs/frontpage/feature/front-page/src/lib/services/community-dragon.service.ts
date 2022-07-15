import {Injectable} from "@angular/core";
import {CommunityDragonRune} from "@visual-analytics/frontpage/dto";
import {PATCH} from "../constants/constants";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import perksJson from "apps/visual-analytics/src/assets/resources/communityDragon/perks.json";

@Injectable({
	providedIn: "root",
})
export class CommunityDragonService {
	getAbilityIcon(championName: string, ability: string) {
		return `https://cdn.communitydragon.org/${PATCH}/champion/${championName}/ability-icon/${ability}`;
	}

	getRunePerks(): CommunityDragonRune[] {
		return perksJson;
	}
}
