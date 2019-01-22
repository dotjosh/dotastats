'use strict';

import fetch from "node-fetch"
import cheerio from "cheerio"
import orderBy from "lodash.orderby"

exports.handler = async (event, context) => {
	const hero = (event.queryStringParameters 
					&& event.queryStringParameters.hero 
					&& event.queryStringParameters.hero.toLowerCase().replace(" ", "-"))
				|| "medusa";
	const promises = [];
	for(var page = 1; page <= 4; page++){
		promises.push(getPage(page, hero));
	}
	
	const finalResult = [];
	await Promise.all(promises).then(results => {
		results.forEach(result => {
			finalResult.push(...result);
		});
	});
	
	const aggregated = finalResult.reduce((agg, val) => {
		if(agg[val]){
			agg[val]++;
		}
		else {
			agg[val] = 1;
		}
		
		return agg;
	}, {});
	
	const aggregatedArray = Object.keys(aggregated)
									.map(key => ({ item: key, count: aggregated[key] }));
	
	const sortedArray = orderBy(aggregatedArray, ['count'], ['desc'])
	
	return {
    statusCode: 200,
    body: JSON.stringify({
      result: sortedArray
    }),
	headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
  };
};

const getPage = async (page, hero) => {
	const response = await fetch(`https://www.dotabuff.com/heroes/${hero}/guides`);
	const html = await response.text();
	const $ = cheerio.load(html);
	return $("div.image-container-medicon a").get()
			.map(el => $(el).attr("href"))
			.map(href => href.substring(7));
}