const fetch = require("node-fetch");
const { parse } = require("node-html-parser");
const NodeHelper = require("node_helper");

const getDays = (root) => root.querySelectorAll("div.day-menus-container");
const getTexts = (days) => days.map((day) => day.querySelectorAll(".meal-text").map((p) => p.childNodes[0]._rawText.trim()));

const getWeekMenu = (url) =>
	fetch(url)
		.then((d) => d.text())
		.then((html) => parse(html))
		.then(getDays)
		.then(getTexts);

module.exports = NodeHelper.create({
	start: function () {},

	// Send RSS items to the module js.
	// @param url - URL of the RSS feed.
	// @param items - Array of RSS items. Each item has a title and a description.
	// @param self - Pointer to this. Needed when this method is used as callback.
	broadcastItems: function (url, items, self) {
		self.sendSocketNotification("ITEMS", {
			url,
			items
		});
	},

	// Notification from module js.
	// @param notification - Notification type.
	// @param payload - Contains url of RSS feed.
	socketNotificationReceived: function (notification, payload) {
//		Log("notification!!!");
		if (notification === "LOAD_FEED") {
			this.loadFeed(payload.url, this.broadcastItems);
		}
	},

	// Load and parse an RSS feed.
	// @param url - URL of the RSS feed.
	// @param allEntriesParsedCB - Callback called when all RSS items have been parsed.
	//                             See broadcastItems() for args doc.
	loadFeed: function (url, allEntriesParsedCB) {
		const self = this;
		getWeekMenu(url).then((d) => {
			console.log('got items',d);
			allEntriesParsedCB(url, d, self);
		});
	}
});
