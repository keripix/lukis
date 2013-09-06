/**
 * This components has authority in managing outline shapes painter
 * that has been initted. It also has responsibility in interacting
 * with events related to outline properties and activities.
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(outlineManager);

  function outlineManager(){
    
    this.defaultAttrs({

      outlineShapes: {},

      /**
       * The properties of the outline shape
       * @type {Object}
       */
      prop: {
        width: 10,

        fillColor: "#000000",

        strokeColor: "#000000"
      }
    });

    this.after("initialize", function(){
      this.attachEventListener();
    });

    /**
     * Add events to listen to
     * @return {[type]} [description]
     */
    this.attachEventListener = function(){
      this.on("brushPropertyUpdated", this.updateOutlineProperties);
    };

    /**
     * Set outline properties
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.updateOutlineProperties = function(e, data){
      if (data.hasOwnProperty("key") && data.hasOwnProperty("newValue")) {
        this.attr.prop[data.key] = data.newValue;
      }
    };

    /**
     * Set the outlineShape properties with the properties
     * hold by this component
     * @param {Object} outlineShape The outline shape
     */
    this.setOutlineShapeProperties = function(outlineShape){
      Object.keys(this.attr.prop || {}).forEach(function(key){
        outlineShape.set(key, this.attr.prop[key]);
      }, this);
    };

  }

});