/**
 * I'm alive
 */
define(function(require){

  var lukis = require("painters/lukis"),
      brushManager = require("brushServices/brushManager"),
      outlineManager = require("outlineServices/outlineManager");

  function boots(){
    /**
     * Any components that needs to hold a reference
     * to canvas instance and canvas element, should be
     * placed in this upper block, before the `lukis`
     * component is instantiated
     */
    brushManager.attachTo(document);
    outlineManager.attachTo(document);


    /**
     * The lukis component will publish the canvas instance
     * and its DOM element with an event name of `canvasConstructed`.
     */
    lukis.attachTo(document, {
      canvasEl: "#lukis"
    });
  }

  return {
    boots: boots
  };
});