define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      listeners = {
        onMouseUp: function(){},
        onMouseDown: function(){},
        onMouseMove: function(){}
      };

  describeMixin("painters/withCanvasEvents", function(){

    beforeEach(function(){
      setupComponent();
      this.component.attr.canvas = canvas;
      this.component.registerEventListeners(listeners);
    });

    describe("Attaching to canvas events", function(){

      it("Should invoke the registered listener for mouse:up", function(){
        spyOn(listeners, "onMouseUp");

        canvas.trigger("mouse:up");
        expect(listeners.onMouseUp).toHaveBeenCalled();
      });

      it("Should invoke the registered listener for mouse:down", function(){
        spyOn(listeners, "onMouseDown");

        canvas.trigger("mouse:down");
        expect(listeners.onMouseDown).toHaveBeenCalled();
      });

      it("Should invoke the registered listener for mouse:move", function(){
        spyOn(listeners, "onMouseMove");

        canvas.trigger("mouse:move");
        expect(listeners.onMouseMove).toHaveBeenCalled();
      });      

    });

    describe("Unregistering listeners", function(){

      it("Should unregister any existing listener", function(){
        spyOn(listeners, "onMouseUp");
        this.component.unregisterExistingListeners();

        expect(this.component.attr.listeners).toEqual({});

        // canvas.trigger("mouse:up");
        // expect(listeners.onMouseUp).not.toHaveBeenCalled();
      });

    });

  });

});
