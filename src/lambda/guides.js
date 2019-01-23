"use strict";

import fetch from "node-fetch";
import cheerio from "cheerio";
import orderBy from "lodash.orderby";

exports.handler = async (event, context) => {
	const hero =
		(event.queryStringParameters &&
			event.queryStringParameters.hero &&
			event.queryStringParameters.hero.toLowerCase().replace(" ", "-")) ||
		"medusa";

	const promises = [];
	for (let page = 1; page <= 4; page++) {
		promises.push(getPage(page, hero));
	}

	const finalResult = [];
	await Promise.all(promises).then(results => {
		results.forEach(result => {
			finalResult.push(...result);
		});
	});

	return {
		statusCode: 200,
		body: JSON.stringify({
			result: finalResult
		}),
		headers: {
			"Access-Control-Allow-Origin": "*", // Required for CORS support to work
			"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
		}
	};
};

const getPage = async (page, hero) => {
	const pageStr = page > 1 ? `?page=${page}` : "";
	const response = await fetch(
		`https://www.dotabuff.com/heroes/${hero.replace("'", "")}/guides${pageStr}`
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
			items: $(x)
				.find(".top-right .image-container-medicon")
				.get()
				.map(el => ({
					name: $(el)
						.find("a")
						.attr("href")
						.substring(7)
						.replace("-", " "),
					image: $(el)
						.find("img")
						.attr("src")
						.replace("/assets", "https://www.dotabuff.com/assets")
				}))
		}));
};
