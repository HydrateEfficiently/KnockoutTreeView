define(function (require) {

	var ko = require("knockout");

	ko.bindingHandlers.treeView = {
		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var root = allBindings().treeView.root,
				internalList = document.createElement("ul");
			internalList.style["list-style-type"] = "none";
			internalList.style["margin-top"] = "0px";
			internalList.style["margin-bottom"] = "0px";
			internalList.style.padding = "0px";
			element.appendChild(internalList);
			ko.applyBindingsToNode(internalList, { template: { name: 'tree-node', data: root } });
			return { controlsDescendantBindings: true };
		}
	};

	ko.bindingHandlers.nullableChecked = {
		init: function(element, valueAccessor) {
			ko.bindingHandlers.checked.init(element, valueAccessor);
		},

		update: function (element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			if (value === null) {
				element.indeterminate = true;
			} else {
				element.indeterminate = false;
			}
			ko.bindingHandlers.checked.update(element, valueAccessor);
		}
	};
});