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
	items: Item[];
}

export interface Item {
	name: string;
	image: string;
}

export interface Lane {
	text: string;
	value: string | null;
}
