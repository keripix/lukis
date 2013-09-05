/**
 * This mixins provides connection to canvas' painting events,
 * such as mouse:move, mouse:up, mouse:down, etc.
 */
define(function(require){
  
  return withCanvasEvents;

  function withCanvasEvents(){

    /**
     * TODO what if the user of this mixin wants to listen
     * to more events than the ones provided below?
     * 
     * Register event listeners that will be executed. If there
     * is an existing listener, than that listener will be
     * overriden by this new one.
     * 
     * @param  {Object} listeners The listeners where the key
     *                            maps to the spesific event, and
     *                            the value is the listener
     *                            function
     */
    this.registerEventListeners = function(listeners){
      var canvas = this.attr.canvas,
          me = this;

      if (canvas){
        this.attr.listeners = listeners;

        if (listeners.onMouseDown) {
          canvas.on("mouse:down", function(e){
            me.attr.listeners.onMouseDown &&
            me.attr.listeners.onMouseDown.call(me.attr.listeners, e);
          });
        }

        if (listeners.onMouseUp) {
          canvas.on("mouse:up", function(e){
            me.attr.listeners.onMouseUp &&
            me.attr.listeners.onMouseUp.call(me.attr.listeners, e);
          });
        }

        if (listeners.onMouseMove) {
          canvas.on("mouse:move", function(e){
            me.attr.listeners.onMouseMove &&
            me.attr.listeners.onMouseMove.call(me.attr.listeners, e);
          });
        }
      }
    };

    /**
     * Unregister any existing listener
     */
    this.unregisterExistingListeners = function(){
      this.attr.listeners = {};
    };

  }
});