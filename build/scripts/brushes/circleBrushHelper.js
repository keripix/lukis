define(["require","fabric"],function(i){var t=i("fabric");return{drawCircles:function(i,e){var a=e.points,n=i.renderOnAddition;i.renderOnAddition=!1;for(var r=a.length-1;r>=0;r--){var o=a[r];i.add(new t.Circle({radius:o.radius,left:o.x,top:o.y,fill:o.fill,hasControls:!1,hasRotatingPoint:!1,lockUniScaling:!0}))}i.clearContext(i.contextTop),i.renderOnAddition=n,i.renderAll()}}});