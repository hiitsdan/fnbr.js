module.exports = {
	search: (keyword, limit, type) => {
		return `https://fnbr.co/api/images?search=${encodeURI(keyword)}&limit=${encodeURI(limit)}${type ? `&type=${encodeURI(type)}`: ''}`
	},
	shop: `https://fnbr.co/api/shop`,
	stats: `https://fnbr.co/api/stats`,
	upcoming: `https://fnbr.co/api/upcoming`
}