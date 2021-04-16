$(document).on('click','.nodeTab',function(){
    $(this).addClass('nodeActive').siblings('.nodeTab').not(this).removeClass('nodeActive');
    /*$('.tabSwitchContent').hide();
    $('.tabSwitchContent').eq($(this).index()).show();*/
    $(this).parent().siblings('.cont').find('.tabSwitchContent').hide();
    $(this).parent().siblings('.cont').find('.tabSwitchContent').eq($(this).index()).show();
})

$(function(){
    $('.nodeTab').eq(0).addClass('nodeActive');
    $('.nodeTab').last().css("margin-right",'0');
    //$('.leftNodeTab').eq(0).addClass('leftNodeTabActive');

    $('.searchOrderBtn').hover(function(){
        $('.waybillbox').css("display","inline-block")
        $(this).css("background","url('/staticFiles/assets/ydcx.png') no-repeat 70px center #1197FF")
    },function(){
        $('.waybillbox').css("display","none")
    })

    $(".orderBtn").click(function(e){
        window.location.href='/staticFiles/pages/queryExpress.html'
    })
    var curhash = location.hash
    if(curhash == '#qyjs'){
        $('.gyttContent .leftMainContent .leftNodeTab:nth-child(1)').trigger("click")
    }
    else if(curhash == '#xwzx'){
        $('.gyttContent .leftMainContent .leftNodeTab:nth-child(2)').trigger("click")
    }
    else if(curhash == '#lxwm'){
        $('.gyttContent .leftMainContent .leftNodeTab:nth-child(3)').trigger("click")
    }
    else if(curhash == '#last'){
        $('.nodeTab:nth-child(6)').trigger("click");
        window.scrollTo(0,500);
    }
    /*else if(curhash == '#wyjj'){
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(1)').trigger("click")
    }
    else if(curhash == '#cxyd'){
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(2)').trigger("click")
    }
    else if(curhash == '#cxwd'){
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(3)').trigger("click")
    }
    else if(curhash == '#yfcx'){
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(4)').trigger("click")
    }*/




    $('.qyjslink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url;
        $('.gyttContent .leftMainContent .leftNodeTab:nth-child(1)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.xwzxlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.gyttContent .leftMainContent .leftNodeTab:nth-child(2)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.lxwmlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.gyttContent .leftMainContent .leftNodeTab:nth-child(3)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.wyjjlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(1)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.pljjlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(2)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.cxydlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(3)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.cxwdlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(4)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.yfcxlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(5)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.psfwcxlink').click(function (e) {
        var url = $(this).attr('data-url')
        location.href= url
        $('.khfwContent .leftMainContent .leftNodeTab:nth-child(6)').trigger("click")
        e.stopImmediatePropagation()
    })
    $('.prohibitedGood').click(function () {
        $('#wjpxzModel').show()
        $('.mask').show();
    })
    $('.kdfuxybtn').click(function () {
        $('#ttkdfwxy').show()
        $('.mask').show();
    })
    $('.wjpxzcontent .submitOrder').click(function () {
        $(this).parents('.wjpxzModel').hide();
        $('.mask').hide();
    })

    function addFavorite2() {
        var url = window.location;
        var title = document.title;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
            alert("鐢变簬360娴忚鍣ㄥ姛鑳介檺鍒讹紝璇锋寜 Ctrl+D 鎵嬪姩鏀惰棌锛�");
        }
        else if (ua.indexOf("msie 8") > -1) {
            window.external.AddToFavoritesBar(url, title); //IE8
        }
        else if (document.all) {
            try{
                window.external.addFavorite(url, title);
            }catch(e){
                alert('鎮ㄧ殑娴忚鍣ㄤ笉鏀寔,璇锋寜 Ctrl+D 鎵嬪姩鏀惰棌!');
            }
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        }
        else {
            alert('鎮ㄧ殑娴忚鍣ㄤ笉鏀寔,璇锋寜 Ctrl+D 鎵嬪姩鏀惰棌!');
        }
    }
})

