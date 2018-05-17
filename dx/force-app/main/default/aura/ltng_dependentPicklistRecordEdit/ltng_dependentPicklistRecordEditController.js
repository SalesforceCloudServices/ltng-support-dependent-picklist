({
	init : function() {
		//console.log('component has initialized');
	},

	handleSave : function(component){
        console.log('attempt to save');
		component.find("edit-form").get("e.recordSave").fire();
	},
    
    handleSaveSuccess : function(component){
        console.log('save successful');
        $A.get('e.force:refreshView').fire();
        $A.get('e.force:closeQuickAction').fire();
    }
})