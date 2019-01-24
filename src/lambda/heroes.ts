"use strict";

import fetch from "node-fetch"; 
import cheerio from "cheerio";
import { HeroResponse, Hero } from "../types"
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';

export const handler: Handler = async (ev: APIGatewayEvent, context: Context) => {
	const response = await fetch("https://www.dotabuff.com/heroes");
	const html = await response.text();
	const $ = cheerio.load(html);
	const result = $("div.hero-grid .hero")
		.get()
		.map<Hero>(x => ({
			name: $(x)
				.find(".name")
				.text(),
			image: $(x)
				.css("background")
				.replace("/assets", "https://www.dotabuff.com/assets")
		}));
	return {
		statusCode: 200,
		body: JSON.stringify({
			result: result
		} as HeroResponse),
		headers: {
			"Access-Control-Allow-Origin": "*", // Required for CORS support to work
			"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
		}
	};
}; 

