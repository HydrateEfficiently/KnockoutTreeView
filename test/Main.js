define(function (require) {

	var testData = {"Children":[{"Children":[{"Children":[{"Children":[{"Children":[],"Item":{"ApplicationId":5,"RoundId":2,"AuthorId":2020249,"ProfileDepartmentId":9,"ApplicationType":0}}],"Item":{"Name":"School of Educational Studies and Leadership"}}],"Item":{"Name":"College of Education"}},{"Children":[{"Children":[{"Children":[],"Item":{"ApplicationId":4,"RoundId":2,"AuthorId":4046900,"ProfileDepartmentId":25,"ApplicationType":0}}],"Item":{"Name":"Civil and Natural Resources Engineering"}}],"Item":{"Name":"College of Engineering"}}],"Item":{"Name":"Option 1"}},{"Children":[{"Children":[{"Children":[{"Children":[],"Item":{"ApplicationId":3,"RoundId":2,"AuthorId":2173496,"ProfileDepartmentId":9,"ApplicationType":1}}],"Item":{"Name":"School of Educational Studies and Leadership"}}],"Item":{"Name":"College of Education"}}],"Item":{"Name":"Option 2"}}],"Item":{"Name":"Application Type"}};

	var ko = require("knockout"),
		TreeView = require("TreeView");

	function OrganisationalUnit(data) {
		var self = this;
		this.name = data.Name;
		this.toString = function () {
			return self.name;
		};
	}

	function Application(data) {
		var self = this;
		this.authorId = data.AuthorId;
		this.toString = function () {
			return self.authorId;
		};
	}

	function main() {
		ko.applyBindings(new TreeView(testData, {
			parseOptions: {
				nodeData: "Item",
				children: "Children"
			},
			modelOptions: {
				"n": {
					model: Application
				},
				"*": {
					model: OrganisationalUnit
				}
			}
		}));
	}

	return main;

});