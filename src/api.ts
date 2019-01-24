import { HeroResponse, GuideResponse, Hero } from "./types";

const api = {
	getHeroes: (): Promise<HeroResponse> =>
		fetch("/.netlify/functions/heroes").then(resp => resp.json()),
	getGuide: (hero: Hero): Promise<GuideResponse> =>
		fetch(`/.netlify/functions/guides?hero=${hero.name}`).then(resp =>
			resp.json()
		)
};

export default api;
