var logoutDone = 0,
	loginTOKEN = getcookie("TOKEN"),
	accountInfo = "";
isAutoLogin();

function isAutoLogin() {
	loginTOKEN ? login() : (deleteCookie("loginSession"), deleteCookie("loginId"), deleteCookie("loginType"),
		deleteCookie("loginName"), deleteCookie("nickname"), deleteCookie("loginEmail"), deleteCookie(
		"loginMobile"), deleteCookie("KDSSO"), deleteCookie("KDWWW"), deleteCookie("TOKEN"), -1 != window.location
		.href.indexOf("buyer.kuaidi100.com") || -1 != window.location.href.indexOf("seller.kuaidi100.com") || -1 !=
		window.location.href.indexOf("sso.kuaidi100.com") ? window.location.href = "https://sso.kuaidi100.com" :
		setWelcomeLogout())
}

function isSignin() {
	var a = new Date,
		b = /Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone/i.test(navigator.userAgent),
		c = a.getFullYear() + "_" + a.getMonth() + "_" + a.getDate();
	a = localStorage.getItem("lastSignin");
	b && c != a && $.ajax({
		url: "/apicenter/creditmall.do?method=checksignin&token=" + getcookie("TOKEN"),
		success: function(f) {
			201 == f.status ? $("#menuBtn,aside .jf").addClass("badge") : 200 == f.status && localStorage
				.setItem("lastSignin", c)
		}
	})
}

function login() {
	loginTOKEN ? $.ajax({
		type: "post",
		url: "/user/userapi.do",
		data: "method=getuserinfo",
		success: function(a) {
			"200" == a.status ? (accountInfo = a, setcookie_kuaidi100("loginId", a.user.id),
				setcookie_kuaidi100("loginType", a.user.userType), setcookie_kuaidi100("loginName", a
					.user.name), setcookie_kuaidi100("nickname", a.user.realname), setcookie_kuaidi100(
					"loginEmail", a.user.email), setcookie_kuaidi100("loginMobile", a.user.mobile),
				setcookie_kuaidi100("loginExt", a.user.ext), setcookie_kuaidi100("auth", a.user.auth),
				setcookie_temp_kuaidi100("loginSession", "1"), setWelcomeLogin(), $.isFunction(window
					.init) && init()) : (deleteCookie("loginEmail"), deleteCookie("loginId"),
				deleteCookie("loginMobile"), deleteCookie("loginName"), deleteCookie("nickname"),
				deleteCookie("loginSession"), deleteCookie("loginType"), deleteCookie("KDWWW"),
				deleteCookie("KDSSO"), -1 != window.location.href.indexOf("buyer.kuaidi100.com") || -
				1 != window.location.href.indexOf("seller.kuaidi100.com") || -1 != window.location.href
				.indexOf("sso.kuaidi100.com") ? window.location.href =
				"https://www.kuaidi100.com/" : setWelcomeLogout())
		}
	}) : setWelcomeLogout()
}

function logout() {
	var a = location.host,
		b = 0 === a.indexOf("www.") || 0 === a.indexOf("sso.");
	if (getcookie("TOKEN")) try {
		$.post(b ? "/user/v2/logout.do" : "/user/logout.do", {
			method: "logout"
		}, function(c) {
			b || "200" == c.status || "403" == c.status ? (deleteCookie("loginEmail"), deleteCookie(
					"loginId"), deleteCookie("loginMobile"), deleteCookie("loginName"), deleteCookie(
					"nickname"), deleteCookie("loginSession"), deleteCookie_kuaidi100("loginType"),
				deleteCookie("KDWWW"), logoutDone = 0, doPost(
					"https://sso.kuaidi100.com/user/logout.do?method=logout&temp=" +
					Math.random()), doPost(
					"https://www.kuaidi100.com/user/logout.do?method=logout&temp=" + Math.random()), -
				1 != window.location.href.indexOf("buyer.kuaidi100.com") || -1 != window.location.href
				.indexOf("seller.kuaidi100.com") || -1 != window.location.href.indexOf(
					"sso.kuaidi100.com") ? window.location.href = "https://www.kuaidi100.com/" :
				setWelcomeLogout()) : location.reload()
		})
	} catch (c) {
		location.reload()
	} else location.reload()
}

