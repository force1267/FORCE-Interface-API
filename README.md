# FORCE-Interface-API
A JS lib to have window interface in web

API------------
make Window : window = _makeWindow ( ' windowSettings ' )
make Bar : bar = _makeBar ( parent , ' barSettings ' )
New Window : _makeWindow( ' header:New Window ; resizeable:1 ' )
New fix Window : _makeWindow( ' header:New fix Window ; resizeable:0 ' )
New no close Window : _makeWindow( ' header:New no close Window ; resizeable:1 ; no_exit:1 ' )
New no header Window : _makeWindow('resizable:1')
New different x Window : _makeWindow( ' header:New different x Window ; resizeable:1 ; min_x:200 ; max_x:500 ' )
New different y Window : _makeWindow( ' header:New different y Window ; resizeable:1 ; min_y:200 ; max_y:500 ' )
New Bar : _makeBar ( _giveWindowPage ( a_Window ) , ' ' )
New left side Bar : _makeBar ( _giveWindowPage ( a_Window ) , ' side : left ' )
New upLimited Bar : _makeBar ( _giveWindowPage ( a_Window ) , ' upLimit : 10 ' )
New colored Bar : _makeBar ( _giveWindowPage ( a_Window ) , ' color : green ' )
New different distance Bar : _makeBar ( _giveWindowPage ( a_Window ) , ' distance : 20 ' ) // not complete


!: Hello Bar text added by this page's script and bar.js function "_giveBarPage(bar)"
!: Bar.js is not complete and has many bugs
Force Interface API by "Force". teeforce1267@yahoo.com
