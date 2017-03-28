/**
* name: common
* version: v3.0.0
* update: 去掉pc端跨屏支持
* date: 2016-04-30
*/
define(function(require, exports, module) {
  var $ = require('jquery');
  var base = require('base');
  var typeCatch = base.getType();

  if(base.browser.ie<7){
    alert('您的浏览器版本过低，请升级或使用chrome、Firefox等高级浏览器！');
  }

  //移动端跨屏刷新
  $('body').attr('data-w',$('body').outerWidth());
  var throttleResize = base.throttle(function(){
    if(base.getType()!=='Pc'){
      var new_width = $('body').outerWidth();
      if(new_width !== $('body').data('w')){
        document.location.reload()
      }
    }
  });
  $(window).on('resize',function(){
    throttleResize();
  });


  //字号调节
  var $speech=$('.myart:visible'),
     defaultsize=parseFloat($speech.css('font-size'));
  if($speech.length){
    //window.localStorage &&  localStorage.getItem('fz') && $speech.css('font-size', localStorage.getItem('fz')+'px');
    $('body').on('click','#switcher a',function(){
      var num=parseFloat($speech.css('font-size'))
      switch(this.id){
        case'small':num/=1.4
        break
        case'big':num*=1.4
        break
        default:num=defaultsize
      }
      $speech.css('font-size',num+'px')
      //window.localStorage && localStorage.setItem('fz',num);
    })
  }

  //页面平滑滚动
  if(base.getType() == 'Pc'){
    if (base.browser.ie > 8 || base.browser.ie == 0) {
      require('smoothscroll');
    }
  }

  //图片懒加载
  require('scroll-loading');
  $("img").scrollLoading({
    attr:"data-url"
  });

  /*
  * 常用工具
  */
  //返回顶部
  $('body').on('click','.gotop',function(){$('html,body').stop(1).animate({scrollTop:'0'},300);return false});
  //关闭当前页
  $('body').on('click','.closewin',function(){window.opener=null;window.open("","_self");window.close()});
  //打印当前页
  $('body').on('click','.print',function(){window.print()});
  //加入收藏
  $('body').on('click','.favorite',function(){var sURL = "http:&#47;&#47;"+document.domain+"&#47;",sTitle = document.title;try{window.external.addFavorite(sURL, sTitle)} catch (e){try{window.sidebar.addPanel(sTitle, sURL, "")}catch (e){alert("加入收藏失败，请使用Ctrl+D进行添加")}}});
  //设为首页
  $('body').on('click','.sethome',function(){var vrl="http:&#47;&#47;"+document.domain+"&#47;";if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(e){alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")}var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref('browser.startup.homepage',vrl)}else{alert("您的浏览器不支持自动设为首页，请您手动进行设置！")}});
  //屏蔽ie78 console未定义错误
  if (typeof console === void(0)) {
      console = { log: function() {}, warn: function() {} }
  };
  //textarea扩展max-length
  $('textarea[max-length]').on('change blur keyup',function(){
    var _val=$(this).val(),_max=$(this).attr('max-length');
    if(_val.length>_max){
      $(this).val(_val.substr(0,_max));
    };
  });
  //延时显示
  $('.opc0').animate({'opacity':'1'},160);
  // placeholder
  $('input, textarea').placeholder();
  //按需渲染
  base.scanpush();
  //响应图片
  base.resImg();
  /*
  * 输出
  */
  module.exports = {
    demo:function(){
      console.log('hello '+base.getType());
    }
  }

  /*
  * 站内公用
  */
 
  //导航当前状态 2.0后台需要使用
  //var jrChannelArr=jrChannel.split('#');
  //$('.nav').children('li').eq(jrChannelArr[0]).addClass('cur').find('li').eq(jrChannelArr[1]).addClass('cur');
  
  //头部向上滚动
  require('scroll-row');
  $('.headCol').scrollRow({
    wrap:'dl',
    cell:'dd',
    prev:'.ha_prev',
    next:'.ha_next'
  })

  //头部搜索
  $('.head_ser').click(function() {
    $(this).toggleClass('active');
    $('.h_search').stop().slideToggle(128);
  })
  $('.pageHeader').mouseleave(function(){
    $('.h_search').stop().slideUp(128);
  })

  //头部站群下拉 
  $('.head_r .li02').click(function(){
    $(this).find('.option').stop().slideToggle('128');
  })
  $('.head_r .li02').mouseleave(function(){
    $(this).find('.option').stop().slideUp('128');
  })

  var _li =$('.nav ul').children('li');

  if(base.getType()=='Pc'){

    //导航追加选中状态标签
       $(window).load(function(){
        $(".nav").append('<i class="line"></i>');
        $(".nav li .nav_a").bind("mouseenter",function() {
          var line = $(".nav .line");
         
          if (line.css("display") == "none") line.show();
          line.stop().animate({
            width: $(this).width() + 10,
            left: parseInt($(this).position().left) - 5 + "px"
          }, 300)

        })
        $(".nav").bind("mouseleave", function() {
          $(".nav li.cur .nav_a").trigger("mouseenter");
          $('.setNav').stop().slideUp('400');

          //没有当前状态时，离开导航，跟随线消失
          //console.log($('.nav li.cur').length);
          if($('.nav li.cur').length==0){
            $(".nav .line").hide();
          }
        }).trigger("mouseleave");

      })

        //导航下拉效果
        _li.each(function(i, e) {
            $(this).addClass('nav'+(i+1));
        });
        $('.nav').on('mouseenter','.nav_li',function(){
          $(this).find('.setNav').stop().slideDown('400');
        }).on('mouseleave','.nav_li',function(){
          $(this).find('.setNav').stop().slideUp('400');
        })

        $('.nav .nav_li .setNav .set_close').click(function() {
          $(this).parents('.setNav').stop().slideUp('400');
        });

    //多组分享js         
     require.async('bdshare',function(bdshare){
         bdshare([{
              tag : 'foot_share',  
              bdSize : 24,      //图标尺寸, 16｜24｜32
              bdStyle : '0'     //图标类型, 0｜1｜2

           },{
              tag : 'share_news_detail',  
              bdSize : 24,      //图标尺寸, 16｜24｜32
              bdStyle : '0'     //图标类型, 0｜1｜2

           },{
              tag : 'share_wid681222',  
              bdSize : 24,      //图标尺寸, 16｜24｜32
              bdStyle : '0'     //图标类型, 0｜1｜2

           },{
              tag : 'share_s',  
              bdSize : 24,      //图标尺寸, 16｜24｜32
              bdStyle : '0'     //图标类型, 0｜1｜2

           }])
     });


     var vision=base.browser.ie;
       if(vision==0||vision>9){
        require('wow');
          wow = new WOW(
            {
              animateClass: 'animated',
              offset: 0
            }
          );
          wow.init();
        }

      //底部滚动条
      // require('scroll-bar');
      // $('.foot_top .f_dl3 dd').scrollBar({
      //   width:3
      // });

      //头部跟随效果2016-11-18
      $(document).ready(function() {
        var prevTop = 0,
            currTop = 0,
            topH = $('.pageHeader').outerHeight();
        $(window).scroll(function() {
          currTop = $(window).scrollTop();
          if (currTop < prevTop) { 
            $('.pageHeader').removeClass('tophide');//上
          } else {
            $('.pageHeader').addClass('tophide');//下
          }
          setTimeout(function(){prevTop = currTop},0);
        });

        if( $(window).scrollTop() > 0){
          $('.pageHeader').addClass('tophide');
        };
      });

    }else{
       $(".nav .nav_li").each(function(i,e){
          
      $(this).find('.setMenu').unwrap().unwrap();
        $(this).find('.set-img,.setCon').remove();
      })

    //导航效果
     require('offcanvas');
     $('.nav').offcanvas(); 
  }

  // if(base.getType()!='Mobile'){
  //    $(".s_menu li").eq(0).addClass('first');
  // }

  //底部成员公司纵向滚动
  /*  require('scroll-row');
  $('.foot_top .f_dl3 dd').scrollRow({
      prev:'.dl3_arr_prev',
      next:'.dl3_arr_next',
      auto:false
   })*/

  //底部纵向滚动
  require('superslide');
  $(".f_dl3 dd").slider({
    titCell:".hd ul",
    mainCell:".bd ul",
    autoPage:true,
    effect:"top",
    vis:6,
    trigger:"click",
    prevCell:".dl3_arr_prev",
    nextCell:".dl3_arr_next"
  });

  
})