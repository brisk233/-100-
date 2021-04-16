/*选择城市*/
function countyinit(id, inputId, callback, isCity) {
  var html = "", $html;
  var box =  $("#" + id);
  var callbackTemp = callback;
  html += "<div class=\"city-wrap\"><ul class=\"tab-list\">";
  html += "<li class=\"select tab\" id=\"common\" index=\"0\"><a>常用</a></li>";
  html += "<li class=\"tab\" role=\"province\" index=\"1\"><a>省份</a></li>";
  html += "<li class=\"tab\" role=\"city\" index=\"2\"><a>城市</a></li>";
  !isCity && (html += " <li class=\"tab\" role=\"county\" index=\"3\"><a>县区</a></li>");
  html += "</ul>";
  html += "<div class=\"tab-box\"><a class=\"place common\" code=\"310000000000\">上海市</a><a class=\"place common\" code=\"440300000000\">深圳市</a><a class=\"place common\" code=\"110000000000\">北京市</a><a class=\"place common\" code=\"440100000000\">广州市</a><a class=\"place common\" code=\"320500000000\">苏州市</a><a class=\"place common\" code=\"510100000000\">成都市</a><a class=\"place common\" code=\"441900000000\">东莞市</a><a class=\"place common\" code=\"330200000000\">宁波市</a><a class=\"place common\" code=\"120000000000\">天津市</a><a class=\"place common\" code=\"330100000000\">杭州市</a><a class=\"place common\" code=\"370200000000\">青岛市</a><a class=\"place common\" code=\"500000000000\">重庆市</a><a class=\"place common\" code=\"420100000000\">武汉市</a><a class=\"place common\" code=\"410100000000\">郑州市</a><a class=\"place a-moreplace\">更多&gt;</a></div>";
  html += "<div class=\"hidden tab-box province-box\">";
  html += "<dl>";
  html += "<dt>A-G</dt>";
  html += "<dd><a class=\"place province\" code=\"34\">安徽</a><a class=\"place province\" code=\"82\">澳门</a><a class=\"place province\" code=\"11\">北京</a><a class=\"place province\" code=\"50\">重庆</a><a class=\"place province\" code=\"35\">福建</a><a class=\"place province\" code=\"62\">甘肃</a><a class=\"place province\" code=\"44\">广东</a><a class=\"place province\" code=\"45\">广西</a><a class=\"place province\" code=\"52\">贵州</a></dd>";
  html += "<dt>H-K</dt>";
  html += "<dd><a class=\"place province\" code=\"46\">海南</a><a class=\"place province\" code=\"13\">河北</a><a class=\"place province\" code=\"41\">河南</a><a class=\"place province\" code=\"23\">黑龙江</a><a class=\"place province\" code=\"42\">湖北</a><a class=\"place province\" code=\"43\">湖南</a><a class=\"place province\" code=\"22\">吉林</a><a class=\"place province\" code=\"32\">江苏</a><a class=\"place province\" code=\"36\">江西</a></dd>";
  html += "<dt>L-S</dt>";
  html += "<dd><a class=\"place province\" code=\"21\">辽宁</a><a class=\"place province\" code=\"15\">内蒙古</a><a class=\"place province\" code=\"64\">宁夏</a><a class=\"place province\" code=\"63\">青海</a><a class=\"place province\" code=\"37\">山东</a><a class=\"place province\" code=\"14\">山西</a><a class=\"place province\" code=\"61\">陕西</a><a class=\"place province\" code=\"31\">上海</a><a class=\"place province\" code=\"51\">四川</a></dd>";
  html += "<dt>T-Z</dt>";
  html += "<dd><a class=\"place province\" code=\"12\">天津</a><a class=\"place province\" code=\"71\">台湾</a><a class=\"place province\" code=\"54\">西藏</a><a class=\"place province\" code=\"65\">新疆</a><a class=\"place province\" code=\"81\">香港</a><a class=\"place province\" code=\"53\">云南</a><a class=\"place province\" code=\"33\">浙江</a></dd>";
  html += "</dl>";
  html += "</div>";
  html += "<div class=\"hidden tab-box\"></div>";
  !isCity && (html += "<div class=\"hidden tab-box\"></div>");
  html += "</div>"

  $html = $(html)
  box.html($html);
  box.data("values", {code: [], text: []})
  if(+(box.css("width").replace("px", '')) < 280) {
    box.css("width", 280)
  }
  if (inputId == 0) inputId = '';
  else inputId = "_" + inputId;
  callback = function(result) {
    var cityname = $("#cityName_input" + inputId);
    var cityid = $("#cityId_input" + inputId);
    if(cityname.size()) {
      $.inArray(cityname.get(0).tagName, ["INPUT", "TEXEAREA"]) != -1 && cityname.val(result.text.join("-")) || cityname.text(result.text.join("-"))
    }
    if(cityid.size()) {
      $.inArray(cityid.get(0).tagName, ["INPUT", "TEXEAREA"]) != -1 && cityid.val(result.code[result.code.length -1 ]) || cityid.text(result.code[result.code.length -1 ])
    }
    box.data("values", result).hide()
    box.data("domtemp",box.html())
    typeof callbackTemp === 'function' && callbackTemp(result)
  }
  countybind(id, callback, isCity);
}

