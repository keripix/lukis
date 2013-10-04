/**
 * I have the authority to manage the steps needed
 * to paint an object on top of the canvas. Therefore, I also needs
 * to have a reference to the active brush and outlineShape used
 * to draw.
 */
define(function(require){
  var fabric = require("fabric"),
      defineComponent = require("flight/lib/component"),
      withCanvasEvents = require("painters/withCanvasEvents"),
      withBrushPainter = require("painters/withBrushPainter"),
      withOutlinePainter = require("painters/withOutlinePainter");

  return defineComponent(Lukis, withCanvasEvents, withBrushPainter, withOutlinePainter);

  function Lukis(){

    this.defaultAttrs({
    /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,
      
      /**
       * Custom event handlers for events related to this module
       * @type {Array}
       */
      customHandlers: {},

      /**
       * The current brush used for painting
       * @type {[type]}
       */
      activeBrush: undefined,

      /**
       * The current outlineShape used for painting
       * @type {[type]}
       */
      activeOutlineShape: undefined
    });

    this.after("initialize", function(){
      this.attachEventListeners();
      this.requestCanvas();
    });

    this.attachEventListeners = function(){
      this.on("canvasServed", function(e, data){
        this.setupCanvas(data.canvas);
      }.bind(this));

      this.on("cancelPaintingRequested", function(e, data){
        if (data.active !== "paint") {
          this.cancelCurrentPainting();
        }
      }.bind(this));

      this.on("paintWidgetClicked", function(e, data){
        this.publishActiveOutlineChange(data.paintWidgetId);
      }.bind(this));

      this.on("outlineShapePaintingFinished", function(e, data){
        this.initBrushPainting(data);
      }.bind(this));
    };

    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    this.setupCanvas = function(canvas){
      this.attr.canvas = canvas;
    };

    this.publishActiveOutlineChange = function(id){
      this.on("activeOutlineShapeUpdated", function(e, data){
        this.off("activeOutlineShapeUpdated");
        
        this.trigger("cancelCurrentPainting", {
          active: "paint"
        });

        this.initOutlineShapePainting(data);
      }.bind(this));

      this.trigger("activeOutlineShapeChanged", {
        activeOutlineShapeId: id
      });
    };

    /**
     * Cancel current lukis painting
     */
    this.cancelCurrentPainting = function(){
      this.unregisterExistingListeners(this.attr.canvas);
    };

    /**
     * Start painting outline.
     *
     * The `data` contains:
     * + customHandler  : a custom handler for any event that might be published by the outline painter
     * 
     * @param  {Object} data Data need to paint
     */
    this.initOutlineShapePainting = function(data){
      this.cancelCurrentPainting();

      // calls method from withOutlineShapePainter
      this.startOutlineShapePainting(
        this.attr.canvas,
        data.outlineShape,
        {
          registerEventListeners: this.registerEventListeners,
          unregisterExistingListeners: this.unregisterExistingListeners
        }
      );
    };

    /**
     * Start painting the brush.
     *
     * The `data` contains:
     * + customHandler  : a custom handler for any event that might be published by the brush painter
     * + outlineShapeId : the outline shape id
     * + outlineShape   : the outline shape instance
     * 
     * @param  {Object} data Data need to paint
     */
    this.initBrushPainting = function(data){
      
      this.startBrushPainting(
        this.attr.canvas,
        data.brush,
        data.outlineShape.getOutlinePoints(this.attr.activeBrush.get('width'))
      );
    };

  }
});