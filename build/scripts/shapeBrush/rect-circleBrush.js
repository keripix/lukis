define(["require","utils/rectOutline","brushes/circleBrush"],function(t){function e(t,e){var r=n.create(t),s=i(r,e.x,e.y,e.width,e.height),o=s.length;r.color=e.color||"#000000";for(var a=0;o>a;a++)r.addPoint(s[a]);r.onMouseUp()}var i=t("utils/rectOutline"),n=t("brushes/circleBrush");return{create:function(t,i){if(!(i.x&&i.y&&i.width&&i.height))throw new Error("Required params not supplide");return e(t,i)}}});