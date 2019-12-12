import { HeroResponse, GuideResponse, Hero, TalentResponse } from "./types";

const api = {
	getHeroes: (): Promise<HeroResponse> =>
		fetch("/.netlify/functions/heroes").then(resp => resp.json()),
	getGuide: (hero: Hero): Promise<GuideResponse> =>
		fetch(`/.netlify/functions/guides?hero=${hero.name}`).then(resp =>
			resp.json()
		),
	getTalents: (hero: Hero): Promise<TalentResponse> =>
		fetch(`/.netlify/functions/talents?hero=${hero.name}`).then(resp => resp.json())
};

export default api;
