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
		let existing = agg[val.name];
		if(existing){
			existing.count++;
		}
		else {
			agg[val.name] = {
				name: val.name,
				count: 1,
				image: val.image
			};
		}
		
		return agg;
	}, {});
	
	const aggregatedArray = Object.keys(aggregated)
									.map(key => ({ 
										name: key, 
										count: aggregated[key].count,
										image: aggregated[key].image
									}));
	
	console.log(aggregatedArray)
	
	const sortedArray = orderBy(aggregatedArray, ['count'], ['desc']);
	
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
	
	const pageStr = page > 1 ? `&page=${page}` : "";
	const response = await fetch(`https://www.dotabuff.com/heroes/${hero}/guides${pageStr}`);
	const html = await response.text();
	const $ = cheerio.load(html);
	return $("div.top-right div.image-container.image-container-item.image-container-medicon").get()
			.map(el => ({
				name: $(el)
						.find("a")
						.attr("href")
						.substring(7), 
				image: $(el)
						.find("img")
						.attr("src")
						.replace("/assets", "https://www.dotabuff.com/assets")
			}));
};