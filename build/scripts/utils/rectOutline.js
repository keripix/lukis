define([],function(){return function(t,e,i,n,r){for(var s=[],o=t.width,a=e+n,c=i+r,h=e;a>h;h+=o)s.push({x:h,y:i});for(h=i;c>h;h+=o)s.push({x:e,y:h});for(h=e;a>h;h+=o)s.push({x:h,y:i+r});for(h=c;h>=i;h-=o)s.push({x:e+n,y:h});return s}});