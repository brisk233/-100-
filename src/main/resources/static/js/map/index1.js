/**
 * Created by 17120847 on 2017/12/13.
 */
function getParameter(param){
    var query = decodeURI(window.location.search);
    var iLen = param.length;
    var iStart = query.indexOf(param);
    if (iStart == -1) {
        return "";
    }
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);
    if (iEnd == -1) {
        return query.substring(iStart);
    }
    return query.substring(iStart, iEnd);
}

function setpopupPosition(el) {
    var winhei = $(window).height();
    $("#"+el).show();
    var offsettop = winhei/2-$("#"+el).find(".cont").height()/2;
    $("#"+el).find(".cont").css({"top":offsettop+"px"});
    $("#"+el).show();
}

var Check = {
    getHttpRequest: function(url, callback, callback2,options) {
        if (url.length < 0) return;
        var option = {
            url: url,
            type: "get",
            data:{"viewType":"json"},
            cache: false,
            async:false,
            beforeSend: function(XHR) {
            },
            complete: function(XHR, textStatus) {
                callback(XHR);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                callback2();
            }
        };
        if ( !! options) {
            option = $.extend(option, options);
        }
        $.ajax(option);
    }
};
function passportIsLoginFail(){
}
function passportIsLoginSuccess(data){
    try {
        var readyState = data.readyState;
        console.log(readyState);
        var responseText = data.responseText;
        //濡傛灉杩欓噷绛変簬undefined 璇存槑褰撳墠passport娌℃湁鐧诲綍骞朵笖spring 瀹夊叏妗嗘灦涔熸病鏈夌櫥褰曡褰�
        if(responseText === undefined || responseText ==='')
            return;
        console.log(responseText);
        var map1 =  JSON.parse(responseText);
        var hasLogin = map1.hasLogin;
        console.log(hasLogin);
        if (!hasLogin){
            //濡傛灉杩欓噷鐨勭櫥褰曠姸鎬佷负false 璇存槑 passport 鐧诲綍宸茬粡杩囧幓,浣嗘槸spring 瀹夊叏妗嗘灦娌℃湁杩囨湡
            window.location.href = "/passPortIndex.action?login_type=0"
            return;
        }
    }catch (e) {
        console.log("passportIsLogin------{}"+e);
    }
}

