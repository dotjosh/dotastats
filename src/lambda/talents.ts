"use strict";

import fetch from "node-fetch";
import cheerio from "cheerio";
import { TalentResponse, Talent } from "../types";
import { Handler, Context, APIGatewayEvent } from "aws-lambda";

export const handler: Handler = async (
	ev: APIGatewayEvent,
	context: Context
) => {
	const hero =
		(ev.queryStringParameters &&
			ev.queryStringParameters.hero &&
			ev.queryStringParameters.hero.toLowerCase().replace(" ", "-")) ||
		"medusa";

		const response = await fetch(
			`https://www.dotabuff.com/heroes/${hero}/builds`
		);
		const html = await response.text();
		const $ = cheerio.load(html);
		
		const result = $(".talent-name-inner")
			.get()
			.map(x => ({
				name: $(x)
					.text()
					.trim()
			}));

	return {
		statusCode: 200,
		body: JSON.stringify({
			result: result
		} as TalentResponse),
		headers: {
			"Access-Control-Allow-Origin": "*", // Required for CORS support to work
			"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
		}
	};
};
