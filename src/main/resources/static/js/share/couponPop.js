(function() {
	function d(f) {
		return typeof f === "function"
	}

	function b(f) {
		return typeof f === "number"
	}

	function a() {
		var f = new Date();
		var g = f.getTime();
		f.setDate(f.getDate() + 1);
		f.setHours(0);
		f.setMinutes(0);
		f.setSeconds(0);
		return f.getTime() - g
	}

	function c(f) {
		var j = document;
		var h = j.createElement("style"),
			g = j.createTextNode(f),
			i = j.getElementsByTagName("head");
		h.setAttribute("type", "text/css");
		h.appendChild(g);
		if (i.length) {
			i[0].appendChild(h)
		} else {
			j.documentElement.appendChild(h)
		}
	}

	function e(f) {
		f = f || {};
		this.pos = f.pos || "www_coupon_pop";
		this.maxCount = b(f.maxCount) ? f.maxCount : 3;
		this.expire = f.expire;
		this.afterFetch = b(f.afterFetch) ? f.afterFetch : 0;
		this.closeCallback = f.closeCallback;
		this.assiveBottom = b(f.assivePosition) ? f.assiveBottom : 180;
		this.assiveRight = b(f.assivePosition) ? f.assiveBottom : -30;
		this.init()
	}
	e.prototype = {
		init: function() {
			this.localMaxCount = +getcookie("couponpop_maxCount_" + this.pos) || 0;
			this.localExpire = +getcookie("couponpop_expire_" + this.pos) || 0;
			this.localFetch = +getcookie("couponpop_fetch_" + this.pos) || 0;
			if (this.afterFetch && this.localFetch + this.afterFetch * 3600000 > Date.now()) {
				return
			}
			this.getData()
		},
		getData: function() {
			var f = this;
			$.ajax({
				type: "post",
				url: "/assets/ext?method=mainprofile",
				data: {
					platform: "www",
					pos: this.pos,
					token: getcookie("TOKEN") || ""
				},
				success: function(g) {
					if (g.status == 200 && g.adslist.length > 0) {
						f.showCoupon(g.adslist[0])
					}
				}
			})
		},
		showCoupon: function(g) {
			var h = null;
			var f = this.maxCount && this.localMaxCount >= this.maxCount;
			var i = (this.expire || !b(this.expire)) && this.localExpire > Date.now();
			if (!g.shrinkimage && (f || i)) {
				return
			}
			this.data = g;
			this.statistic("show");
			c(
			".coupon-pop-mask{position:fixed;top:0;bottom:0;width:0;height:0;background:url(https://cdn.kuaidi100.com/images/sent/mask.png);overflow:hidden;z-index:99999;text-align:center}.coupon-pop-assive{position:fixed;z-index:99999;cursor:pointer}.coupon-pop{position:relative;display:inline-block;vertical-align:middle;text-align:center}.coupon-pop-mask::after{display:inline-block;width:0;height:100%;vertical-align:middle;content:''}.coupon-pop .coupon-pop-body{display:inline-block;cursor:pointer}.coupon-pop-close{position:absolute;top:-42px;right:0;width:30px;height:30px;background:url(https://cdn.kuaidi100.com/images/sent/ico_dialog_close.png);cursor:pointer}");
			this.target = $('<div class="coupon-pop-mask" id="coupon_pop_' + this.pos + '"></div>');
			h = $('<div class="coupon-pop"><span class="coupon-pop-close"></span><div class="coupon-pop-body"><img src="' +
				g.bgimage + '" /></div><div>');
			$("body").append(this.target.append(h));
			if (g.shrinkimage) {
				this.assive = $('<div class="coupon-pop-assive"><img src="' + g.shrinkimage + '"/></div>')
					.appendTo($("body"));
				this.assive.find("img").on("load", function() {
					this.assiveWidth = this.assive.width();
					this.assive.css({
						bottom: this.assiveBottom,
						right: -this.assiveWidth
					});
					(f || i) && this.showAssive()
				}.bind(this))
			}
			f || i ? this.hide(true) : this.show(true);
			this.bindEvent()
		},
		hide: function(g) {
			var f = this;
			this.shown = false;
			if (!this.data.shrinkimage) {
				return this.target.remove()
			}
			this.target.animate({
				left: "100%",
				top: f.assive.offset().top,
				width: 0,
				height: 0
			}, function() {
				if (!g) {
					f.showAssive()
				}
			})
		},
		show: function(f) {
			this.shown = true;
			if (f) {
				this.maxCount && setcookie("couponpop_maxCount_" + this.pos, ++this.localMaxCount);
				this.target.css({
					left: "50%",
					top: "50%"
				})
			} else {
				this.assive && this.assive.stop().css("visibility", "hidden");
				setTimeout(function() {
					this.assive.stop().animate({
						right: -this.assiveWidth,
					})
				}.bind(this), 0)
			}
			this.target.animate({
				left: 0,
				top: 0,
				width: "100%",
				height: "100%"
			})
		},
		showAssive: function() {
			this.assive && this.assive.stop().css("visibility", "visible").animate({
				right: this.assiveRight
			})
		},
		close: function() {
			var f = b(this.expire) ? this.expire * 3600000 : a();
			(this.expire || !b(this.expire)) && setcookie("couponpop_expire_" + this.pos, f + Date.now());
			this.afterFetch && setcookie("couponpop_fetch_" + this.pos, Date.now());
			this.hide();
			if (d(this.closeCallback)) {
				this.closeCallback()
			}
		},
		statistic: function(f) {
			$.post("/mainapi.do?method=vieweventads", {
				source: "www",
				adlocation: this.pos,
				adurl: encodeURIComponent(this.data.url) || "UNKNOWN",
				showorlink: f,
				_id: this.data._id
			})
		},
		bindEvent: function() {
			var f = this;
			this.target.on("click", ".coupon-pop-close", function() {
				f.close()
			}).on("click", ".coupon-pop-body", function() {
				f.statistic("click");
				if (f.data.url) {
					location.href = f.data.url
				}
			});
			this.assive && this.assive.click(function() {
				f.show()
			}).mouseover(function() {
				$(this).stop().animate({
					right: 0
				})
			}).mouseout(function() {
				!f.shown && $(this).stop().animate({
					right: f.assiveRight
				})
			})
		}
	};
	e.prototype.construtor = e;
	if (!$('script[src$="js/share/couponPop.js"]').attr("autoload") !== "no") {
		new e()
	}
})();
