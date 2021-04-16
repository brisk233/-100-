$(function() {
	$(".kd-header").on("mouseover", ".kd-header__nav", function() {
		$(this).addClass("kd-header__nav--hover").find(".kd-header__menu").stop().slideDown()
	}).on("mouseout", ".kd-header__nav", function() {
		$(this).removeClass("kd-header__nav--hover").find(".kd-header__menu").stop().slideUp()
	}).on("mouseover", ".kd-header__userinfo ", function() {
		$(this).is(".kd-header__userinfo--active") && $(this).find(".kd-header__menu").stop()
		.slideDown()
	}).on("mouseout", ".kd-header__userinfo", function(a) {
		$(this).find(".kd-header__menu").stop().slideUp()
	}).on("click",
		"[role=logout-handler]",
		function() {
			logout()
		});
	(function() {
		var a = null;
		"undefined" !== typeof window.currentNav && (a = $(".kd-header__nav[role=" + window.currentNav +
			"]"));
		a && a.size() ? a.addClass("kd-header__nav--active") : $(".kd-header__nav[role=home]").addClass(
			"kd-header__nav--active")
	})();
	(function() {
		var a = $(".kd-header").clone(!0);
		a.addClass("kd-header--fixed").hide();
		$(window).scrollTop(0);
		$("body").append(a);
		$(window).scroll(function(c) {
			c = $(this).scrollTop();
			var b = $(this).scrollLeft(),
				d = a.height();
			a.css("left",
				-b);
			c > d ? a.fadeIn(800) : a.fadeOut(800);
			500 < c ? $("#floatTop").fadeIn() : $("#floatTop").fadeOut()
		})
	})();
	$("#floatTop").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 300)
	});
	initUdesk();
	$("#floatH5, #viewH5").on("click", function() {
		window.open("https://m.kuaidi100.com?coname=www", "_blank",
			"width=375px, height=667px, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
			)
	});
	$("#floatQQ").on("mouseover", function() {
		$("#qqPannel").stop().fadeIn()
	}).on("mouseout", function() {
		$("#qqPannel").stop().fadeOut()
	}).on("click",
		".mark",
		function() {
			var a = $(this).data();
			"group" === a.type ? window.open("https://qm.qq.com/cgi-bin/qm/qr?k=" + a.key +
				"&jump_from=webapi") : window.open("http://wpa.qq.com/msgrd?v=3&uin=" + a.key +
				"&site=qq")
		});
	loadIFrame.logoutDone = 0;
	login()
});

function initUdesk() {
	(function(a, c, b, d, e, f) {
		a.UdeskApiObject = e;
		a[e] = a[e] || function() {
			(a[e].d = a[e].d || []).push(arguments)
		};
		f = c.createElement(b);
		f.async = 1;
		f.charset = "utf-8";
		f.src = d;
		b = c.getElementsByTagName(b)[0];
		b.parentNode.insertBefore(f, b)
	})(window, document, "script", "//assets-cli.udesk.cn/im_client/js/udeskApi.js", "ud");
	ud({
		code: "298f17ga",
		link: "https://kuaidi100.udesk.cn/im_client/?web_plugin_id=48851",
		targetSelector: "#uDeskTarget"
	})
}

function login() {
	getcookie("TOKEN") ? $.ajax({
		type: "post",
		url: "/user/userapi.do",
		data: "method=getuserinfo",
		success: function(a) {
			"200" == a.status ? (accountInfo = a, setcookieSubdomain("loginId", a.user.id),
				setcookieSubdomain("loginType", a.user.userType), setcookieSubdomain("loginName", a.user
					.name), setcookieSubdomain("nickname", a.user.realname), setcookieSubdomain(
					"loginEmail", a.user.email), setcookieSubdomain("loginMobile", a.user.mobile),
				setcookieSubdomain("loginExt", a.user.ext), setcookieSubdomain("auth", a.user.auth),
				setcookieSubdomainTemp("loginSession", "1"), setLoginInfo(), $.isFunction(window
				.init) && init()) : (clearLoginCookie(), -1 != window.location.href.indexOf(
					"buyer.kuaidi100.com") || -1 != window.location.href.indexOf(
				"seller.kuaidi100.com") || -1 != window.location.href.indexOf("sso.kuaidi100.com") ?
				window.location.href = "https://www.kuaidi100.com/" : setLogoutInfo())
		}
	}) : (clearLoginCookie(), setLogoutInfo())
}

