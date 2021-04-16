// get cookie
function getcookie(cookieName) {
	var cookieValue = "";
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
			if (cookie.substring(0, cookieName.length + 1) == (cookieName + '=')) {
				cookieValue = unescape(cookie.substring(cookieName.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

//lang cookies
function setcookie(cookieName, cookieValue) {
	var expires = new Date();
	var now = parseInt(expires.getTime());
	var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
	expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
	document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + "; path=/";
}
function setcookie_kuaidi100(cookieName, cookieValue) {
	var expires = new Date();
	var now = parseInt(expires.getTime());
	var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
	expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
	document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + "; domain=.kuaidi100.com;path=/";
}

function setcookieCommon(name,value,day){
	day = day || 1;
	var expires = new Date();
	var now = parseInt(expires.getTime());
	expires.setTime(now + 86400 * day*1000);
	document.cookie = escape(name) + "=" + escape(value) + ";expires=" + expires.toGMTString() + ";path=/";
}

//temp cookies
function setcookie_temp(cookieName, cookieValue) {
	document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";path=/";
}
function setcookie_temp_kuaidi100(cookieName, cookieValue) {
	document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";domain=.kuaidi100.com;path=/";
}
function setcookie2(cookieName, cookieValue) {
	document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";path=/";
}
// delete cookie
function deleteCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getcookie(name);
	document.cookie = escape(name) + "=" + escape(cval) + "; expires=" + exp.toGMTString() + "; path=/";
}
function deleteCookie_kuaidi100(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getcookie(name);
	document.cookie = escape(name) + "=" + escape(cval) + "; expires=" + exp.toGMTString() + "; domain=.kuaidi100.com;path=/";
}
//get url
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

//favorite
function addFavoritesHistory(setUrl) {
	var title = "快递查询-查快递，寄快递，上快递100";
	var url = "http://" + document.domain;
	if (setUrl != "" && setUrl != null) {
		url = setUrl;
	}
	try {
		window.external.addFavorite(url, title);
	} catch (e1) {
		try {
			window.external.AddToFavoritesBar(url, title);
		} catch (e2) {
			try {
				window.sidebar.addPanel(title, url);
			} catch (e3) {
				alert("收藏失败，此操作被浏览器拒绝！\n请使用\"Ctrl+D\"进行收藏！");
			}
		}
	}
}

//securityValid
function securityValid(str) {
	var regSqlStr = "select\\s.*|.*\\s*exec\\s.*|.*\\s*execute\\s.*|.*\\s*insert\\s.*|" + ".*\\s*create\\s.*|.*\\s*drop\\s.*|.*\\s*table\\s.*|.*\\s*from\\s.*|.*\\s*grant\\s.*|" + ".*\\s*use\\s.*|.*\\s*group_concat\\s.*|.*\\s*column_name\\s.*|.*\\s*delete\\s.*|" + ".*\\s*update\\s.*|.*\\s*table_schema\\s.*|.*\\s*truncate";
	var reSql = new RegExp(regSqlStr, "gi");
	var reTag = new RegExp(".*\\<.*?\\>.*|.*\\<.*|.*\\>.*", "gi");
	var reJs = new RegExp(".*javascript.*", "gi");

	if (reSql.test(str)) {
		return true;
	}
	if (reTag.test(str)) {
		return true;
	}
	if (reJs.test(str)) {
		return true;
	}

	return false;
}

function selectNav() {
	var headerMenu = $("#headerMenu").val();
	if (headerMenu != null && headerMenu != "") {
		$("#" + headerMenu).attr("class", "head-nav-select");
		$("#" + headerMenu).append("<i class='ico_select'></i>")
	}
}

function gototop() {
	acceleration = 0.3;
	time = 15;
	var x = 0,
		y = 0;

	if (document.documentElement) {
		x = document.documentElement.scrollLeft || 0;
		y = document.documentElement.scrollTop || 0;
	}

	var speed = 1 + acceleration;
	window.scrollTo(x, Math.floor(y / speed));
	if (y > 0) {
		var invokeFunction = "gototop()";
		window.setTimeout(invokeFunction, time);
	}
}
$(function() {
	/*deleteCookie("hideHeadTip");
	$("#bannerClose").hide();*/
	//head tips
	var time=new  Date().getTime();
	var arr = new Array();
	//圣诞节主题
	//arr[0] = ["#eb252e", "url('https://cdn.kuaidi100.com/images/index/surprise/merry/merryChristmas.png?version="+time+"')"];
	//冬日主题
	//arr[0] = ["#34a9fc", "url('https://cdn.kuaidi100.com/images/index/surprise/sendwarm.png?version="+time+"')"];
	//arr[1] = ["#24a8f9", "url('https://cdn.kuaidi100.com/images/customize/head-api-2.jpg?version="+time+"')", "http://b.kuaidi100.com/example/intro.shtml"];
	//arr[1] = ["#ffd543", "url('https://cdn.kuaidi100.com/images/head-ad-3.jpg')", "http://b.kuaidi100.com/example/index.shtml"];
	var random_bg = Math.round(Math.random()); // 0-1 random
	//var random_bg = Math.round(Math.random()*3);;// 0-3 random
	/*if(random_bg==0){
		$(".head-tip-btn").hide();
	}
	$("#headTip").css("background-color", arr[random_bg][0]);
	$("#headTip").css("background-image", arr[random_bg][1]);
	$("#headTipLink").attr("href", arr[random_bg][2]);
	if (getcookie("hideHeadTip") != "1") {
		$("#headTip").show();
	}
	$(".head-tip-close").click(function() {
		$("#headTip").hide();
		setcookie("hideHeadTip", "1");
	});*/
	$("#viewPage").on("click", function(){
		deleteCookie_kuaidi100("viewpage");
		window.location.href = "https://m.kuaidi100.com/";
	});

	$(".recruitment-type-campus").on("click", function() {
		document.getElementById("recruitment").style.display = "none"
		document.getElementById("campus-recruitment").style.display = "block"
		document.getElementsByClassName("campus-banner")[0].style.cssText = "display: block;"
		document.getElementsByClassName("social-banner")[0].style.cssText = "display: none;"
		// 
		document.getElementsByClassName("cwork-wrap-product")[0].style.cssText = "display: none;"
		document.getElementsByClassName("cwork-wrap-soft")[0].style.cssText = "display: none;"
		document.getElementsByClassName("cwork-wrap-operation")[0].style.cssText = "display: none;"
		// 
	})
	
	$(".recruitment-type-social").on("click", function() {
		document.getElementById("recruitment").style.display = "none"
		document.getElementById("campus-recruitment").style.display = "block"
		document.getElementsByClassName('campus-worker-type')[0].style.cssText = 'display:none'
		document.getElementsByClassName('social-worker-type')[0].style.cssText = 'display:block'
		document.getElementsByClassName('campus')[0].style.cssText = 'background-color: #fff;'
		document.getElementsByClassName('social')[0].style.cssText = 'background-color: #007aff;font-weight:bold;color:#fff;'
		document.getElementsByClassName('campus')[0].style.cssText = 'background-color: #fff;font-weight:normal;color:#333;'
		document.getElementsByClassName("campus-banner")[0].style.cssText = "display: none;"
		document.getElementsByClassName("social-banner")[0].style.cssText = "display: block;"
		// 
		document.getElementsByClassName("swork-wrap-product")[0].style.cssText = "display: none;"
		document.getElementsByClassName("swork-wrap-soft")[0].style.cssText = "display: none;"
		document.getElementsByClassName("swork-wrap-marketing")[0].style.cssText = "display: none;"
		// 
	})

	$(".campus").on("click", function() {
		document.getElementsByClassName('social-worker-type')[0].style.cssText = 'display:none'
		document.getElementsByClassName('campus-worker-type')[0].style.cssText = 'display:block'
		document.getElementsByClassName('campus')[0].style.cssText = 'background-color: #007aff;color:#fff;font-weight:bold;color:#fff;'
		document.getElementsByClassName('social')[0].style.cssText = 'background-color: #fff;color:#333;font-weight:normal;color:#333;'
		document.getElementsByClassName("campus-banner")[0].style.cssText = "display: block;"
		document.getElementsByClassName("social-banner")[0].style.cssText = "display: none;"

		document.getElementsByClassName("cwork-wrap-all")[0].style.cssText = "display: block;"
		document.getElementsByClassName('campus-all')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('campus-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-operation')[0].style.cssText = 'color:#1B1B1B'

		// 
		document.getElementsByClassName("cwork-wrap-product")[0].style.cssText = "display: none;"
		document.getElementsByClassName("cwork-wrap-soft")[0].style.cssText = "display: none;"
		document.getElementsByClassName("cwork-wrap-operation")[0].style.cssText = "display: none;"
		// 
	})

	$(".social").on("click", function() {
		document.getElementsByClassName('social-worker-type')[0].style.cssText = 'display:block'
		document.getElementsByClassName('campus-worker-type')[0].style.cssText = 'display:none'
		document.getElementsByClassName('social')[0].style.cssText = 'background-color: #007aff;font-weight:bold;color:#fff;'
		document.getElementsByClassName('campus')[0].style.cssText = 'background-color: #fff;font-weight:normal;color:#333;'
		document.getElementsByClassName("campus-banner")[0].style.cssText = "display: none;"
		document.getElementsByClassName("social-banner")[0].style.cssText = "display: block;"

		document.getElementsByClassName("swork-wrap-all")[0].style.cssText = "display: block;"
		document.getElementsByClassName('social-all')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('social-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-marketing')[0].style.cssText = 'color:#1B1B1B'

		// 
		document.getElementsByClassName("swork-wrap-product")[0].style.cssText = "display: none;"
		document.getElementsByClassName("swork-wrap-soft")[0].style.cssText = "display: none;"
		document.getElementsByClassName("swork-wrap-marketing")[0].style.cssText = "display: none;"
		// 
	})

	$('.campus-all').on('click', function() {
		document.getElementsByClassName('campus-all')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('campus-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-operation')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('cwork-wrap-all')[0].style.cssText = 'display: block'
		document.getElementsByClassName('cwork-wrap-product')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-soft')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-operation')[0].style.cssText = 'display: none'
	})

	$('.campus-product').on('click', function() {
		document.getElementsByClassName('campus-product')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('campus-all')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-operation')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('cwork-wrap-product')[0].style.cssText = 'display: block'
		document.getElementsByClassName('cwork-wrap-all')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-soft')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-operation')[0].style.cssText = 'display: none'
	})

	$('.campus-soft').on('click', function() {
		document.getElementsByClassName('campus-soft')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('campus-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-all')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-operation')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('cwork-wrap-soft')[0].style.cssText = 'display: block'
		document.getElementsByClassName('cwork-wrap-all')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-product')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-operation')[0].style.cssText = 'display: none'
	})

	$('.campus-operation').on('click', function() {
		document.getElementsByClassName('campus-operation')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('campus-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('campus-all')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('cwork-wrap-operation')[0].style.cssText = 'display: block'
		document.getElementsByClassName('cwork-wrap-all')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-product')[0].style.cssText = 'display: none'
		document.getElementsByClassName('cwork-wrap-soft')[0].style.cssText = 'display: none'
	})

	$('.social-all').on('click', function() {
		document.getElementsByClassName('social-all')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('social-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-marketing')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('swork-wrap-all')[0].style.cssText = 'display: block'
		document.getElementsByClassName('swork-wrap-product')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-soft')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-marketing')[0].style.cssText = 'display: none'
	})

	$('.social-product').on('click', function() {
		document.getElementsByClassName('social-product')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('social-all')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-marketing')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('swork-wrap-product')[0].style.cssText = 'display: block'
		document.getElementsByClassName('swork-wrap-all')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-soft')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-marketing')[0].style.cssText = 'display: none'
	})

	$('.social-soft').on('click', function() {
		document.getElementsByClassName('social-soft')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('social-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-all')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-marketing')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('swork-wrap-soft')[0].style.cssText = 'display: block'
		document.getElementsByClassName('swork-wrap-product')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-all')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-marketing')[0].style.cssText = 'display: none'
	})

	$('.social-marketing').on('click', function() {
		document.getElementsByClassName('social-marketing')[0].style.cssText = 'color:#3278E7'
		document.getElementsByClassName('social-product')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-all')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('social-soft')[0].style.cssText = 'color:#1B1B1B'
		document.getElementsByClassName('swork-wrap-marketing')[0].style.cssText = 'display: block'
		document.getElementsByClassName('swork-wrap-product')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-all')[0].style.cssText = 'display: none'
		document.getElementsByClassName('swork-wrap-soft')[0].style.cssText = 'display: none'
	})
	
	$('#arrow1').on("click", function() {
		if($('#c-mobile-engineer').css('display') === 'none') {
			$('#c-mobile-engineer').css('display', 'block')
			$('#arrow1').css('transform', 'rotate(180deg)')
		} else {
			$('#c-mobile-engineer').css('display', 'none')
			$('#arrow1').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow2').on("click", function() {
		if($('#c-test-enginner').css('display') === 'none') {
			$('#c-test-enginner').css('display', 'block')
			$('#arrow2').css('transform', 'rotate(180deg)')
		} else {
			$('#c-test-enginner').css('display', 'none')
			$('#arrow2').css('transform', 'rotate(0deg)')
		}
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow3').on("click", function() {
		if($('#c-front-engineer').css('display') === 'none') {
			$('#c-front-engineer').css('display', 'block')
			$('#arrow3').css('transform', 'rotate(180deg)')
		} else {
			$('#c-front-engineer').css('display', 'none')
			$('#arrow3').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow4').on("click", function() {
		if($('#c-java-engineer').css('display') === 'none') {
			$('#c-java-engineer').css('display', 'block')
			$('#arrow4').css('transform', 'rotate(180deg)')
		} else {
			$('#c-java-engineer').css('display', 'none')
			$('#arrow4').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow5').on("click", function() {
		if($('#c-PM').css('display') === 'none') {
			$('#c-PM').css('display', 'block')
			$('#arrow5').css('transform', 'rotate(180deg)')
		} else {
			$('#c-PM').css('display', 'none')
			$('#arrow5').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow6').on("click", function() {
		if($('#c-PO').css('display') === 'none') {
			$('#c-PO').css('display', 'block')
			$('#arrow6').css('transform', 'rotate(180deg)')
		} else {
			$('#c-PO').css('display', 'none')
			$('#arrow6').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow7').on("click", function() {
		if($('#c-NMS').css('display') === 'none') {
			$('#c-NMS').css('display', 'block')
			$('#arrow7').css('transform', 'rotate(180deg)')
		} else {
			$('#c-NMS').css('display', 'none')
			$('#arrow7').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow8').on("click", function() {
		if($('#c-FA').css('display') === 'none') {
			$('#c-FA').css('display', 'block')
			$('#arrow8').css('transform', 'rotate(180deg)')
		} else {
			$('#c-FA').css('display', 'none')
			$('#arrow8').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow9').on("click", function() {
		if($('#c-PA').css('display') === 'none') {
			$('#c-PA').css('display', 'block')
			$('#arrow9').css('transform', 'rotate(180deg)')
		} else {
			$('#c-PA').css('display', 'none')
			$('#arrow9').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-CSE').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow10').css('transform', 'rotate(0deg)')
	})

	$('#arrow10').on("click", function() {
		if($('#c-CSE').css('display') === 'none') {
			$('#c-CSE').css('display', 'block')
			$('#arrow10').css('transform', 'rotate(180deg)')
		} else {
			$('#c-CSE').css('display', 'none')
			$('#arrow10').css('transform', 'rotate(0deg)')
		}
		$('#c-test-enginner').css('display', 'none')
		$('#c-front-engineer').css('display', 'none')
		$('#c-mobile-engineer').css('display', 'none')
		$('#c-java-engineer').css('display', 'none')
		$('#c-PM').css('display', 'none')
		$('#c-PO').css('display', 'none')
		$('#c-NMS').css('display', 'none')
		$('#c-FA').css('display', 'none')
		$('#c-PA').css('display', 'none')
		$('#arrow1').css('transform', 'rotate(0deg)')
		$('#arrow2').css('transform', 'rotate(0deg)')
		$('#arrow3').css('transform', 'rotate(0deg)')
		$('#arrow4').css('transform', 'rotate(0deg)')
		$('#arrow5').css('transform', 'rotate(0deg)')
		$('#arrow6').css('transform', 'rotate(0deg)')
		$('#arrow7').css('transform', 'rotate(0deg)')
		$('#arrow8').css('transform', 'rotate(0deg)')
		$('#arrow9').css('transform', 'rotate(0deg)')
	})

	$("#arrow11").on("click", function() {
		if($('#s-spm').css('display') === 'none') {
			$('#s-spm').css('display', 'block')
			$('#arrow11').css('transform', 'rotate(180deg)')
		} else {
			$('#s-spm').css('display', 'none')
			$('#arrow11').css('transform', 'rotate(0deg)')
		}
		$('#s-pmc').css('display', 'none')
		$('#s-pmr').css('display', 'none')
		$('#s-eom').css('display', 'none')
		$('#s-fe').css('display', 'none')
		$('#s-je').css('display', 'none')
		$('#arrow12').css('transform', 'rotate(0deg)')
		$('#arrow13').css('transform', 'rotate(0deg)')
		$('#arrow14').css('transform', 'rotate(0deg)')
		$('#arrow15').css('transform', 'rotate(0deg)')
		$('#arrow16').css('transform', 'rotate(0deg)')
	})
	
	$("#arrow12").on("click", function() {
		if($('#s-pmc').css('display') === 'none') {
			$('#s-pmc').css('display', 'block')
			$('#arrow12').css('transform', 'rotate(180deg)')
		} else {
			$('#s-pmc').css('display', 'none')
			$('#arrow12').css('transform', 'rotate(0deg)')
		}
		$('#s-spm').css('display', 'none')
		$('#s-pmr').css('display', 'none')
		$('#s-eom').css('display', 'none')
		$('#s-fe').css('display', 'none')
		$('#s-je').css('display', 'none')
		$('#arrow11').css('transform', 'rotate(0deg)')
		$('#arrow13').css('transform', 'rotate(0deg)')
		$('#arrow14').css('transform', 'rotate(0deg)')
		$('#arrow15').css('transform', 'rotate(0deg)')
		$('#arrow16').css('transform', 'rotate(0deg)')
	})

	$("#arrow13").on("click", function() {
		if($('#s-pmr').css('display') === 'none') {
			$('#s-pmr').css('display', 'block')
			$('#arrow13').css('transform', 'rotate(180deg)')
		} else {
			$('#s-pmr').css('display', 'none')
			$('#arrow13').css('transform', 'rotate(0deg)')
		}
		$('#s-spm').css('display', 'none')
		$('#s-pmc').css('display', 'none')
		$('#s-eom').css('display', 'none')
		$('#s-fe').css('display', 'none')
		$('#s-je').css('display', 'none')
		$('#arrow11').css('transform', 'rotate(0deg)')
		$('#arrow12').css('transform', 'rotate(0deg)')
		$('#arrow14').css('transform', 'rotate(0deg)')
		$('#arrow15').css('transform', 'rotate(0deg)')
		$('#arrow16').css('transform', 'rotate(0deg)')
	})

	$("#arrow14").on("click", function() {
		if($('#s-eom').css('display') === 'none') {
			$('#s-eom').css('display', 'block')
			$('#arrow14').css('transform', 'rotate(180deg)')
		} else {
			$('#s-eom').css('display', 'none')
			$('#arrow14').css('transform', 'rotate(0deg)')
		}
		$('#s-spm').css('display', 'none')
		$('#s-pmc').css('display', 'none')
		$('#s-pmr').css('display', 'none')
		$('#s-fe').css('display', 'none')
		$('#s-je').css('display', 'none')
		$('#arrow11').css('transform', 'rotate(0deg)')
		$('#arrow12').css('transform', 'rotate(0deg)')
		$('#arrow13').css('transform', 'rotate(0deg)')
		$('#arrow15').css('transform', 'rotate(0deg)')
		$('#arrow16').css('transform', 'rotate(0deg)')
	})

	$("#arrow15").on("click", function() {
		if($('#s-fe').css('display') === 'none') {
			$('#s-fe').css('display', 'block')
			$('#arrow15').css('transform', 'rotate(180deg)')
		} else {
			$('#s-fe').css('display', 'none')
			$('#arrow15').css('transform', 'rotate(0deg)')
		}
		$('#s-spm').css('display', 'none')
		$('#s-pmc').css('display', 'none')
		$('#s-pmr').css('display', 'none')
		$('#s-eom').css('display', 'none')
		$('#s-je').css('display', 'none')
		$('#arrow11').css('transform', 'rotate(0deg)')
		$('#arrow12').css('transform', 'rotate(0deg)')
		$('#arrow13').css('transform', 'rotate(0deg)')
		$('#arrow14').css('transform', 'rotate(0deg)')
		$('#arrow16').css('transform', 'rotate(0deg)')
	})

	$("#arrow16").on("click", function() {
		if($('#s-je').css('display') === 'none') {
			$('#s-je').css('display', 'block')
			$('#arrow16').css('transform', 'rotate(180deg)')
		} else {
			$('#s-je').css('display', 'none')
			$('#arrow16').css('transform', 'rotate(0deg)')
		}
		$('#s-spm').css('display', 'none')
		$('#s-pmc').css('display', 'none')
		$('#s-pmr').css('display', 'none')
		$('#s-eom').css('display', 'none')
		$('#s-fe').css('display', 'none')
		$('#arrow11').css('transform', 'rotate(0deg)')
		$('#arrow12').css('transform', 'rotate(0deg)')
		$('#arrow13').css('transform', 'rotate(0deg)')
		$('#arrow14').css('transform', 'rotate(0deg)')
		$('#arrow16').css('transform', 'rotate(0deg)')
	})

	$(".viewPage").on("click", function(){
		deleteCookie_kuaidi100("viewpage");
		window.location.href = "https://m.kuaidi100.com/";
	});

	$('#toCountry').click(function(event) {
		setcookieCommon('tocountry','Y');
	});

	$('#toSz').click(function(event) {
		deleteCookie('tocountry')
	});
	$('#goH5').click(function(event) {
		event.preventDefault();
		deleteCookie_kuaidi100('viewpage')
		location.href = 'https://m.kuaidi100.com/';
	});

	selectNav();

	//meiqia
	(function(m, ei, q, i, a, j, s) {
        m[i] = m[i] || function() {
            (m[i].a = m[i].a || []).push(arguments)
        };
        j = ei.createElement(q),
            s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = '//static.meiqia.com/dist/meiqia.js';
        s.parentNode.insertBefore(j, s);
    })(window, document, 'script', '_MEIQIA');
    _MEIQIA('entId', '38812');
    getcookie('loginId') && _MEIQIA('clientId', getcookie('loginId'))
    _MEIQIA('manualInit');
    _MEIQIA('withoutBtn');
    _MEIQIA('allSet', function(){
        _MEIQIA('showPanel')
    })
    _MEIQIA('metadata',{
        name: getcookie('loginName') || '匿名用户',
        email: getcookie('loginEmail') || '',
        tel: getcookie('loginMobile') || '',
        '客户端': 'PC端'
    })
    $('#meiqiaFeedback').click(function(event) {
    	event.preventDefault();
    	_MEIQIA('init')
    });
});