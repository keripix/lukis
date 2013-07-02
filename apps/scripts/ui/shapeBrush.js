define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      fabric = require("fabric"),
      rectSpray = require("shapeBrush/rectSpray"),
      rect;

  return defineComponent(shapeBrush, withCanvas);

  function shapeBrush(){

    this.after("initialize", function(){
      this.on("click", this.onClick);

      // this.on(document, "selectedBrushReady", this.setBrush);
      // this.on(document, "colorChanged", this.setBrushProperty);
    });

    this.onClick = function(e, eObj){
      this.on(document, "canvasMouseDown", this.onMouseDown);
      this.on(document, "releasHandlersRequested", this.releaseHandlers);

      this.trigger(document, "paintRequested");
    };

    this.onMouseDown = function(e, eObj){
      var point = this.attr.canvas.getPointer(eObj.e);

      rect = new fabric.Rect({
        top: point.y,
        left: point.x,
        width: 1,
        height: 1,
        stroke: "#000000",
        fill: null
      });

      this.attr.canvas.add(rect).renderAll();
      this.on(document, "canvasMouseMove", this.onMouseMove);
      this.on(document, "canvasMouseUp", this.onMouseUp);
      console.log(point.x, point.y, rect.get('oCoords').tl.x, rect.get('oCoords').tl.y);
    };

    this.onMouseMove = function(e, eObj){
      var point = this.attr.canvas.getPointer(eObj.e),
          oCoords = rect.get('oCoords'),
          ox = oCoords.tl.x,
          oy = oCoords.tl.y,
          height = point.y - oy,
          width = point.x - ox,
          top = height / 2 + oy,
          left = width / 2 + ox;

      rect.set({
        top: top,
        left: left,
        height: height,
        width: width
      });

      this.attr.canvas.renderAll();
    };

    this.onMouseUp = function(e, eObj){
      rect.setCoords();
      this.attr.canvas.renderAll();

      this.createShapeBrush();
    };

    // set painting off
    this.releaseHandlers = function(){
      this.off(document, "canvasMouseMove");
      this.off(document, "canvasMouseUp");
    };

    this.createShapeBrush = function(e, eObj){
      rectSpray.create(this.attr.canvas, {
        x: rect.get('oCoords').tl.x,
        y: rect.get('oCoords').tl.y,
        width: rect.get('width'),
        height: rect.get('height')
      });
    };

    this.getFlooredPosition = function(point){
      var p = this.attr.canvas.getPointer(point);

      return {
        x: Math.floor(p.x),
        y: Math.floor(p.y)
      };
    };
  }
});