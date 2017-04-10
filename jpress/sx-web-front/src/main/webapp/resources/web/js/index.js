/**
 * index
 */
define(function(require) {
  var $ = require('jquery');
  var base = require('base');
  var com = require('./common');
  require('slide');
  require('tab');
 	
 	if(base.getType()=='Pc'){
 		//底部效果
    /*var firstH = $(window).height();
    $(window).scroll(function(){
      var scrolls = $(this).scrollTop();
      if(scrolls > firstH){
        $('.pageFooter').css('z-index',4);
      }else{
        $('.pageFooter').removeAttr('style');
      }; 
    });*/

    require('easing');

    // function FootFixed(){
    //   var animationSpeed=1500;
    //   var animationEasing='easeOutQuint';
    //   //var scrollTop=$('.s_menu_bar').offset().top;
    //   //console.log('newPosition='+newPosition);
    //   var firstH = $(window).height();
    //   if($(window).scrollTop()>firstH){
    //     $('.pageFooter').css('z-index',4);
    //   } else {
    //    $('.pageFooter').css('z-index',1);;
    //   }
    // }
    // $(window).load(function(){
    //   FootFixed();
    // });
    // $(window).scroll(function(){ 
    //   FootFixed();
    // });



    var winH = $(window).height(),
      headerH = $('.pageHeader').outerHeight();
    // $('.videoBanner').height(winH-headerH+36);
   // $('.bodyMain').css('padding-top',winH);

     var $digs = $('.is_animated');
      $digs.each(function() {
        var _this = $(this),
            distance = _this.offset().top - $(window).height() + $(window).height()/5;
        var sec1func = function() {
          if ($(window).scrollTop() > distance) {
            _this.addClass('revealed');
            $(window).unbind('scroll.load', sec1func);   
          }
          // else{
          //   _this.removeClass('revealed');
          // }
        }
        sec1func();
        $(window).on('scroll.load', sec1func);
      });

      //全球运营切换
    $('.inter-map-box').tab({
      tabs:'.widget-area li',
      posi_auto:false
    });


 	}else{
    $('.cen_box2 .rolling-box li').each(function(i,e){
      $(this).removeClass('is_animated');
      
    })
    $('.cen_box6 li').each(function(i,e){
       $(this).removeClass('is_animated');
    })
  }
   
   if(base.getType()=='Mobile'){
      //产品布局在手机上加滚动效果

      $('.cen_box2 .cen2_scroll').slide()
    }
  
  //banner滚动
    $('.banner').slide({
	    auto:false,
	    prev:'.stop',
	    next:'.play',
      callback:function(a,b,c) {
        if (c != 2 && base.getType() == 'Pc') {
          //document.getElementById("video").pause();
          $('.i_banner_ico').show();
        }
      }
	  });

    //IE9以下视频移除 加载图片  

  if(base.browser.ie<9 || base.getType() !== 'Pc'){
    $('#video').remove();
    $('.banner').addClass('ie').show();
  }else{
    //banner默认播放
    setTimeout(function() {
         $('.i_banner_ico').click(function() {
           document.getElementById("video").play();
           $(this).hide();
           document.getElementById("video").volume=0.5;

         });

        var win = $(window);
        banner_v = base.throttle(function(){
          var winst = win.scrollTop();        
          var bodyTop = $('.cen_box1').offset().top;
          win.scroll(function(){
            if(win.scrollTop() > bodyTop){
              //document.getElementById("video").pause();
              $('.i_banner_ico').show();
            }
          })
          
        });
        banner_v();
        win.on('scroll',banner_v);
    })

  }

    
  //新闻中心滚动
  if (base.getType() !== 'Mobile') {
     $('.cen_box4 .maxWrap').slide({
        duration:1000
      }) 
  }
    

  //视频
  require('box');
  require('video');
  var video_width,video_height,scroll_step;
  if (base.getType() !== 'Mobile') {
        video_width = 600;
        video_height = 500;
        scroll_step = 3
    } else {
        video_width = '100%';
        video_height = 300;
        scroll_step = 1
    }
    $('.cen_box5 .last').on('click','.pbox',function(i,e){
      if($.trim($(this).data('v'))){
        //e.preventDefault();
        var tmp=$(this).data('v');
        var videoId='video'+Math.floor(Math.random()*100000);
        var _title=$(this).find('.title').text();
        var _dom='<video id='+videoId+' class="video-js vjs-default-skin" oncontextmenu="return false;"><source src='+tmp+' type="video/mp4"><p class="vjs-no-js">不支持js的浏览器会看到这个</p></video>'
        var player;
        $.box( _dom,{ onshow:function(){
          player = videojs(videoId, {
            width: video_width,
            height: video_height,
            poster: '',
            controls:true,
            autoplay:true,
            preload:'auto'
          });
          $('.vjs-big-play-button').trigger('click');
        }, width:video_width,height:video_height+40,title:_title} );  
      }
    })
//首页新闻调取
/*$.post("/ext/ajax_index.jsp",{flag:"newsList"},function(data){
       $(".cen_box5 ul").prepend(data);
  });*/





})