//var allpos = ['m_expressAll_banner','m_integral_banner'];//广告类型，需要在页面注入
/** global allpos */
var platform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'm' : 'www'
var from = GetQueryString("from") || GetQueryString("coname")
var adArr = [], sets = [];

$(function () {
  var refuseDate = JSON.parse(localStorage.getItem("adRefuseDate")) || {};
  var expire = Date.now() - 24 * 60 * 60 * 1000;
  //新增了全局压屏广告，为不影响原有的广告，使用合并的方式处理
  if (location.host == "sso.kuaidi100.com") {
    $("[role-slot]").remove()
    return
  }
  if (typeof allpos === 'undefined') {
    window.allpos = []
  }
  allpos.push("m_index_important")
  $("[role-slot]").each(function (index, el) {
    $(el).attr("id", $(el).attr("role-slot")); //用于处理百度广告位注入的兼容
  });
  for (var key in refuseDate) { //移除关闭的广告位
    +refuseDate[key] > expire && $("[role-slot=" + key + "]").remove()
  }
  if (!allpos.length || !$("[role-slot]").size()) {
    $("[role-slot]").remove();
    return false;
  } else {
    loadAds(allpos.join(","));
  }
})

function removeAd(key) { //移除广告位
  if (key) {
    $("[role-slot=" + key + "]").remove()
  } else {
    $("[role-slot]").remove()
  }
}

function sortAds() {
  var data = {}
  for (var i = 0, l = adArr.length; i < l; i++) {
    (data[adArr[i].pos] || (data[adArr[i].pos] = [])).push(adArr[i])
  }
  return data
}

function loadAds(pos) {
  var params = {
    platform: platform,
    pos: pos,
    coname: from || ""
  }
  if (getcookie('TOKEN') || sessionStorage.getItem("TOKEN")) {
    params.token = getcookie('TOKEN')
  }
  function doCallback(res) {
    typeof window.showAdCallback === 'function' && setTimeout(function(){
      window.showAdCallback(res)
    }, 0)
  }
  $.ajax({
    type: 'get',
    url: '/doughnut/multi/terminal', //旧接口 `/assets/ext?method=mainprofile`   post
    data: params,
    success: function (res) {
      if (+res.status === 200 && res.data.list.length > 0) {
        for (var i = 0; i < res.data.list.length; i++) {
          sets.push(res.data.list[i].pos)
          adArr.push(res.data.list[i])
        }
        showAds(sortAds())  
      } else {
        removeAd()
      }
      doCallback(res)
    },
    error: function () {
      doCallback()
      removeAd()
    },
    fail: function() {
      doCallback()
    }
  })
}
/*global allpos */
function showAds(data) { //显示广告
  if (!data) {
    removeAd()
    return
  }
  for (var k = 0; k < allpos.length; k++) {
    if ($.inArray(allpos[k], sets) == -1) {
      removeAd(allpos[k])
    }
  }
  for (var i = 0, len = allpos.length; i < len; i++) { //类型
    var type = allpos[i], count = data[type] ? data[type].length : 0
    var dom = $("[role-slot=" + type + "]");
    if (!dom.size()) continue //说明该广告位被移除了
    //随机产生一条广告
    count && pushAd(dom.eq(0), data[type][Math.floor(Math.random() * count)])
  }
}

function pushAd(dom, data) {
  var str = ''
  var notShow = data.showType == '活动' && (isWechat || isBaiduApp)
  if (!data || notShow) {
    return dom.remove()
  }
  if (data.type == "img") {
    dom.data({
      aid: data._id,
      url: data.url,
      pos: data.pos,
      preDisplay: dom.css("display") //图片类型先隐藏，防止弹窗类型影响页面交互
    }).hide();
    //ios下body代理事件无效，需要指定cursor属性
    str = '<a target="_blank" href="' + data.url + '" style="cursor:pointer"><img src="' + data.bgimage + '"></a>'
    str += data.pos == 'm_result_redpacket' || data.showType == '活动' || data.pos == 'm_third_result_redpacket' ? '' : '<div class="close" style="cursor:pointer">广告</div>'
  } else if (data.type == 'imgJavascript') {
    dom.data({
      aid: data._id,
      url: data.url,
      pos: data.pos,
      preDisplay: dom.css("display")//图片类型先隐藏，防止弹窗类型影响页面交互
    }).hide();
    str = '<img src="' + data.bgimage + '">' + data.content.replace("${id}", data.pos)
  } else {
    //广电通广告针对没有指定container_id的广告代码，将会获取script标签的id
    //而jq动态运行jq时其实是没有将script插入文档的，会造成脚本报错，广告无法正常加载
    //因此发布广点通广告时必须指定container_id,值与广告位的值一致
    str = data.content
  }
  var tempImage = null
  dom.css("opacity", 1).empty().html(str)
  if (data.type == "img" || data.type == "imgJavascript") {//图片类型加载后恢复到原有的展示水平
    tempImage = new Image()
    tempImage.addEventListener("load", function () {
      dom.css("display", dom.data("preDisplay"))
      tempImage = null;
    });
    tempImage.addEventListener("error", function () {
      dom.remove();
      tempImage = null;
    })
    tempImage.src = data.bgimage;
  }

  //统计show
  $.post('/mainapi.do?method=vieweventads', {
    source: platform,
    adlocation: data.pos,
    adurl: encodeURIComponent(data.url) || 'UNKNOWN',
    showorlink: 'show',
    _id: data._id
  })
}
$(function () {
  $("body").on('click', '[role-slot] a', function () {
    var parent = $(this).closest('[role-slot]')
    var url = parent.data("url"), pos = parent.data("pos"), urlId = parent.data("aid")
    $.post('/mainapi.do?method=vieweventads', {
      source: platform,
      adlocation: pos,
      adurl: encodeURIComponent(url),
      showorlink: 'click',
      _id: urlId
    })
  }).on('click', '[role-slot] .close', function (event) {
    event.preventDefault()
    event.stopPropagation()
    var parent = $(this).closest('[role-slot]')
    var refuseDate = JSON.parse(localStorage.getItem("adRefuseDate")) || {}
    refuseDate[parent.attr('role-slot')] = Date.now()
    localStorage.setItem('adRefuseDate', JSON.stringify(refuseDate))
    parent.remove()
    $.post('/mainapi.do?method=vieweventads', {
      source: platform,
      adlocation: parent.data('pos'),
      adurl: encodeURIComponent(parent.data('url')),
      showorlink: 'close',
      _id: parent.data("aid")
    })
  })
})