function countybind(id, callback, isCity) {
  var resultText = [], resultCode = [];
  var box = $("#" + id)
  commonbind(id, resultCode, resultText);

  box.delegate("a.city", "click", function() {
    var code = $(this).attr('code')
    $(this).addClass("select").siblings(".select").removeClass("select");
    if(isCity) {
      resultCode.length = resultText.length = 2
      resultCode[1] = code;
      resultText[1] = $(this).text()
      callback({
        text: resultText.slice(0),
        code: resultCode.slice(0)
      });
    } else {
      if(resultCode[1] !== code) {
      resultCode.length = resultText.length = 2
      resultCode[1] = code;
      resultText[1] = $(this).text()
        
        $.ajax({
          type: "POST",
          contentType: "application/x-www-form-urlencoded;charset=utf-8",
          url: "/network/www/searchapi.do?method=getcounty",
          data: "city=" + $(this).attr("code"),
          dataType: "json",
          success: function(res) {
          box.find(".tab-box:eq(3)").html(''); //先清空县区
            if (res.length > 0) {
              for (var i = 0; i < res.length; i++) {
                box.find(".tab-box:eq(3)").append("<a class='place county' code='" + res[i].number + "'>" + res[i].name + "</a>"); //从后台取得县区的数据，放入div中
              }
              box.find(".tab-box:eq(3)").append("<a class='place county' code=''>暂不选择</a>");
              box.find("[role=county]").click(); //直接到 县区
            } else {
              callback({
                text: resultText.slice(0),
                code: resultCode.slice(0)
              })
            }
          }
        });
      } else {
        if(box.find(".tab-box:eq(3) a").size()) {
          box.find("[role=county]").click(); //直接到 县区
        } else {
          callback({
            text: resultText.slice(0),
            code: resultCode.slice(0)
          });
        }
        
      } 
    }
    return false;
  }).delegate("a.county", "click", function() { //点击县区效果
    var code = $(this).attr("code")
    $(this).addClass("select").siblings(".select").removeClass("select");
    if (!code) {
      resultCode.length = resultText.length = 2
    } else {
      resultText[2] = $(this).text();
      resultCode[2] = code;
    }
    callback({
      text: resultText.slice(0),
      code: resultCode.slice(0)
    });
    return false;
  }).click(function(e) {
    e.stopPropagation();
  });
}

