var platform = "www",
	adArr = [],
	sets = [];
$(function() {
	var c = JSON.parse(localStorage.getItem("adRefuseDate")) || {},
		a = Date.now() - 864E5;
	if ("sso.kuaidi100.com" == location.host) $("[role-slot]").remove();
	else {
		"undefined" === typeof allpos && (window.allpos = []);
		$("[role-slot]").each(function(b, e) {
			$(e).attr("id", $(e).attr("role-slot"))
		});
		for (var d in c) + c[d] > a && $("[role-slot=" + d + "]").remove();
		if (allpos.length && $("[role-slot]").size()) loadAds(allpos.join(","));
		else return $("[role-slot]").remove(), !1;
		$("body").on("click", "[role-slot] a", function() {
			var b =
				$(this).closest("[role-slot]"),
				e = b.data("url"),
				f = b.data("pos");
			b = b.data("aid");
			$.post("/mainapi.do?method=vieweventads", {
				source: platform,
				adlocation: f,
				adurl: encodeURIComponent(e),
				showorlink: "click",
				_id: b
			})
		}).on("click", "[role-slot] .close", function(b) {
			b.preventDefault();
			b.stopPropagation();
			b = $(this).closest("[role-slot]");
			var e = JSON.parse(localStorage.getItem("adRefuseDate")) || {};
			e[b.attr("role-slot")] = Date.now();
			localStorage.setItem("adRefuseDate", JSON.stringify(e));
			b.remove();
			$.post("/mainapi.do?method=vieweventads", {
				source: platform,
				adlocation: b.data("pos"),
				adurl: encodeURIComponent(b.data("url")),
				showorlink: "close",
				_id: b.data("aid")
			})
		})
	}
});

function removeAd(c) {
	c ? $("[role-slot=" + c + "]").remove() : $("[role-slot]").remove()
}

function sortAds() {
	for (var c = {}, a = 0, d = adArr.length; a < d; a++)(c[adArr[a].pos] || (c[adArr[a].pos] = [])).push(adArr[a]);
	return c
}

function loadAds(c) {
	function a(d) {
		"function" === typeof window.showAdCallback && setTimeout(function() {
			window.showAdCallback(d)
		}, 0)
	}
	c = {
		platform: platform,
		pos: c
	};
	if (getcookie("TOKEN") || sessionStorage.getItem("TOKEN")) c.token = getcookie("TOKEN");
	$.ajax({
		type: "post",
		url: "/assets/ext?method=mainprofile",
		data: c,
		success: function(d) {
			if (200 == d.status && 0 < d.adslist.length) {
				for (var b = 0; b < d.adslist.length; b++) sets.push(d.adslist[b].pos), adArr.push(d
					.adslist[b]);
				showAds(sortAds())
			} else removeAd();
			a(d)
		},
		error: function() {
			a();
			removeAd()
		},
		fail: function() {
			a()
		}
	})
}

function showAds(c) {
	if (c) {
		for (var a = 0; a < allpos.length; a++) - 1 == $.inArray(allpos[a], sets) && removeAd(allpos[a]);
		a = 0;
		for (var d = allpos.length; a < d; a++) {
			var b = allpos[a],
				e = c[b] ? c[b].length : 0,
				f = $("[role-slot=" + b + "]");
			f.size() && e && pushAd(f.eq(0), c[b][Math.floor(Math.random() * e)])
		}
	} else removeAd()
}

function pushAd(c, a) {
	var d = "";
	if (!a) return c.remove();
	"img" == a.type ? (c.data({
				aid: a._id,
				url: a.url,
				pos: a.pos,
				preDisplay: c.css("display")
			}).hide(), d = '<a target="_blank" href="' + a.url + '" style="cursor:pointer"><img src="' + a.bgimage +
			'"></a>', d += "m_result_redpacket" == a.pos || "\u6d3b\u52a8" == a.showType ||
			"m_third_result_redpacket" == a.pos ? "" : '<div class="close" style="cursor:pointer">\u5e7f\u544a</div>') :
		"imgJavascript" == a.type ? (c.data({
				aid: a._id,
				url: a.url,
				pos: a.pos,
				preDisplay: c.css("display")
			}).hide(), d = '<img src="' +
			a.bgimage + '">' + a.content.replace("${id}", a.pos)) : d = a.content;
	var b = null;
	c.css("opacity", 1).empty().html(d);
	if ("img" == a.type || "imgJavascript" == a.type) b = new Image, b.addEventListener("load", function() {
		c.css("display", c.data("preDisplay"));
		b = null
	}), b.addEventListener("error", function() {
		c.remove();
		b = null
	}), b.src = a.bgimage;
	$.post("/mainapi.do?method=vieweventads", {
		source: platform,
		adlocation: a.pos,
		adurl: encodeURIComponent(a.url) || "UNKNOWN",
		showorlink: "show",
		_id: a._id
	})
};
