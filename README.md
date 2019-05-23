# fnbr.co.js
This is a simple wrapper for the [fnbr.co](https://fnbr.co/api/docs) API.

Remember to leave credit to fnbr.co in any applications that you make! This wouldn't be possible without them <3

# Installation
To start, install this module using npm:
```
npm install fnbr.coapi --save
```

# Setup

In order to use this package, you will need to get access to the fnbr.co API. This can be requested on the fnbr.co [Discord server](https://fnbr.co/discord) within the #request-api-access channel. You can then [login](https://fnbr.co/oauth) using Discord on the fnbr.co website and generate your key [here](https://fnbr.co/api/docs).

First, require the package.

```js
const fnbrcoapi = require('fnbr.coapi');
```

Then, create a new fnbr.coapi client with your API key.

```js
const fnbrcoapi = require('fnbr.coapi');
const fnbrco = new fnbrcoapi('example-api-key-12345-67890');
```
Please note that you should **not** hard code your API key.

If your API key is invalid, the package will error when creating the client.

# Usage

There are 4 main methods within this package, as well as 1 extra for special cases.

## getShop()

```js
fnbrco.getShop().then(shop => {
	console.log(shop);
}).catch(err => {
	console.log(err);
});
```

This method will return a JSON object of the shop including the date that it was last updated, an array of featured items and an array of daily items.

```json
{
	"date": "2019-05-28T00:00:00.000Z",
	"featured": [{}, {}],
	"daily": [{}, {}]
}
```
More information about the contents of each item object can be found [here](#item)

## getStats()

```js
fnbrco.getStats().then(stats => {
	console.log(stats);
}).catch(err => {
	console.log(err);
});
```

This method will return an object containing the amount of items in each cosmetic type and cosmetic rarity.

```json
{
	"totalCosmetics": 1809,
  	"matrix": [ 
		{ "type": "backpack",
			"rarity": [
				{ "rarity": "uncommon", "count": 8 },
				{ "rarity": "legendary", "count": 67 },
				{ "rarity": "marvel", "count": 2 },
				{ "rarity": "epic", "count": 135 },
				{ "rarity": "rare", "count": 52 } 
			]
		},
		{ "type": "emoji", "rarity": [] },
		{ "type": "outfit", "rarity": [] },
		{ "type": "emote", "rarity": [] },
		{ "type": "toy", "rarity": [] },
		{ "type": "umbrella", "rarity": [] },
		{ "type": "glider", "rarity": [] },
		{ "type": "wrap", "rarity": [] },
		{ "type": "skydive", "rarity": [] },
		{ "type": "pickaxe", "rarity": [] },
		{ "type": "music", "rarity": [] },
		{ "type": "pet", "rarity": [] },
		{ "type": "loading", "rarity": [] },
		{ "type": "spray", "rarity": [] },
		{ "type": "bundle", "rarity": [] } ],
	"unreleased": 23 
}
```

## getUpcoming()

```js
fnbrco.getUpcoming().then(upcoming => {
	console.log(upcoming);
}).catch(err => {
	console.log(err);
});
```

This method will return an array of upcoming items that have been datamined from the files, but have not yet appeared in the item shop.

```json
[
	{},
	{},
	{}
]
```

More information about the contents of each item object can be found [here](#item)

## getItem(name, [limit], [type])

This method will accept up to 3 parameters.

| Parameter name | Description                                                                                                                                                                                                         | Datatype |  Example | Required |
|---------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------:|---------:|
| name           | A string of the full name of the cosmetic to search for. Case insensitive.                                                                                                                                          | String   | 'Raptor' | Yes      |
| limit          | The maximum number of items to return based on the name. Must be between 1 and 15. Defaults to 1.                                                                                                                   | Integer  | 3        | No       |
| type           | Limit the returned results to a certain cosmetic type. Must be one of the following:  backpack,  emoji,  emote,  glider,  loading,  misc,  music,  outfit,  pet,  pickaxe,  skydive,  spray,  toy,  umbrella,  wrap | String   | 'outfit' | No       |


```js
fnbrco.getItem('Raptor').then(items => {
	console.log(items);
}).catch(err => {
	console.log(err);
});
```
or
```js
fnbrco.getItem('Raptor', 3).then(items => {
	console.log(items);
}).catch(err => {
	console.log(err);
});
```
or
```js
fnbrco.getItem('Raptor', 3, 'outfit').then(items => {
	console.log(items);
}).catch(err => {
	console.log(err);
});
```

This method will return an array of items that were found related to the search criteria. If no matches were found, an empty array will be returned.

```json
[
	{},
	{}
]
```
or
```json
[]
```

More information about the contents of each item object can be found [here](#item)

# get()

This method should only be used in special cases. For example, if fnbr.co add a new endpoint which this package has not been updated to support yet, you can use this method to send a GET request to a URL which has your API key header automatically assigned.

```js
fnbrco.get('https://fnbr.co/api/new-endpoint').then(response => {
	console.log(response);
}).catch(err => {
	console.log(err);
});
```

This will return an axios request object. The response from fnbr.co itself can be found within the `response.data.data` property.

# Item

Most endpoints will return objects that contain information about the cosmetic. Some properties of the item object are guaranteed to exist, however, some are not guaranteed.

An example of an item object can be seen below, along with comments describing each property.

```json
{ 
	"id": "5cccd605077b8406ceadeb9b", // The ID of the item
    "name": "Dream", // The name of the item
    "price": "1,200", // The price of the item, either a price in vbucks or a season and tier for battle pass items
    "priceIcon": "vbucks", // The type of price for the item, either 'vbucks', 'vbook', 'vip' or 'fip'
	"priceIconLink": "https://image.fnbr.co/price/icon_vbucks.png", // The image URL of the price icon type
	"images": { // An object with multiple image types
		"icon": "https://image.fnbr.co/outfit/5cccd605077b8406ceadeb9b/icon.png", // The URL of the icon image
		"png": false, // The URL of the png image
		"gallery": false, // The URL of the gallery image
		"featured": "https://image.fnbr.co/outfit/5cccd605077b8406ceadeb9b/featured.png" // The URL of the featured image
	},
    "rarity": "rare", // The rarity of the item, either 'common', 'uncommon', 'rare', 'epic', 'legendary' or 'marvel'
    "type": "outfit", // The type of the item, either 'backpack', 'emoji', 'emote', 'glider', 'loading', 'misc', 'music', 'outfit', 'pet', 'pickaxe', 'skydive', 'spray', 'toy', 'umbrella' or 'wrap'
    "slug": "dream", // The slug of the item (used in item page URLs)
    "readableType": "Outfit", // The readable type of the item
	"description": "Light breaks through." // The description of the item
}
```

If an encrypted item appears in the item shop, the "icon" property within the "images" object will be the url of a placeholder for a while until a staff member of fnbr.co updated the image with the item icon.

For upcoming items, the price will be set to '???', the priceIcon and priceIconLink will be false.

Every item will have an "icon" URL within the images object, whether that is a placeholder image or the image of the item itself.

Only featured items will have a "featured" URL within the images object. This will be set to false if it does not have one.

Some items have a "png" URL within the images object. This will be set to false if it does not have one.

Some items have a "gallery" URL within the images object. THis will be set to false if it does not have one.

# Support

If you require help with the fnbr.co API, please ask over on the [fnbr.co Discord server](https://fnbr.co/discord) in the #api-support channel or #support channel.

If you find an issue with this package, please contact me on one of the following:

[@helloitsdann](https://twitter.com/helloitsdann) on Twitter

@dAn#0001 on Discord

[dan.tarr@dans.website](mailto:dan.tarr@dans.website) via email