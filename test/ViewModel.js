define(function (require) {

	var ko = require("knockout"),
		TreeView = require("TreeView"),
		testData = require("../test/testdata");

	function Root(data) {
		var self = this;
		this.name = data.Name;
		this.toString = function () {
			return self.name;
		};
	}

	function Region(data) {
		var self = this;
		this.location = data.Location;
		this.toString = function () {
			return self.location;
		};
	}

	function Branch(data) {
		var self = this;
		this.name = data.Name;
		this.department = data.Department;
		this.toString = function () {
			return self.name + ", " + self.department;
		};
	}

	function Employee(data) {
		var self = this;
		this.name = data.Name;
		this.title = data.Title;
		this.salary = data.Salary;
		this.toString = function () {
			return self.name + ", " + self.title + ", $" + self.salary;
		};
	}

	function ViewModel() {
		this.employees = new TreeView(testData, {
			modelOptions: {
				"n": {
					model: Employee
				},
				"n-1" : {
					model: Branch
				},
				"*": {
					model: Region
				},
				"0": {
					model: Root
				}
			}
		});
	}

	return ViewModel;

});