export interface HeroResponse {
	result: Hero[];
}

export interface Hero {
	name: string;
	image: string;
}

export interface GuideResponse {
	result: Guide[];
}

export interface Guide {
	lane: string;
	role: string;
	items: Item[];
	talents: Talent[];
}

export interface Item {
	name: string;
	image: string;
	timing: number;
}

export interface TalentResponse {
	result: Talent[]
}

export interface Lane {
	text: string;
	value: LaneRole | null;
}

export interface LaneRole {
	role: string,
	lane: string
}

export interface Talent {
	name: string;
}