$(function () {
   //Check.getHttpRequest("/authStatus",passportIsLoginSuccess,passportIsLoginFail,null);
    var logistic = new Logistic();
    logistic.init();
	$.ajax({
		type:"post",
		url:"/customerAction!isLogin.action",
		error: function(){
		},
		success:function(data){
		    console.log(data)
		    try{
		    	var obj = eval('(' + data + ')');
		    	if(obj.success != null && obj.success != "" && obj.success == 'true'){
                    $("#username").html(obj.msg);
                    $('.sucess').css("display","block");
                    $('.normal').css("display","none");
                    //$('.customerBtn').attr("data","/onlineCallVip.action")
		    	}else{
                    $('.normal').css("display","block");
                    $('.sucess').css("display","none");
		    	}

		    }catch(error){
                $('.normal').css("display","block");
                $('.sucess').css("display","none");
                //$('.customerBtn').attr("data","/onlineCall.action")
		    }
		}
	});

    $(".khfwContent .orderTextInput").on("keyup", function() {
        var str = $('.khfwContent .orderTextInput').val();
        $('.khfwContent .orderTextInput').val(str.replace(/[^a-zA-Z0-9\n\t]/g,''));
    });

    $(".customerBtn").click(function () {
        $.ajax({
            type:"post",
            url:$(".customerBtn").attr("data"),
            error: function(){
            },
            success:function(data){
                var obj = eval('(' + data + ')');
                if('guest' === obj.chatModel){
                    var yunxin=new Yunxin();
                    yunxin.touristAccess({
                        bizSeq : '0033',
                        bizCode : '0033010001000000',
                        custNo : obj.custNo,
                        chatModel : 'guest',
                        appCode : 'TTKDEXWLG',
                        impleCode : "TTKDEX-QueryNicknameFromRedisForYunXin"
                    });
                }else if('merchant' === obj.chatModel){
                    var yunxin=new Yunxin();
                    yunxin.access({
                        bizSeq : '0033',
                        bizCode : '0033010001000000',
                        custNo : obj.custNo,
                        appCode : 'TTKDEXWLG',
                        // appCode : 'TTKDEXWLG',
                        insetUrl : '1'
                    });
                }
            }
        });
    });
    $("#toTopBtn").click(function () {
        window.scrollTo( 0, 0 );
    });
    $(".customerBtn").mouseover(function (evt) {
        $(evt.currentTarget).css("background","#E6A21C");
    });
    $(".customerBtn").mouseout(function (evt) {
        $(evt.currentTarget).css("background","#FFB41F");
    });
    $(".customerBtns").mouseover(function (evt) {
        $(evt.currentTarget).css("background","#E6A21C");
    });
    $(".customerBtns").mouseout(function (evt) {
        $(evt.currentTarget).css("background","#FFB41F");
    });

    $(".customerYunxinBtn").click(function () {

        $.ajax({
            type:"post",
            url:$(".customerYunxinBtn").attr("data"),
            error: function(){
            },
            success:function(data){
                var obj = eval('(' + data + ')');
                if('guest' === obj.chatModel){
                    var yunxin=new Yunxin();
                    yunxin.touristAccess({
                        bizSeq : '0033',
                        bizCode : '0033010001000000',
                        custNo : obj.custNo,
                        chatModel : 'guest',
                        appCode : 'TTKDEXWLG',
                        impleCode : "TTKDEX-QueryNicknameFromRedisForYunXin"
                    });
                }else if('merchant' === obj.chatModel){
                    var yunxin=new Yunxin();
                    yunxin.access({
                        bizSeq : '0033',
                        bizCode : '0033010001000000',
                        custNo : obj.custNo,
                        appCode : 'TTKDEXWLG',
                        // appCode : 'TTKDEXWLG',
                        insetUrl : '1'
                    });
                }
            }
        });
    })

    /**
     * [navGuest 璺宠浆瀹㈡湇椤甸潰]
     * @param  {[type]} appCode   [description]
     * @param  {[type]} channelId [description]
     * @param  {[type]} custNo    [description]
     * @return {[type]} chatModel [guest/merchant]
     */
    function navGuest(appCode, channelId, custNo,yunxinUrl,chatModel) {//楠岃瘉
        if (appCode == ''||custNo==''|| appCode == undefined || custNo == undefined || appCode == null || custNo == null ) {
            return;
        }
        var url=yunxinUrl+"/index.htm?appCode=" + appCode + "&channelId=" + channelId + "&custNo=" + custNo + "&chatModel="+chatModel;
        window.open(url);
    }
})



function Logistic(){
    this.slabblockWid = 360;
    this.slabblockHei = 460;
    this.winWid = $(window).width();
    this.pernum = null;
    this.minWidth = 236;//鎵嬪姩璁剧疆;
    this.infohei = 160;
    this.minhei = null;
    this.imghei = null;
    this.selectmaxlen = 5;//鏄剧ず5琛�
    this.hasstartVideo = false;//鏄惁鏈夌墖澶磋棰�
}

