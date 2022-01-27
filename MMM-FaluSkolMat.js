const dayName = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

Module.register("MMM-FaluSkolMat", {
	defaults: {
		url: ""
	},
	getStyles: function () {
		return ["modules/MMM-FaluSkolMat/css/main.css"];
	},
	// Notification from node_helper.js.
	// The RSS items are received here and copied. Then module is redrawn.
	// @param notification - Notification type.
	// @param payload - Contains url and array of items of RSS feed. Each item has a title and a description.
	socketNotificationReceived: function (notification, payload) {
		console.log(notification, payload);
		if (notification === "ITEMS") {
			if (payload.url === this.config.url) {
				this.items = payload.items || [];

				this.updateDom(0);
			}
		}
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");

		for (var i in this.items) {
			var item = this.items[i];

			var titleDiv = document.createElement("div");
			titleDiv.className = "itemtitle";
			titleDiv.innerHTML = dayName[i];
			wrapper.appendChild(titleDiv);

			var descDiv = document.createElement("div");
			descDiv.className = "itemdescription";
			descDiv.innerHTML = item.join("<br />");
			wrapper.appendChild(descDiv);
		}

		return wrapper;
	},

	// Override start to init stuff.
	start: function () {
		// Send anything to initiate communication / node helper.
		this.sendSocketNotification("START", { message: "start connection" });

		// Loading message. No translation needed, this is Swedish only anyway.
		this.items = [];
		this.items.push({ title: "Laddar...", description: "" });

		// Tell node_helper to load RSS feed at startup.
		//	Log("trigger reload", this.config);
		this.sendSocketNotification("LOAD_FEED", { url: this.config.url });

		// Make sure RSS feed is reloaded each hour.
		var self = this;
		setInterval(function () {
			self.sendSocketNotification("LOAD_FEED", { url: self.config.url });
		}, 4 * 60 * 60 * 1000); // In millisecs. Refresh every hour.
	}
});