function logout() {
	if (getcookie("TOKEN")) try {
		$.post("/user/v2/logout.do", {
			method: "logout"
		}, function(a) {
			clearLoginCookie();
			loadIFrame("https://sso.kuaidi100.com/user/logout.do?method=logout&temp=" + Math.random());
			loadIFrame("https://www.kuaidi100.com/user/logout.do?method=logout&temp=" + Math.random()); - 1
				!= window.location.href.indexOf("buyer.kuaidi100.com") || -1 != window.location.href
				.indexOf("seller.kuaidi100.com") || -1 != window.location.href.indexOf(
				"sso.kuaidi100.com") ? window.location.href = "https://www.kuaidi100.com/" :
				setLogoutInfo()
		})
	} catch (a) {
		location.reload()
	} else location.reload()
}

function setLoginInfo() {
	var a = +getcookie("auth"),
		c = $(".kd-header__userinfo .kd-header__menu"),
		b = $.trim(getcookie("nickname"));
	2 & a && c.prepend(
		'<a href="//seller.kuaidi100.com/"  class="kd-header__menuitem" target="_blank">\u5356\u5bb6\u7248</a>');
	256 & a && c.prepend(
		'<a href="//jd.kuaidi100.com/"  class="kd-header__menuitem" target="_blank">\u4eac\u4e1c\u5356\u5bb6\u7248</a>'
		);
	128 & a && c.prepend(
		'<a href="//mai.kuaidi100.com/"  class="kd-header__menuitem" target="_blank">\u6dd8\u5b9d\u5356\u5bb6\u7248</a>'
		);
	16 &
		a && c.prepend(
			'<a href="//net.kuaidi100.com/"  class="kd-header__menuitem" target="_blank">\u5feb\u9012\u7f51\u70b9</a>');
	32 & a && c.prepend(
		'<a href="//poll.kuaidi100.com/"  class="kd-header__menuitem" target="_blank">\u63a5\u53e3\uff08API\uff09</a>'
		);
	4 & a && c.prepend(
		'<a href="//b.kuaidi100.com/page/ep?source=sso"  class="kd-header__menuitem" target="_blank">\u8fdb\u5165\u5feb\u9012\u7ba1\u5bb6</a>'
		);
	64 & a && c.prepend(
		'<a href="//cc.kuaidi100.com/" target="_blank" class="kd-header__menuitem">\u8fdb\u5165\u5feb\u9012\u8d85\u5e02</a>'
		);
	if ("" == b || "null" == b) b = $.trim(getcookie("loginName"));
	if ("" == b || "null" == b)
		if (b = $.trim(getcookie("loginMobile")), "null" == b || "" == b) b = getcookie("loginEmail");
	"null" == b && (b = "");
	11 < b.length && (b = b.substring(0, 10) + "...");
	$(".kd-header__avatar").css("background-image",
		"url(https://p.kuaidi100.com/mobile/mobileapi.do?method=download&id=avatar_" + getcookie("loginId") +
		".jpg&verstion=" + (getcookie("avatar_version") || (new Date).getTime()) + ")");
	$(".kd-header__username").text(b);
	$(".kd-header__userinfo [role=logout]").hide();
	$(".kd-header__userinfo [role=login]").show();
	$(".kd-header__userinfo").addClass("kd-header__userinfo--active").removeClass("kd-header__userinfo--hide").css(
		"visibility", "visible")
}

function setLogoutInfo() {
	$(".kd-header__userinfo [role=logout]").show();
	$(".kd-header__userinfo [role=login]").hide();
	$(".kd-header__userinfo").removeClass("kd-header__userinfo--active").css("visibility", "visible")
}

