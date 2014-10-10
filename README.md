# KnockoutTreeView

Select your data by logical group with KnockoutTreeView!

![Example](http://i.imgur.com/OKehckS.png "Example")

## Basic Use
```javascript
var data = {
        nodeData: { 
            name: rootNode,
            value: 10
        },
        children: [
            {
                nodeData: { 
                    name: leafNodeA,
                    value: 12
                },
                children: [ ]
            },
            {
                nodeData: { 
                    name: leafNodeB,
                    value: 8
                },
                children: [ ]
            }
        ]
    };

ko.applyBindings(new TreeView(data));
```

## Customizing Input Object
Easily modified to parse JSON from different sources, by aliasing the "nodeData" and "children" properties!
```javascript
ko.applyBindings(new TreeView(data, {
    parseOptions: {
        nodeData: customNodeDataName,
        children: customChildrenName
    }
}));
```

## Tree Node Model Binding
Bind models to nodes by supplying constructors to call!
```javascript
function LeafNodeModel(nodeData) { // Supplied directly from the nodeData in the data object
    var self = this;
    this.name = nodeData.name;
    this.value = nodeData.value;
    this.toString = function () {
        return "Name: " + self.name + ", Value: " + self.value; // Display the name of the leaf node in the tree view!
    };
}

ko.applyBindings(new TreeView(data, {
    modelOptions: {
        "n": {
            model: LeafNodeModel
        },
        
        "n-1": {
            model: JustAboveLeafNodeModel
        },
        
        "0": {
            model: RootNodeModel
        },
        
        "1": {
            model: JustBelowRootNodeModel
        },
        
        "*": {
            model: DefaultModel
        }
    }
}));
```

Or, pass in a factory function!
```javascript
function createEmployeeLeafNode(nodeData) {
    return {
        name: nodeData.name,
        title: nodeData.title,
        salary: nodeData.salary,
        toString: function () {
            return this.name + ", " + this.title + ", $" + this.salary;
        }
    }
}

ko.applyBindings(new TreeView(data, {
    modelOptions: {
        "n": {
            modelFactory: createEmployeeLeafNode
        }
    }
});
```

## Customize Node View
By default, the object's toString() method will be output in the node view. You can customize this in several ways!
```javascript
function Grandparent(nodeData) {
    this.saying = "In my day, we didn't have " + data.withoutSomething;
}

function Parent(nodeData) {
    var self = this;
    this.greeting = nodeData.greeting;
    this.saying = function () {
        this.greeting + ", please be home by " + new Date().getHours() + 1;
    };
}

function Child(nodeData) {
    this.saying = nodeData.saying;
}

ko.applyBindings(new TreeView(data, {
    modelOptions: {
        "0": {
            model: Grandparent,
            display: "saying"
        },
        
        "1": {
            model: Parent,
            display: "saying"
        },
        
        "2": {
            model: Child,
            display: function (child) {
                return "The child says \"" + child.saying + "\"";
            }
        }
    }
}));
```
