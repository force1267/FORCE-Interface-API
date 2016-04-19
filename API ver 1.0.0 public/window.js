//|  FORCE Interface API : window											|
//|  API version : 0.1.0 public												|
//|  Library version : 1.0a BETA											|
//|  TEST on : Chrome 33.0.1750.149 &&& Firefox 25.0 &&& IE 11.0.9600.16663 |
//|_________________________________________________________________________|
/*
   If you have any question tell me on teeforce1267@yahoo.com

   HELP :
   Settings   :   header:name ; resizeable:1 or 0 ; min_x:number ; min_y:number ; max_x:number ; max_y:number ; no_exit:0 or 1
   For input setting : all settings must be in one string  (in "")
					 one ; symbol must be between two settings
   Example    :   var w=_makeWindow("header:hello window!;resizeable:0;min_x:10")  this setting makes a window on "w" variable with
                  "hello window!" header , non resizeable , in left=10px and other setting will be default
   Functions :
    _makeWindow(windowSetting) | makes a window | returns created window | windowSetting : header,resizeable,min_x,min_y,max_x,max_y,no_exit (all settings)
    _setWindow(window,windowSetting) | sets a setting on window | no return | window : created window's variable / windowSetting : header,min_x,min_y,max_x,max_y (all settings but resizeable and no_exit)
    _setWindowHeader(window,header) | sets/changes window's header | no return | window : created window's variable / header : a string
	_setWindowMinX(window,min_x) | sets/changes window's min_x | no return | window : created window's variable / min_x = a number
	_setWindowMinX(window,min_y) | sets/changes window's min_y | no return | window : created window's variable / min_y = a number
	_setWindowMinX(window,max_x) | sets/changes window's max_x | no return | window : created window's variable / max_x = a number
	_setWindowMinX(window,max_y) | sets/changes window's max_y | no return | window : created window's variable / max_y = a number
	_giveWindowPage(window) | returns the main page of window that you can use to input your options | returns a div element | window : created window's variable
	_giveSelectedWindow() | returns the selected window. if there is no selected window, returns last selected and if no last returns 0 | returns selected window as a variable | no arg
	*/
//variables---------------------------------------------------------------------------------------------
//You can Edit these variables :
var FI_window_border_color="rgb(0,180,255)";
var FI_window_border_deactive_color="rgb(220,220,220)";
var FI_window_header_color="rgb(55,55,55)";
var FI_window_header_size=13;
var FI_window_close_color="rgb(220,90,90)";
var FI_window_close_mouse_color="rgb(255,0,0)";
var FI_window_close_down_color="rgb(190,90,90)";
var FI_window_maxim_color="rgb(120,120,255)";
var FI_window_maxim_mouse_color="rgb(0,0,255)";
var FI_window_maxim_down_color="rgb(120,120,190)";
var FI_window_background_color="rgb(255,255,255)";
var FI_window_default_side_size=7;
var FI_window_default_up_size=20;
var FI_window_default_max_x=300;
var FI_window_default_max_y=300;
var FI_window_default_min_x=30;
var FI_window_default_min_y=30;
var FI_window_active_zindex=3;//this zIndex must be more than all elements in body.
var FI_window_deactive_zindex=1;//this zIndex must be less than active zIndex.
var FI_window_desk_zindex=0;//this zIndex must be less than all elements in body.
var FI_window_main_page_zindex=2;//this zIndex must be between of active and deactive zIndexes.