function loadIFrame(a) {
	var c = $('<iframe width="0" height="0" frameborder="0" scrolling="0"></iframe>');
	c.appendTo("body");
	c.attr("src", a);
	c.load(logoutFinish)
}

function logoutFinish() {
	loadIFrame.logoutDone++;
	2 <= loadIFrame.logoutDone && window.location.reload()
}

function getcookie(a) {
	var c = "";
	if (document.cookie && "" != document.cookie)
		for (var b = document.cookie.split(";"), d = 0; d < b.length; d++) {
			var e = b[d].replace(/(^\s*)|(\s*$)/g, "");
			if (e.substring(0, a.length + 1) == a + "=") {
				c = unescape(e.substring(a.length + 1));
				break
			}
		}
	return c
}

function setcookie(a, c) {
	var b = new Date,
		d = parseInt(b.getTime()),
		e = 86400 - 3600 * b.getHours() - 60 * b.getMinutes() - b.getSeconds();
	b.setTime(d + 1E6 * (e - 60 * b.getTimezoneOffset()));
	document.cookie = escape(a) + "=" + escape(c) + ";expires=" + b.toGMTString() + "; path=/"
}

function setcookieSubdomain(a, c) {
	var b = new Date,
		d = parseInt(b.getTime()),
		e = 86400 - 3600 * b.getHours() - 60 * b.getMinutes() - b.getSeconds();
	b.setTime(d + 1E6 * (e - 60 * b.getTimezoneOffset()));
	document.cookie = escape(a) + "=" + escape(c) + ";expires=" + b.toGMTString() + "; domain=.kuaidi100.com;path=/"
}

function setcookieTemp(a, c) {
	document.cookie = escape(a) + "=" + escape(c) + ";path=/"
}

function setcookieSubdomainTemp(a, c) {
	document.cookie = escape(a) + "=" + escape(c) + ";domain=.kuaidi100.com;path=/"
}

function deleteCookie(a) {
	var c = new Date;
	c.setTime(c.getTime() - 1);
	var b = getcookie(a);
	document.cookie = escape(a) + "=" + escape(b) + "; expires=" + c.toGMTString() + "; path=/"
}

function deleteCookieSubdomain(a) {
	var c = new Date;
	c.setTime(c.getTime() - 1);
	var b = getcookie(a);
	document.cookie = escape(a) + "=" + escape(b) + "; expires=" + c.toGMTString() + "; domain=.kuaidi100.com;path=/"
}

function getQuery(a) {
	a = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i");
	a = window.location.search.substr(1).match(a);
	return null != a ? unescape(a[2]) : null
}

function clearLoginCookie() {
	deleteCookie("loginEmail");
	deleteCookie("loginId");
	deleteCookie("loginMobile");
	deleteCookie("loginName");
	deleteCookie("nickname");
	deleteCookie("loginSession");
	deleteCookie("loginType");
	deleteCookie("KDWWW");
	deleteCookie("KDSSO")
}

function report(a, c) {
	$.ajax({
		url: "/data-report/data/report",
		method: "POST",
		contentType: "application/json",
		data: JSON.stringify({
			et: a,
			t: (new Date).getTime(),
			p: location.href,
			s: "WWW",
			d: c || {}
		})
	})
}

function tips(a, c) {
	if (a) {
		var b = $(
			'<div style="position:fixed;width:100%;top:0;bottom:0;text-align:center;z-index:99999;transition:all .3s;padding:0 3.625rem;box-sizing:border-box;"><div style="display:inline-block;vertical-align:middle;background: #000;background: rgba(0,0,0,.8);color:#FFF;border-radius: 4px;font-size: .875rem;padding: 8px 16px;line-height: 1.5em;box-sizing:border-box;">' +
			a +
			'</div><span style="display:inline-block;height: 100%;vertical-align:middle;width: 1px;"></span></div>');
		$("body").append(b);
		var d = function() {
			b.css("opacity", 0);
			setTimeout(function() {
				b.remove()
			}, 500)
		};
		b.click(function() {
			d()
		});
		setTimeout(function() {
			d()
		}, c || 1200 + (a.length - 10) / 10 * 1E3)
	}
};