Logistic.prototype= {
    constructor: Logistic,
    _dealhei:function () {
        this.pernum = this.slabblockHei/this.slabblockWid;
        this.imghei = $(".slabCont").width()/4*this.pernum;
        this.minhei = this.minWidth*this.pernum;
        if(this.imghei<=this.minhei)this.imghei=this.minhei;
        $(".slab .listDiv").css({"min-height":this.imghei+"px"});
        $(".slab .listDiv").height(this.imghei);

        var smimgtop = this.imghei/2-this.infohei/2;
        $(".slab .listDiv .smimg").css({"margin-top":smimgtop+"px"})
        var hovertop = this.imghei/2-($(".infomation").height()+this.infohei)/2;

        $(".slab .listDiv").hover(function () {
            $(".slab .listDiv").find('.wrapAct').css({"margin-top":0+"px"});
            $(this).find('.wrapAct').css({"margin-top":-hovertop+"px"});
        })

        var hovertop1 = this.imghei/2-($(".infomation").height()+90)/2;
        $(".t_lxcloud .listDiv").hover(function () {
            $(this).find('.wrapAct').css({"margin-top":-hovertop1+"px"});
        },function(){
            $(this).find('.wrapAct').css({"margin-top":0+"px"});
        })

    },
    initData:function () {
        this._dealhei();
        initparm()
    },
    ArrIndexof:function(elt){
        if (!Array.prototype.indexOf){
            Array.prototype.indexOf = function(elt){
                var len = this.length >>> 0;
                var from = Number(arguments[1]) || 0;
                from = (from < 0)
                    ? Math.ceil(from)
                    : Math.floor(from);
                if (from < 0)
                    from += len;
                for (; from < len; from++)
                {
                    if (from in this &&
                        this[from] === elt)
                        return from;
                }
                return -1;
            };
        }
    },
    initEvent:function () {
        var _this = this;
        $(window).resize(function() {
            _this._dealhei();
        });

       /* document.body.onselectstart = function () {
            return false;
        }*/

        $(".navWrap .link").hover(function () {
            $(this).addClass("on");
            $(this).find(".cont").css({"display":"block"})
        },function () {
            $(this).removeClass("on");
            $(this).find(".cont").css({"display":"none"})

        })

        $("#backtop").click(function () {
            $('html,body').stop(true).animate({scrollTop:0},'fast');
        })

        var navtop =  $('#navWrap').offset().top;
        $(window).scroll(function() {
            if ($(window).scrollTop() > navtop) {
                $("#navWrap").addClass("fixedNavWrap");
               /!* $("#backtop").css({"visibility":"visible"})*!/
                $(".fixed").css({"visibility":"visible"})
            } else {
                $("#navWrap").removeClass("fixedNavWrap");
               /!* $("#backtop").css({"visibility":"hidden"})*!/
                $(".fixed").css({"visibility":"hidden"})
            }
        })

        var clickIndex = 0;
        var $clickdottab =  $("#bannerWrap .dotli").eq(0);
        $("#bannerWrap .bannerScroll .imgbg").eq(0).css({"opacity":1});
        $("#bannerWrap .bannerScroll .imgbg").eq(0).css({"visibility":"visible"});
        var settimeIndex = 0;
        var intervalOk = function () {
            var setImgeNum = $("#bannerWrap .bannerScroll .imgbg").length;

            $("#bannerWrap .bannerScroll .imgbg").eq(settimeIndex).css({"opacity":0});
            $("#bannerWrap .bannerScroll .imgbg").eq(settimeIndex).css({"visibility":'hidden'});
            settimeIndex++;
            if(settimeIndex>=setImgeNum){
                settimeIndex = 0;
            }
            $("#bannerWrap .dotli").removeClass("on");
            $("#bannerWrap .dotli").eq(settimeIndex).addClass("on");

            $("#bannerWrap .bannerScroll .imgbg").eq(settimeIndex).css({"opacity":1});
            $("#bannerWrap .bannerScroll .imgbg").eq(settimeIndex).css({"visibility":'visible'});
            $clickdottab = $("#bannerWrap .dotli").eq(settimeIndex);
            clickIndex = settimeIndex;
        }
        var setbannerinterval = setInterval(intervalOk,5000);

        $(document).on('mouseover',"#bannerWrap .dotli",function () {
            clearInterval(setbannerinterval);
            var index = $(this).index();
            var $currenttab = $(this);
            if($currenttab!=$clickdottab){
                $clickdottab.removeClass("on");
            }
            $currenttab.addClass("on");
            $clickdottab = $currenttab;

           
            $("#bannerWrap .bannerScroll .imgbg").css({"opacity":0});
            $("#bannerWrap .bannerScroll .imgbg").css({"visibility":'hidden'});
            
            $("#bannerWrap .bannerScroll .imgbg").eq(index).css({"opacity":1});
            $("#bannerWrap .bannerScroll .imgbg").eq(index).css({"visibility":'visible'});
            settimeIndex = index;
        })
        $(document).on('mouseout',"#bannerWrap .dotli",function () {
            setbannerinterval = setInterval(intervalOk,5000);
        })



        var corebusinessbtnIndex = 0;
        var $corebusinessbtn = $(".corebusiness .content .btngroup .link").eq(0);
        $(".corebusiness .content .btngroup .link").eq(0).find(".dot").css({"display":"block"});
        $("#corebusinessInfocont .infocont").eq(0).css({"display":"block"});
        $(".corebusiness .content .btngroup .link").hover(function () {
            var index = $(this).index();
            if(corebusinessbtnIndex!=index){
                $corebusinessbtn.removeClass("on");
                $corebusinessbtn.find(".dot").css({"display":"none"});
            }
            $(this).addClass("on");
            $(this).find(".dot").css({"display":"block"});
            $corebusinessbtn = $(this);
            corebusinessbtnIndex = index;

            //corebusinessbac_0

            $(".corebusiness").css({"background":"url('assets/corebusinessbac_"+index +".jpg') no-repeat center center" } )
            $("#corebusinessInfocont .infocont").hide().eq(index).css({"display":"block"});

        })

        $(".corebusiness .content .infocont .linkgroup .link").hover(function () {
            $(this).addClass("linkon");
        })


        /*function scrollTopandBottom(index,time) {
            var listIndexId = 0;
            var list0num = $(".logistiContent .list").eq(index).children().length/2;
            setInterval(function () {
                listIndexId++;
                if(listIndexId>list0num){
                    $(".logistiContent .list").removeClass("listani");
                    listIndexId=0;
                    $(".logistiContent .list").eq(index).css({"top":"0px"})

                }
                else{
                    $(".logistiContent .list").addClass("listani");
                }
                $(".logistiContent .list").eq(index).css({"top":"-"+listIndexId*81+"px"});

            },2000)
        }*/
        /*function scrollTopandBottom(index,time) {
            var listIndexId = 0;
            var list0num = $(".logistiContent .list").eq(index).children().length/2;
            setInterval(function () {
                if(listIndexId==Math.floor(list0num)){
                    listIndexId++;
                    $(".logistiContent .list").eq(index).css({"transform":"translate3d(0px,"+ -listIndexId*81+"px"+",0px",
                        "transition":"transform 500ms ease",
                    });
                    setTimeout(function () {
                        $(".logistiContent .list").eq(index).css({"transform":"translate3d(0px,0px"+",0px",
                            "transition":"transform 10ms ease",
                        });
                    },500)
                    listIndexId = 0;
                }
                else{
                    listIndexId++;
                    $(".logistiContent .list").eq(index).css({"transform":"translate3d(0px,"+ -listIndexId*81+"px"+",0px",
                        "transition":"transform 500ms ease"
                    })
                }

            },2000)
        }*/

       /* scrollTopandBottom(0);*/
      /* setTimeout(function () {
            scrollTopandBottom(0);
            setTimeout(function () {
                scrollTopandBottom(1);
                setTimeout(function () {
                    scrollTopandBottom(2);
                    setTimeout(function () {
                        scrollTopandBottom(3);
                    },500)
                },500)
            },500)
        },500)*/

        $(".fixed .link").hover(function () {
            $(this).find(".hoverwrap").css({"display":"block"});
        },function () {
            $(this).find(".hoverwrap").css({"display":"none"});
        })
        
        $(".slabContWrap .link,.playBtn").click(function () {
            debugger
            $(".videoplayWrap").css({"display":"block"});
            $(".commonWrap").hide();
            var docElm = document.documentElement;//W3C
            if(docElm.requestFullscreen){

                docElm.requestFullscreen();
            }
//FireFox
            else if (docElm.mozRequestFullScreen) {

                docElm.mozRequestFullScreen();
            }
//Chrome绛�
            else if (docElm.webkitRequestFullScreen) {

                docElm.webkitRequestFullScreen( Element.ALLOW_KEYBOARD_INPUT );
            }
//IE11
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
           var video =  document.getElementById("videoplay")
            video.src = 'cjyc.mp4';
            video.play();
        })

        
        $(document).on("click",".videoplayWrap .closebtn",function () {
            $(".commonWrap").show();
            $("#videoplayWrap").css({"display":"none"});
           /* var video =  document.getElementById("videoplay")
            video.pause();*/
            if (document.exitFullscreen) {

                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {

                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {

                document.webkitCancelFullScreen();
            }
            else if (document.msExitFullscreen) {

                document.msExitFullscreen();
            }
        })

        /*婕旂ず鐢�*/
        /*var navlinkurl = ["assets/2/gyl.png","assets/2/snkd.png","assets/2/tcfw.png","assets/2/ncwl.png","assets/2/snwljr.png","assets/2/wldsc.png","assets/2/snwly.png","assets/2/Ssys.png"]
        $(".navWrap .link").click(function () {
            var index = $(this).index();
            localStorage.linkurl = navlinkurl[index];
            window.location.href="twoLevel.html";
        })
        
        $(".corebusiness .content .infocont .linkgroup .link").click(function () {
            var index = 0;
            localStorage.linkurl = navlinkurl[index];
            window.location.href="twoLevel.html";
        })*/


        $("#checkcityserver").click(function () {
        	 $("#twolevelc").hide();
             $(".popup .btngroup").css({"display":"none"});
            $(".popup").show();
            var winhei = $(window).height();
            var offsettop = winhei/2-300/2;
            $(".popup").find(".cont").css({"top":offsettop+"px"});
        })
        function pophide() {
            $(".popup").hide();
            $('html').css({"overflow":"auto"});$('body').css({"overflow":"auto"});
        }
        $(".popup .close").click(function () {
            pophide();
        })

        $("#onelevelc .info").click(function () {
        	$("#onelevelc").hide();
            $("#twolevelc").show();
            $(".popup .btngroup").css({"display":"block"});
        })

        //浠ュ悗鏄剧ず闇€瑕佹敼鍔� 鏀逛负id  .popup .btngroup
        $("#backbtngroup").click(function () {
            $("#backbtngroup").css({"display":"none"});
            $("#twolevelc").hide();
            $("#onelevelc").show();
        })

        $("#startvideoplayWrap .enterbtn").click(function () {
            $(".commonWrap").show();
            $("#startvideoplayWrap").hide();
        })



        //瀹㈡埛淇℃伅寮€濮�

        $(".popup .comfirm").click(function () {
            pophide();
        })
        $(".popup .cancel").click(function () {
            pophide();
        })


        //
        $(".modifyserver").click(function () {
            setpopupPosition("serveRange");
          //  $('html,body').css({"height":"100%","overflow":"hidden"});
            var top = ($(window).height()-$("#serveRange .cont").height())/2;
            var left = ($(window).width()-$("#serveRange .cont").width())/2;
            $("#serveRange .cont").eq(0).css({"top":top+"px","left":left+"px"})
        })



        $("#pop1").click(function () {
            setpopupPosition("serveRange");
        })
        $("#pop2").click(function () {
            setpopupPosition("removePopup");
        })
        $("#pop3").click(function () {
            setpopupPosition("removeSucessPopup");
            setTimeout(function () {
                pophide();
            },2000)
        })
        



        $(document).on("click",'.t_selectdiv',function () {
            var datalen = parseInt($(this).attr('data-len'));

            $(this).find('.optiondiv').eq(0).show();
            if(datalen>=_this.selectmaxlen){
                $(this).find(".optiondiv").eq(0).css({"height":_this.selectmaxlen*28,"overflow-y": "scroll"});
            }
            else{
                $(this).find(".optiondiv").eq(0).css({"overflow-y": "auto"});
            }


        })

        $(document).on("click",'.t_selectdiv .opt',function (e) {
            e.stopPropagation();
            $(this).parent().siblings('.selectedinput').html($(this).html());
            $(this).parents('.optiondiv').eq(0).hide();
        })
        $('body').click(function (e) {
            if(e.target.className!="t_selectdiv"){
                $('.optiondiv').hide();
            }
        })

        $(".optiondiv .optiondiv").scroll(function (e) {
            e.stopPropagation();
        })


        var adclickIndex = 0;
        var $clickdottabad =  $("#adbannerWrap .dotli").eq(0);
        $("#adbannerWrap .bannerScroll .imgbg").eq(0).css({"opacity":1});
        $("#adbannerWrap .bannerScroll .imgbg").eq(0).css({"visibility":"visible"});
        var adsettimeIndex = 0;
        var intervalAdOk = function () {
        	
            var setImgeNumad = $("#adbannerWrap .bannerScroll .imgbg").length;
            $("#adbannerWrap .bannerScroll .imgbg").eq(adsettimeIndex).css({"opacity":0});
            $("#adbannerWrap .bannerScroll .imgbg").eq(adsettimeIndex).css({"visibility":"hidden"});
            adsettimeIndex++;
            
            if(adsettimeIndex>=setImgeNumad){
                adsettimeIndex = 0;
            }
            $("#adbannerWrap .dotli").removeClass("on");
            $("#adbannerWrap .dotli").eq(adsettimeIndex).addClass("on");
            $("#adbannerWrap .bannerScroll .imgbg").eq(adsettimeIndex).css({"visibility":"visible"});
            $("#adbannerWrap .bannerScroll .imgbg").eq(adsettimeIndex).css({"opacity":1});
            $clickdottabad = $("#adbannerWrap .dotli").eq(adsettimeIndex);
            adclickIndex = adsettimeIndex;
        }
        var setbannerintervalad = setInterval(intervalAdOk,5000);

        $(document).on('mouseover','#adbannerWrap .dotli',function () {
            clearInterval(setbannerintervalad);
            var index = $(this).index();
            var $currenttab = $(this);
            if($currenttab!=$clickdottabad){
                $clickdottabad.removeClass("on");
            }
            $currenttab.addClass("on");
            $clickdottabad = $currenttab;

            $("#adbannerWrap .bannerScroll .imgbg").css({"opacity":0});
            $("#adbannerWrap .bannerScroll .imgbg").css({"visibility":"hidden"});
            
            $("#adbannerWrap .bannerScroll .imgbg").eq(index).css({"opacity":1});
            $("#adbannerWrap .bannerScroll .imgbg").eq(index).css({"visibility":"visible"});
            adsettimeIndex = index;
        })
        $(document).on('mouseout','#adbannerWrap .dotli',function () {
        	setbannerintervalad = setInterval(intervalAdOk,5000);
        })

        var drag=function(obj){

            obj.bind("mousedown",start);

            function start(event){
               // console.log("start:"+event.clientX+"-----------"+ event.clientY);
                if(event.button==0){//鍒ゆ柇鏄惁鐐瑰嚮榧犳爣宸﹂敭
                    gapX=event.clientX-obj.parents(".cont").offset().left;
                    gapY=event.clientY-obj.parents(".cont").offset().top;
                    $(document).bind("mousemove",move);
                    $(document).bind("mouseup",stop);

                }
                return false;
            }
            function move(event){
                if(event.clientX-gapX==0 && event.clientY-gapY==0){
                    return false;
                }
                obj.parents(".cont").css({
                    "left":(event.clientX-gapX)+"px",
                    "top":(event.clientY-gapY)+"px"
                });
               // console.log("move:"+event.clientX+"-----------"+ event.clientY);
                return false;
            }
            function stop(){
                $(document).unbind("mousemove",move);
                $(document).unbind("mouseup",stop);

            }
        }
        obj=$("#serveRange .cont .title");
        drag(obj);

        $(".partner .link:nth-child(7n)").css({"padding-right":"0px"});
        $('.twolevelWrap .t_hyjjfa .flowInfo .list:nth-child(4n)').css({"margin-right":"0px"});
        $('.twolevelWrap .t_kjfw .flowInfo .list:nth-child(3n)').css({"margin-right":"0px"});

        $('.suningcourier .t_jcfw .flowInfo .list:nth-child(3n)').css({"margin-right":"0px"});
        $('.samecityserver .t_ztfw .flowInfo .list:nth-child(2n)').css({"margin-right":"0px"});

        $('.countrylogistics .t_content .contdl:nth-child(2n)').css({"width":"490px"});

        $('.t_qybx :nth-child(n).list').css({'width':'50%'});

        $('.circleLogo:last-child').css({'margin-right':'0px'});

        $('.fixed .fixedright:nth-child(3) .hoverwrap img').css({'margin': '11px', 'width': '104px','height': '104px'});

        $('.footer .linkgroup .link:nth-child(1)').css({'color': '#fff','margin-bottom': '13px'})
        $('.fixed .fixedright:last-child').css({'margin-top': '10px'});

        $('.tt_index_block .everycontent:last-child').css({'padding-right':'0px','margin-right':'0px','width':'18%'})
        $('.wrapper .wmdys .contentblock:first-child').css({'margin-right':'40px'})
        $('.commontabContent .ttxwTabContent:first-child').css({'display':'block'})
        $('.commontabContent .qygkcont').css({'display':'block'})
        $('.customerServerContent .netQueryInput .nodeTab:last-child').css({'width':'15%'})

        $('.dropdownDiv .showname').click(function () {
            $(this).siblings('.content').toggle()
        })
        $(document).on('click','.dropdownDiv .content .options',function () {
            $(this).siblings('.options').removeClass('selected');
            $(this).addClass("selected")
            $(this).parent().siblings('.showname').find('.currentSelectedName').val($(this).html())
            $(this).parent().siblings('.showname').find('.currentSelectedName').attr('data-value',$(this).attr('data-value'))
            $(this).parent().hide()
        })
        $(document).click(function (e) {
            if($(e.target).hasClass('selectedname') || $(e.target).hasClass('currentSelectedName')|| $(e.target).hasClass('showname')){
                return
            }
            $('.dropdownDiv .content').hide()
        })
        
        var iscustomerPass = true;
		$('#meesagesBtn').click(function() {
			
		})
    },
    init:function () {
        this.initEvent();
        this.initData();
    }
}
function addFavorite(){
    var url = window.location;
    var title = document.title;
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("鎮ㄧ殑娴忚鍣ㄤ笉鏀寔,璇锋寜 Ctrl+D 鎵嬪姩鏀惰棌!");
        }
    }
}
function initparm() {
    var name = getParameter("divId");
    if(name==''){
        return;
    }
    var headerhei = 170;
    var top = $("#" + name).offset().top - headerhei;
    $('html,body').stop(true).animate({
        scrollTop : top
    }, 'fast');
}