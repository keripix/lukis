define(["require","lukis","ui/pencil","ui/linePaintShape","ui/rectPaintShape","ui/circlePaintShape","ui/imageButton","ui/removeButton","ui/loadingIndicator","ui/brushesCombo","data/brusheslist","ui/colorPicker","ui/sizeRange"],function(i){function t(){a.attachTo("#lukis"),e.attachTo("#pencil"),o.attachTo("#linePaintShape"),u.attachTo("#rectPaintShape"),c.attachTo("#circlePaintShape"),n.attachTo("#imageButton"),r.attachTo("#removeButton"),h.attachTo("#loading-indicator"),s.attachTo(document),l.attachTo("#brushescombo"),p.attachTo("#colorpicker"),T.attachTo("#sizerange")}var a=i("lukis"),e=i("ui/pencil"),o=i("ui/linePaintShape"),u=i("ui/rectPaintShape"),c=i("ui/circlePaintShape"),n=i("ui/imageButton"),r=i("ui/removeButton"),h=i("ui/loadingIndicator"),l=i("ui/brushesCombo"),s=i("data/brusheslist"),p=i("ui/colorPicker"),T=i("ui/sizeRange");return{boots:t}});