function isOldIE() {
	var a = navigator.userAgent.toLocaleLowerCase();
	return null != a.match(/msie/) || null != a.match(/trident/) ? (a = null != a.match(/msie ([\d.]+)/) ? a.match(
		/msie ([\d.]+)/)[1] : a.match(/rv:([\d.]+)/)[1], 9 > a) : !1
}

function isFunc(a) {
	return "function" === typeof a
}

function tips(a, b) {
	if (a) {
		var c = $(
			'<div style="position:fixed;width:100%;top:0;bottom:0;text-align:center;z-index:99999;transition:all .3s;padding:0 3.625rem;box-sizing:border-box;"><div style="display:inline-block;vertical-align:middle;background: rgba(0,0,0,.8);color:#FFF;border-radius: 4px;font-size: .875rem;padding: .5rem 1rem;line-height: 1.5em;box-sizing:border-box;">' +
			a + '</div><span style="display:inline-block;height: 100%;vertical-align:middle;"></span></div>');
		$("body").append(c);
		var d = function() {
			c.css("opacity",
				0);
			setTimeout(function() {
				c.remove()
			}, 500)
		};
		c.click(function() {
			d()
		});
		setTimeout(function() {
			d()
		}, b || 1200 + (a.length - 10) / 10 * 1E3)
	}
}

function request(a, b) {
	var c = b || {};
	b = c.data || {};
	var d = {
		url: a,
		type: c.method || "POST",
		dataType: "json",
		timeout: c.timeout || 1E4,
		success: function(e) {
			200 == e.status ? isFunc(c.success) && c.success(e) : 403 == e.status ? !1 !== c.handleLogin && (
				location.href = "/user") : !1 !== c.handleFail && (isFunc(c.fail) ? c.fail(e) : tips(e
				.message))
		},
		error: function(e, f) {
			if (!0 === c.handleError || isFunc(c.error)) isFunc(c.error) ? c.error(e, f) : tips(
				"\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u8bbe\u7f6e")
		},
		complete: function(e) {
			isFunc(c.complete) &&
				c.complete(e)
		}
	};
	!b.token && (b.token = token);
	b.platform = platform;
	d.data = b;
	if (a) return $.ajax(d)
}
var token = getcookie("TOKEN"),
	platform = "WWW",
	vm = null;
