var loginTimer = null,
	contactPage = null,
	contactType = "",
	vm = null;

function isOldIE() {
	var t = navigator.userAgent.toLocaleLowerCase();
	return (null != t.match(/msie/) || null != t.match(/trident/)) && (null != t.match(/msie ([\d.]+)/) ? t.match(
		/msie ([\d.]+)/)[1] : t.match(/rv:([\d.]+)/)[1]) < 9
}
void 0 === Object.defineProperty || isOldIE() ? $("body").append(
	'<div class="ie-mask"><div class="ie-dialog">您的浏览器版本过低，请使用谷歌、火狐等现代浏览器或使用搜狗、360、QQ等国内浏览器并切换到极速模式打开该页面。</div></div>'
	) : vm = new Vue({
	el: "#main",
	data: {
		fakeList: ["kuaidi100", "debangwuliu", "jd", "shunfeng", "yuantong", "zhongtong", "shentong", "yunda",
			"youshuwuliu", "youzhengguonei", "huitongkuaidi", "jtexpress"
		],
		cargoInput: null,
		isShowInit: !0,
		istoday: "今天",
		showTips: !1,
		isStick: !1,
		isStickRec: !1,
		chooseIndex: null,
		tabList: ["寄快递", "同城急送", "寄大件20kg+", "国际件", "商家寄件"],
		lnglat: {
			lng: "",
			lat: ""
		},
		map: null,
		geolocation: null,
		geocoder: null,
		infoWindow: null,
		placesearch: null,
		startCity: null,
		endCity: null,
		startXzq: null,
		endXzq: null,
		startXzqArr: [],
		endXzqArr: [],
		startAddr: [],
		endAddr: [],
		isShowStart: !1,
		autocomplete: null,
		autocompleteEnd: null,
		move: null,
		isLeft: !1,
		fixedBar: !1,
		subData: {
			platform: "WWW",
			formid: "",
			orderSource: "WWW_DISPATCH",
			saddrid: "",
			sendName: "",
			sendMobile: "",
			sendxzq: "请选择省市区",
			sendAddr: "",
			raddrid: "",
			recName: "",
			recMobile: "",
			recTel: "",
			recAddr: "",
			recxzq: "请选择省市区",
			cargo: "",
			cargodesc: [],
			couponid: "",
			comment: "",
			weight: 1,
			gotaddr: "",
			valinspay: "",
			doortime: "请选择上门时间"
		},
		sendContent: null,
		recContent: null,
		goods: null,
		showOther: !1,
		goodsData: [],
		showCoupon: !1,
		showContactIndex: null,
		recph: "请输入手机号码",
		recbtn: "切换座机",
		showBanned: !1,
		kdName: "指定快递品牌 >",
		expressBrandData: [],
		bestBG: "",
		kdIndex: 0,
		kdItem: {},
		showChooseKd: !0,
		isShowComeKd: !1,
		availableCom4dispatchData: [],
		comable: [],
		couponData: [],
		isShowTime: !1,
		timeData: {},
		day: [],
		dayList: [],
		today: [],
		tomorrow: [],
		aftertomorrow: [],
		timeIndex: 0,
		nowDay: "今天",
		valinsFee: 2,
		valinsrate: 0,
		isShowCoupon: !1,
		couponWord: "暂无可用优惠券",
		recordcw: "",
		couponIndex: null,
		feeData: {},
		valid: {
			sendName: !1,
			sendMobile: !1,
			sendAddr: !1,
			sendxzq: !1,
			recName: !1,
			recMobile: !1,
			recxzq: !1,
			recAddr: !1,
			cargo: !1,
			doortime: !1,
			valinspay: !1,
			cargoInput: !1
		},
		showValid: !1,
		hasQueryMyMkt: 0,
		onlyBest: !1,
		showPrice: !1,
		MsgList: [],
		money: "--",
		showHover: !1,
		showMask: !1,
		timer: null,
		timer1: null,
		iframeTitle: "",
		iframeUrl: "",
		isAgreeValins: !0,
		isAgreeProtocol: !0,
		newMoney: 0,
		timer3: null,
		timer4: null,
		chooseFunIndex: 0,
		tipsContent: "抱歉，您所填写的寄件地址暂未开通寄件服务！您可以拨打快递公司电话或更换寄件地址。",
		recMobileValid: "请填写11位数的手机号码",
		showValin: !1,
		valinWords: "请输入10000元以内的100的整倍数，如800",
		showLoading: !1,
		nowTime: !1,
		savePhone: "",
		saveTel: "",
		showOtherPage: !1,
		isdb: !1,
		otherpage: [{
			title: "同城加急，上快递100",
			url: "https://cdn.kuaidi100.com/images/newc/same",
			desc: ["20分钟上门，平均1小时送达", "专人即取即送", "按距离收费，价格透明"],
			code: "https://cdn.kuaidi100.com/images/newc/same.png"
		}, {
			title: "寄大件，上快递100",
			url: "https://cdn.kuaidi100.com/images/newc/big",
			desc: ["20kg+以上快递用寄大件，省钱又省力", "件数不限，总重不限", "专业物流，包接包送"],
			code: "https://cdn.kuaidi100.com/images/newc/big.jpg"
		}, {
			title: "寄全球，上快递100",
			url: "https://cdn.kuaidi100.com/images/newc/global",
			desc: ["覆盖50+主要国家", "专业顾问，清关高效便捷", "价格优惠，收费透明"],
			code: "https://cdn.kuaidi100.com/images/newc/global.jpg"
		}],
		timeDescr: "",
		tipsBtn: "确定",
		iknow: "我知道了",
		lock: !1,
		position: {},
		showOwn: !1,
		announcement: "",
		announcementOrigin: ""
	},
	computed: {
		cword: function() {
			return "暂无可用优惠券" === this.couponWord
		},
		showSendClear: function() {
			var t = this.subData;
			return t.sendName || t.sendMobile || t.sendxzq && "请选择省市区" != t.sendxzq || t.sendAddr
		},
		showRecClear: function() {
			var t = this.subData;
			return t.recName || t.recMobile || t.recTel || t.recAddr && "请选择省市区" != t.recAddr
		}
	},
	watch: {
		subData: {
			handler: function() {
				this.showValid && (this.validTimer && clearTimeout(this.validTimer), this.validTimer = this
					.checkSubmit())
			},
			deep: !0
		},
		"subData.comment": function(t) {
			vm.subData.comment = t.substring(0, 30)
		},
		"subData.valinspay": function(t) {
			+t % 100 != 0 || 1e4 < +t || +t < 100 && t || isNaN(t) ? (vm.valid.valinspay = !0, vm
				.valinWords = "请输入10000元以内的100的整倍数，如800") : (vm.valinWords = "请输入10000元以内的100的整倍数，如800",
				vm.valid.valinspay = !1, this.valinsFee = Math.max(Math.round((+this.valinsrate ||
					.005) * +t), 2))
		},
		"subData.weight": function(t) {
			+t < 1 || 30 < +t || isNaN(t) || t % 1 != 0 ? vm.valid.weight = !0 : (vm.valid.weight = !1,
				clearTimeout(this.timer3), this.timer3 = setTimeout(function() {
					vm.checkBrand()
				}, 500))
		},
		"subData.sendAddr": function() {
			this.timer && clearTimeout(this.timer), this.timer = setTimeout(function() {
				"请选择省市区" !== vm.subData.sendxzq && vm.searchArea()
			}, 500)
		},
		"subData.recAddr": function() {
			this.timer1 && clearTimeout(this.timer1), this.timer1 = setTimeout(function() {
				vm.checkBrand()
			}, 1500)
		},
		"subData.cargodesc": function(t) {
			0 < t.length && vm.expressBrandData.length ? vm.expressBrandData[0].dispatchid ? vm.chooseKd(vm
				.expressBrandData[0], 0) : vm.kdIndex = null : null === vm.kdIndex && vm.chooseKd(vm
				.expressBrandData[0], 0)
		}
	},
	methods: {
		noticeList: function() {
			var t = {
				data: {
					platform: "WWW",
					position: "BEST_OFFICIAL_ORDER"
				},
				method: "GET",
				handleFail: !1,
				success: function(t) {
					if (t.data.list.length) {
						var e = t.data.list[0].content.replace(/[\r\n]/g, " ");
						256 < e.replace(/[^\u0000-\u00ff]/g, "aa").length && (e = e.substring(0,
								125) + "... >"), vm.announcement = "公告：" + e, vm
							.announcementOrigin = t.data.list[0].content
					} else vm.announcement = ""
				}
			};
			this.request("/advertisement/notice/list", t)
		},
		showNotice: function() {
			this.showMask = !0, this.tipsContent = this.announcementOrigin, this.btnType = "alert"
		},
		cantchoose: function(t) {
			0 == t ? vm.tips("请先填写收寄件地址和物品信息") : 1 == t && "[]" === JSON.stringify(vm.expressBrandData) &&
				vm.tips("请先选择快递公司")
		},
		checkOwn: function() {
			getcookie("TOKEN") && JSON.stringify("{}" !== vm.position) && vm.queryCourier()
		},
		goUrl: function(t) {
			window.open(t)
		},
		queryCourier: function() {
			var t = {
				method: "get",
				data: {
					method: "queryCourier",
					mLatitude: vm.position.lat,
					mLogitude: vm.position.lng
				},
				success: function(t) {
					t.data.haveActPrivate || t.data.haveOfen ? vm.showOwn = !0 : vm.showOwn = !1
				}
			};
			vm.request("https://www.kuaidi100.com/apicenter/kdmkt.do", t)
		},
		addlog: function(t) {
			request("/apicenter/courier.do?method=addlog&logtype=" + t)
		},
		clear: function(t) {
			var e = this.subData;
			this.showValid = !1, "rec" === t ? (e.recAddr = e.recMobile = e.recName = e.raddrid = e.recTel =
				"", e.recxzq = "请选择省市区") : (e.sendName = e.sendMobile = e.sendAddr = e.saddrid = "", e
				.sendxzq = "请选择省市区")
		},
		isShowMask: function(t, e) {
			vm.showMask = !0, vm.tipsContent = t, vm.tipsBtn = e || "确定"
		},
		cancel: function() {
			this.isShowComeKd = !1
		},
		chooseFun: function(t) {
			4 === t ? window.open("https://b.kuaidi100.com/page/optimizationOrder?source=businessMail") :
				3 === t ? location.href = "https://www.kuaidi100.com/courier/global.jsp" : (this
					.chooseFunIndex = t, this.showOtherPage = 0 !== t)
		},
		agreeProtocol: function() {
			this.isAgreeProtocol = !this.isAgreeProtocol
		},
		checkBrand: function() {
			vm.hasQueryMyMkt && vm.subData.cargo && 3 < vm.subData.sendAddr.length && 3 < vm.subData.recAddr
				.length && "请选择省市区" !== vm.subData.sendxzq && "请选择省市区" !== vm.subData.recxzq && this
				.expressBrand()
		},
		searchArea: function() {
			3 < vm.subData.sendAddr.length && "请选择省市区" !== vm.subData.sendxzq && this.placesearch.search(vm
				.subData.sendxzq + vm.subData.sendAddr,
				function(t, e) {
					"complete" == t && (void 0 !== e.poiList.pois[0].location.lat ? vm.lnglat = e
						.poiList.pois[0].location : vm.lnglat = {
							M: "",
							O: "",
							lat: "",
							lng: ""
						}, vm.expressBrand())
				})
		},
		checkSubmit: function(t) {
			vm.subData.sendName ? vm.valid.sendName = !1 : vm.valid.sendName = !0, /^1[3456789]\d{9}$/.test(
					vm.subData.sendMobile) ? vm.valid.sendMobile = !1 : vm.valid.sendMobile = !0,
				"请选择省市区" === vm.subData.sendxzq ? vm.valid.sendxzq = !0 : vm.valid.sendxzq = !1, vm.subData
				.sendAddr.length < 4 ? vm.valid.sendAddr = !0 : vm.valid.sendAddr = !1, vm.subData.recName ?
				vm.valid.recName = !1 : vm.valid.recName = !0, "切换座机" === vm.recbtn ? /^1[3456789]\d{9}$/
				.test(vm.subData.recMobile) ? vm.valid.recMobile = !1 : vm.valid.recMobile = !0 :
				/^[0-9-\s/+]{4,20}$/.test(vm.subData.recMobile) ? vm.valid.recMobile = !1 : vm.valid
				.recMobile = !0, "请选择省市区" === vm.subData.recxzq ? vm.valid.recxzq = !0 : vm.valid.recxzq = !
				1, vm.subData.recAddr.length < 4 ? vm.valid.recAddr = !0 : vm.valid.recAddr = !1, vm.subData
				.cargo ? vm.valid.cargo = !1 : vm.valid.cargo = !0, "其他" !== vm.subData.cargo || vm
				.cargoInput ? vm.valid.cargoInput = !1 : vm.valid.cargoInput = !0;
			var e = vm.subData.weight;
			if (+e < 1 || 30 < +e || isNaN(e) || e % 1 != 0 ? vm.valid.weight = !0 : vm.valid.weight = !1,
				vm.kdItem.dispatchid) {
				"请选择上门时间" === vm.subData.doortime ? vm.valid.doortime = !0 : vm.valid.doortime = !1;
				var a = vm.subData.valinspay; + a % 100 != 0 || 1e4 < +a || +a < 100 && a || isNaN(a) ? vm
					.valid.valinspay = !0 : vm.subData.valinspay && !vm.isAgreeValins ? (vm.valinWords =
						"请阅读并同意保价协议", vm.valid.valinspay = !0) : vm.valid.valinspay = !1
			}
			var i = null;
			if (t)
				for (var o in vm.valid)
					if (vm.valid[o]) return vm.tips("正确填完所有信息才能下单哦"), (i = $("[validrole=" + o + "]")) &&
						"INPUT" === i.get(0).tagName || "TEXTAREA" === i.get(0).tagName ? i.focus() : $(
							"html,body").animate({
							scrollTop: i.offset().top - 10
						}), !1;
			return !0
		},
		submit: function() {
			if (!vm.showLoading && !vm.lock)
				if (this.showValid = !0, getcookie("TOKEN")) {
					if (vm.checkSubmit(!0))
						if (null !== vm.kdIndex) {
							if (!vm.isAgreeProtocol) return vm.showBannedToggle1(1, "submit"), !1;
							var t = JSON.parse(JSON.stringify(this.subData));
							if (t.method = "submitOrder", t.sendxzq = t.sendxzq.replace(/-/g, ""), t
								.recxzq = t.recxzq.replace(/-/g, ""), vm.kdItem.dispatchInfo) {
								for (var e = "", a = 0; a < vm.comable.length; a++) e += vm.comable[a]
									.kuaidicom + ",";
								t.comable = e, t.cargodesc = t.cargodesc.join(","), t.mktids = vm.kdItem
									.dispatchInfo.mktids
							} else t.sign = vm.kdItem.sign, t.doortime = "", t.couponid = "", t.valinspay =
								"";
							if (t.dispatchid = vm.kdItem.dispatchid, "切换手机" === vm.recbtn && (t.recTel = t
									.recMobile, t.recMobile = ""), "其他" === t.cargo && (t.cargo = vm
									.cargoInput), !(0 < t.cargodesc.length) || t.dispatchid) {
								var i = {
									method: "post",
									data: t,
									success: function(t) {
										var e = vm.subData;
										vm.newMoney ? money1 = vm.newMoney : money1 = vm.subData
											.valinspay ? vm.valinsFee + Number(vm.money) : vm.money,
											6 != t.data.orderType ? result = t.data[0] : result = t
											.data, e.saddrid && vm.rememberSendAddr(), vm
											.saveContact("rec"), vm.saveContact("send", null,
												function(t) {
													e.saddrid || (e.saddrid = t.id, vm
														.rememberSendAddr())
												}), location.href = "/courier/pay.jsp?dispatchid=" +
											vm.kdItem.dispatchid + "&expid=" + result.expId +
											"&price=" + result.pprice
									},
									complete: function() {
										vm.lock = !1
									},
									error: function() {
										vm.lock = !1
									}
								};
								vm.lock = !0, vm.request("https://www.kuaidi100.com/apicenter/order.do", i)
							}
						} else vm.isShowMask("请选择快递公司", "我知道了")
				} else vm.goLogin()
		},
		rememberSendAddr: function() {
			var t = this.subData;
			try {
				setcookie("lastSendAddr", JSON.stringify({
					saddrid: t.saddrid,
					sendName: t.sendName,
					sendMobile: t.sendMobile,
					sendxzq: t.sendxzq,
					sendAddr: t.sendAddr
				}))
			} catch (t) {}
		},
		addMsg: function(t) {
			this.subData.comment += t.lable + " "
		},
		courierLeaMsgList: function() {
			var t = {
				method: "get",
				data: {
					method: "courierLeaMsgList"
				},
				success: function(t) {
					vm.MsgList = t.data
				}
			};
			vm.request("https://www.kuaidi100.com/mobclient/apigateway.do", t)
		},
		checkedOne: function(t) {
			var e = vm.subData.cargodesc.indexOf(t); - 1 < e ? vm.subData.cargodesc.splice(e, 1) : vm
				.subData.cargodesc.push(t)
		},
		pfprice: function() {
			var t = {
				method: "get",
				data: {
					method: "pfprice",
					recxzq: this.subData.recxzq.replace(/-/g, "") + this.subData.recAddr,
					sentxzq: this.subData.sendxzq.replace(/-/g, "") + this.subData.sendAddr,
					dispatchid: this.kdItem.dispatchid || "",
					cargo: this.subData.cargo,
					weight: this.subData.weight,
					doortime: "请选择上门时间" === this.subData.doortime ? "" : this.subData.doortime,
					sign: this.kdItem.sign
				},
				success: function(t) {
					if (vm.feeData = t.data, vm.money = Number(t.data.costTotalPrice), vm
						.showPrice = !0, vm.couponData) {
						for (var e = 0; e < vm.couponData.length; e++)
							if (vm.couponData[e].id == vm.feeData.couponId) return void(null === vm
								.couponIndex ? vm.chooseCoupon(vm.couponData[e], e) : vm
								.couponData[e].id != vm.subData.couponid && vm.chooseCoupon(
									vm.couponData[e], e));
						null !== vm.couponIndex && vm.chooseCoupon(vm.couponData[vm.couponIndex], vm
							.couponIndex)
					}
				}
			};
			vm.request("https://www.kuaidi100.com/apicenter/order.do", t)
		},
		chooseCoupon: function(t, e) {
			this.couponIndex === e ? (this.couponIndex = null, this.couponWord = "有" + vm.couponData
					.length + "张可用的优惠券", this.subData.couponid = "", this.money = this.feeData.totalprice) :
				(this.money = Number(this.feeData.totalprice) - Number(t.sub_title), this.couponIndex = e,
					this.couponWord = t.sub_title + "元 " + t.title, this.subData.couponid = t.id, this
					.feeData.couponPrice = t.sub_title), setTimeout(function() {
					vm.isShowCoupon = !1
				}, 200)
		},
		kdbestcoupon: function() {
			var t = {
				method: "get",
				data: {
					method: "kdbestcoupon",
					recxzq: $("#endCity").text().replace(/-/g, ""),
					sendxzq: $("#startCity").text().replace(/-/g, ""),
					dispatchid: this.kdItem.dispatchid
				},
				success: function(t) {
					vm.couponData = t.data, t.data || (vm.couponWord = "暂无可用优惠券"), vm.pfprice()
				}
			};
			vm.request("https://www.kuaidi100.com/apicenter/card.do", t)
		},
		queryKdbestinfo: function() {
			var t = {
				method: "get",
				data: {
					method: "queryKdbestinfo",
					dispatchid: this.kdItem.dispatchid,
					latitude: this.lnglat.lat,
					longitude: this.lnglat.lng
				},
				success: function(t) {
					vm.valinsrate = t.data.valinsrate
				}
			};
			vm.request("https://www.kuaidi100.com/apicenter/kdmkt.do", t)
		},
		chooseTime: function(t, e) {
			"约满" !== t.descr && (t.descr ? this.showTips = !0 : this.showTips = !1, this.timeIndex = e, this
				.isShowTime = !1, this.subData.doortime = this.nowDay + " " + t.itemValue, this
				.timeDescr = t.descr, vm.pfprice())
		},
		changeDay: function(t) {
			switch (this.nowDay = t, this.timeIndex = 0, t) {
				case "今天":
					this.dayList = JSON.parse(JSON.stringify(this.today));
					break;
				case "明天":
					this.dayList = JSON.parse(JSON.stringify(this.tomorrow));
					break;
				case "后天":
					this.dayList = JSON.parse(JSON.stringify(this.aftertomorrow))
			}
		},
		queryDoorTimeList: function() {
			var t = {
				method: "get",
				data: {
					method: "queryDoorTimeList",
					dispatchid: vm.kdItem.dispatchid,
					mktids: vm.kdItem.mktids
				},
				success: function(t) {
					vm.timeData = t.data, vm.day = "[]" === JSON.stringify(t.data.today) ? ["明天",
							"后天"
						] : ["今天", "明天", "后天"], vm.nowDay = vm.day[0], vm.today = t.data.today, vm
						.tomorrow = t.data.tomorrow, vm.aftertomorrow = t.data.aftertomorrow, vm
						.dayList = "[]" === JSON.stringify(t.data.today) ? t.data.tomorrow : t.data
						.today
				}
			};
			vm.request("https://www.kuaidi100.com/apicenter/kdmkt.do", t)
		},
		timeToggle: function() {
			this.isShowTime = !this.isShowTime, this.isShowComeKd = !1
		},
		delcom: function(t) {
			for (var e = 0; e < this.comable.length; e++) this.comable[e].name === t.name && this.comable
				.splice(e, 1)
		},
		calc: function(t) {
			for (var e = 0; e < this.comable.length; e++) {
				if (t.kuaidicom === this.comable[e].kuaidicom) return !0;
				if (e === this.comable.length - 1) return !1
			}
		},
		chooseCom: function(t) {
			if ("Y" === t.useable)
				if (0 === this.comable.length) this.comable.push({
					name: t.name,
					kuaidicom: t.kuaidicom
				});
				else {
					for (var e = 0; e < this.comable.length; e++)
						if (this.comable[e].kuaidicom === t.kuaidicom) return void this.comable.splice(e,
						1);
					vm.comable.push({
						name: t.name,
						kuaidicom: t.kuaidicom
					})
				}
		},
		chooseComeKd: function() {
			this.isShowComeKd = !this.isShowComeKd, this.isShowTime = !1, this.availableCom4dispatch()
		},
		availableCom4dispatch: function() {
			var t = {
				method: "get",
				data: {
					method: "availableCom4dispatch",
					dispatchid: this.kdItem.dispatchid,
					recxzq: this.subData.recxzq.replace(/-/g, ""),
					recAddr: this.subData.recAddr,
					weight: this.subData.weight,
					cargo: this.subData.cargo,
					sendxzq: this.subData.sendxzq.replace(/-/g, ""),
					sendAddr: this.subData.sendAddr,
					mktids: this.kdItem.dispatchInfo.mktids,
					cargodesc: this.subData.cargodesc.join(",")
				},
				success: function(t) {
					vm.availableCom4dispatchData = t.data;
					for (var e = 0; e < vm.availableCom4dispatchData.length; e++)
						if ("Y" !== vm.availableCom4dispatchData[e].useable)
							for (var a = 0; a < vm.comable.length; a++) vm.comable[a].kuaidicom ===
								vm.availableCom4dispatchData[e].kuaidicom && vm.delcom(vm.comable[
									a], a)
				}
			};
			this.request("https://www.kuaidi100.com/apicenter/order.do", t)
		},
		chooseKd: function(t, e) {
			this.isShowCoupon = !1, "kuaidi100" !== t.com && 0 < vm.subData.cargodesc.length || (this
				.kdIndex = e, this.kdItem = t, this.showChooseKd = 0 < t.dispatchid, "kuaidi100" === t
				.com || "debangkuaidi" === t.com ? this.newMoney = "" : this.newMoney = t.price, this
				.queryDoorTimeList(), this.checkTime(), setTimeout(function() {
					"debangkuaidi" !== vm.kdItem.com && "kuaidi100" !== vm.kdItem.com || (vm
						.pfprice(), vm.isdb = "debangkuaidi" === vm.kdItem.com)
				}, 50))
		},
		showBannedToggle1: function(t, e) {
			switch (t) {
				case 0:
					vm.iframeTitle = "什么不能寄", vm.iframeUrl =
						"https://m.kuaidi100.com/include/contraband.jsp", vm.iknow = "我知道了";
					break;
				case 1:
					vm.iframeTitle = "快递100寄件服务协议", vm.iframeUrl =
						"https://m.kuaidi100.com/app/frame/protocol.jsp", vm.iknow = "同意";
					break;
				case 2:
					vm.iframeTitle = "快递100平台保价增值服务协议", vm.iframeUrl =
						"https://m.kuaidi100.com/app/frame/valinsProtocol.jsp", vm.iknow = "我知道了"
			}
			"submit" === e && (vm.iknow = "同意并下单"), this.showBanned = !this.showBanned
		},
		showBannedToggle: function() {
			"同意" === vm.iknow ? vm.isAgreeProtocol = !0 : "同意并下单" === vm.iknow && (vm.isAgreeProtocol = !0,
				vm.submit()), this.showBanned = !this.showBanned
		},
		changeRecph: function() {
			"请输入手机号码" === this.recph ? (this.savePhone = this.subData.recMobile, this.subData.recMobile =
				"", this.saveTel && (this.subData.recMobile = this.saveTel), this.recph = "请输入座机号码",
				this.recbtn = "切换手机", this.recMobileValid = "请输入正确的座机号码") : (this.saveTel = this.subData
				.recMobile, this.subData.recMobile = "", this.savePhone && (this.subData.recMobile =
					this.savePhone), this.recph = "请输入手机号码", this.recbtn = "切换座机", this.recMobileValid =
				"请输入11位数的手机号码"), vm.valid.recMobile = !1, vm.$nextTick(function() {
				$("[validrole=recMobile]").focus()
			})
		},
		couponToggle: function() {
			this.isShowCoupon = !this.isShowCoupon
		},
		expressBrand: function() {
			vm.subData.cargo && 3 < vm.subData.sendAddr.length && 3 < vm.subData.recAddr.length &&
				"请选择省市区" !== vm.subData.sendxzq && "请选择省市区" !== vm.subData.recxzq && (vm.showLoading = !0);
			var t = {
				method: "get",
				data: {
					sentxzq: vm.subData.sendxzq.replace(/-/g, ""),
					sentAddr: vm.subData.sendAddr,
					recxzq: "请选择省市区" === vm.subData.recxzq ? "" : vm.subData.recxzq.replace(/-/g, ""),
					recAddr: vm.subData.recAddr,
					weight: +this.subData.weight,
					apiversion: "14",
					latitude: this.lnglat.lat,
					longitude: this.lnglat.lng
				},
				success: function(t) {
					var e = JSON.parse(JSON.stringify(vm.kdItem));
					if (vm.showLoading = !1, 0 < t.data.length) {
						if (vm.hasQueryMyMkt = "1", vm.subData.cargo && 3 < vm.subData.sendAddr
							.length && 3 < vm.subData.recAddr.length && "请选择省市区" !== vm.subData
							.sendxzq && "请选择省市区" !== vm.subData.recxzq) {
							if (!getcookie("TOKEN")) return void vm.goLogin(function() {
								vm.expressBrand()
							});
							if (vm.expressBrandData = t.data, vm.kdItem = t.data[0], vm.kdItem
								.dispatchid ? (vm.queryKdbestinfo(), vm.queryDoorTimeList(), vm
									.kdbestcoupon(), vm.newMoney = "") : vm.showChooseKd = !1, vm
								.courierLeaMsgList(), 0 < vm.subData.cargodesc.length) vm
								.expressBrandData[0].dispatchid ? vm.chooseKd(vm.expressBrandData[
									0], 0) : vm.kdIndex = null;
							else if (null === vm.kdIndex) vm.chooseKd(vm.expressBrandData[0], 0);
							else if (null !== vm.kdIndex) {
								for (var a = 0; a < vm.expressBrandData.length - 1; a++)
									if (vm.expressBrandData[a].com === e.com) return void vm
										.chooseKd(vm.expressBrandData[a], a);
								vm.chooseKd(vm.expressBrandData[0], 0)
							}
						}
					} else vm.hasQueryMyMkt = 0, vm.isShowMask(
						'抱歉，您所填写的寄件地址暂未开通寄件服务!<br> 您可以拨打<a href="https://www.kuaidi100.com/network/plist.shtml">快递公司电话</a>或更换寄件地址。'
						)
				}
			};
			vm.request("https://www.kuaidi100.com/apicenter/kdmkt.do?method=expressBrand", t)
		},
		checkTime: function() {
			var t = (new Date).getTime(),
				e = new Date,
				a = e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate() + " " + vm.kdItem
				.serviceTime.split("-")[0],
				i = e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate() + " " + vm.kdItem
				.serviceTime.split("-")[1];
			t < new Date(a).getTime() ? (vm.istoday = "今天", setTimeout(function() {
				vm.nowTime = !0
			}, 2e3)) : t > new Date(i).getTime() && (this.istoday = "明天", setTimeout(function() {
				vm.nowTime = !0
			}, 2e3))
		},
		chooseTab: function(t, e) {
			this.chooseIndex !== e && (this.goodsData = []), setTimeout(function() {
				vm.subData.cargodesc = [], vm.goodsData = t.data, vm.chooseIndex = e, vm.showOther =
					"其他" === t.name, vm.subData.cargo = t.name, vm.checkBrand()
			}, 0)
		},
		goodsList: function() {
			var t = {
				method: "get",
				data: {
					method: "goodsList"
				},
				success: function(t) {
					vm.goods = t.data && t.data.length ? t.data : [{
						name: "文件"
					}, {
						name: "日用品"
					}, {
						name: "其他"
					}]
				}
			};
			this.request("https://www.kuaidi100.com/mobclient/apigateway.do", t)
		},
		goLogin: function(e) {
			$("#loginFrame").attr("src", "https://sso.kuaidi100.com/sso/sentlogin.jsp"), $("#loginWrap")
				.show();
			var a = getcookie("TOKEN");
			loginTimer && clearInterval(loginTimer), loginTimer = setInterval(function() {
				var t = getcookie("TOKEN");
				t && t != a && ($("#loginCloseBtn").click(), vm.checkOwn(), loginTOKEN = t, login(),
					clearInterval(loginTimer), e && e())
			}, 500)
		},
		timeer: function() {
			var t;
			this.count = $("#move").scrollLeft(), t = this.isLeft ? this.count - 2 : this.count + 2, $(
				"#move").scrollLeft(t), this.count = t
		},
		startMove: function() {
			this.isLeft = !0, this.move = setInterval(this.timeer, 2)
		},
		startMoveRev: function() {
			this.isLeft = !1, this.move = setInterval(this.timeer, 2)
		},
		endMove: function() {
			clearInterval(this.move)
		},
		infosplit: function(a, t) {
			var e = t || (0 === a ? this.sendContent : this.recContent),
				i = void 0 !== t,
				o = {
					data: {
						method: "infosplit",
						content: e
					},
					success: function(t) {
						var e = t.data[0];
						0 === a ? (i || (vm.subData.sendName = e.name), e.mobile && (vm.subData
								.sendMobile = e.mobile[0]), e.xzq && (vm.subData.sendAddr = e.xzq
								.subarea, vm.subData.sendxzq = e.xzq.fullName.split(",").join("-")),
							i || (vm.isStick = !vm.isStick)) : (vm.subData.recName = e.name, e
							.mobile && (vm.subData.recMobile = e.mobile[0]), e.xzq && (vm.subData
								.recAddr = e.xzq.subarea, vm.subData.recxzq = e.xzq.fullName.split(
									",").join("-")), vm.isStickRec = !vm.isStickRec)
					}
				};
			this.request("/market/open/sent.do", o)
		},
		smartStick: function(t) {
			0 === t ? this.isStick = !this.isStick : this.isStickRec = !this.isStickRec
		},
		focStartAddr: function() {
			if ("请选择省市区" !== $("#startCity").text()) {
				var t = $("#startCity").text();
				t = 2 === t.split("-").length ? t.split("-")[0] : t.split("-")[1], this.autocomplete
					.setCity(t)
			}
		},
		focEndAddr: function() {
			if ("请选择省市区" !== $("#endCity").text()) {
				var t = $("#endCity").text();
				t = 2 === t.split("-").length ? t.split("-")[0] : t.split("-")[1], this.autocompleteEnd
					.setCity(t)
			}
		},
		showStart: function(t) {
			t.stopPropagation(), $("#sendXzq").show(), $("#recXzq").hide()
		},
		showEnd: function(t) {
			t.stopPropagation(), $("#recXzq").show(), $("#sendXzq").hide()
		},
		onComplete: function(t) {
			var e, a = vm.subData;
			try {
				e = JSON.parse(getcookie("lastSendAddr"))
			} catch (t) {
				e = null
			}
			"complete" === t.type && (vm.position = t.position, vm.checkOwn(), e ? (a.saddrid = e.saddrid ||
				"", a.sendName = e.sendName || "", a.sendMobile = e.sendMobile || "", a.sendxzq = e
				.sendxzq || "", a.sendAddr = e.sendAddr || "") : vm.infosplit(0, t
				.formattedAddress || ""))
		},
		isFunc: function(t) {
			return "function" == typeof t
		},
		tips: function(t, e) {
			if (t) {
				var a = $(
					'<div style="position:fixed;width:100%;top:0;bottom:0;text-align:center;z-index:99999;transition:all .3s;padding:0 3.625rem;box-sizing:border-box;"><div style="display:inline-block;vertical-align:middle;background: rgba(0,0,0,.8);color:#FFF;border-radius: 4px;font-size: .875rem;padding: .5rem 1rem;line-height: 1.5em;box-sizing:border-box;">' +
					t +
					'</div><span style="display:inline-block;height: 100%;vertical-align:middle;"></span></div>'
					);
				$("body").append(a);

				function i() {
					a.css("opacity", 0), setTimeout(function() {
						a.remove()
					}, 500)
				}
				a.click(function() {
					i()
				}), setTimeout(function() {
					i()
				}, e || 1e3 + (t.length - 10) / 10 * 1e3)
			}
		},
		request: function(t, e) {
			var a = this,
				i = e || {},
				o = i.data || {},
				s = {
					url: t,
					type: i.method || "POST",
					dataType: "json",
					timeout: i.timeout || 1e4,
					success: function(t) {
						200 == t.status ? a.isFunc(i.success) && i.success(t) : 403 == t.status ? vm
							.goLogin() : !1 !== i.handleFail && (a.isFunc(i.fail) ? i.fail(t) : vm.tips(
								t.message))
					},
					error: function(t, e) {
						!0 !== i.handleError && !a.isFunc(i.error) || (a.isFunc(i.error) ? i.error(t,
							e) : vm.tips("网络错误，请检查您的网络设置"))
					},
					complete: function(t) {
						a.isFunc(i.complete) && i.complete(t)
					}
				};
			if (getcookie("TOKEN") && (o.token = getcookie("TOKEN")), s.data = o, t) return $.ajax(s)
		},
		selectContact: function(t, e) {
			"send" === t ? setTimeout(function() {
				vm.subData.saddrid = e.id || "", vm.subData.sendName = e.name || "", vm.subData
					.sendMobile = e.mobile || "", vm.subData.sendxzq = (e.addrs[0].province || "") +
					"-" + (e.addrs[0].city || "") + "-" + (e.addrs[0].district || ""), vm.subData
					.sendAddr = e.addrs[0].addr || ""
			}, 20) : (vm.subData.raddrid = e.id || "", vm.subData.recName = e.name || "", vm.subData
				.recMobile = e.mobile || "", vm.subData.recxzq = (e.addrs[0].province || "") + "-" + (e
					.addrs[0].city || "") + "-" + (e.addrs[0].district || ""), vm.subData.recAddr = e
				.addrs[0].addr || ""), vm.isStick = !1, vm.isStickRec = !1
		},
		saveContact: function(t, e) {
			var a = this.subData,
				i = [];
			e || ("rec" === t ? (i = a.recxzq.split("-"), e = {
				name: a.recName,
				mobile: a.recMobile || a.recTel,
				province: i[0],
				city: i[1] || "",
				district: i[2] || "",
				addr: a.recAddr
			}, a.raddrid && (e.id = a.raddrid)) : (i = a.sendxzq.split("-"), e = {
				name: a.sendName,
				mobile: a.sendMobile,
				province: i[0],
				city: i[1] || "",
				district: i[2] || "",
				addr: a.sendAddr
			}, a.saddrid && (e.id = a.saddrid)));
			var o = e.saddrid || e.raddrid ? "/apicenter/kdmkt.do?method=exclusiveVisit&act=addnew" :
				"/apicenter/kdmkt.do?method=exclusiveVisit&act=save";
			e.type = "MKTSENTCONTACT", vm.request(o, {
				data: e,
				handleFail: !1
			})
		}
	},
	mounted: function() {
		this.noticeList();
		var t = GetQueryString("tabIndex");
		t && this.chooseFun(Number(t)), this.isShowInit = !1, getcookie("TOKEN") || this.goLogin(), $(
			"#showContact,#showContact2").click(function() {
			e(0, 5), contactType = $(this).attr("handle")
		}), $("#searchContactBtn").click(function() {
			e(0, 5)
		}), $(".a-close").click(function() {
			$(this).closest(".float-body").find("input").val(""), $("#float").hide()
		}), $("#contactBox").delegate(".a-pre", "click", function() {
			0 < contactPage && e(--contactPage, 5)
		}).delegate(".a-next", "click", function() {
			contactPage < Math.ceil(parseInt($("#contactTotal").text()) / 5) - 1 && e(++contactPage,
				5)
		}), $("#contactTable").delegate(".a-choose", "click", function() {
			var t = $(this).closest("tr").index();
			vm.selectContact(contactType, contactBook[t]), $("#float").hide(), $("#contactKeyword")
				.val("")
		}), $("#getRecContactClearBtn").click(function() {
			$("#contactKeyword").val("").focus()
		}), $("#goAddress").click(function() {
			$("#float").hide()
		}), $("#loginCloseBtn").click(function() {
			$("#loginWrap").hide()
		}), $("body").on("click", "#auth .a-close", function(t) {
			t.preventDefault(), $("#auth").hide(), authTimer && clearInterval(authTimer)
		}).on("click", "#auth .auth-btn", function(t) {
			t.preventDefault(), unauth = !0, $("#auth").hide()
		});
		var e = function(o, s) {
				var t = $("#contactKeyword").val();
				"" == t ? ($("#getRecContactClearBtn").hide(), $("#getRecContactBtn").show()) : ($(
					"#getRecContactBtn").hide(), $("#getRecContactClearBtn").show()), a("ADDRESSEE", t,
					(contactPage = o) * s, s,
					function(t) {
						contactBook = t.data;
						var e = $("#contactTable");
						if (e.empty(), $("#float").show(), $("#contactBox").show(), 0 < t.count) {
							for (var a in t.data) {
								var i = "";
								i += '<tr><td class="col1"><span>' + t.data[a].name +
									'</span><span class="font-gray">' + (t.data[a].mobile || t.data[a]
										.tel) + "</span></td>", i += '<td class="col2"><span>' + (t
										.data[a].company ? t.data[a].company : "") + "</span>", 0 < t
									.data[a].addrs.length ? t.data[a].addrs[0].country && "CHINA" != t
									.data[a].addrs[0].country ? i += '<span class="font-gray">' + (t
										.data[a].addrs[0].province ? t.data[a].addrs[0].province : "") +
									(t.data[a].addrs[0].city ? t.data[a].addrs[0].city : "") + (t.data[
										a].addrs[0].district ? t.data[a].addrs[0].district : "") + (t
										.data[a].addrs[0].addr ? t.data[a].addrs[0].addr : "") +
									"</span></td>" : t.data[a].printaddr ? i +=
									'<span class="font-gray">' + t.data[a].printaddr + "</span></td>" :
									i += '<span class="font-gray">' + (t.data[a].addrs[0].province ? t
										.data[a].addrs[0].province : "") + (t.data[a].addrs[0].city ? t
										.data[a].addrs[0].city : "") + (t.data[a].addrs[0].district ? t
										.data[a].addrs[0].district : "") + (t.data[a].addrs[0].addr ? t
										.data[a].addrs[0].addr : "") + "</span></td>" : i += "</td>",
									i += '<td><a class="a-choose">选择</a></td></tr>', e.append(i)
							}
							$("#contactStart").text(o * s + 1), $("#contactEnd").text(o * s + t.count),
								$("#contactTotal").text(t.total)
						} else $("#contactStart").text(0), $("#contactEnd").text(0), $("#contactTotal")
							.text(0);
						$("#getRecContactClearBtn").hide(), $("#getRecContactBtn").show()
					})
			},
			a = function(t, e, a, i, o) {
				getcookie("TOKEN") ? $.ajax({
					type: "get",
					url: "https://www.kuaidi100.com/apicenter/xcx.do?method=getSentContact&tag=3",
					data: "token=" + getcookie("TOKEN") + "&platform=WWW&searchText=" +
						encodeURIComponent(e || ""),
					dataType: "json",
					success: function(t) {
						200 == t.status && (o ? o(t) : 401 == t.status && vm.goLogin())
					}
				}) : vm.goLogin()
			};
		this.goodsList(), this.map = new AMap.Map("send-map", {
			resizeEnable: !0
		});
		var i = this;
		this.map.plugin("AMap.Geolocation", function() {
			i.geolocation = new AMap.Geolocation({
				enableHighAccuracy: !0,
				timeout: 1e4,
				buttonOffset: new AMap.Pixel(-20, -60),
				zoomToAccuracy: !0,
				showButton: !1,
				showMarker: !1
			}), i.map.addControl(i.geolocation), AMap.event.addListener(i.geolocation,
				"complete", i.onComplete), i.geolocation.getCurrentPosition(function() {})
		}), this.map.plugin("AMap.Geocoder", function() {
			i.geocoder = new AMap.Geocoder
		}), this.map.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], function() {
			i.autocomplete = new AMap.Autocomplete({
				city: "全国",
				input: "startAddr"
			}), i.autocompleteEnd = new AMap.Autocomplete({
				city: "全国",
				input: "endAddr"
			}), i.placesearch = new AMap.PlaceSearch({
				city: "全国",
				map: i.map,
				pageSize: 1,
				pageIndex: 1,
				autoFitView: !1
			}), AMap.event.addListener(i.autocomplete, "select", function(t) {
				vm.subData.sendAddr = t.poi.name, t.poi.location && t.poi.location.lat ? (i
					.lnglat = t.poi.location, i.startAddr = t.poi.name, i.startXzq = t
					.poi.district, i.startXzqArr = [t.poi.district], i.placesearch
					.search(i.startXzq + i.startAddr, function(t, e) {
						if ("complete" == t)
							if (void 0 !== e.poiList.pois[0].location.lat) {
								var a = e.poiList.pois[0];
								i.startXzqArr = [a.pname, a.cityname, a.adname], vm
									.subData.sendxzq = i.startXzqArr.join("-")
							} else i.lnglat = {
								M: "",
								O: "",
								lat: "",
								lng: ""
							}
					})) : placesearch.search(t.poi.district + t.poi.name, function(t,
				e) {
					if ("complete" == t)
						if (void 0 !== e.poiList.pois[0].location.lat) {
							var a = e.poiList.pois[0];
							i.lnglat = a.location, i.startAddr = a.name, i
								.startXzq = a.pname + a.cityname + a.adname, i
								.startXzqArr = [a.pname, a.cityname, a.adname], vm
								.subData.sendxzq = i.startXzqArr.join("-")
						} else i.lnglat = {
							M: "",
							O: "",
							lat: "",
							lng: ""
						}
				})
			}), AMap.event.addListener(i.autocompleteEnd, "select", function(t) {
				i.endAddr = t.poi.name, i.endXzq = t.poi.district, i.endXzqArr = [t.poi
					.district
				], vm.subData.recAddr = t.poi.name, i.placesearch.search(i.endXzq + i
					.endAddr,
					function(t, e) {
						if ("complete" == t && void 0 !== e.poiList.pois[0]) {
							var a = e.poiList.pois[0];
							i.endXzqArr = [a.pname, a.cityname, a.adname], vm.subData
								.recxzq = i.endXzqArr.join("-")
						}
					})
			})
		}), $("#cityName_input").change(function() {
			setTimeout(function() {
				$("#sendXzq").is(":visible") || ($("#startCity").attr("title", $(
					"#cityName_input").val()), vm.subData.sendxzq = $(
					"#cityName_input").val())
			}, 10)
		}), $("#cityName_input_1").change(function() {
			setTimeout(function() {
				$("#recXzq").is(":visible") || ($("#endCity").attr("title", $(
					"#cityName_input_1").val()), vm.subData.recxzq = $(
					"#cityName_input_1").val())
			}, 10)
		}), countyinit("sendXzq", "", function() {
			var t = $("#cityName_input").val().split("-");
			vm.startXzqArr = t, vm.startXzq = t.join(""), $("#cityName_input").val(t.join("-"))
				.change()
		}), countyinit("recXzq", 1, function() {
			var t = $("#cityName_input_1").val().split("-");
			vm.endXzqArr = t, vm.endXzq = t.join(""), $("#cityName_input_1").val(t.join("-"))
				.change(), setTimeout(function() {
					vm.checkBrand()
				}, 100)
		});
		var o = null;

		function s() {
			o && clearTimeout(scroll), o = setTimeout(function() {
				var t = $(window).height(),
					e = $("#fixedBar").offset().top - $(window).scrollTop() + 100;
				vm.fixedBar = t < e
			}, 300)
		}
		$(window).load(function() {
			s()
		}).scroll(function() {
			s()
		}).resize(function() {
			s()
		})
	}
});
