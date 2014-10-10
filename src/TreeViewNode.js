define(function (require) {

	var ko = require("knockout");

	function getLevelIds(level, numberOfLevels) {
		var maxLevel = numberOfLevels - 1;
		return [
			level + "",
			level === maxLevel ? "n" : "n-" + (maxLevel - level),
			"*"
		];
	}

	function getModelOptions(levelIds, modelOptions) {
		for (var i = 0; i < levelIds.length; i++) {
			if (modelOptions[levelIds[i]]) {
				return modelOptions[levelIds[i]];
			}
		}
	}

	function createModel(modelOptions, nodeData) {
		if (typeof(modelOptions.model) === "function") {
			return new modelOptions.model(nodeData);
		} else if (typeof modelOptions.modelFactory === "function") {
			return modelFactory(nodeData);
		}
	}

	function getDisplayText(model, modelOptions) {
		var display = modelOptions.display;
		if (!display) {
			display = "toString";
		}

		if (typeof(display) === "function") {
			return display(model);
		} else if (typeof (display) === "string") {
			var prop = model[display];
			if (prop) {
				if (typeof(prop) === "function") {
					return prop();
				} else {
					return prop;
				}
			} else {
				return display;
			}
		}
	}
	
	function TreeViewNode(data, options, level) {
		if (isNaN(level)) {
			level = 0;
		}

		var self = this,
			levelIds = getLevelIds(level, options.levels),
			modelOptions = getModelOptions(levelIds, options.modelOptions),
			model = createModel(modelOptions, data[options.parseOptions.nodeData]),
			childrenData = data[options.parseOptions.children];

		this.children = ko.observableArray(ko.utils.arrayMap(data[options.parseOptions.children], function (child) {
			return new TreeViewNode(child, options, level + 1);
		}));
		this.displayText = getDisplayText(model, modelOptions);

		this.isLeaf = ko.computed(function () {
			return self.children().length === 0;
		});

		this.expanded = ko.observable(level < options.levelsShown - 1);
		this.collapsed = ko.computed(function () {
			return !self.expanded();
		});
		this.toggleExpanded = function () {
			self.expanded(!self.expanded());
		};

		this.isSelected = ko.observable(false);
		this.isSelected.subscribe(function () {
			self._unsubscribeFromChildren();
			self._forEachChild(function (child) {
				var isSelected = self.isSelected();
				if (isSelected !== null) {
					child.isSelected(self.isSelected());
				}
			});
			self._subscribeToChildren();
		});
		this._childSubscriptions = [];
		this._subscribeToChildren();
	}

	TreeViewNode.prototype._subscribeToChildren = function () {
		var self = this;
		this._forEachChild(function (child) {
			self._childSubscriptions.push(child.isSelected.subscribe(function () {
				self.isSelected(self._getIsSelectedStateFromChildren());
			}));
		});
	};

	TreeViewNode.prototype._unsubscribeFromChildren = function () {
		ko.utils.arrayForEach(this._childSubscriptions, function (subscription) {
			subscription.dispose();
		});
	};

	TreeViewNode.prototype._forEachChild = function (action) {
		ko.utils.arrayForEach(this.children(), function (child) {
			action(child);
		});
	};

	TreeViewNode.prototype._filterChildren = function (filter) {
		return ko.utils.arrayFilter(this.children(), function (child) {
			return filter(child);
		});
	};

	TreeViewNode.prototype._countChildren = function (filter) {
		return this._filterChildren(filter).length;
	};

	TreeViewNode.prototype._getIsSelectedStateFromChildren = function () {
		var selectedChildren = this._filterChildren(function (child) {
				return child.isSelected();
			});

		if (selectedChildren.length === this.children().length) {
			return true;
		} else if (selectedChildren.length === 0) {
			var indeterminateChildren = this._filterChildren(function (child) {
					return child.isSelected() === null;
				});
			if (indeterminateChildren.length === 0) {
				return false;
			} else {
				return null;
			}
		} else {
			return null;
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

	return TreeViewNode;
});