function setWelcomeLogin() {
	isSignin();
	var a = +getcookie("auth");
	64 & a && $("#userUrl").append(
		"<a href='//cc.kuaidi100.com/' target='_blank'>\u8fdb\u5165\u5feb\u9012\u8d85\u5e02</a>");
	4 & a && $("#userUrl").append(
		"<a href='//b.kuaidi100.com/page/ep?source=sso' target='_blank'>\u8fdb\u5165\u5feb\u9012\u7ba1\u5bb6</a>");
	32 & a && $("#userUrl").append("<a href='//poll.kuaidi100.com/' target='_blank'>\u63a5\u53e3\uff08API\uff09</a>");
	16 & a && $("#userUrl").append("<a href='//net.kuaidi100.com/' target='_blank'>\u5feb\u9012\u7f51\u70b9</a>");
	128 & a && $("#userUrl").append(
	"<a href='//mai.kuaidi100.com/' target='_blank'>\u6dd8\u5b9d\u5356\u5bb6\u7248</a>");
	256 & a && $("#userUrl").append("<a href='//jd.kuaidi100.com/' target='_blank'>\u4eac\u4e1c\u5356\u5bb6\u7248</a>");
	2 & a && $("#userUrl").append("<a href='//seller.kuaidi100.com/' target='_blank'>\u5356\u5bb6\u7248</a>");
	1 & a && $("#userUrl").append(
		"<a href='//buyer.kuaidi100.com/' target='_blank'>\u6211\u7684\u67e5\u4ef6\u8bb0\u5f55</a>");
	a = $.trim(getcookie("nickname"));
	if ("" == a || "null" == a) a = $.trim(getcookie("loginName"));
	if ("" == a || "null" == a)
		if (a = $.trim(getcookie("loginMobile")), "null" == a || "" == a) a = getcookie("loginEmail");
	"null" == a && (a = "");
	11 < a.length && (a = a.substring(0, 10) + "...");
	$("#userImg").attr("src", "https://p.kuaidi100.com/mobile/mobileapi.do?method=download&id=avatar_" + getcookie(
		"loginId") + ".jpg&verstion=" + (getcookie("avatar_version") || (new Date).getTime()));
	$("#userName").text(a);
	$("#welcome").hide();
	$("#userInfo").show().removeClass("hidden")
}

function setWelcomeLogout() {
	$("#welcome").show().removeClass("hidden");
	$("#userInfo").hide()
}

function doPost(a) {
	var b = $('<iframe width="0" height="0" frameborder="0" scrolling="0"></iframe>');
	b.appendTo("body");
	b.attr("src", a);
	b.load(logoutFinish)
}

function logoutFinish() {
	logoutDone++;
	2 <= logoutDone && window.location.reload()
}

function loadBottomAd(a) {
	var b = '<a style="position:absolute;left:0;top:0; width: 100%;height: 100%;" href="' + a.url +
		'" target="_blank"></a>',
		c = $(
			'<div  style="z-index: 8888;position:fixed;width:100%;height:148px;background: url(https://cdn.kuaidi100.com/images/coupon.png) center top no-repeat;color:#FFF;bottom: 0;text-align: center;overflow:hidden"></div>'
			),
		f = $(
			'<span style="position: absolute;right: 4px;top: 22px;display: inline-block;background: url(https://cdn.kuaidi100.com/images/spider_search_v4.png) 8px -1277px no-repeat;width: 30px;height: 28px;cursor: pointer;"></span>'
			),
		d = $(
			'<div style="cursor:pointer;padding-left: 30px;display:none;position:fixed;z-index: 10;bottom:194px;right:-38px;"><div class="img" style="padding: 10px;position:absolute; left: -126px;top: -16px;display:none;text-align:center;border:1px solid #dadada;background:#FFF;"><i style="position:absolute;top: 65px;right: -10px;background: url(https://cdn.kuaidi100.com/images/arrow_r.png) -1px 0 no-repeat;width: 10px;height:20px;"></i><img src="' +
			a.slideimage + '" width="120px"></div><div style="width:90px;height: 90px;background:url(' +
			a.shrinkimage + ') center right no-repeat;"></div></div>'),
		e = null;
	c.append(f);
	a.url && (c.append(b), d.find(".img").append(b));
	d.appendTo("body");
	"close" == getcookie("btcoupon") ? d.show() : c.appendTo("body");
	f.click(function() {
		c.animate({
			right: 10,
			bottom: 234,
			width: 0,
			height: 0
		}, 100, function() {
			d.show()
		});
		setcookie_kuaidi100("btcoupon", "close")
	});
	d.mouseover(function() {
		e && clearTimeout(e);
		e = setTimeout(function() {
			d.animate({
				paddingRight: 48
			}, 200, function() {
				d.stop().find(".img").fadeIn()
			})
		}, 300)
	}).mouseout(function() {
		e &&
			clearTimeout(e);
		e = setTimeout(function() {
			d.find(".img").fadeOut(function() {
				d.animate({
					paddingRight: 0
				}, 100)
			})
		}, 0)
	})
}
if (!/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
	var bottomAd = null;
	$.ajax({
		type: "post",
		url: "/assets/ext",
		data: "method=mainprofile&platform=www&pos=all_site_bottom",
		dataType: "json",
		success: function(a) {
			200 == a.status && 0 < a.adslist.length && (bottomAd = a.adslist[0], loadBottomAd(bottomAd))
		}
	})
};
