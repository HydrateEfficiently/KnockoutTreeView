define(function (require) {
	"use strict";

	var ko = require("knockout"),
		TreeViewNode = require("TreeViewNode");

	function getNumberOfLevels(data, childrenKey) {
		var levels = 1,
			children = data[childrenKey],
			numberOfChildren;

		if (data.Name) {
			data.Item = {
				Name: data.Name
			};
		}
		delete data.Name;

		if (children) {
			numberOfChildren = children.length;
			for (var i = 0; i < numberOfChildren; i++) {
				levels = Math.max(getNumberOfLevels(children[i], childrenKey) + 1, levels);
			}
		}

		return levels;		
	}
	
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

		options.levels = getNumberOfLevels(data, options.parseOptions.children);
		options.levelsShown = Math.min((isNaN(options.levelsShown) ? 2 : options.levelsShown), options.levels);

		this.root = new TreeViewNode(data, options || {});
	}

	return TreeView;

});