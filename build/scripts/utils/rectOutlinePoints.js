define([],function(){return function(t,e,i,n,r){for(var o=[],s=t.width,a=e+n,c=i+r,h=e;a>h;h+=s)o.push({x:h,y:i});for(h=i;c>h;h+=s)o.push({x:e,y:h});for(h=e;a>h;h+=s)o.push({x:h,y:i+r});for(h=c;h>=i;h-=s)o.push({x:e+n,y:h});return o}});