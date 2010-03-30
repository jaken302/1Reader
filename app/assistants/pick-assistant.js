PickAssistant = Class.create(BaseAssistant, {
  ready: function() {
    this.spinnerOn();

    var params = {
      kind: "file",
      extensions: ["html"],
      onSelect: this.fileSelected.bind(this)
    };

    Mojo.FilePicker.pickFile(params, this.controller.stageController);
  },

  fileSelected: function(response) {
    console.log("picked " + response.fullPath);
  	var keychainFolder = response.fullPath.substring(0, response.fullPath.indexOf("1Password.html"));
  	var onePassword = new OnePassword();

  	onePassword.load(keychainFolder, function() {
    	this.spinnerOff();
  	  this.controller.stageController.swapScene("types", onePassword);
  	}.bind(this));
  }
})