$(document).on('click',function(e){
    if($(e.target).hasClass('searchOrderBtn')){
        return
    }
    $('.waybillbox').hide();
    $('.searchOrderBtn').css("background","url('/staticFiles/assets/ydcx.png') no-repeat 70px center #0091F0")
})

$(document).on('click','.waybillbox',function(event){
    event.stopPropagation();
})

$(document).on('click','.leftNodeTab',function(){
    $(this).addClass('leftNodeTabActive').siblings('.leftNodeTab').not(this).removeClass('leftNodeTabActive');
    $('.rightTabContent').hide();
    $('.rightTabContent').eq($(this).index()).css('display','inline-block');
    if($('.rightTabContent').eq($(this).index()).find('.nodeTab').length>0){
        if($('.rightTabContent').eq($(this).index()).find('.nodeActive').length==0){
            $('.rightTabContent').eq($(this).index()).find('.nodeTab').removeClass('nodeActive');
            $('.rightTabContent').eq($(this).index()).find('.nodeTab').eq(0).addClass('nodeActive');
            $('.rightTabContent').eq($(this).index()).find('.nodeTab').last().css("margin-right",'0');
        }
    }
})

$(document).on('click','.closeModel',function(){
    $(this).parent().parent().parent().hide();
    $('.mask').hide();
    //
    $('.addressPopupContainer').hide();
    $('#deliveryRangeSpan').css('max-height','none');
    $('#noDeliveryRangeSpan').css('max-height','none');
    $('#deliveryRangeSpan').css("height", "auto");
    $('#noDeliveryRangeSpan').css("height", "auto");
    //
    $('.deliveryOpenBtn span').html("灞曞紑");
    $('.noDeliveryOpenBtn span').html("灞曞紑");
    //娓呯┖
    $('#deliverySx').attr("desc","");
    $('#deliveryRangeSpan').attr("desc","");
    $('#noDeliveryRangeSpan').attr("desc","");
    $("#ctityTextHtml").html('<span style="color:#aaa;">璇烽€夋嫨鐪�/甯�/鍖�</span>');
    // alert($('#deliverySx').html());
})

$(document).on('click', '.showBtn span', function () {
    if($(this).text() === '灞曞紑') {
        $(this).text('鏀惰捣').parent().prev().html($(this).parent().prev().attr('desc'))
    } else {
        $(this).text('灞曞紑').parent().prev().html($(this).parent().prev().attr('desc').substring(0,70))
    }
})

$(document).on('click','.checkboxDom',function(){
    if($(this).hasClass('noChecked')){
        $(this).removeClass('noChecked').addClass('hasChecked');
        $(this).find('input').prop('checked',true);
    }else {
        $(this).removeClass('hasChecked').addClass('noChecked');
        $(this).find('input').prop('checked',false);
        $("#insuranceMoney").val("");	// 鍙栨秷鍕鹃€夛紝娓呯┖淇濆€�
    }
    if($(this).parent().hasClass('readAgree')){
        if($(this).hasClass('hasChecked')){
            $(this).parent().next().find('.submitOrder').removeAttr('disabled').addClass('blueBtn').css({'background':'#0293ED','cursor':'pointer', 'color': 'white'});
        }else{
            $(this).parent().next().find('.submitOrder').prop('disabled','disabled').removeClass('blueBtn').css({'background':'#f7f7f7','cursor':'default', 'color': '#B3B3B3'});
        }
    }
    transportPriceCheckFunc();
})
$(document).on('click','.checkboxDom1',function(){
    if($(this).hasClass('noChecked1')){
        $(this).removeClass('noChecked1').addClass('hasChecked1');
        $(this).find('input').prop('checked',true);
    }else {
        $(this).removeClass('hasChecked1').addClass('noChecked1');
        $(this).find('input').prop('checked',false);
        $("#insuranceMoney2").val("");	// 鍙栨秷鍕鹃€夛紝娓呯┖淇濆€�
    }
})

