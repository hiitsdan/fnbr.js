"use strict";

const axios = require("axios");
const endpoints = require('../util/endpoints.js');
const types = require('../util/types.json').cosmetictypes;

class fnbrco {
	/**
	 * @param {String} apikey - Your API key for the fnbr.co API. Can be generated at https://fnbr.co/api/docs.
	 */
	constructor (apikey) {
		this.apikey = apikey;

		//axios(endpoints.stats, {headers: {'x-api-key': this.apikey}}).then(res => res.json()).then(json => { if(json.status === 401) throw new Error('Invalid or missing fnbr.co API key')});
	}

	/**
	 * Executes a GET request to a URL with the client's API key
	 * @param {String} url - The URL to request to, with the fnbr.co API key
	 * @returns {Promise} - node-fetch promise
	 */
	get (url) {
		return axios({url: url, headers: {'x-api-key': this.apikey}});
	}

	/**
	 * Gets the current shop rotation from fnbr.co
	 * @returns {Object}
	 */
	async getShop() {
		const response = await this.get(endpoints.shop);
		return {
			date: response.data.data.date,
			featured: response.data.data.featured,
			daily: response.data.data.daily
		}
	}

	/**
	 * Gets the stats of how many cosmetics there are in each rarity
	 * @returns {Object}
	 */
	async getStats() {
		const response = await this.get(endpoints.stats);
		return response.data;
	}

	/**
	 * Gets the upcoming items that have been datamined from the game files
	 * @returns {Array<Object>}
	 */
	async getUpcoming() {
		const response = await this.get(endpoints.upcoming);
		return response.data.data;
	}

	/**
	 * @param {String} name - The name of the cosmetic to search for
	 * @param {Number} [limit] - Limit the amount of items returned in the response (Must be an integer between 1 and 15)
	 * @param {String} [type] - Limits the returned items based on a cosmetic type
	 */
	async getItem(name, limit = 1, type) {
		if(!name) return new Promise(function(resolve, reject) {reject(new Error('name can not be null'))})
		if(limit) {
			if(!Number(limit)) return new Promise(function(resolve, reject) {reject(new Error('Invalid limit count'))})
			if(limit < 1 || limit > 15) return new Promise(function(resolve, reject) {reject(new Error('Invalid limit count'))})
		}
		if(type) {
			if(!types.includes(type)) return new Promise(function(resolve, reject) {reject(new Error('Invalid cosmetic type'))});
		}

		const response = await(this.get(endpoints.search(name, limit, type)));
		return response.data.data;
	}
}

module.exports = fnbrco;