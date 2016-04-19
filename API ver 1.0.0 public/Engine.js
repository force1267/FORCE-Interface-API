//|  FORCE Interface API : engine											|
//|  API version : 0.1.0 public												|
//|  TEST on : Chrome 33.0.1750.149 &&& FireFox 25.0 &&& IE 11.0.9600.16663 |
//|_________________________________________________________________________|
/*
   If you have any question tell me on teeforce1267@yahoo.com

   Functions  :
				  _giveMouseX() | Returns mouse x on page | Returns a number | no arg
				  _giveMouseY() | Returns mouse y on page | Returns a number | no arg
				  _givePageX() | Returns page x | Returns a number | no arg
				  _givePageY() | Returns page y | Returns a number | no arg
*/
var FI_window_page_y_size;
var FI_window_page_x_size;
var FI_mouse_x;
var FI_mouse_y;
function FI_window_set_size(){
if(self.innerWidth){
FI_window_page_x_size=self.innerWidth;
FI_window_page_y_size=self.innerHeight;
}else if(document.documentElement && document.documentElement.clientWidth) {
FI_window_page_x_size=document.documentElement.clientWidth;
FI_window_page_y_size=document.documentElement.clientHeight;
}else if (document.body){
FI_window_page_x_size=document.body.clientWidth;
FI_window_page_y_size=document.body.clientHeight;}}
if(document.addEventListener){window.addEventListener("resize",function(){FI_window_set_size()},false);
document.addEventListener("mousemove",function(event){FI_mouse_x=event.clientX;FI_mouse_y=event.clientY;},false);
}else{window.attachEvent("onresize",function(){FI_window_set_size();});
document.attachEvent("onmousemove",function(event){FI_mouse_x=event.clientX;FI_mouse_y=event.clientY;});
}
function FI_nopx(m){
var a=0;var b=1;
while(m.substring(a,b)!="p"){
a=a+1;b=b+1;}
fm=m.substring(0,a);
fm++;fm--;;
return fm;}
function FI_in_page(x,y){
if(x>FI_window_page_x_size||y>FI_window_page_y_size||x<0||y<0)
return false;
else return true;}
function _giveMouseX(){return FI_mouse_x;}
function _giveMouseY(){return FI_mouse_x;}
function _givePageX(){return FI_window_page_x_size;}
function _givePageY(){return FI_window_page_y_size;}
FI_window_set_size();
