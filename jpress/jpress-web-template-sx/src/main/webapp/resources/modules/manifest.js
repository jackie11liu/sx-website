/*
* name: manifest.js
* version: v1.0.1
* update: 添加appcan通信插件
* date: 2016-04-01
*/
define('manifest',function(){
    var mod = {
        'audio/audio'                       : 'v1.0.1',
        'copy/ZeroClipboard'                : 'v0.0.1',
        'flv/flv'                           : 'v0.0.2',
    	'jquery/1/jquery'					: 'v1.11.3',
        'jquery/2/jquery'                   : 'v2.1.4',
    	'My97DatePicker/WdatePicker'		: 'v0.0.1',
    	'raty/raty'							: 'v0.1.0',
    	'validform/validform'				: 'v2.2.3',
    	'video/video'						: 'v0.0.1',
    	'webuploader/webuploader'			: 'v1.0.0',
        'album'                             : 'v2.2.10',
        'appcan'                            : 'v0.1.0',
    	'autocomplete'						: 'v0.0.1',
        'base'								: 'v2.13.3',
        'bdshare'							: 'v3.1.2',
        'box'								: 'v3.9.1',
        'countdown'							: 'v1.0.2',
        'drag'								: 'v0.5.0',
        'easing'							: 'v0.0.1',
        'echarts'                           : 'v0.0.2',
        'etpl'								: 'v0.0.1',
        'fastclick'                         : 'v0.0.1',
        'hoverdir'                          : 'v0.0.1',
        'img-loaded'						: 'v0.0.1',
        'img-ready'							: 'v1.0.0',
        'instantclick'						: 'v0.0.1',
        'json'								: 'v0.0.1',
        'jrange'                            : 'v0.0.1',
        'lazyload'							: 'v2.0.1',
        'lettering'                         : 'v2.0.1',
        'marquee'                           : 'v0.10.1',
        'masonry'							: 'v0.0.1',
        'mousemenu'							: 'v1.0.0',
        'mousetrap'							: 'v1.5.3',
        'mousewheel'						: 'v0.0.1',
        'modernizr'                         : 'v0.0.1',
        'offcanvas'                         : 'v2.0.4',
        'on-scroll'							: 'v2.1.3',
        'photowall'							: 'v0.1.1',
        'pjax'								: 'v0.0.1',
        'qr'								: 'v0.1.0',
        'scroll-bar'						: 'v2.2.7',
        'scroll-col'                        : 'v4.2.4',
        'scroll-row'						: 'v3.0.6',
        'skrollr'                           : 'v0.0.1',
        'superscrollorama'                  : 'v0.0.1',
        'select'							: 'v3.1.9',
        'slide'								: 'v4.1.8',
        'swipe'                             : 'v2.0.0',
        'tab'								: 'v2.1.2',
        'tip'								: 'v1.2.2',
        'touch'								: 'v0.1.1',
        'tweenmax'                          : 'v1.18.5',
        'unslider'                          : 'v2.0.0',
        'zoom'								: 'v2.0.2',
        'scroll-loading'                    : 'v0.0.1',
        'smoothscroll'                      : 'v0.0.1'
    }
    var manifest = {}
    for(var key in mod){
        manifest[seajs.data.base + key + '.js'] = mod[key]
    }
    seajs.data.localcache.manifest = manifest;
    
})