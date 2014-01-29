define(["require","flight/lib/component","painters/mixin/withImagePainter","painters/mixin/withOutlinePainter","painters/mixin/withCanvasEvents","outlineShapes/rectOutline"],function(i){function t(){this.defaultAttrs({canvas:void 0,rectOutline:void 0,files:[]}),this.after("initialize",function(){this.attachEventListener()}),this.setCanvas=function(i){this.attr.canvas=i,this.attr.rectOutline=new h(i,{})},this.attachEventListener=function(){this.on("canvas-ready",function(i,t){this.setCanvas(t.canvas)}.bind(this)),this.on("imageCanvas-clicked",function(i,t){this.trigger("cancel-painting",{active:"image"}),this.initImagePainting(t.files)}.bind(this)),this.on("cancel-painting",function(i,t){"image"!==t.active&&this.stopCurrentPainting()}.bind(this)),this.on("images-added",function(){this.stopCurrentPainting()}.bind(this))},this.stopCurrentPainting=function(){this.off("outlineShape-painting-finished",this.onOutlineShapePaintingFinished),this.unregisterExistingListeners(this.attr.canvas),this.attr.files.length=0},this.initImagePainting=function(i){var t=this.attr.rectOutline;this.attr.files=i,t&&(this.trigger("notify",{type:"info",message:"Press [ESC] to cancel any painting"}),this.on("outlineShape-painting-finished",this.onOutlineShapePaintingFinished),this.startOutlineShapePainting(this.attr.canvas,t,{registerEventListeners:this.registerEventListeners,unregisterExistingListeners:this.unregisterExistingListeners}))},this.onOutlineShapePaintingFinished=function(){this.off("outlineShape-painting-finished",this.onOutlineShapePaintingFinished),this.loadImages(this.attr.files,this.attr.rectOutline)}}var n=i("flight/lib/component"),e=i("painters/mixin/withImagePainter"),s=i("painters/mixin/withOutlinePainter"),a=i("painters/mixin/withCanvasEvents"),h=i("outlineShapes/rectOutline");return n(t,e,a,s)});