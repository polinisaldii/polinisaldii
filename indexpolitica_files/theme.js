window.Theme=window.Theme||{currentObject:null,inited:!1,menuHeight:0,$menu:$("#menu"),salesPageTypes:["product","order","order_confirmation","order_download","order_thank_you"],init:function(){this.IsInIframe.init(),this.TurboLinks.init(),this.Mobile.init(),this.reload(),this.PubSub.init(),$(window).on("resize",this.onResize.bind(this))},reload:function(){var e=this[this.Utils.capitalize(_4ORMAT_DATA.page.type)];e?e.hasOwnProperty("init")&&(this.currentObject=e).init():-1<this.salesPageTypes.indexOf(_4ORMAT_DATA.page.type)&&window.Theme.Store.init(),this.Preloader.hide(),this.Menu.init(),this.Mobile.init(),FastClick.attach(document.body)},restore:function(){this.currentObject&&this.currentObject.hasOwnProperty("restore")&&this.currentObject.restore()},afterRemove:function(){},onResize:function(){window.Theme.Mobile.isMobile=window.matchMedia("(max-width: 767px)").matches}},window.Theme.IsInIframe=window.Theme.IsInIframe||{isInIframe:!1,init:function(){try{this.isInIframe=window.location!=window.parent.location}catch(e){this.isInIframe=!0}}},window.Theme.TurboLinks=window.Theme.TurboLinks||{init:function(){$(window).on("page:update",this.onUpdate.bind(this)),$(window).on("page:before-change",this.onBeforeChange.bind(this)),$(window).on("page:before-unload",this.onBeforeUnload.bind(this)),$(window).on("page:restore",this.onRestore.bind(this)),$(window).on("page:after-remove",this.onAfterRemove.bind(this))},onRestore:function(){Theme.restore()},onBeforeUnload:function(){$("body").removeClass("is-changing")},onUpdate:function(){Theme.reload()},onBeforeChange:function(){$("body").addClass("is-changing"),$("html,body").animate({scrollTop:0},750)},onAfterRemove:function(){Theme.afterRemove()}},window.Theme.Menu=window.Theme.Menu||{$menu:null,$toggleBtn:null,$header:null,isOpen:!1,init:function(){this.$menu=$("#menu"),this.$header=$("header"),this.$toggleBtn=$("button.toggle-menu"),this.$item=$("nav.menu .item a"),this.menuTabletCategoryFix(),this.$toggleBtn.click(function(){return $("html,body,header").toggleClass("menu-open"),window.Theme.Menu.isOpen=$("header").hasClass("menu-open"),!1}),this.$item.click(function(){$("html,body,header").removeClass("menu-open"),window.Theme.Menu.isOpen=!1}),(_4ORMAT_DATA.theme.menu_fixed_position||Theme.Mobile.isMobile)&&this.fixedMenu(),$(window).on("resize",this.fixedMenuAction.bind(this))},fixedMenu:function(){this.fixedMenuAction(),$(window).resize(this.fixedMenuAction.bind(this)),this.$header.find("img").load(this.fixedMenuAction.bind(this))},fixedMenuAction:function(){Theme.Mobile.isMobile||_4ORMAT_DATA.theme.menu_fixed_position?$("body").css("padding-top",$("header").outerHeight(!0)):$("body").css("padding-top",0)},menuTabletCategoryFix:function(){$("nav.menu li").on("click",function(){var e=$(this);$("nav.menu li").not(e).each(function(){$(this).removeClass("active")}),e.toggleClass("active")})}},window.Theme.Mobile=window.Theme.Mobile||{$menu:$("#menu"),$logo:$("header h1.logo"),touchStateY:-1,touchState:"displayed",timeout:0,isMobile:window.matchMedia("(max-width: 767px)").matches||0<navigator.maxTouchPoints&&window.matchMedia("(max-width: 900px)").matches,isLandscape:$(window).width()>$(window).height(),isAndroid:navigator.userAgent.match(/Android/i),init:function(){this.isMobile&&($(window).on("page:after-remove",this.onPageAfterRemove.bind(this)),$(window).on("page:before-change",this.onPageBeforeChange.bind(this)),$(window).on("page:update",this.onPageUpdate.bind(this)),$(window).on("orientationchange",this.onOrientationChange.bind(this)),$(document).on("touchstart",this.onTouchStart.bind(this)).on("touchmove",this.onScrollMove.bind(this)).on("scroll",this.onScrollMove.bind(this)),this.removeClassOnMobile()),$(window).on("resize",this.removeClassOnMobile.bind(this))},attachClickListeners:function(){},detachClickListeners:function(){},removeClassOnMobile:function(){var e=_4ORMAT_DATA.theme.menu_layout_type;window.matchMedia("(max-width: 767px)").matches||0<navigator.maxTouchPoints&&window.matchMedia("(max-width: 900px)").matches?$("header").removeClass("center-aligned right-aligned").addClass("collapsed"):$("header").removeClass("collapsed").addClass(e.toLowerCase())},onPageBeforeChange:function(){this.detachClickListeners()},onPageAfterRemove:function(){this.detachClickListeners()},onPageUpdate:function(){this.$menu=$("nav.menu"),this.attachClickListeners(),window.Theme.onResize()},onOrientationChange:function(){this.isLandscape=$(window).width()>$(window).height()},onScrollMove:function(){if(!window.Theme.Menu.isOpen){var e=$(window).scrollTop();e>this.lastScrollTop+10&&55<e&&"displayed"==this.touchState?(this.touchState="hidden",$("header").addClass("mobile-hidden").css("top",-$("header").height())):e<this.lastScrollTop-10&&"hidden"==this.touchState&&(this.touchState="displayed",$("header").removeClass("mobile-hidden").removeAttr("style")),this.lastScrollTop=e}},onTouchStart:function(e){window.Theme.Menu.isOpen||(this.touchStateY=e.originalEvent.touches[0].clientY)}},window.Theme.PubSub=window.Theme.PubSub||{prevHash:null,init:function(){window.Theme.IsInIframe.isInIframe?$(document).on("click","div[data-href*=#]",this.onHashLinkClick.bind(this)):($(self).on("hashchange",this.onHashChange.bind(this)),this.onHashChange())},changeHash:function(e){this.triggerHashEvent(e),history.replaceState("","","#"+e)},onHashLinkClick:function(e){var i=$(e.currentTarget).data("href").split("#")[1];return this.triggerHashEvent(i),!1},triggerHashEvent:function(e){if("!"===e||""===e)$(window).trigger("4ormat:reset"),history.replaceState("",document.title,window.location.pathname+window.location.search);else if(0<=e){var i=["asset"];i.push(e),$(window).trigger("4ormat:"+i.shift(),i)}},onHashChange:function(){var e=self.location.hash.substr(1);this.triggerHashEvent(e),this.prevHash=e}},window.Theme.Utils=window.Theme.Utils||{capitalize:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},fixIE:function(){$.browser.msie&&(8==parseInt($.browser.version,10)&&$("body").addClass("ie-fix"))}},window.Theme.Preloader=window.Theme.Preloader||{init:function(){$(window).on("page:fetch",this.show.bind(this)),$(window).on("page:update",this.hide.bind(this))},show:function(){$("body").addClass("is-loading")},hide:function(){$("body").removeClass("is-loading")}},window.Theme.Gallery=window.Theme.Gallery||{msnry:null,init:function(){window.navigator.userAgent.indexOf("MSIE ");this.initMasonry(),this.initLazyLoad(),this.Popup.init(),$("#assets").removeClass("fadeInAnim").addClass("fadeInAnim"),$(".title-element").removeClass("fadeInAnim").addClass("fadeInAnim")},initEvents:function(){$(window).on("4ormat:asset",this.showAssetByID.bind(this)),$(window).on("4ormat:reset",this.onReset.bind(this))},initMasonry:function(){var e;e="Medium"===_4ORMAT_DATA.theme.gallery_element_spacing?50:"Large"===_4ORMAT_DATA.theme.gallery_element_spacing?100:10,this.msnry=new Masonry(".masonry",{itemSelector:".asset",gutter:e,transitionDuration:0,horizontalOrder:_4ORMAT_DATA.theme.gallery_thumbnails_order}),this.msnry.on("layoutComplete",this.onLayoutComplete.bind(this))},onLayoutComplete:function(){var e=$(this.msnry.getItemElements());e.removeClass("col1 col2"),e.each(function(){var e=$(this);"0px"==e.css("left")?e.addClass("col1"):e.addClass("col2")}),$(".masonry").imagesLoaded(function(){var e;e="Medium"===_4ORMAT_DATA.theme.gallery_element_spacing?50:"Large"===_4ORMAT_DATA.theme.gallery_element_spacing?100:10,this.msnry=new Masonry(".masonry",{itemSelector:".asset",gutter:e,transitionDuration:0,horizontalOrder:_4ORMAT_DATA.theme.gallery_thumbnails_order})})},initLazyLoad:function(){$(document).on("lazybeforeunveil",this.onImgLoaded.bind(this)),0<window.Theme.Gallery.init.msie||navigator.userAgent.match(/Trident.*rv\:11\./)?window.Theme.Gallery.onImgLoadedIE():$(".asset.video img").on("load",this.onImgLoaded.bind(this))},onImgLoaded:function(e){if($("body").hasClass("gallery")){var i=$(e.target);i.on("load",function(){i.removeClass("loading").prev(".image-placeholder").attr("class","image-placeholder-hidden")}),this.msnry.layout()}},onImgLoadedIE:function(){$(".asset img").each(function(){if($(this).hasClass("video"))var e="auto";else{var i=$(this).attr("width")/$(this).attr("height");e=$(this).width()/i}$(this).parent().outerHeight(e).end().removeClass("loading").prev(".image-placeholder").attr("class","image-placeholder-hidden").end().delay(1).queue(function(){window.Theme.Gallery.msnry.layout()}).dequeue()})},restore:function(){},onLazyLoadBeforeShow:function(){},onLazyLoadShow:function(){}},window.Theme.Gallery.Popup=window.Theme.Gallery.Popup||{popup:null,currentId:-1,nextId:-1,prevId:-1,currentData:{},mainContent:null,controls:null,nextBtn:null,prevBtn:null,copy:null,copyInner:null,isOpen:!1,isLoading:!1,speed:400,socialIcons:null,queue:[],queueTimeout:0,isTablet:window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches,init:function(){this.wrapper=$("#wrapper"),this.popup=$("#popup"),this.inner=this.popup.children(".inner"),this.mainContent=$("#popup .main-content"),this.controls=$("#popup .controls"),this.copy=$("#popup .copy"),this.copyInner=$("#popup .copy .wrap"),this.nextBtn=$("#popup #next"),this.prevBtn=$("#popup #prev"),this.socialIcons=$("#popup #social_icons_popup ol"),this.triggerCaptionButton=$("#popup button.trigger-caption"),this.popup.find(".main-content").on("click","img",this.showNextAsset.bind(this)),this.socialIcons.find(".share").click(function(){return _4ORMAT.$("#share_4ormat_link").click(),!1}),this.attachEvents(),this.hidePopuponOutsideClick(),this.noVideoPlaceholder(),_4ORMAT_DATA.page.assets.length<=1||Theme.Mobile.isMobile?(this.prevBtn.hide(),this.nextBtn.hide()):(this.prevBtn.show(),this.nextBtn.show()),(Theme.Mobile.isMobile||this.isTablet)&&this.swipeGallery()},attachEvents:function(){this.nextBtn.off("click").on("click",this.onNextPrevBtnClick.bind(this)),this.prevBtn.off("click").on("click",this.onNextPrevBtnClick.bind(this)),this.triggerCaptionButton.off("click").on("click",this.onTriggerCaptionBtnClick.bind(this)),Theme.IsInIframe.isInIframe&&($(".gallery .asset").off("click").on("click",this.showAssetByIDInIframe.bind(this)),$(".close").off("click").on("click",this.onReset.bind(this))),$(".gallery .asset").off("click").on("click",this.showAssetByID.bind(this)),$(document).off("keydown").on("keydown",this.onDocumentKeyDown.bind(this)),$(window).off("4ormat:asset").on("4ormat:asset",this.showAssetByID.bind(this)),$(window).off("4ormat:reset").on("4ormat:reset",this.onReset.bind(this)),$(window).off("resize").on("resize",this.onWindowResize.bind(this)),$(window).off("resize").on("resize",this.noVideoPlaceholder.bind(this)),$(window).off("orientationchange").on("orientationchange",this.onRotate.bind(this))},noVideoPlaceholder:function(){$(".no-video-placeholder").each(function(){var e=$(this),i=e.width(),t=16/9;e.css({height:i/t})})},onTriggerCaptionBtnClick:function(){return $("#popup figcaption").toggleClass("show"),this.triggerCaptionButton.toggleClass("show"),!1},onNextPrevBtnClick:function(){return!this.isLoading},show:function(){this.isOpen||(this.popup.addClass("show closeR").find("a.close").hide().end().find("button.trigger-caption").hide(),this.isOpen=!0,$("body, html").addClass("noscroll"))},hide:function(){this.isOpen&&(this.isOpen=!1,this.popup.removeClass("show"),$("body, html").removeClass("noscroll"),$("#popup figcaption").removeClass("show"),this.triggerCaptionButton.removeClass("show"),$("body").removeClass("noscroll").unbind("touchmove"))},showAssetByID:function(e,i){if(!_4ORMAT_DATA.theme.gallery_disable_zoom||$(e.target).hasClass("video")){if("4ormat:asset"!==e.type)i=$(e.currentTarget).data("id");this.show();var t=_4ORMAT_DATA.page.nested?_4ORMAT_DATA.page.nested.assets.length:_4ORMAT_DATA.page.assets.length;this.currentId=parseInt(i),_4ORMAT_DATA.page.nested?this.currentData=_4ORMAT_DATA.page.nested.assets[this.currentId]:this.currentData=_4ORMAT_DATA.page.assets[this.currentId],this.nextId=this.currentId==t-1?0:this.currentId+1,this.prevId=0==this.currentId?t-1:this.currentId-1,this.nextBtn.data("href","#"+this.nextId),this.prevBtn.data("href","#"+this.prevId),this.isLoading=!0,$("body, html").addClass("noscroll"),history.replaceState("","","#"+this.currentId),this.appendContent(this.currentData)}},showAssetByIDInIframe:function(e){var i=$(e.target).closest(".asset");this.showAssetByID("click",i.data("href").split("#")[1])},onAfterContentFadeOut:function(){this.appendContent(this.currentData)},onAssetImageLoad:function(e){var i=e.currentTarget;this.mainContent.html(i),$(".main-content").parent().is("figure")||($("#popup .main-content, #popup .copy").wrapAll("<figure></figure>"),this.copy.wrap("<figcaption></figcaption>")),this.setAssetHeight(),this.isLoading=!1,this.popup.removeClass("fadeOut loading")},appendContent:function(e){this.popup.removeClass("text image caption video").addClass(e.type+" loading"),e.copy?(this.popup.addClass("caption"),this.popup.find("figcaption .copy").html(e.copy)):(this.popup.removeClass("caption"),this.popup.find("figcaption .copy").html());var i=this.popup.find(".controls a.close");switch(e.type){case"image":var t=new Image;t.src=e.image_url_1600x1200,t.alt=e.alt_text,this.popup.find("figure .img").html(t),this.popup.find("img").on("load",function(){$("#popup").hasClass("closeR")&&!$("#popup").hasClass("caption")&&$("#popup").removeClass("closeR").find("a.close").fadeIn(),$("#popup").hasClass("closeR")&&$("#popup").hasClass("caption")&&$("#popup").removeClass("closeR").find("a.close").fadeIn().end().find("button.trigger-caption").fadeIn()});break;case"video":this.popup.find(".video .iframe").html(e.embed_dimensions),$("#popup").hasClass("closeR")&&!$("#popup").hasClass("caption")&&$("#popup").removeClass("closeR").find("a.close").fadeIn(),$("#popup").hasClass("closeR")&&$("#popup").hasClass("caption")&&$("#popup").removeClass("closeR").find("a.close").fadeIn().end().find("button.trigger-caption").fadeIn();break;case"text":this.popup.find(".text .copy").html(e.copy),$("#popup").hasClass("closeR")&&!$("#popup").hasClass("caption")&&$("#popup").removeClass("closeR").find("a.close").fadeIn(),$("#popup").hasClass("closeR")&&$("#popup").hasClass("caption")&&$("#popup").removeClass("closeR").find("a.close").fadeIn().end().find("button.trigger-caption").fadeIn(),i.css("top",this.popup.find(".inner").position().top)}this.onWindowResize()},onWindowResize:function(){if(this.isOpen){var e=this.currentData,i=$(window).width(),t=$(window).height(),n=window.matchMedia("(max-width: 767px)").matches,o=window.matchMedia("(orientation: landscape)").matches;switch(e.type){case"video":var s=100,a=_4ORMAT_DATA.theme.upscale_videos?0:200,h=s+a,d=e.video_width,r=e.video_width/e.video_height;if(n)o?(c=(d=i-340)/r,this.popup.find(".video").css({"margin-top":c/4})):c=(d=i)/r;else{_4ORMAT_DATA.theme.upscale_videos?d=i:((d=e.video_width)<1280&&(d=1280),i-200<d&&(d=i-200));var l=t-h,c=d/e.video_ratio;l<c&&(c=l,_4ORMAT_DATA.theme.upscale_videos||(d=c*e.video_ratio)),"Overlay"!==_4ORMAT_DATA.theme.gallery_caption_layout&&this.popup.find(".video figcaption").css({height:a})}this.popup.find(".video").css({width:d,height:c})}}},onDocumentKeyDown:function(e){this.isOpen&&("39"==e.which?(this.showNextAsset(),e.preventDefault()):"37"==e.which?(this.showPrevAsset(),e.preventDefault()):"27"==e.which&&(window.Theme.PubSub.changeHash("!"),e.preventDefault()))},showNextAsset:function(){this.popup.addClass("closeR").find("a.close").hide().end().find("button.trigger-caption").hide(),window.Theme.PubSub.changeHash(this.nextId)},showPrevAsset:function(){this.popup.addClass("closeR").find("a.close").hide().end().find("button.trigger-caption").hide(),window.Theme.PubSub.changeHash(this.prevId)},onReset:function(){this.popup.find(".video iframe").length&&this.popup.find(".video .iframe").html(""),this.isOpen&&this.hide()},hidePopuponOutsideClick:function(){this.popup.on("click",function(e){$(e.target).parent().hasClass("adclose")||window.Theme.PubSub.changeHash("!")})},swipeGallery:function(){var e=$("#popup").hammer();e.on("swipeleft",function(){window.Theme.PubSub.changeHash(window.Theme.Gallery.Popup.nextId)}),e.on("swiperight",function(){window.Theme.PubSub.changeHash(window.Theme.Gallery.Popup.prevId)})},onRotate:function(){window.Theme.Mobile.isAndroid?window.Theme.Mobile.isLandscape=screen.width>screen.height:window.Theme.Mobile.isLandscape=$(window).width()>$(window).height(),"video"==this.currentData.type?this.setAssetHeightForVideo():"text"==this.currentData.type&&this.setAssetHeightForText()},onVideoPreviewClick:function(e){e.preventDefault(),this.mainContent.find(".preview").fadeOut()},VideoPreviewTop:function(){var e=this.mainContent.find(".vimeo_cont, .youtube_cont").not(".preview");this.mainContent.find(".preview").css({top:e.position().top,left:e.position().left})}},window.Theme.Listing=window.Theme.Listing||{msnry:null,init:function(){window.navigator.userAgent.indexOf("MSIE ");("Masonry"==_4ORMAT_DATA.theme.listing_thumbnail_style||_4ORMAT_DATA.page.nested)&&this.initMasonry(),window.Theme.Gallery.Popup.init(),this.initLazyLoad(),$("#assets").delay(1).queue(function(){$("#assets").removeClass("fadeInAnim")}).dequeue().delay(1).queue(function(){$("#assets").addClass("fadeInAnim")}).dequeue().delay(250).queue(function(){$("#assets .asset img").addClass("fadeInAnim")}),$(".title-element").removeClass("fadeInAnim").addClass("fadeInAnim")},initMasonry:function(){var e;e=$("body").hasClass("listing_page")&&!$("body").hasClass("nested")?10:"Medium"===_4ORMAT_DATA.theme.gallery_element_spacing?50:"Large"===_4ORMAT_DATA.theme.gallery_element_spacing?100:10,this.msnry=new Masonry(".masonry",{itemSelector:".asset",gutter:e,transitionDuration:0}),this.msnry.on("layoutComplete",this.onLayoutComplete.bind(this))},onLayoutComplete:function(){var e=$(this.msnry.getItemElements());e.removeClass("col1 col2"),e.each(function(){var e=$(this);"0px"==e.css("left")?e.addClass("col1"):e.addClass("col2")})},initLazyLoad:function(){$(document).on("lazybeforeunveil",this.onImgLoaded.bind(this)),0<window.Theme.Listing.init.msie||navigator.userAgent.match(/Trident.*rv\:11\./)?window.Theme.Listing.onImgLoadedIE():$(".asset.video img").on("load",this.onImgLoaded.bind(this))},onImgLoaded:function(e){if($("body").hasClass("listing")){var i=$(e.target);i.on("load",function(){i.removeClass("loading").prev(".image-placeholder").attr("class","image-placeholder hidden")}),("Normal"==_4ORMAT_DATA.theme.listing_thumbnail_style||_4ORMAT_DATA.page.nested)&&this.msnry.layout()}},onImgLoadedIE:function(){$(".gallery-container .asset img").each(function(){if($(this).hasClass("video"))var e="auto";else{var i=$(this).attr("width")/$(this).attr("height");e=$(this).width()/i}$(this).parent().outerHeight(e).end().removeClass("loading").prev(".image-placeholder").attr("class","image-placeholder hidden").end().delay(1).queue(function(){window.Theme.Listing.msnry.layout()}).dequeue()})}},window.Theme.Content=window.Theme.Content||{init:function(){$("._4ORMAT_content_wrapper").delay(1).queue(function(){$("._4ORMAT_content_wrapper").removeClass("fadeInAnim"),$("._4ORMAT_content_wrapper").addClass("fadeInAnim")})}},window.Theme.Client=window.Theme.Client||{init:function(){$("._4ORMAT_content_wrapper").delay(1).queue(function(){$("._4ORMAT_content_wrapper").removeClass("fadeInAnim"),$("._4ORMAT_content_wrapper").addClass("fadeInAnim")})}},window.Theme.Simple=window.Theme.Simple||{init:function(){$("._4ORMAT_content_wrapper").delay(1).queue(function(){$("._4ORMAT_content_wrapper").removeClass("fadeInAnim"),$("._4ORMAT_content_wrapper").addClass("fadeInAnim")})}},window.Theme.Blog=window.Theme.Blog||{init:function(){this.videoSize(),$("._4ORMAT_content_wrapper").delay(1).queue(function(){$("._4ORMAT_content_wrapper").removeClass("fadeInAnim"),$("._4ORMAT_content_wrapper").addClass("fadeInAnim")}),$(window).on("resize",this.videoSize.bind(this))},videoSize:function(){var o=window.matchMedia("(max-width: 767px)").matches;$("iframe").each(function(){var e=$(this),i=e.width(),t=e.height(),n=e.attr("width")/e.attr("height");o&&(n<1?t*=n:t=i/n,e.css({height:t+"px"}))})}},window.Theme.Store=window.Theme.Store||{init:function(){setTimeout(function(){$("._4ORMAT_content_wrapper").delay(1).queue(function(){$("._4ORMAT_content_wrapper").removeClass("fadeInAnim"),$("._4ORMAT_content_wrapper").addClass("fadeInAnim")})},1e3)}},$(document).on("DOMContentLoaded",function(){Theme.init()}),window.onpopstate=function(e){""===e.state&&window.history.go()};