$(document).on('click','.inputRadio',function(){
    if($(this).hasClass('radioNoChecked')){
        $(this).removeClass('radioNoChecked').addClass('radiohasChecked');
        $(this).find('input').prop('checked',true);
    }else {
        $(this).removeClass('radiohasChecked').addClass('radioNoChecked');
        $(this).find('input').prop('checked',false);
    }
    $(this).siblings('.inputRadio').not(this).removeClass('radiohasChecked').addClass('radioNoChecked');
    $(this).siblings('.inputRadio').not(this).find('input').prop('checked',false);
    if($(this).parent().hasClass('tdChecked')){
        $(this).parent().parent().parent().find('.inputRadio').not(this).removeClass('radiohasChecked').addClass('radioNoChecked');
        $(this).parent().parent().parent().find('.inputRadio').not(this).find('input').prop('checked',false);
    }
})

$(document).on('click','.selectModelConfirm .ConfirmBtn',function(){
    /*$(this).parent().parent().parent().hide();
    $('.mask').hide();*/
})

/*$(document).on('click','.addressBook',function(){
	if($(this).hasClass('noAddress')) {
		$('.selectNoAddressModel').show();
		$('.mask').show();
		return;
	}
	$('.selectAddressModel').show();
	$('.mask').show();
})*/

/*$(document).on('click','.addAddrBtn',function(){
	$('.selectNoAddressModel').hide();
	$('.AddAddressModel').show();
	$('.mask').show();
})*/

$(document).on('click','.AddAddressModel .ConfirmBtn',function(){
    /*$('.AddSuccessModel').show();
    $('.mask').show();*/
})

$(document).on('click','.queryOrderBtn',function(){
    $('.queryOrderModel').show();
    $('.mask').show();
})

$(document).on('click','.vipTitle div',function(){
    $(this).addClass('vipACtive').siblings('.vipTitle div').not(this).removeClass('vipACtive');
    if(!$(this).hasClass('addressTab')){
        $('.vipTab').hide();
        $('.vipTab').eq($(this).index()).show();
    }
})

$(document).on('click','.insuredContentRow .checkboxDom',function(){
    $('.insuredContent').toggle();
})
$(document).on('click','.queryfreightInput .checkboxDom1',function(){
    $('.insuredContent1').toggle();
})

$(document).on('click','.remarksBtn',function(){
    if($(this).hasClass('activeRemarks')){
        if($(this).parent().hasClass('wpType')) {
            if ($('.wpType').find('.activeRemarks').length = 1) {
                return
            }
        }
        $(this).removeClass('activeRemarks');
    }else {
        $(this).addClass('activeRemarks');
        if($(this).parent().hasClass('wpType')) {
            $('.wpType').find('a').not(this).removeClass('activeRemarks')
        }
    }
    $('#goodsType').val($('.wpType a.activeRemarks').html());  //灏嗘爣绛惧€艰涓篻oodsType鐨勫€�
});

$(document).on('click','#special-remarks>.noActiveRemarks',function(){
    if($(this).hasClass("activeRemarks")){
        if($("#goodsRemarks").val().trim() == ""){ //涓虹┖涓嶅姞,
            $("#goodsRemarks").val($(this).html());
        }
        else{
            $("#goodsRemarks").val($("#goodsRemarks").val() + "," + $(this).html());
        }

    }
    else{
        // if($("#goodsRemarks").val().substring(0,1) == ","){ //涓虹┖涓嶅姞,
        //     $("#goodsRemarks").val($(this).html());
        // }
        $("#goodsRemarks").val($("#goodsRemarks").val().replace("," + $(this).html(), "").replace($(this).html() + ",", "").replace($(this).html(), ""));
    }
    // alert($('#special-remarks').find('.activeRemarks').length)
})