function cityinit(id, inputId, callback) {
  countyinit(id, inputId, callback, true);
}
function commonbind(id, resultCode, resultText) {
  var box = $("#" + id)
  $(document).click(function() {
    var result  = box.data("values");
    if (!box.is(":hidden")) {
      box.hide();
      for(var i = 0; i < result.code.length; i++) {
        resultCode[i] = result.code[i]
      }
      for(var i = 0; i < result.text.length; i++) {
        resultText[i] = result.text[i]
      }
      box.data("domtemp") && box.html(box.data("domtemp"))
    }
  });
  
  $("body").delegate(".selectCity", "click", function(e) {
    e.stopPropagation();
  });

  box.delegate("li.tab", "click", function() {
    var n = $(this).attr("index");
    if(n > 1 && !resultCode[n - 2]) return;//必须选择上一级
    box.find(".tab-box:eq(" + n + ")").show().siblings(".tab-box").hide();
    box.find(".tab:eq(" + n + ")").addClass("select").siblings(".tab").removeClass("select");;
    return false;
  }).delegate("a.province", "click", function() {
    var provinceId = $(this).attr("code");
    var cityJson = area.city;
    $(this).closest('dl').find("a").removeClass("select");
    $(this).addClass("select")
    if(resultCode[0] !== provinceId) {
      box.find(".tab-box:eq(2)").html('');
      for (var i = 0; i < cityJson.length; i++) {
        if (cityJson[i].code.substring(0, 2) == provinceId) {
          box.find(".tab-box:eq(2)").append("<a class='place city' code='" + cityJson[i].code + "'>" + cityJson[i].name + "</a>");
        }
      }
      resultCode.length = resultText.length = 1
    }
    resultCode[0] = provinceId;
    resultText[0] = $(this).text();
    box.find("[role=city]").click();
    return false;
  }).delegate("a.a-moreplace", "click", function() {
    box.find("[role = province]").click();
  }).delegate("a.common","click",function(){
    var code = $(this).attr("code")
    $("a.province[code=" + code.slice(0,2)+ "]").click();
    $("a.city[code=" + code + "]").click()
  });
}
function loadCss() {
  var str = '.city-wrap{line-height: 25px;}.city-wrap .tab-list{position:relative;height:25px;background-color:#3278e6;font-size:0;}.city-wrap .tab{position:static;display:inline-block;width:70px;height:25px;text-align:center;line-height:25px;font-size:16px;}.city-wrap .tab.select{background:#FFF;color:#3278e6;}.city-wrap .tab a{font-size:14px;color:#FFF}.city-wrap .tab a:hover{color:#e6e6e6;}.city-wrap .select a{font-weight:bold;color:#3278e6}.city-wrap .select a:hover{font-weight:bold;color:#78aaf0;}.city-wrap .tab-box{padding:8px 10px;}.city-wrap .place{display:inline-block;min-width: 49px;height:20px;padding:0 3px;margin:2px 3px;text-align:left;line-height:20px;color:#5a5a5a;border:1px solid #FFF}.city-wrap .place:hover{background-color:#d2e6ff;border:1px solid #78aaf0;text-decoration:none}.city-wrap .city,a.county{width:auto}.city-wrap .select{background-color:#3278e6;color:#FFF}.city-wrap .select:hover{background-color:#78aaf0;color:#FFF}.city-wrap .province-box{width:290px;overflow:hidden}.city-wrap .province-box dt,.province-box dd{float:left}.city-wrap .province-box dt{width:35px;padding:3px 0 0 5px;*padding-top:0px;_padding-top:3px;text-align:left;color:#3278e6}.city-wrap .province-box dd{width:250px}.city-wrap .province-box .place{margin:2px 0;width:36px;text-align:center;}'
  var doc=document;
  var style=doc.createElement("style"),cssText = doc.createTextNode(str),heads = doc.getElementsByTagName("head");
  style.setAttribute("type", "text/css");
  style.appendChild(cssText);
  if(heads.length){
    heads[0].appendChild(style);
  } else{
    doc.documentElement.appendChild(style);
  }
}
loadCss();