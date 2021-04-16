$(function() {
	function R() {
		$("#mask").fadeOut();
		$("#result").slideUp();
		$("#demoWrap").show()
	}

	function w(a) {
		$(a).slideUp()
	}

	function S() {
		$.ajax({
			url: "//cache.kuaidi100.com/querycookie.jsp",
			type: "GET",
			dataType: "jsonp",
			jsonp: "jsonpcallback"
		});
		return !0
	}

	function T(a, c) {
		var b = $("#history").empty(),
			f = null;
		if ($.isArray(a) && a.length) {
			for (var d = 0; d < a.length && 10 > d; d++) f = $("<li></li>"), f.html([a[d].nu, (D[a[d].code] ||
				{}).name].join("&nbsp;&nbsp;")), c || f.append(
				'<span class="del" title="\u5220\u9664"></span>'), f.data({
				code: a[d].code,
				nu: a[d].nu
			}), c ? ($("#bigDataTips").show(), $("#historyTips").hide()) : ($("#bigDataTips").hide(), $(
				"#historyTips").show()), b.append(f);
			getcookie("TOKEN") && "1" == getcookie("loginSession") ? ($("#logoutTips").hide(), $("#loginTips")
				.show()) : ($("#logoutTips").show(), $("#loginTips").hide());
			setTimeout(function() {
				b.parent().slideDown()
			}, 0)
		}
	}

	function aa(a, c) {
		E = !1;
		$.ajax({
			type: "post",
			url: "/autonumber/autoComNum?text=" + a,
			dataType: "json",
			success: function(b) {
				b.auto && b.auto.length || b.autoDest && b.autoDest.length ? (m.val(b.num),
					b.auto && b.auto.length && (z++, A(b.auto[0].comCode), G(b.auto[0].comCode,
						b.num, "", c)), b.autoDest && b.autoDest.length && (z++, E = !0, G(b
						.autoDest[0].comCode, b.num, "autoDest", c), A("default"))) : (r = !1,
					A(""), B.find(".loading").hide(), J("recognize"))
			},
			error: function() {
				r = !1;
				B.find(".loading").hide();
				J("recognize")
			}
		})
	}

	function x(a) {
		var c = {
				"\uff11": 1,
				"\uff12": 2,
				"\uff13": 3,
				"\uff14": 4,
				"\uff15": 5,
				"\uff16": 6,
				"\uff17": 7,
				"\uff18": 8,
				"\uff19": 9,
				"\uff10": 0
			},
			b = $.trim(m.val()).replace(/-|\s|-|\uff0d|\u3000/g, ""),
			f = /^[0-9a-zA-Z]{4,}$/;
		if (!r) {
			for (var d in c) b = b.replace(new RegExp(d, "g"), c[d]);
			F = [];
			E = !1;
			$("#result, #errorWrap, #internal, #national, #comlist").hide();
			z = notFoundCount = requestCount = 0;
			"" == b ? (r = !1, tips("\u8bf7\u8f93\u5165\u5feb\u9012\u5355\u53f7", 1500), m.focus()) : f.test(
				b) ? (m.blur(), r = !0, B.show().find(".loading").show(), $("#historyWrap").hide(), $(
					"#demoWrap").hide(), K ? (z = 1, G(K, b, "", a)) : aa(b, a)) : (r = !1, tips(
					"\u5feb\u9012\u5355\u53f7\u683c\u5f0f\u9519\u8bef", 2E3))
		}
	}

	function G(a, c, b, f, d) {
		var g = "";
		if ("shunfeng" == a)
			if (f) {
				if ($("#checkCode input").each(function(e,
						h) {
						g += $(h).val()
					}), g = g.replace(/\D/g, ""), 4 > g.length) {
					tips(
						"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8054\u7cfb\u65b9\u5f0f\u540e\u56db\u4f4d\u53f7\u7801");
					L();
					r = !1;
					return
				}
			} else if (g = g || (U ? localStorage.getItem("checkCode_" + c) || "" : ""), 4 > g.length) {
			r = !1;
			$("#checkCode").fadeIn().find("input").val("");
			L();
			return
		}
		F.push(a);
		$("#checkCode").fadeOut();
		ba(a);
		$.ajax({
			type: "GET",
			url: "/query",
			dataType: "json",
			data: {
				type: a,
				postid: c,
				temp: Math.random(),
				phone: g
			},
			timeout: 3E4,
			success: function(e) {
				if (200 == e.status) {
					B.hide();
					var h = D[e.com],
						q = "http://wx.kuaidi100.com/wxbuss.do?method=pcIndexResult&com=" + e.com +
						"&nu=" + e.nu,
						k = "autoDest" === b ? $("#national") : $("#internal");
					k.find(".result-body").show();
					k.find(".loading, .error-wrap").remove();
					k.find("[role=querycode]").attr("src", q);
					k.find("[role=comname]").text(h.name).css("border-left", "1px solid #d8d8d8");
					k.find("[role=site]").attr("href", h.siteUrl).closest(".info-item").show();
					k.find("[role=phone]").text(h.contactTel || "").show();
					k.data("result", e);
					V[e.com] ? k.find("[role=online]").show().find("a").attr("href",
						V[e.com].replace("${num}", e.nu)).attr("target", "_blank") : k.find(
						"[role=online]").hide();
					if (E) {
						q = "autoDest" == b ? "\u76ee\u7684\u56fd\u5bb6" :
							"\u53d1\u4ef6\u56fd\u5bb6";
						var p = "";
						for (t in l)
							if (e.com == l[t].com) {
								p = l[t].country_name;
								break
							} var t = p;
						p = k.find("[role=address]");
						k.find("[role=comname]").hide();
						p.show();
						p.find(".text").text(q);
						p.find("b").attr("title", t).text(t.slice(0, 5));
						p.find("img").attr("src", "https://cdn.kuaidi100.com/images/all/56/" + e
							.com + ".png");
						p.find(".com").text(h.name)
					} else k.find("[role=comname]").show().css("border-left",
						"none"), k.find("[role=address]").hide();
					getcookie("TOKEN") && getcookie("loginMobile") ? k.find(".bind").hide() : k
						.find(".bind").show();
					M(k);
					$("#mask").show();
					$("#internal").show();
					$("#result").slideDown();
					w("#historyWrap");
					r = !1;
					$("#checkCode").hide();
					H(c, a, 1)
				} else 408 == e.status ? (H(c, a, 0), tips(
					"\u9a8c\u8bc1\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4\u8f93\u5165\u6b63\u786e\u7684\u53f7\u7801",
					2E3), $("#checkCode").fadeIn(), r = !1, L()) : (notFoundCount++, d ? W(b) :
					J(b), H(c, a, 0));
				a && "default" != a && I.attr("src",
					"//cache.kuaidi100.com/index.html?option=add&gCompanyCode=" +
					a + "&gKuaidiNumber=" + c + "&gIsCheck=0")
			},
			error: function() {
				requestCount++;
				tips(
					"\u67e5\u8be2\u65f6\u95f4\u8fc7\u957f\uff0c\u8bf7\u60a8\u7a0d\u540e\u67e5\u8be2");
				H(c, comCode, 0);
				d && W(b,
					"\u67e5\u8be2\u65f6\u95f4\u8fc7\u957f\uff0c\u8bf7\u60a8\u7a0d\u540e\u67e5\u8be2"
					);
				requestCount == z && B.hide()
			},
			complete: function(e) {
				requestCount++;
				f && 408 != e.status && "shunfeng" == a && g && U && localStorage.setItem(
					"checkCode_" + c, g);
				requestCount == z && B.find(".loading").hide()
			}
		})
	}

	function M(a) {
		var c = a.data("result"),
			b = JSON.parse(JSON.stringify(c.data)),
			f = c.ischeck;
		1 === C && b.reverse();
		1 === C ? a.addClass("up") : a.removeClass("up");
		a.show();
		a = a.find(".content");
		a.empty();
		for (var d = 0, g = b.length; d < g; d++) {
			var e = b[d].context;
			e = ca(e, c.com, "fonter1");
			e = da(e);
			var h =
				"\u661f\u671f\u5929 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d"
				.split(" ")[(new Date(Date.parse(b[d].time.replace(/-/g, "/")))).getDay()],
				q = b[d].time.substring(0, 10).replace(/-/g, ".");
			if (d < b.length - 1) var k = b[d + 1].time.substring(0,
				10).replace(/-/g, ".");
			var p = b[d].ftime.substring(11, 16),
				t = 0 == d || d == b.length - 1 || q != k;
			var y = "step";
			if (0 === d && -1 == C || d === g - 1 && 1 == C) y = f ? y + " start" : y + " ing";
			d === g - 1 && (y += " end");
			a.append('<li class="' + y + '">        <div class="datetime">' + q + "<br>" + p + (t ? " " + h :
					"") + '</div>        <div class="step-icon"></div>        <div class="text">' + e +
				"</div>      </li>")
		}
	}

	function X() {
		var a = $.trim(m.val());
		5 <= a.length && (N && N.abort(), N = $.ajax({
			type: "post",
			url: "/autonumber/autoComNum?text=" + a,
			dataType: "json",
			success: function(c) {
				$("#suggestList a").remove();
				var b, f = c.num,
					d = [];
				if (c.auto && c.auto.length) {
					for (b = 0; b < c.auto.length; b++) {
						var g = c.auto[b].comCode;
						$("#suggestList").append('<a data-code="' + g + '" data-num="' + f +
							'">' + (D[g] || {}).shortName + "</a>");
						2 >= b && d.push({
							code: c.auto[b].comCode,
							nu: f
						})
					}
					T(d, !0);
					$("#history").append(
						'<li  data-code="other" title="\u8bc6\u522b\u6709\u8bef\uff1f\u8bf7\u624b\u52a8\u9009\u62e9\uff01">' +
						f + " \u5176\u5b83\u5feb\u9012</li>");
					$("#suggestList").show()
				} else $("#suggestList").hide(), w("#historyWrap")
			}
		}))
	}

	function A(a) {
		(K = a) ? $("#comIcon img").attr("src",
			"https://cdn.kuaidi100.com/images/all/56/" + a + ".png"): $("#comIcon img").attr("src",
			"https://cdn.kuaidi100.com/images/www/home/default-com.png")
	}

	function J(a) {
		("autoDest" === a ? $("#national") : $("#internal")).hide();
		if (notFoundCount == z && F.length) {
			a = [];
			for (var c in F) {
				var b = D[F[c]];
				b && b.name && b.siteUrl && a.push('<a target="_blank" href="' + b.siteUrl +
					'"><span class="span-shortname">' + b.name + "</span>\u5b98\u7f51</a>")
			}
			$("#links").html(a.join("\u3001")).parent().show();
			$("#errorWrap, #mask").show()
		} else $("#linksWrap").hide(),
			"recognize" == a && $("#errorWrap, #mask").show();
		w("#historyWrap");
		$("#demoWrap").hide();
		r = !1
	}

	function W(a, c) {
		a = "autoDest" === a ? $("#national") : $("#internal");
		a.find(".loading").remove();
		a.append(
			'<div class="error-wrap" style="padding: 40px 0"><div class="placeholer"><img src="https://cdn.kuaidi100.com/images/www/home/errors.png" class="error-img"><div class="error-text">' +
			(c ||
				"\u6ca1\u6709\u67e5\u5230\u7ed3\u679c\uff0c\u8bf7\u68c0\u67e5\u5feb\u9012\u5355\u53f7\u548c\u5feb\u9012\u516c\u53f8\u662f\u5426\u6b63\u786e\u6216\u7a0d\u540e\u518d\u8bd5"
				) +
			"</div></div></div>")
	}

	function ca(a, c, b) {
		var f = {
			shentong: "5",
			huitongkuaidi: "6",
			huiqiangkuaidi: "27",
			tiantian: "7",
			zhaijisong: "12",
			quanfengkuaidi: "23",
			longbanwuliu: "24",
			guotongkuaidi: "20",
			kuaijiesudi: "18",
			debangwuliu: "1",
			zhongtong: "3",
			yunda: "2"
		};
		switch (c) {
			case "shentong":
			case "huitongkuaidi":
			case "huiqiangkuaidi":
			case "tiantian":
			case "quanfengkuaidi":
			case "longbanwuliu":
			case "guotongkuaidi":
			case "kuaijiesudi":
				var d =
					/(?:(?!\u7684|\u5458|\u578b|\u662f).|^)\u3010((?:(?!.?\u5230\u8fbe.?|.?\u95ee\u9898.?|.?\u6d3e\u4ef6.?|.?\u7b7e\u6536.?|.?\u7591\u96be.?|.?\u626b\u63cf.?|.?\u88c5\u888b.?|.?\u88c5\u5305.?|.?\u59a5\u6295.?|.?\u64cd\u4f5c\u5458.?|.?\u5ba1\u6838.?|.?\u5907\u6ce8.?|.?\u5ba2\u670d.?|.?\u7f51\u70b9\u7ecf\u7406.?|.?\u5458\u5de5.?|.?\u95e8\u536b.?|.?\u672c\u4eba.?|.?\u8349\u7b7e.?|.?\u56fe\u7247.?|.?\u5206\u62e8\u4e2d\u5fc3.?)[^\s\d\u3010]){2,})\u3011/gi;
				a = a.replace(d, function(g, e, h) {
					return '\u3010<a href="https://www.kuaidi100.com/network/?from=' + b +
						"&searchText=" + encodeURIComponent(e) + "&company=" + f[c] +
						'" target="_blank">' + e + "</a>\u3011"
				});
				break;
			case "debangwuliu":
			case "zhaijisong":
			case "zhongtong":
			case "yunda":
				d = /(?:(?!\u7684|\u5458|\u578b|\u662f).|^)\[((?:(?!.?\u5230\u8fbe.?|.?\u95ee\u9898.?|.?\u6d3e\u4ef6.?|.?\u7b7e\u6536.?|.?\u7591\u96be.?|.?\u626b\u63cf.?|.?\u88c5\u888b.?|.?\u88c5\u5305.?|.?\u59a5\u6295.?|.?\u64cd\u4f5c\u5458.?|.?\u5ba1\u6838.?|.?\u5907\u6ce8.?|.?\u5ba2\u670d.?|.?\u7f51\u70b9\u7ecf\u7406.?|.?\u5458\u5de5.?|.?\u95e8\u536b.?|.?\u672c\u4eba.?|.?\u8349\u7b7e.?|.?\u56fe\u7247.?|.?\u5206\u62e8\u4e2d\u5fc3.?)[^\s\d\u3010]){2,})\]/gi,
					a = a.replace(d, function(g, e, h) {
						return '[<a href="https://www.kuaidi100.com/network/?from=' + b + "&searchText=" +
							encodeURIComponent(e) + "&company=" + f[c] + '" target="_blank">' + e + "</a>]"
					})
		}
		return a
	}

	function da(a) {
		return a.replace(/1\d{10}/gi, function(c) {
			var b = "";
			$.ajax({
				type: "post",
				url: "/courier/searchapi.do",
				data: "method=courierinfobyphone&json={%22phone%22:%22" + c + "%22}",
				dataType: "json",
				async: !1,
				success: function(f) {
					b = 200 == f.status ?
						'<a target="_blank" href="https://www.kuaidi100.com/courier/detail_' +
						f.guid +
						'.html">' + c + "</a>" : c
				}
			});
			return b
		})
	}

	function L() {
		$("#checkCode input").eq(3).focus()
	}

	function ba(a) {
		O[a] ? ($("#officialText").text(O[a]), $("#official").show()) : $("#official").hide()
	}

	function ea(a) {
		for (var c in a) a[c] = $.trim(a[c]);
		$.ajax({
			url: "/newsreport/addCoop",
			method: "POST",
			dataType: "json",
			data: a,
			success: function(b) {
				200 == b.status ? (tips("\u4fe1\u606f\u5df2\u63d0\u4ea4", 1500), n.find("input")
					.val(""), n.find(".select .val").hide().text("").data("key", ""), n.find(
						".placeholder").show()) : tips(b.message,
					1500)
			},
			error: function() {
				tips("\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", 1500)
			}
		})
	}

	function Y(a) {
		var c = $('<div class="news-item"></div>');
		c.append('<div class="date"><div class="year">' + a.date.slice(0, 4) + '</div><div class="day">' + a
			.date.slice(5, 10) + "</div> </div>");
		c.append('<div class="brief"><div class="t">' + a.title + '</div><div class="p">' + a.content +
			"</div></div>");
		return c
	}

	function H(a, c, b) {
		report("send_query_stat", {
			sourceCode: "WWW",
			orderNum: a,
			company: c,
			status: b
		})
	}
	var I = $(
			'<iframe style="display:block" width="0" height="0" vspace="0" hspace="0" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>'
			),
		P = getQuery("nu"),
		m = $("#input"),
		B = $("#queryPanel"),
		Q = null,
		N = null,
		D = {},
		v = {},
		O = {},
		F = [],
		r = !1,
		C = -1,
		V = {
			shentong: "https://95543.qiyukf.com/client?k=51551590dbef83c8b969e4726877a5d1&wp=1&robotShuntSwitch=1&robotId=75059&t=\u5feb\u9012100",
			zhongtong: "https://kfapi.zto.com/im?channel=kuaidi100&billCode=${num}",
			huitongkuaidi: "http://webcs.800best.com/index.html?source=kd100&bill=${num}&t=" + (new Date)
				.getTime()
		},
		l = [];
	v = "";
	for (var U = "undefined" !== typeof localStorage, u = 0; u < l.length; ++u) v += "<li>", v +=
		'<img class="left-image" src="https://cdn.kuaidi100.com/images/all/global/' +
		(l[u].logo || "default") + '"></div>', v += '<div class="right-word"><p>' + l[u].cnname + "</p><p>" + l[
			u].enname + "</p></div>", v += "</li>", v[u] = l[u];
	$("#expressList").html(v);
	var Z = jsoncom.company || [],
		K = "",
		E = !1,
		z = notFoundCount = requestCount = 0;
	u = 0;
	for (var fa = Z.length; u < fa; u++) v = Z[u], D[v.number] = v;
	I.appendTo("body");
	null != P && "" != P && (m.val(P), x());
	(function() {
		$.ajax({
			url: "https://www.kuaidi100.com/sysapi.do?method=demonu",
			method: "GET",
			success: function(a) {
				a && $("#demo").text(a)
			}
		})
	})();
	(function() {
		$.ajax({
			url: "/apicenter/kdmkt.do?method=dictItemsByCode&dictCode=HOMEPAGE_CONFING_COMLIST",
			method: "GET",
			success: function(a) {
				for (var c = {}, b = 0, f = a.data.length; b < f; b++) c[a.data[b].itemValue] =
					a.data[b].itemName;
				O = c
			}
		})
	})();
	(function() {
		function a(d) {
			for (var g = $("#banner"), e, h = 0; h < d.length; h++) e = $('<div class="banner"></div>'), e
				.append($('<div style="background-image:url(' + d[h].bgimage + ')" class="img"></div>')), e
				.append($('<div style="background-image:url(' + d[h].imageUrl2 + ')" class="img"></div>')),
				e.append($('<div style="background-image:url(' + d[h].imageUrl3 + ')" class="img"></div>')),
				d[h].url &&
				e.attr("href", d[h].url), g.prepend(e);
			new c
		}

		function c(d) {
			function g() {
				h = ++h > q ? 0 : h;
				$(".indicator span").eq(h).addClass("active").siblings("span").removeClass("active");
				e.eq(h).fadeIn(1200).siblings(".banner").fadeOut(1200)
			}
			var e = $("#banner .banner"),
				h = 0,
				q = e.size() - 1,
				k = null;
			d = "";
			if (q) {
				$("#banner").append('<div class="indicator"></div>');
				for (var p = 0; p <= q; p++) d += "<span" + (0 == p ? ' class="active"' : "") + "></span>";
				$(".indicator").append(d)
			}
			e.eq(0).show().siblings(".banner").hide();
			e.each(function(t, y) {
				$(y).attr("href") &&
					$(y).css("cursor", "pointer")
			});
			e.click(function(t) {
				$(this).attr("href") && window.open($(this).attr("href"))
			}).on("mouseover", function() {
				clearInterval(k);
				k = null
			}).on("mouseout", function() {
				k = setInterval(g, 4E3)
			});
			$(".indicator span").click(function(t) {
				t = $(this).index();
				$(this).addClass("active").siblings("span").removeClass("active");
				h = t;
				k && (clearInterval(k), k = null);
				e.stop(!0, !0).hide();
				e.eq(h).fadeIn(1200);
				setTimeout(function() {
					k = setInterval(g, 5E3)
				}, 0)
			});
			k = setInterval(g, 4E3)
		}
		var b = {
				bgimage: "img/banner-01.png",
				imageUrl2: "img/banner-02.png",
				imageUrl3: "img/banner-03.png"
			},
			f = [];
		$.ajax({
			type: "post",
			url: "/assets/ext?method=mainprofile",
			data: {
				platform: "WWW",
				pos: "www_index_banner"
			},
			success: function(d) {
				f = d && d.adslist && d.adslist.length ? d.adslist : [b];
				a(f)
			},
			error: function() {
				f = [b];
				a(f)
			}
		})
	})();
	(function() {
		var a = $("#serviceSwiper"),
			c = $("#serviceIndicator").empty(),
			b = a.find(".swiper-item").show(),
			f = b.size(),
			d = f + 1;
		b.css("width", 100 / d + "%");
		a.parent().css("overflow",
			"hidden");
		a.append(b.eq(0).clone(!0).show());
		a.css({
			width: 100 * d + "%"
		});
		new function() {
			function g() {
				a.animate({
					marginLeft: 100 * -e + "%"
				}, function() {
					e == d - 1 && (e = 0, a.css("margin-left", 0));
					e++
				});
				c.find("span").eq(e < d - 1 ? e : 0).addClass("active").siblings("span").removeClass(
					"active")
			}
			for (var e = 0, h = null, q = 0; q < f; q++) c.append("<span></span>"), console.log(c.html());
			c.find("span:eq(0)").addClass("active");
			a.on("mouseover", function() {
				clearInterval(h);
				h = null
			}).on("mouseout", function() {
				clearInterval(h);
				h = setInterval(g,
					4E3)
			});
			c.find("span").click(function(k) {
				k = $(this).index();
				$(this).addClass("active").siblings("span").removeClass("active");
				e = k;
				h && clearInterval(h);
				g();
				h = setInterval(g, 4E3)
			});
			g();
			h = setInterval(g, 4E3)
		}
	})();
	(function() {
		$.ajax({
			url: "/newsreport/getCoopTypes",
			method: "POST",
			dataType: "json",
			success: function(a) {
				if (a.data.maplist && a.data.maplist.length) {
					a = a.data.maplist;
					for (var c = n.find(".types"), b = 0; b < a.length; b++) c.append(
						'<div class="type" data-key="' + a[b].key + '">' + a[b].value +
						"</div>")
				}
			},
			error: function() {
				tips("\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",
					1500)
			}
		})
	})();
	(function() {
		var a = null,
			c = [],
			b = $("#news"),
			f = b.find(".poster"),
			d = b.find(".news-list .more");
		$.ajax({
			url: "/newsreport/getNewsHomeList",
			dataType: "json",
			success: function(g) {
				a = g.head;
				c = g.normalList || [];
				a && (f.attr("href", "https://www.kuaidi100.com/news/detail.shtml?id=" + a.id),
					f.find("img").attr("src", a.image), f.append(Y(a)));
				for (var e = 0; e < c.length; e++) g = $(
						'<a target="_blank" class="news-item"></a>'), g.attr("href",
						"https://www.kuaidi100.com/news/detail.shtml?id=" + c[e].id), g.append(
						Y(c[e]).html()),
					g.insertBefore(d)
			}
		})
	})();
	m.selectListIndex = -1;
	$("#demo").on("click", function(a) {
		a.preventDefault();
		m.val($(this).text());
		x()
	});
	m.keyup(function(a) {
		var c = a.keyCode ? a.keyCode : a.which,
			b = -1,
			f = $("#history"),
			d = f.find("li").size();
		b = null;
		a.preventDefault();
		13 != c && 40 != c && 38 != c ? 5 < $.trim(m.val()).length ? (Q && clearTimeout(Q), Q =
				setTimeout(function() {
					X()
				}, 500)) : S() : 40 == c || 38 == c ? (b = f.find("li.hover").index(), b = 40 == c ? b +
				1 : b - 1, b >= d && (b = 0), 0 > b && (b = d - 1), m.selectListIndex = b, f.find("li")
				.eq(b).addClass("hover").siblings().removeClass("hover")) :
			13 == c && (-1 < m.selectListIndex && (b = f.find("li").eq(m.selectListIndex), console.log(b
				.data()), A(b.data("code")), m.val(b.data("nu"))), x())
	}).focus(function(a) {
		(a = $.trim(m.val())) ? 5 < a.length && X(): S()
	}).click(function(a) {
		a.stopPropagation()
	});
	$("#history").on("click", "li", function() {
		"other" === $(this).data("code") ? ($("#comlist").slideDown(), A("default"), _hmt.push([
			"_trackEvent", "otherCom", "click"
		])) : (_hmt.push(["_trackEvent", "autoCom", "click"]), m.val($(this).data("nu")), A($(this)
			.data("code")), x())
	}).on("click",
		".del",
		function(a) {
			var c = $(this).closest("li"),
				b = c.data("code"),
				f = c.data("nu"),
				d = querycookie;
			a.stopPropagation();
			for (a = 0; a < d.length && 10 > a; a++) d[a].nu == f && d[a].code == b && (I.attr("src",
				"//cache.kuaidi100.com/index.html?option=remove&gCompanyCode=" + d[a].code +
				"&gKuaidiNumber=" + d[a].nu), d.splice(a, 1), c.slideUp());
			querycookie.length || w("#historyWrap")
		});
	$("#delAll").click(function(a) {
		a.preventDefault();
		I.attr("src", "//cache.kuaidi100.com/index.html?option=empty");
		w("#history")
	});
	$("#comIcon").click(function() {
		$("#comlist").is(":visible") ?
			w("#comlist") : $("#comlist").slideDown()
	});
	$("#comlist").on("click", "a", function() {
		$(this).data("num") && m.val($(this).data("num"));
		A($(this).data("code"));
		w($("#comlist"));
		$.trim(m.val()) && x()
	});
	$("#query").click(function() {
		_hmt.push(["_trackEvent", "query", "click"]);
		x()
	});
	$("#result").on("click", "[role=sort]", function(a) {
		a.preventDefault();
		C = ~C + 1;
		E && M($("#national"));
		M($("#internal"))
	}).on("click", "[role=close]", function() {
		R()
	}).on("click", ".print", function(a) {
		a.preventDefault();
		a = $('<div><div class="result-body" style="border-bottom: none;"></div></div>');
		var c = $(this).closest(".head").siblings(".result-body").find(".result").clone(),
			b = window.open("", "_blank"),
			f = $(b.window.document);
		a.find(".result-body").html(c);
		f.find("head").append(
			'<link rel="stylesheet" href="https://www.kuaidi100.com/css/www/common.css" /><link rel="stylesheet" href="https://www.kuaidi100.com/css/www/home.css"/><style>@media print {body{-webkit-print-color-adjust:exact;-moz-print-color-adjust:exact;-ms-print-color-adjust:exact;print-color-adjust:exact;}button{display:none;}}body{height: auto;min-width: auto;}.result-body .sort{border: none;}.result-body .sort::after{display: none;}.result-body .datetime, .result-body .step-icon,.result-body .step .text, .result-body .title .text {*display: inline;zoom: 1;}</style>'
			);
		b.window.document.body.innerHTML = a.html();
		setTimeout(function() {
			b.window.print()
		}, 500)
	}).on("click", ".rss", function(a) {
		var c = $(this).closest("[role=result]").data("result");
		a.preventDefault();
		setcookieSubdomain("addcom", c.com);
		setcookieSubdomain("addnu", c.nu);
		window.location.href = "//buyer.kuaidi100.com"
	}).on("click", ".share", function() {
		var a = $(this).closest("[role=result]").data("result");
		a = "https://www.kuaidi100.com/twoCode.do?method=global&&qrcodesize=240&&content=" +
			encodeURIComponent("https://m.kuaidi100.com/result.jsp?com=" +
				a.com + "&nu=" + a.nu + "&ordersource=pc_result&w=190&h=190");
		$("#shareCode").attr("src", a);
		$("#shareMask, #shareBox").fadeIn()
	}).on("click", ".bind", function() {
		window.open("https://sso.kuaidi100.com/user/account.jsp", "_blank")
	}).on("click", "[role=address] .com, [role=address] img", function() {
		$("#expressMap").fadeIn().data("resultTargetId", $(this).closest("[role=result]").attr("id"))
	});
	$("#mask").click(function() {
		R();
		w("#queryPanel");
		$("#demoWrap").show()
	});
	$("#shareClose").click(function() {
		$("#shareBox, #shareMask").fadeOut()
	});
	$("#expressMap").on("click", ".header-close", function(a) {
		a.preventDefault();
		$("#expressMap").fadeOut();
		$(".header-search").val("").change()
	}).on("keyup onpropertychange input change", ".header-search", function(a) {
		a.preventDefault();
		a = $(this).val();
		for (var c in l) - 1 != l[c].com.indexOf(a) || -1 != l[c].enname.indexOf(a) || -1 != l[c].cnname
			.indexOf(a) ? $("#expressList li").eq(c).show() : $("#expressList li").eq(c).hide()
	}).on("click", "li", function(a) {
		a.preventDefault();
		var c = $(this).index();
		a = $("#" + $("#expressMap").data("resultTargetId"));
		var b = a.find("[role=address]");
		b.find("img").attr("src", $(this).find(".left-image").attr("src"));
		b.find("b").attr("title", l[c].country_name).text(l[c].country_name.slice(0, 5));
		b.find(".com").text(l[c].cnname);
		l[c].phone ? a.find("[role=phone]").text(l[c].phone).show() : a.find("[role=phone]").hide();
		l[c].web ? a.find("[role=site]").attr("href", l[c].web).closest(".info-item").show() : a.find(
			"[role=site]").closest(".info-item").hide();
		$("#expressMap").hide();
		c = l[c].com;
		b = a.data("result").nu;
		a.data("result", {
			com: c,
			nu: b
		});
		a.find(".result-body").hide();
		a.find(".content").empty();
		a.append(
			'<img src="https://cdn.kuaidi100.com/images/loading_new.gif" class="loading" style="display: block;">'
			);
		a.find(".error-wrap").remove();
		G(c, b, "internal" == a.attr("id") ? "" : "autoDest", !1, !0)
	});
	$("#checkCode").on("click", ".check-code-close", function(a) {
		a.preventDefault();
		$("#checkCode").fadeOut();
		r = !1;
		$("#queryPanel, #mask").hide()
	}).on("keydown", "input", function(a) {
		var c = a.keyCode || a.which,
			b = $(this);
		b.val() && a.preventDefault();
		57 >= c && 48 <= c || 96 <= c && 105 >= c ? setTimeout(function() {
			96 <= c ? b.val(c - 96) : b.val(c - 48);
			b.next().size() && b.blur().next().focus()
		}, 0) : 8 == c ? (b.val(""), setTimeout(function() {
			b.prev().size() && b.blur().prev().focus()
		}, 0)) : a.preventDefault()
	}).on("keyup onpropertychange input change", "input", function() {
		$(this).val($(this).val().replace(/\D/g, ""))
	}).on("focus", "input", function() {
		for (var a = $(this).prevAll("input"), c = 0; c < a.size(); c++) a.eq(c).val() || a.eq(c)
		.focus()
	}).on("click", ".btn", function(a) {
		a.preventDefault();
		x(!0)
	}).on("keyup", "input", function(a) {
		var c = "";
		13 == (a.keyCode || a.which) && ($("#checkCode input").each(function(b, f) {
			c += $(f).val()
		}), c = c.replace(/\D/g, ""), 4 == c.length && x(!0))
	});
	$("#official").on("mouseover", function() {
		$(".official-code-wrap").stop().fadeIn()
	}).on("mouseout", function() {
		$(".official-code-wrap").stop().fadeOut()
	});
	var n = $("#cooperationType");
	n.on("click", ".type", function(a) {
		a.stopPropagation();
		n.find(".select .placeholder").hide();
		n.find(".select").find(".val").text($(this).text()).show().data("key",
			$(this).data("key"));
		n.find(".types").slideUp()
	}).on("click", ".select", function(a) {
		a.stopPropagation();
		n.find(".types").slideDown()
	}).on("click", ".submit-btn", function() {
		var a = n.find("[name=name]"),
			c = n.find("[name=phone]"),
			b = n.find("[name=company]"),
			f = n.find("[name=job]"),
			d = n.find(".select .val");
		if (2 > $.trim(a.val()).length) return a.focus(), tips("\u8bf7\u8f93\u5165\u59d3\u540d", 1500);
		if (!/^1\d{10}$/.test($.trim(c.val()))) return c.focus(), tips(
			"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801",
			1500);
		if (2 > $.trim(b.val()).length) return b.focus(), tips(
			"\u8bf7\u8f93\u5165\u516c\u53f8\u540d\u79f0", 1500);
		if (1 > $.trim(d.text()).length) return setTimeout(function() {
			$("#cooperationType .types").slideDown()
		}, 500), tips("\u8bf7\u9009\u62e9\u60a8\u7684\u9700\u6c42", 1500);
		ea({
			name: a.val(),
			phone: c.val(),
			company: b.val(),
			job: f.val(),
			type: d.data("key")
		})
	});
	$(document).on("click", function() {
		w("#historyWrap");
		n.find(".types").slideUp()
	});
	window.jsoncallback = function(a) {
		querycookie = a = eval("(" + decodeURIComponent(a) +
			")");
		T(a)
	}
});
