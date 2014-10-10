define(function (require) {
	"use strict";

	var ko = require("knockout"),
		TreeViewNode = require("TreeViewNode");
	
	function TreeView(data, options) {
		options = options || {};

		options.parseOptions = options.parseOptions || {};
		options.parseOptions.nodeData = options.parseOptions.nodeData || "nodeData";
		options.parseOptions.children = options.parseOptions.children || "children";

		options.modelOptions = options.modelOptions || { };
		options.modelOptions["*"] = options.modelOptions["*"] || { 
			model: function (data) {
				this.data = data;
				this.toString = function () {
					return JSON.stringify(this.data);
				};
			}
		};

		options.levelsShown = isNaN(options.levelsShown) ? 2 : options.levelsShown;

		this.root = new TreeViewNode(data, options);
	}

	return TreeView;

});