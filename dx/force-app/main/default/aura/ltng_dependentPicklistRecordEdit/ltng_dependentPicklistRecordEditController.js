({
	init : function() {
		//console.log('component has initialized');
	},

	handleSave : function(component){
		component.find("edit-form").get("e.recordSave").fire();
	}
})