define(function (require) {
	"use strict";

	var ko = require("knockout"),
		TreeViewNode = require("TreeViewNode");
	require("CustomBindings");
	
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

		var modelOptions;
		for (var key in options.modelOptions) {
			modelOptions = options.modelOptions[key];
			if (modelOptions.parseOptions) {
				modelOptions.parseOptions.nodeData = modelOptions.parseOptions.nodeData || options.parseOptions.nodeData;
				modelOptions.parseOptions.children = modelOptions.parseOptions.children || options.parseOptions.children;
			}
		}

		options.levelsShown = isNaN(options.levelsShown) ? 2 : options.levelsShown;

		this.root = new TreeViewNode(data, options);
	}
	return TreeView;
});