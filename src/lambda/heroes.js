"use strict";

import fetch from "node-fetch";
import cheerio from "cheerio";

exports.handler = async (event, context) => {
	const response = await fetch("https://www.dotabuff.com/heroes");
	const html = await response.text();
	const $ = cheerio.load(html);
	const result = $("div.hero-grid .hero")
		.get()
		.map(x => ({
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
		}),
		headers: {
			"Access-Control-Allow-Origin": "*", // Required for CORS support to work
			"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
		}
	};
};
