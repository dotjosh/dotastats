"use strict";

import fetch from "node-fetch";
import cheerio from "cheerio";
import { GuideResponse, Guide } from "../types";
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

	const promises = [];
	for (let page = 1; page <= 4; page++) {
		promises.push(getPage(page, hero));
	}

	const finalResult: Guide[] = [];
	await Promise.all(promises).then(results => {
		results.forEach(result => {
			finalResult.push(...result);
		});
	});

	return {
		statusCode: 200,
		body: JSON.stringify({
			result: finalResult
		} as GuideResponse),
		headers: {
			"Access-Control-Allow-Origin": "*", // Required for CORS support to work
			"Access-Control-Allow-Credentials": "true" // Required for cookies, authorization headers with HTTPS
		}
	};
};

const getPage = async (page: number, heroName: string): Promise<Guide[]> => {
	const pageStr = page > 1 ? `?page=${page}` : "";
	const response = await fetch(
		`https://www.dotabuff.com/heroes/${heroName.replace(/ /g, "-").replace("'", "")}/guides${pageStr}`
	);
	const html = await response.text();
	const $ = cheerio.load(html);
	return $(".r-stats-grid")
		.get()
		.map(x => ({
			lane: $(x)
				.find(".lane-icon")
				.parent()
				.contents()
				.eq(1)
				.text()
				.trim(),
			role: $(x)
				.find(".role-icon")
				.parent()
				.contents()
				.eq(1)
				.text()
				.trim(),
			items: $(x)
				.find(".top-right .image-container-medicon")
				.get()
				.map(el => ({
					name: $(el)
						.find("a")
						.attr("href")
						.substring(7)
						.replace(/-/g, " "),
					image: $(el)
						.find("img")
						.attr("src")
						.replace("/assets", "https://www.dotabuff.com/assets"),
					timing: timeToSeconds($(el)
						.parent()
						.find(".time")
						.text())
				})),
			talents: $(x)
				.find(".image-skill")
				.get()
				.map((el, index) => ({
					name: $(el)
						.attr("alt")
						.replace("Talent: ", ""),
					level: index
				}))
		}));
};

export function timeToSeconds(val: string) {
	var time = val.split(":");
	if (time.length == 2)
		return (+time[0]) * 60 + (+time[1]);
	else
		return (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]);
}
