//|  FORCE Interface API : bar	    										|
//|  API version : 0.1.0 public												|
//|  Library version : 1.0													|
//|  TEST on : Chrome 33.0.1750.149 &&& Firefox 25.0 &&& IE 11.0.9600.16663 |
//|_________________________________________________________________________|
/*
   If you have any question tell me on teeforce1267@yahoo.com

   HELP :
   Settings   :   side:up/down/left/right ; size:number ; upLimit:number ; downLimit:number ; leftLimit:number ; rightLimit:number ; color:string ; distance:number
   For input setting : all settings must be in one string  (in "")
					 one ; symbol must be between two settings
   Example    :   var b=_makeBar(div,"side:down;upLimit:10")  this setting makes a bar on "b" variable 
                  on an element on div variable , down of div , limited 10px from top and other setting will be default
   Functions :
    _makeBar(parent,barSetting) | makes a bar on selected parent element | returns created bar | barSetting : side,size,upLimit,downLimit,leftLimit,rightLimit,color,distance(all settings)
    _setBar(bar,barSetting) | sets a setting on bar | no return | bar : created bar's variable / barSetting : side,size,upLimit,downLimit,leftLimit,rightLimit,color,distance(all settings)
    _setBarSide(bar,side) | sets/changes bar's side | no return | bar : created bar's variable / side : a string
	_setBarUpLimit(bar,upLimit) | sets/changes bar's upLimit | no return | bar : created bar's variable / upLimit = a number
	_setBarDownLimit(bar,downLimit) | sets/changes bar's downLimit | no return | bar : created bar's variable / downLimit = a number
	_setBarLeftLimit(bar,leftLimit) | sets/changes bar's leftLimit | no return | bar : created bar's variable / leftLimit = a number
	_setBarRightLimit(bar,rightLimit) | sets/changes bar's rightLimit | no return | bar : created bar's variable / rightLimit = a number
	_giveBarPage(bar) | returns the main page of bar that you can use to input your options | returns a div element | bar : created bar's variable
*/
//variables---------------------------------------------------------------------------------------------
//You can Edit these variables :
var FI_bar_default_color = 'rgb(230,230,255)';
var FI_bar_default_size = 30;
var FI_bar_default_upLimit = 0;
var FI_bar_default_downLimit = 5;
var FI_bar_default_leftLimit = 5;
var FI_bar_default_rightLimit = 5;
var FI_bar_default_side = 'up';
//Library codes  --------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
function FI_set_bar(bar){
bar.bar;
bar.page;
bar.side;
bar.upLimit;
bar.downLimit;
bar.leftLimit;
bar.rightLimit;
bar.size;
bar.color;
bar.distance;
bar.parent;
}
function _makeBar(parent,setting){
side='n';
upLimit='n';
downLimit='n';
leftLimit='n';
rightLimit='n';
size='n';
color='n';
distance='n';
setting=setting.split(';');
ops=setting.length;
if(ops!=0)for(i=0;i<=ops-1;i++){
setting[i]=setting[i].split(':');
if(setting[i][0]=='side')side=setting[i][1];
else if(setting[i][0]=='size')size=setting[i][1];
else if(setting[i][0]=='upLimit')upLimit=setting[i][1];
else if(setting[i][0]=='downLimit')downLimit=setting[i][1];
else if(setting[i][0]=='leftLimit')leftLimit=setting[i][1];
else if(setting[i][0]=='rightLimit')rightLimit=setting[i][1];
else if(setting[i][0]=='color')color=setting[i][1];
else if(setting[i][0]=='distance')distance=setting[i][1];
}
FI=new Object();
FI_set_bar(FI);
FI.parent=parent;
parent.appendChild(FI.bar=document.createElement('div'));
FI.bar.style.position="absolute";
FI.bar.appendChild(FI.page=document.createElement('div'));
FI.page.style.position='absolute';
if(size=='n')size=FI_bar_default_size;
if(side=='n')side=FI_bar_default_side;
if(color=='n')color=FI_bar_default_color;
FI.bar.style.backgroundColor=color;
FI.page.style.backgroundColor=color;
if(side=='up'){FI.side='up';FI.bar.style.top=0;FI.bar.style.left=0;FI.bar.style.width=FI_nopx(parent.style.width);FI.bar.style.height=size;}
else if(side=='down'){FI.side='down';FI.bar.style.top=FI_nopx(parent.style.height)-size;FI.bar.style.left=0;FI.bar.style.width=FI_nopx(parent.style.width);FI.bar.style.height=size;}
else if(side=='left'){FI.side='left';FI.bar.style.top=0;FI.bar.style.left=0;FI.bar.style.width=size;FI.bar.style.height=FI_nopx(parent.style.height);}
else if(side=='right'){FI.side='right';FI.bar.style.top=0;FI.bar.style.left=FI_nopx(parent.style.width)-size;FI.bar.style.width=size;FI.bar.style.height=FI_nopx(parent.style.height);}

if(upLimit=='n'){FI.upLimit=FI_bar_default_upLimit;upLimit=FI_bar_default_upLimit;}else{FI.upLimit=upLimit}
if(downLimit=='n'){FI.downLimit=FI_bar_default_downLimit;downLimit=FI_bar_default_downLimit;}else{FI.downLimit=downLimit}
if(leftLimit=='n'){FI.leftLimit=FI_bar_default_leftLimit;leftLimit=FI_bar_default_leftLimit;}else{FI.leftLimit=leftLimit}
if(rightLimit=='n'){FI.rightLimit=FI_bar_default_rightLimit;rightLimit=FI_bar_default_rightLimit;}else{FI.rightLimit=rightLimit}
FI.page.style.position="absolute";
;FI.page.style.top=FI.upLimit;
FI.page.style.height=FI_nopx(FI.bar.style.height)-FI.downLimit-FI.upLimit;
FI.page.style.left=FI.leftLimit;
FI.page.style.width=FI_nopx(FI.bar.style.width)-FI.leftLimit-FI.rightLimit;
return FI;
}
function _giveBarPage(bar){
return bar.page;
}