//Library codes----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
var FI_all_window=new Array();
var FI_onmove_window=0;
var base_elm;
function FI_get_ready(){
base_elm=document.createElement('div');
document.body.appendChild(base_elm);
base_elm.style.position="absolute";
base_elm.style.zIndex=FI_window_desk_zindex;
base_elm.style.width=FI_window_page_x_size;
base_elm.style.height=FI_window_page_y_size;
base_elm.style.top=0;
base_elm.style.left=0;
base_elm.onclick=function(){FI_set_actives();}
if(document.addEventListener){document.addEventListener("mousemove",function(){FI_window_move();},false);
window.addEventListener("resize",function(){base_elm.style.left=pageXOffset;base_elm.style.top=pageYOffset;base_elm.style.width=FI_window_page_x_size;base_elm.style.height=FI_window_page_y_size;},false);
document.addEventListener("scroll",function(){},false);}
else{document.attachEvent("onmousemove",function(){FI_window_move();});
window.attachEvent("onresize",function(){base_elm.style.left=pageXOffset;base_elm.style.top=pageYOffset;base_elm.style.width=FI_window_page_x_size;base_elm.style.height=FI_window_page_y_size;});
document.attachEvent("onscroll",function(){});}
if(FI_window_default_max_x>FI_window_page_x_size)
FI_window_default_max_x=FI_window_page_x_size
if(FI_window_default_max_y>FI_window_page_y_size)
FI_window_default_max_y=FI_window_page_y_size}
function FI_window_move(){
y=FI_mouse_y+window.pageYOffset;x=FI_mouse_x+window.pageXOffset;
if(FI_onmove_window!=0&&FI_onmove_window.resizeable==1){
if(FI_in_page(x,y)){//move:
if(FI_onmove_window.up_mouse_pressed==1&&FI_onmove_window.dis_my_miny>FI_window_default_side_size){
FI_onmove_window.min_x=(x)-FI_onmove_window.dis_mx_minx;
FI_onmove_window.min_y=(y)-FI_onmove_window.dis_my_miny;
FI_onmove_window.max_x=(x)+FI_onmove_window.dis_mx_maxx;
FI_onmove_window.max_y=(y)+FI_onmove_window.dis_my_maxy;
FI_set_sizes(FI_onmove_window);}//resize:
else if(FI_onmove_window.resize_side=='up'&&FI_onmove_window.up_mouse_pressed==1)if(y+FI_window_default_up_size+1>=FI_onmove_window.max_y-FI_window_default_side_size){FI_onmove_window.min_y=FI_onmove_window.max_y-FI_window_default_side_size-FI_window_default_up_size-1}else{FI_onmove_window.min_y=(y)-FI_onmove_window.dis_my_miny;FI_onmove_window.resize();}
else if(FI_onmove_window.resize_side=='down'&&FI_onmove_window.down_mouse_pressed==1)if(y-FI_window_default_side_size-1<=FI_onmove_window.min_y+FI_window_default_up_size){FI_onmove_window.max_y=FI_onmove_window.min_y+FI_window_default_side_size+FI_window_default_up_size+1}else{FI_onmove_window.max_y=(y)+FI_onmove_window.dis_my_maxy;FI_onmove_window.resize();}
else if(FI_onmove_window.resize_side=='left'&&FI_onmove_window.left_mouse_pressed==1)if(x+FI_window_default_side_size+1>=FI_onmove_window.min_x+FI_window_default_side_size){FI_onmove_window.min_x=FI_onmove_window.max_x-FI_window_default_side_size*2-1}else{if(FI_mouse_y-FI_onmove_window.min_y<2*FI_window_default_side_size){FI_onmove_window.min_x=(x)-FI_onmove_window.dis_mx_minx;FI_onmove_window.min_y=(y)-FI_onmove_window.dis_my_miny;FI_onmove_window.resize();}else if(FI_onmove_window.max_y-FI_mouse_y<2*FI_window_default_side_size){FI_onmove_window.min_x=(x)-FI_onmove_window.dis_mx_minx;FI_onmove_window.max_y=(y)+FI_onmove_window.dis_my_maxy;FI_onmove_window.resize();}else{FI_onmove_window.min_x=(x)-FI_onmove_window.dis_mx_minx;FI_onmove_window.resize();}}
else if(FI_onmove_window.resize_side=='right'&&FI_onmove_window.right_mouse_pressed==1)if(x-FI_window_default_side_size-1<=FI_onmove_window.min_x+FI_window_default_side_size){FI_onmove_window.max_x=FI_onmove_window.min_x+FI_window_default_side_size*2+1}else{if(FI_mouse_y-FI_onmove_window.min_y<2*FI_window_default_side_size){FI_onmove_window.max_x=(x)+FI_onmove_window.dis_mx_maxx;FI_onmove_window.min_y=(y)-FI_onmove_window.dis_my_miny;FI_onmove_window.resize();}else if(FI_onmove_window.max_y-FI_mouse_y<2*FI_window_default_side_size){FI_onmove_window.max_x=(x)+FI_onmove_window.dis_mx_maxx;FI_onmove_window.max_y=(y)+FI_onmove_window.dis_my_maxy;FI_onmove_window.resize();}else{FI_onmove_window.max_x=(x)+FI_onmove_window.dis_mx_maxx;FI_onmove_window.resize();}}
}else{/*not in page*/}}}
function FI_set_actives(){
for(i=1;i<=FI_all_window.length;i++){
FI_all_window[i-1].isActive=0;
FI_all_window[i-1].retheme();
FI_all_window[i-1].window.style.zIndex=FI_window_deactive_zindex;}}
function FI_set_object(obj){
obj.window;
obj.id="FI_window_"+FI_all_window.length;
obj.page;
obj.no_exit;
obj.min_x;obj.min_y;obj.max_x;obj.max_y;
obj.maxed=0;
obj.m_min_x;obj.m_min_y;obj.m_max_x;obj.m_max_y;
obj.up;obj.down;obj.left;obj.right;
obj.maxim;obj.header;
obj.up_mouse_pressed;
obj.down_mouse_pressed;
obj.left_mouse_pressed;
obj.right_mouse_pressed;
obj.close_mouse_pressed;
obj.maxim_mouse_pressed;
obj.dis_mx_minx;obj.dis_my_miny;
obj.dis_mx_maxx;obj.dis_my_maxy;
obj.resize_side;
obj.isActive=1;
obj.resizeable=1;
obj.resize=function(){if(obj.resizeable==1)FI_set_sizes(obj);}
obj.retheme=function(){FI_retheme(obj);}
obj.clicked=function(){FI_set_actives();obj.isActive=1;
obj.window.style.zIndex=FI_window_active_zindex;obj.retheme();}
obj.set_dis=function(){
y=FI_mouse_y+window.pageYOffset;
x=FI_mouse_x+window.pageXOffset;
obj.dis_mx_minx=x-obj.min_x;
obj.dis_my_miny=y-obj.min_y;
obj.dis_mx_maxx=obj.max_x-x;
obj.dis_my_maxy=obj.max_y-y;}
obj.window_close=function(){
document.body.removeChild(document.getElementById(obj.id))}
obj.window_maximize=function(){
if(obj.maxed==0){
obj.maxed=1;
obj.m_min_x=obj.min_x;
obj.m_min_y=obj.min_y;
obj.m_max_x=obj.max_x;
obj.m_max_y=obj.max_y;
obj.min_x=pageXOffset;
obj.min_y=pageYOffset;
obj.max_x=FI_window_page_x_size;
obj.max_y=FI_window_page_y_size;
obj.retheme();obj.resize();
obj.resizeable=0;}
else if(obj.maxed==1){
obj.maxed=0;
obj.min_x=obj.m_min_x;
obj.min_y=obj.m_min_y;
obj.max_x=obj.m_max_x;
obj.max_y=obj.m_max_y;
obj.resizeable=1;
obj.retheme();obj.resize();}}}
function FI_set_sizes(obj){
obj.up.style.width=(obj.max_x-obj.min_x);
obj.up.style.top=0;
obj.up.style.left=0
obj.down.style.width=(obj.max_x-obj.min_x);
obj.down.style.top=(obj.max_y-obj.min_y)-FI_window_default_side_size;
obj.down.style.left=0;
obj.right.style.height=obj.max_y-obj.min_y;
obj.right.style.top=0;
obj.right.style.left=(obj.max_x-obj.min_x)-FI_window_default_side_size;
obj.left.style.height=obj.max_y-obj.min_y;
obj.left.style.top=0;
obj.left.style.left=0;
obj.window.style.width=obj.max_x-obj.min_x;
obj.window.style.height=obj.max_y-obj.min_y;
obj.window.style.top=obj.min_y;
obj.window.style.left=obj.min_x;
if(obj.no_exit==0){
obj.close.style.top=0;
obj.close.style.left=obj.max_x-obj.min_x-FI_window_default_side_size-FI_window_default_up_size;
}
if(obj.resizeable==1){
obj.maxim.style.top=0;
obj.maxim.style.left=obj.max_x-obj.min_x-FI_window_default_side_size-(2*FI_window_default_up_size)-3;}
obj.page.style.width=(obj.max_x-obj.min_x)-(2*FI_window_default_side_size);
obj.page.style.height=(obj.max_y-obj.min_y)-(FI_window_default_side_size+FI_window_default_up_size);}
function FI_retheme(obj){
if(obj.isActive==1){
obj.up.style.backgroundColor=FI_window_border_color;
obj.right.style.backgroundColor=FI_window_border_color;
obj.left.style.backgroundColor=FI_window_border_color;
obj.down.style.backgroundColor=FI_window_border_color;
}else if(obj.isActive==0){
obj.up.style.backgroundColor=FI_window_border_deactive_color;
obj.right.style.backgroundColor=FI_window_border_deactive_color;
obj.left.style.backgroundColor=FI_window_border_deactive_color;
obj.down.style.backgroundColor=FI_window_border_deactive_color;}
obj.up.style.height=FI_window_default_up_size;
obj.right.style.width=FI_window_default_side_size;
obj.right.style.left=(obj.max_x-obj.min_x)-FI_window_default_side_size;
obj.left.style.width=FI_window_default_side_size;
obj.down.style.height=FI_window_default_side_size;
obj.down.style.top=(obj.max_y-obj.min_y)-FI_window_default_side_size;
obj.window.style.backgroundColor=FI_window_background_color;
if(obj.no_exit==0){
obj.close.style.height=(FI_window_default_up_size/4)*3;
obj.close.style.width=FI_window_default_up_size;
obj.close.style.backgroundColor=FI_window_close_color;
obj.close.style.left=obj.max_x-obj.min_x-FI_window_default_side_size-FI_window_default_up_size
}
if(obj.resizeable==1){
obj.maxim.style.height=(FI_window_default_up_size/4)*3;
obj.maxim.style.width=FI_window_default_up_size;
obj.maxim.style.backgroundColor=FI_window_maxim_color;
obj.maxim.style.left=obj.max_x-obj.min_x-FI_window_default_side_size-(2*FI_window_default_up_size)-3;}
obj.header.style.top=FI_window_default_side_size;
obj.header.style.left=FI_window_default_side_size;
obj.header.style.fontcolor=FI_window_header_color;
obj.header.style.fontSize=FI_window_header_size;
obj.page.style.top =FI_window_default_up_size;
obj.page.style.left=FI_window_default_side_size;
obj.page.style.width=(obj.max_x-obj.min_x)-(2*FI_window_default_side_size);
obj.page.style.height=(obj.max_y-obj.min_y)-(FI_window_default_side_size+FI_window_default_up_size);}
function FI_make_window(obj){
obj.window=document.createElement('div');
document.body.appendChild(obj.window);
obj.window.style.position="absolute";
obj.window.setAttribute('id',obj.id);
obj.window.style.overflow="hidden";
obj.up=document.createElement('div');
obj.window.appendChild(obj.up)
obj.up.style.position="absolute";
obj.down=document.createElement('div');
obj.window.appendChild(obj.down)
obj.down.style.position="absolute";
obj.right=document.createElement('div');
obj.window.appendChild(obj.right);
obj.right.style.position="absolute";
obj.left=document.createElement('div');
obj.window.appendChild(obj.left);
obj.left.style.position="absolute";
if(obj.no_exit==0){
obj.close=document.createElement('div');
obj.window.appendChild(obj.close);
obj.close.style.position="absolute";
}
if(obj.resizeable==1){
obj.maxim=document.createElement('div');
obj.window.appendChild(obj.maxim);
obj.maxim.style.position="absolute";}
obj.header=document.createElement('p');
obj.up.appendChild(obj.header);
obj.header.style.position="absolute";
obj.header.style.marginTop=0;
obj.header.style.marginBottom=0;
obj.page=document.createElement('div');
obj.window.appendChild(obj.page);
obj.page.style.position="absolute";
obj.page.style.zIndex=FI_window_main_page_zindex;
obj.page.style.overflow="hidden";}
function FI_set_events(obj){
obj.window.onclick=function(){obj.clicked();}
obj.up.onmousedown=function(){obj.up_mouse_pressed=1;
obj.set_dis();obj.resize_side="up";FI_onmove_window=obj;obj.clicked();}
obj.up.onclick=function(){obj.up_mouse_pressed=0;}
obj.down.onmousedown=function(){obj.down_mouse_pressed=1;
obj.set_dis();obj.resize_side="down";FI_onmove_window=obj;obj.clicked();}
obj.down.onclick=function(){obj.down_mouse_pressed=0;}
obj.left.onmousedown=function(){obj.left_mouse_pressed=1;
obj.set_dis();obj.resize_side="left";FI_onmove_window=obj;obj.clicked();}
obj.left.onclick=function(){obj.left_mouse_pressed=0;}
obj.right.onmousedown=function(){obj.right_mouse_pressed=1;
obj.set_dis();obj.resize_side="right";FI_onmove_window=obj;obj.clicked();}
obj.right.onclick=function(){obj.right_mouse_pressed=0;}
if(obj.no_exit==0){
obj.close.onmousedown=function(){obj.close_mouse_pressed=1;
obj.close.style.backgroundColor=FI_window_close_down_color;
obj.clicked();}
obj.close.onclick=function(){obj.close_mouse_pressed=0;
obj.window_close();}}
if(obj.resizeable==1){
obj.maxim.onmousedown=function(){obj.maxim_mouse_pressed=1;
obj.maxim.style.backgroundColor=FI_window_maxim_down_color;
obj.clicked();}
obj.maxim.onclick=function(){obj.maxim_mouse_pressed=0;
obj.window_maximize()}
obj.maxim.onmouseover=function(){obj.maxim.style.backgroundColor=FI_window_maxim_mouse_color;}
obj.maxim.onmouseout=function(){obj.maxim.style.backgroundColor=FI_window_maxim_color;}}
obj.page.onmousedown=function(){obj.clicked();}
obj.up.onmousemove=function(){if(obj.resizeable==1){if(FI_mouse_y-obj.min_y>FI_window_default_side_size){obj.up.style.cursor="move"/*move*/}else{obj.up.style.cursor="n-resize"/*resize up*/}}else obj.up.style.cursor=""}
obj.up.onmouseout=function(){}
obj.down.onmousemove=function(){if(obj.resizeable==1){obj.down.style.cursor="s-resize"/*down resize*/}else obj.down.style.cursor=""}
obj.down.onmouseout=function(){}
obj.left.onmousemove=function(){if(obj.resizeable==1){if(FI_mouse_y-obj.min_y<2*FI_window_default_side_size){obj.left.style.cursor="nw-resize"/*left:up curner resize*/}else if(obj.max_y-FI_mouse_y<2*FI_window_default_side_size){obj.left.style.cursor="sw-resize"/*left:down curner resize*/}else{obj.left.style.cursor="w-resize"/*left resize*/}}else obj.left.style.cursor=""}
obj.left.onmouseout=function(){}
obj.right.onmousemove=function(){if(obj.resizeable==1){if(FI_mouse_y-obj.min_y<2*FI_window_default_side_size){obj.right.style.cursor="ne-resize"/*right:up curner resize*/}else if(obj.max_y-FI_mouse_y<2*FI_window_default_side_size){obj.right.style.cursor="se-resize"/*right:down curner resize*/}else{obj.right.style.cursor="e-resize"/*right resize*/}}else obj.right.style.cursor=""}
obj.right.onmouseout=function(){}
if(obj.no_exit==0){
obj.close.onmouseover=function(){obj.close.style.backgroundColor=FI_window_close_mouse_color;}
obj.close.onmouseout=function(){obj.close.style.backgroundColor=FI_window_close_color;}}
}
function _makeWindow(setting){
min_x='n';
min_y='n';
max_x='n';
max_y='n';
resizeable='1';
header='n';
no_exit="n";
setting=setting.split(';');
ops=setting.length;
if(ops!=0)for(i=0;i<=ops-1;i++){
setting[i]=setting[i].split(':');
if(setting[i][0]=='header')header=setting[i][1];
else if(setting[i][0]=='resizeable')resizeable=setting[i][1];
else if(setting[i][0]=='min_x')min_x=setting[i][1];
else if(setting[i][0]=='min_y')min_y=setting[i][1];
else if(setting[i][0]=='max_x')max_x=setting[i][1];
else if(setting[i][0]=='max_y')max_y=setting[i][1];
else if(setting[i][0]=='no_exit')no_exit=setting[i][1];}
FI=new Object();
FI_set_actives();
FI_set_object(FI);
if(min_x=='n')FI.min_x=FI_window_default_min_x;else FI.min_x=min_x;
if(min_y=='n')FI.min_y=FI_window_default_min_y;else FI.min_y=min_y;
if(max_x=='n')FI.max_x=FI_window_default_max_x;else FI.max_x=max_x;
if(max_y=='n')FI.max_y=FI_window_default_max_y;else FI.max_y=max_y;
if(resizeable=='1'){FI.resizeable =1}else FI.resizeable = 0;
if(no_exit=="1"){FI.no_exit=1;}else FI.no_exit=0;
FI_make_window(FI);
if(header=='n'){}else FI.header.innerHTML=header;
FI.clicked();
FI_set_sizes(FI);
FI_retheme(FI);
FI_set_events(FI);
FI_all_window[FI_all_window.length]=FI;
return FI;}
function _setWindow(window,setting){
min_x='n';
min_y='n';
max_x='n';
max_y='n';
resizeable='n';
header='n';
setting=setting.split(';');
ops=setting.length;
if(ops!=0)for(i=0;i<=ops-1;i++){
setting[i]=setting[i].split(':');
if(setting[i][0]=='header')header=setting[i][1];
else if(setting[i][0]=='resizeable')resizeable=setting[i][1];
else if(setting[i][0]=='min_x')min_x=setting[i][1];
else if(setting[i][0]=='min_y')min_y=setting[i][1];
else if(setting[i][0]=='max_x')max_x=setting[i][1];
else if(setting[i][0]=='max_y')max_y=setting[i][1];}
if(min_x=='n'){}else window.min_x=min_x;
if(min_y=='n'){}else window.min_y=min_y;
if(max_x=='n'){}else window.max_x=max_x;
if(max_y=='n'){}else window.max_y=max_y;
if(header=='n'){}else window.header.innerHTML=header;
FI_set_sizes(window);
FI_retheme(window);}
function _setWindowSize(window,setting){
min_x='n';
min_y='n';
max_x='n';
max_y='n';
setting=setting.split(';');
ops=setting.length;
if(ops!=0)for(i=0;i<=ops-1;i++){
setting[i]=setting[i].split(':');
if(setting[i][0]=='min_x')min_x=setting[i][1];
else if(setting[i][0]=='min_y')min_y=setting[i][1];
else if(setting[i][0]=='max_x')max_x=setting[i][1];
else if(setting[i][0]=='max_y')max_y=setting[i][1];}
if(min_x=='n'){}else window.min_x=min_x;
if(min_y=='n'){}else window.min_y=min_y;
if(max_x=='n'){}else window.max_x=max_x;
if(max_y=='n'){}else window.max_y=max_y;
FI_set_sizes(window);
FI_retheme(window);}
function _setWindowHeader(window,header){
window.header.innerHTML=header;}
function _setWindowMinX(window,m){
window.min_x=m;
FI_set_sizes(window);
FI_retheme(window);}
function _setWindowMinY(window,m){
window.min_y=m;
FI_set_sizes(window);
FI_retheme(window);}
function _setWindowMaxX(window,m){
window.max_x=m;
FI_set_sizes(window);
FI_retheme(window);}
function _setWindowMaxY(window,m){
window.max_y=m;
FI_set_sizes(window);
FI_retheme(window);}
function _giveWindowPage(window){
return window.page;}
FI_get_ready();
function _giveSelectedWindow(){return FI_onmove_window}