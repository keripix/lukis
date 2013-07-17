/**
 * A mixin for painting a certain shape.
 *
 * To use this mixin, the user has to have these methods:
 *
 * getOutlinePainter()
 * afterFinishCallback()
 *
 * @return {[type]} [description]
 */
define(function(require){

  var compose = require("flight/lib/compose"),
      advice = require("flight/lib/advice");

  function withPaintShape(){
    this.defaultAttrs({
      type: "",
      isPainting: false,
      brush: {
        color: "#000000"
      }
    });

    this.after("initialize", function(){
      this.on(document, "uiBrushClicked", this.onUiBrushClicked);
    });

    this.onClick = function(e, eObj){
      this.attr.isPainting = true;

      this.trigger(document, "uiBrushClicked", {clicked: "line"});

      this.on(document, "selectedBrushReady", this.onSelectedBrushReady);

      this.attr.outlinePainter = this.getOutlinePainter();

      compose.mixin(this.attr.outlinePainter, [advice.withAdvice]);

      this.attr.outlinePainter.after("finish", function(){
        this.afterFinishCallback();
      }.bind(this));

      this.trigger(document, "selectedBrushRequested");
    };

    this.onUiBrushClicked = function(e, eObj){
      if (eObj.clicked !== this.attr.type && this.attr.isPainting){
        this.trigger(document, "paintStopRequested");
      }
    };

    this.setBrushProperty = function(e, eObj){
      this.attr.brush[eObj.key] = eObj[eObj.key];
    };

    this.setBrush = function(e, eObj){
      this.attr.brushId = eObj.selectedId;
    };

    this.onSelectedBrushReady = function(e, eObj){
      this.setBrush(e, eObj);
    };
  }

});