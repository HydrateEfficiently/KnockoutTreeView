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

	ko.bindingHandlers.treeView = {
		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var root = allBindings().treeView.root,
				internalList = document.createElement("ul");
			internalList.style["list-style-type"] = "none";
			internalList.style["margin-top"] = "0px";
			internalList.style["margin-top"] = "0px";
			internalList.style.padding = "0px";
			element.appendChild(internalList);
			ko.applyBindingsToNode(internalList, { template: { name: 'tree-node', data: root } });
			return { controlsDescendantBindings: true };
		}
	};

	return TreeView;

});