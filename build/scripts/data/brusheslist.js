define(["require","flight/component"],function(t){function e(){this.defaultAttrs({brushes:{defaultBrush:"pencil",selected:"pencil",selectedId:"pencilBrush",brushes:[{value:"pencil",id:"pencilBrush"},{value:"spray",id:"sprayBrush"},{value:"circle",id:"circleBrush"}]}}),this.after("initialize",function(){this.on(document,"brushesRequested",this.publishBrushes),this.on(document,"brushClicked",this.onBrushClicked),this.on(document,"selectedBrushRequested",this.publishSelectedBrush)}),this.publishBrushes=function(){this.trigger(document,"brushesReady",{brushes:this.attr.brushes})},this.onBrushClicked=function(t,e){var i=this.findBrush(e.brushId);i&&(this.attr.brushes.selectedId=e.brushId,this.attr.brushes.selected=i,this.trigger(document,"brushSelectionChanged",{brushes:this.attr.brushes}),this.publishSelectedBrush())},this.findBrush=function(t){for(var e,i=this.attr.brushes.brushes,r=i.length;r--;)if(i[r].id===t){e=i[r].value;break}return e},this.publishSelectedBrush=function(){var e=this,i="brushes/"+this.attr.brushes.selectedId;t([i],function(t){e.trigger(document,"selectedBrushReady",{selected:e.attr.brushes.selected,selectedId:e.attr.brushes.selectedId,brush:t})})}}var i=t("flight/component");return i(e)});