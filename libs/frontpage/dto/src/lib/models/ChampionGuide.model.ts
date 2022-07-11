export interface ChampionGuide {
	strengths: string;
	weaknesses: string;
	gameplan: {[id: string]: string};
	powerspikes: {[id: string]: string};
}