"undefined" == typeof Object.defineProperty || isOldIE() ? $("body").append(
	'<div class="ie-mask"><div class="ie-dialog">\u60a8\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u4f7f\u7528\u8c37\u6b4c\u3001\u706b\u72d0\u7b49\u73b0\u4ee3\u6d4f\u89c8\u5668\u6216\u4f7f\u7528\u641c\u72d7\u3001360\u3001QQ\u7b49\u56fd\u5185\u6d4f\u89c8\u5668\u5e76\u5207\u6362\u5230\u6781\u901f\u6a21\u5f0f\u6253\u5f00\u8be5\u9875\u9762\u3002</div></div>'
	) : vm = new Vue({
	el: "#orders",
	data: {
		lists: [],
		page: {
			limit: 10,
			current: 1,
			total: 0
		},
		total: 0,
		detailIndex: -1,
		cancel: {
			orderIndex: -1,
			other: "",
			show: !1,
			index: -1,
			reasons: []
		},
		coms: {
			shunfeng: "\u987a\u4e30",
			yuantong: "\u5706\u901a",
			zhongtong: "\u4e2d\u901a",
			shentong: "\u7533\u901a",
			huitongkuaidi: "\u767e\u4e16",
			yunda: "\u97f5\u8fbe",
			ems: "EMS",
			jd: "\u4eac\u4e1c",
			annengwuliu: "\u5b89\u80fd",
			youshuwuliu: "\u4f18\u901f",
			debangwuliu: "\u5fb7\u90a6"
		},
		filter: {
			com: "",
			keyword: "",
			date: [moment().subtract(1, "month").format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")].join("-"),
			dateLabel: "\u6700\u8fd1\u4e00\u4e2a\u6708"
		},
		payways: [{
			type: "QR_WEIXIN",
			ico: "https://cdn.kuaidi100.com/images/sent/weixinzhifu.png",
			codeIco: "https://cdn.kuaidi100.com/images/icons/wechat.png",
			name: "\u5fae\u4fe1\u652f\u4ed8",
			app: "\u5fae\u4fe1"
		}, {
			type: "QR_ZHIFUBAO",
			ico: "https://cdn.kuaidi100.com/images/sent/zhifubao.png",
			codeIco: "https://cdn.kuaidi100.com/images/sent/zhifubao.png",
			name: "\u652f\u4ed8\u5b9d",
			app: "\u652f\u4ed8\u5b9d"
		}],
		loading: !0,
		paywayIndex: 0,
		payCode: "",
		express: [],
		expressChecked: !1,
		priceinfo: {},
		leftPaytime: "",
		payLoading: !1,
		paytype: {
			UNKNOWN: "\u672a\u8bbe\u7f6e",
			CONSIGNEE: "\u5230\u4ed8",
			COMPANYMONTH: "\u516c\u53f8\u6708\u7ed3\u652f\u4ed8",
			WEIXIN: "\u5fae\u4fe1\u516c\u4f17\u53f7\u652f\u4ed8",
			WEIXINAPP: "\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u652f\u4ed8",
			KDWEIXINAPP: "\u5fae\u4fe1APP\u652f\u4ed8",
			KDYWEIXINAPP: "\u5feb\u9012\u5458APP\u5fae\u4fe1\u652f\u4ed8",
			QUICKAPPWEIXIN: "\u5feb\u5e94\u7528APP\u5fae\u4fe1\u652f\u4ed8",
			SENTWEIXINAPP: "\u5bc4\u4ef6\u5c0f\u7a0b\u5e8f\u652f\u4ed8",
			QR_WEIXIN: "\u5fae\u4fe1\u626b\u63cf\u652f\u4ed8",
			QR_ZHIFUBAO: "\u652f\u4ed8\u5b9d\u626b\u7801\u652f\u4ed8",
			ZHIFUBAO: "\u652f\u4ed8\u5b9d\u652f\u4ed8",
			KDAPP_PAYAFTER: "APP\u5fae\u4fe1\u652f\u4ed8\u5206",
			WXAPP_PAYAFTER: "\u5fae\u4fe1\u652f\u4ed8\u5206",
			BANK: "\u94f6\u884c\u8f6c\u8d26",
			CASH: "\u73b0\u91d1\u652f\u4ed8"
		},
		sendmobile: "",
		expid: GetQueryString("expid") || "",
		coupons: [],
		coupon: {},
		showCoupon: !1,
		showDeclare: !1,
		declares: [],
		detailLock: !1
	},
	computed: {
		bussType: function() {
			var a = this.lists[this.cancel.orderIndex] || {};
			if (a.dispatchId) {
				if (0 == a.tabId) return "PREPAY";
				if (1 == a.tabId || 2 == a.tabId) return "NOCOURIER";
				if (3 ==
					a.tabId) return 0 > a.disdoortime ? "COURIER_TIMEOUT" : "RECEIVE_ORDER";
				if (a.istimeout) return "COURIER_TIMEOUT"
			} else return ""
		},
		cancelType: function() {
			switch ((this.lists[this.cancel.orderIndex] || {}).orderType) {
				case 11:
					return "INT_ORDER";
				case 6:
					return "DISPATCH";
				case 2:
				case 3:
				case 7:
				case 12:
				case 13:
				case 17:
				case 19:
					return "OFFICIAL";
				default:
					return "COMMON"
			}
		},
		pageShow: function() {
			for (var a = this.page, b = [a.current], c = a.current, d = a.current; 13 > b.length && b
				.length < a.total;) {
				++d <= a.total && b.push(d);
				if (b.length >= a.total ||
					1 >= c && d >= a.total) break;
				13 > b.length && 1 <= --c && b.unshift(c)
			}
			13 < a.total && (1 < b[0] && (b[0] = 1, b[1] = "..."), b[b.length - 1] < a.total && (b[b
				.length - 1] = a.total, b[b.length - 2] = "..."));
			return b
		},
		detail: function() {
			return this.lists[this.detailIndex] || {}
		},
		showCancelTip: function() {
			var a = this.lists[this.cancel.orderIndex];
			return a && a.dispatchId && 60 > a.disdoortime && 0 < a.disdoortime && a.filldoortime
		},
		couponText: function() {
			var a = this.coupon;
			return a.top_limit === this.maxCoupon ? "\u5df2\u9009\u6700\u5927\u4f18\u60e0-" + a.top_limit +
				"\u5143" : "\u5df2\u4f18\u60e0\u62b5\u6263" + a.top_limit + "\u5143"
		},
		maxCoupon: function() {
			var a = this.coupons,
				b = this.lists[this.detailIndex];
			if (b)
				for (var c = 0; c < a.length; c++)
					if (a[c].least_cost <= 100 * b.price) return a[c].top_limit;
			return 0
		},
		declareSum: function() {
			for (var a = 0, b = this.declares, c = 0; c < b.length; c++) a += b[c].count * b[c].price;
			return a
		},
		showExpress: function() {
			var a = this.detail;
			return 11 != a.orderType ? !0 : 8 == a.tabId ? !a.paystatus : 10 == a.tabId ? !!a.kuaidiNum : !0
		},
		showGlobalStatus: function() {
			var a = this.detail;
			return !this.detailLock && 11 == a.orderType && "PAYED" == a.paystatus && !a.kuaidiNum && !a
				.kuaidiNum2
		}
	},
	methods: {
		getHistory: function() {
			var a = this.page;
			this.lists = [];
			this.detailIndex = -1;
			this.loading = !0;
			token || (location.href = "/user");
			request("/apicenter/order.do?method=getOrderList", {
				data: {
					kuaidicom: this.filter.com,
					recInfo: this.filter.keyword,
					senttime: this.filter.date,
					offset: (a.current - 1) * a.limit,
					limit: a.limit,
					token: token,
					fromhistory: this.fromhistory
				},
				success: function(b) {
					vm.lists = b.data || [];
					vm.total = b.total;
					vm.page.total =
						Math.ceil(b.total / vm.page.limit);
					vm.$nextTick(function() {
						vm.autoExpand()
					})
				},
				fail: function(b) {
					tips(b.message)
				},
				error: function() {
					tips("\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
					vm.loading = !1
				},
				complete: function() {
					vm.loading = !1
				}
			})
		},
		search: function() {
			this.page.current = 1;
			this.getHistory()
		},
		autoExpand: function() {
			var a = this.expid,
				b = this.lists,
				c = null;
			if (a)
				for (var d = 0; d < b.length; d++)
					if (b[d].expid == a) {
						c = $("#listBody tr").eq(2 * d);
						$("html").animate({
							scrollTop: c.offset().top - 10
						}, function() {
							c.find(".txt-status").click()
						});
						break
					} this.expid = ""
		},
		refresh: function(a) {
			this.getDetail(a, function() {
				tips("\u72b6\u6001\u5df2\u5237\u65b0", 1E3); - 1 != vm.detailIndex && vm
					.getOtherInfo()
			})
		},
		getDetail: function(a, b) {
			var c = this.lists[a]; - 1 != a && (this.detailLock = !0, request(
				"/apicenter/order.do?method=getOrderInfo", {
					data: {
						expid: c.expid,
						sign: c.sign || "",
						dispatchid: c.dispatchId || ""
					},
					success: function(d) {
						vm.fillDetail(a, d);
						vm.generateTimer(a);
						vm.sendmobile = d.detail.sendmobile;
						isFunc(b) && b(d.detail)
					},
					complete: function() {
						vm.detailLock = !1
					},
					error: function() {
						tips("\u7f51\u7edc\u7e41\u5fd9,\u8bf7\u7a0d\u540e\u518d\u8bd5")
					}
				}))
		},
		priceDetail: function() {
			var a = this.detail,
				b = 11 == a.orderType ? "/apicenter/xcx.do?method=getPrice" :
				"/apicenter/order.do?method=querypriceinfo",
				c = {
					expid: a.expid
				};
			11 == a.orderType && (c.sign = a.sign, "WAITPAY" == a.paystatus && this.getCoupons());
			request(b, {
				data: c,
				handleFail: !1,
				success: function(d) {
					vm.priceinfo = $.isArray(d.data) ? d.data[0] : d.data
				}
			})
		},
		fillDetail: function(a, b) {
			a = this.lists[a];
			for (var c in b.detail) "undefined" === typeof a[c] ? this.$set(a, c, b.detail[c]) :
				"tabIdName" != c && (a[c] = b.detail[c]);
			if (6 == a.orderType) this.$set(a,
				"comphone", "400-000-0387");
			else
				for (var d in jsoncom.company)
					if ((a.kuaidiCom2 || a.kuaidiCom) == jsoncom.company[d].code) {
						this.$set(a, "comphone", jsoncom.company[d].tel);
						break
					}
		},
		getDeclare: function() {
			this.declares = [];
			request("/apicenter/order.do?method=getDeclareInfo", {
				data: {
					expid: this.detail.expid
				},
				handleFail: !1,
				success: function(a) {
					vm.declares = a.data
				}
			})
		},
		getExpress: function() {
			var a = this.detail;
			if (a.kuaidiNum2) {
				var b = a.kuaidiCom2;
				var c = a.kuaidiNum2
			} else b = a.kuaidiCom, c = a.kuaidiNum;
			this.express = [];
			b && c &&
				0 != c.indexOf("UNKNOWN") && 4 != a.tabId && 7 != a.tabId && "CANCEL" != a.tabId && request(
					"/query", {
						type: "post",
						data: {
							type: b,
							postid: c,
							id: 1,
							temp: Math.random(),
							phone: vm.sendmobile
						},
						success: function(d) {
							vm.expressChecked = 1 == d.ischeck;
							vm.express = d.data || [{
								context: "\u67e5\u65e0\u7ed3\u679c"
							}]
						},
						fail: function() {
							vm.express = [{
								context: "\u67e5\u65e0\u7ed3\u679c"
							}]
						}
					})
		},
		getShortLink: function(a) {
			var b = this.lists[a] || {}; - 1 == a || b.shortLink || b.kuaidiNum && 0 == b.kuaidiNum.indexOf(
				"UNKONWN") || $.ajax({
				type: "post",
				url: "/buildshortlink",
				data: {
					m: "build",
					url: "https://www.kuaidi100.com/chaxun?from=&com=" + b.kuaidiCom + "&nu=" + b
						.kuaidiNum
				},
				success: function(c) {
					vm.$set(b, "shortLink", c)
				}
			})
		},
		getCoupons: function() {
			this.coupons = [];
			this.coupon = {};
			request("/apicenter/card.do?method=intCoupon", {
				data: {
					sign: "intSentMarket"
				},
				handleFail: !1,
				success: function(a) {
					vm.coupons = a.data || []
				}
			})
		},
		selectCoupon: function(a) {
			a = this.coupons[a];
			if (a.id == this.coupon.id) this.coupon = {};
			else {
				if (a.least_cost > 100 * this.detail.price) return tips(
					"\u60a8\u7684\u8ba2\u5355\u91d1\u989d\u4e0d\u7b26\u5408\u4f7f\u7528\u6761\u4ef6"
					);
				this.coupon = a;
				this.showCoupon = !1
			}
			this.globalPay()
		},
		generateTimer: function(a) {
			var b = this.lists[a];
			this.timer && clearInterval(this.timer);
			6 == b.orderType && 0 === b.tabId && 0 < +b.premanenttime ? this.timer = setInterval(
			function() {
					b.premanenttime = +b.premanenttime - 1;
					this.leftPaytime = ("0" + ~~(b.premanenttime / 60)).slice(-2) + "\u5206" + ("0" + ~~
						b.premanenttime % 60).slice(-2) + "\u79d2";
					0 >= b.premanenttime && (this.leftPaytime = "0\u52060\u79d2", clearInterval(this
						.timer), this.getDetail(a))
				}.bind(this), 1E3) : 1 == b.tabId || 2 == b.tabId ?
				this.timer = setInterval(function() {
					b.waittime = +b.waittime + 1
				}.bind(this), 1E3) : 3 === b.tabId && (this.timer = setInterval(function() {
					b.disdoortime = +b.disdoortime - 1;
					0 > b.disdoortime && clearInterval(this.timer)
				}.bind(this), 6E4))
		},
		getCancelReason: function() {
			var a = this,
				b = [this.bussType, this.orderType].join("_");
			this.reasons || (this.reasons = {});
			if (this.reasons[b]) return this.sortReason(this.reasons[b]);
			request("/mobclient/apigateway.do?method=cancelOrderReasonList", {
				data: {
					bussType: this.bussType,
					orderType: this.cancelType
				},
				success: function(c) {
					a.reasons[b] = c.data;
					a.sortReason(c.data)
				},
				fail: function() {
					tips("\u53d6\u6d88\u539f\u56e0\u83b7\u53d6\u5931\u8d25")
				}
			})
		},
		sortReason: function(a) {
			var b = a.pop();
			this.cancel.reasons = a.sort(function() {
				return Math.random() - .5
			});
			this.cancel.reasons.push(b)
		},
		handleCancel: function() {
			if (-1 >= this.cancel.index) return tips("\u8bf7\u9009\u62e9\u53d6\u6d88\u539f\u56e0");
			if ("1" == this.cancel.reasons[this.cancel.index].other) {
				if (!this.cancel.other) return tips("\u8bf7\u8f93\u5165\u53d6\u6d88\u539f\u56e0");
				if (30 < this.cancel.other.length) return tips(
					"\u53d6\u6d88\u539f\u56e0\u6700\u591a\u4e3a30\u4e2a\u5b57\u7b26")
			}
			this.doCancel()
		},
		doCancel: function() {
			var a = this,
				b = this.lists[this.cancel.orderIndex],
				c = this.cancel.reasons[this.cancel.index];
			request("/apicenter/order.do?method=cancelOrder", {
				data: {
					dispatchid: b.dispatchId || "",
					expid: b.expid,
					sign: b.sign || "",
					cancelmsg: "1" == c.other ? this.cancel.other : c.text,
					belongto: c.type
				},
				success: function() {
					tips("\u8ba2\u5355\u5df2\u53d6\u6d88");
					a.cancel.orderIndex = -1;
					a.cancel.index = -1;
					a.cancel.other = "";
					a.getHistory();
					vm.hideCancel()
				},
				error: function() {
					tips(
						"\u8ba2\u5355\u53d6\u6d88\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
				}
			})
		},
		showCancel: function(a) {
			if (-1 != [5, 12].indexOf(this.lists[a].orderType)) return tips(
				"\u540c\u57ce\u6025\u9001\u7684\u8ba2\u5355\u8bf7\u6253\u5f00\u5feb\u9012100\u5c0f\u7a0b\u5e8f\u6216APP\u67e5\u8be2"
				);
			this.cancel.orderIndex = a;
			this.cancel.show = !0;
			this.getCancelReason()
		},
		hideCancel: function() {
			this.cancel.orderIndex = -1;
			this.cancel.index = -1;
			this.cancel.show = !1
		},
		prePage: function() {
			1 >= this.page.current || (this.page.current--, this.getHistory())
		},
		nextPage: function() {
			this.page.current >= this.page.total || (this.page.current++, this.getHistory())
		},
		changePage: function(a) {
			+a && (this.page.current = +a, this.getHistory())
		},
		expand: function(a, b) {
			var c = this.detailIndex == a ? -1 : a;
			if (-1 != [5, 12].indexOf(this.lists[a].orderType)) return tips(
				"\u540c\u57ce\u6025\u9001\u7684\u8ba2\u5355\u8bf7\u6253\u5f00\u5feb\u9012100\u5c0f\u7a0b\u5e8f\u6216APP\u67e5\u8be2"
				);
			this.timer && clearInterval(this.timer);
			this.payTimer && clearInterval(this.payTimer); - 1 != c && (this.detailIndex = c, vm.getDetail(
				a,
				function() {
					vm.getOtherInfo()
				}));
			this.$nextTick(function() {
				var d = $(b.target).closest("tr").next().find(".slide-wrap"); - 1 == c ? d.slideUp(
						400,
						function() {
							vm.detailIndex = c
						}) : d.slideDown(400).closest("tbody").siblings().find(".slide-wrap")
					.slideUp()
			}.bind(this))
		},
		getOtherInfo: function(a) {
			var b = this.detailIndex,
				c = this.lists[b];
			vm.getExpress();
			this.getShortLink(b);
			4 != c.tabId && 7 != c.tabId && (c.paystatus && this.priceDetail(), !a &&
				this.pay());
			11 == c.orderType && "\u6587\u4ef6" != c.cargo && this.getDeclare()
		},
		changePayway: function(a) {
			this.paywayIndex = a;
			this.pay()
		},
		refreshCode: function() {
			this.pay()
		},
		pay: function() {
			var a = this.detail,
				b = 6 == a.orderType ? 0 == a.tabId ? "prePay" : "disparityPay" : "payinfo";
			if (11 == a.orderType && "WAITPAY" == a.paystatus) return this.globalPay();
			if (0 == a.tabId && 6 == a.orderType || a.price && "WAITPAY" == a.paystatus) {
				var c = this.payways[this.paywayIndex].type;
				this.payLoading = !0;
				this.payCode = "";
				request("/apicenter/order.do?method=" +
					b, {
						data: {
							expid: a.expid,
							tradetype: "MWEB",
							payway: c,
							sign: a.sign || "",
							type: 6 == a.orderType ? "" : "MKTSENTPAY",
							price: 6 == a.orderType ? "" : a.price
						},
						success: function(d) {
							var e = "//www.kuaidi100.com/twoCode.do?h=300&w=300&code=";
							"QR_WEIXIN" == c ? e = 6 == a.orderType ? vm.payCode = e + JSON.parse(d
									.weixinpayReqStr).codeUrl : vm.payCode = e + d.weixinpayReqStr :
								"QR_ZHIFUBAO" == c && (e = vm.payCode = e + d.alipayReqStr);
							$.get(e, function() {
								vm.payLoading = !1;
								vm.checkPay()
							})
						}
					})
			}
		},
		globalPay: function(a) {
			a = this.lists[this.detailIndex];
			if (!a.expid) return "";
			request("/apicenter/kdquerytools.do?method=buildShortlink4Pay", {
				data: {
					expid: a.expid,
					couponid: this.coupon.id || ""
				},
				success: function(b) {
					vm.payCode = "https://www.kuaidi100.com/twoCode.do?h=300&w=300&code=" +
						encodeURIComponent(b.data);
					vm.checkPay()
				}
			})
		},
		checkPay: function() {
			var a = this.detail.tabId,
				b = 0;
			this.payTimer && clearInterval(this.payTimer);
			this.payTimer = setInterval(function() {
					b++;
					vm.getDetail(vm.detailIndex, function(c) {
						if (c.tabId != a || 30 < b || "PAYED" == c.paystatus) clearInterval(vm
							.payTimer), vm.getOtherInfo(!0)
					})
				},
				5E3)
		}
	},
	filters: {
		calctime: function(a) {
			if (!a) return "";
			a = a.replace(/-/g, "/");
			var b = new Date(a),
				c = new Date;
			a = b.getFullYear();
			var d = b.getMonth() + 1,
				e = b.getDate(),
				f = ("0" + b.getHours()).slice(-2),
				h = ("0" + b.getMinutes()).slice(-2),
				g = c.getFullYear(),
				k = c.getMonth() + 1,
				l = c.getDate();
			b = Math.floor((c.getTime() - b.getTime()) / 1E3);
			return 60 > b ? "\u521a\u521a" : 3600 > b ? ~~(b / 60) + "\u5206\u949f\u524d" : g == a && k ==
				d && 0 == l - e ? "\u4eca\u5929" + f + ":" + h : g == a && k == d && 1 == l - e ?
				"\u6628\u5929" + f + ":" + h : g == a && k == d && 2 == l - e ? "\u524d\u5929" + f + ":" +
				h : g == a ? d + "\u6708" + e + "\u65e5" : a + "\u5e74" + d + "\u6708" + e + "\u65e5"
		},
		com: function(a) {
			for (var b in jsoncom.company)
				if (a == jsoncom.company[b].code) return jsoncom.company[b].shortname;
			return "-"
		},
		orderType: function(a) {
			switch (+a.orderType) {
				case 6:
					return "\u5168\u56fd\u4f18\u9009";
				case 11:
					return "\u56fd\u9645\u4ef6";
				case 5:
				case 12:
					return "\u540c\u57ce\u5bc4\u4ef6";
				case 0:
					return "COMPANY" == a.sentunit ? "\u516c\u53f8\u4ef6" : "\u4e2a\u4eba\u4ef6";
				default:
					return "\u5b98\u65b9\u5bc4\u4ef6"
			}
		}
	},
	directives: {
		focus: {
			update: function(a) {
				a.focus()
			}
		}
	},
	watch: {
		"filter.com": function() {
			this.page.current = 1;
			this.getHistory()
		},
		"cancel.other": function(a) {
			30 < a.length && tips("\u53d6\u6d88\u539f\u56e0\u4e0d\u80fd\u8d85\u8fc730\u4e2a\u5b57\u7b26");
			this.cancel.other = a.slice(0, 30)
		}
	},
	created: function() {
		this.getHistory()
	},
	mounted: function() {
		var a = this;
		$("#daterange").daterangepicker({
			ranges: {
				"\u4eca\u5929": [moment(), moment()],
				"\u6628\u5929": [moment().subtract(1, "days"), moment().subtract(1, "days")],
				"\u8fd17\u5929": [moment().subtract(6, "days"), moment()],
				"\u6700\u8fd1\u4e00\u4e2a\u6708": [moment().subtract(1,
					"month"), moment()],
				"\u6700\u8fd1\u4e09\u4e2a\u6708": [moment().subtract(3, "month"), moment()]
			},
			maxSpan: {
				months: 1
			},
			minDate: moment().subtract(3, "month"),
			maxDate: moment(),
			autoApply: !0,
			locale: {
				format: "YYYY/MM/DD",
				separator: " - ",
				customRangeLabel: "\u6307\u5b9a\u65e5\u671f\uff08\u4e00\u4e2a\u6708\u5185\uff09",
				monthNames: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708"
					.split(" "),
				daysOfWeek: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split("")
			},
			linkedCalendars: !0,
			alwaysShowCalendars: !0,
			startDate: moment().subtract(1, "month"),
			endDate: moment(),
			opens: "left"
		}, function(b, c, d) {
			b = b.format("YYYY/MM/DD");
			c = c.format("YYYY/MM/DD");
			a.filter.dateLabel = "\u6307\u5b9a\u65e5\u671f\uff08\u4e00\u4e2a\u6708\u5185\uff09" ==
				d ? "" : d;
			a.filter.date = b == c ? b : [b, c].join("-");
			a.page.current = 1;
			a.fromhistory = "\u6700\u8fd1\u4e09\u4e2a\u6708" == d ? 1 : 0;
			a.getHistory()
		});
		$(".daterangepicker").on("click", "td.off", function() {
			tips("\u53ea\u80fd\u9009\u53d6\u4e00\u4e2a\u6708\u5185\u7684\u65f6\u95f4\u6bb5")
		});
		$(document).click(function() {
			a.showCoupon = !1;
			a.showDeclare = !1
		});
		(new ClipboardJS(".copy")).on("success", function() {
			tips("\u590d\u5236\u6210\u529f")
		}).on("error", function() {
			tips("\u590d\u5236\u5931\u8d25")
		})
	}
});
