/* 网点查询js */
var gCurrentPage=1;// 当前页
var gPageSize=5;// 每页个数
var gTotalPage=1;// 每页个数
var gNetworkCityQueryTip="请选择城市";
var gQueryTipText="输入街道名、小区名或大厦名";
var map;// 百度地图
var myDis;// 地图测距离
var viemport;// 地图视图
var gDisplayView="list";// 显示视图（列表list、地图map）
var gNetworkListJson="";// 网点信息json
var gAjaxObject;// 查询ajax请求
var gAjaxTime;
var gLastKeyword = "";
var gSelectKeywordIndex = -1;

	/* 其他页面跳入 */
	/*
	 * var corpId=GetQueryString("corpId"); if(corpId!=null){
	 * selectCompany(corpId, $("#a-"+corpId)); var
	 * keyword=GetQueryString("keyword"); keyword=decodeURIComponent(keyword);
	 * $("#postid").val(keyword); queryClick(); }
	 */

$(function(){	
	$("#corpId").val("");
	
	var cityname = $("#cityName_input");
	cityname.focus(function cityFocus() {
		$("#provinces").show();
	});
	cityname.blur(function cityBlur() {
		var cityname = $("#cityName_input");
		if (cityname.val() == "") {
			cityname.val(gNetworkCityQueryTip);
		}
	}).blur();
	cityname.click(function(){return false});
	
	var postid = $("#postid");

	postid.focus(function() {
		var postid = $("#postid");
		if (postid.val() == gQueryTipText) {
			postid.val("");
		}
		postid.select();
	});
	
	postid.blur(function() {
		var postid = $("#postid");
		if (postid.val() == "") {
			postid.val(gQueryTipText);
		}
	}).blur();	
	
	postid.keyup(function(e) {
		$("#notFindTip").hide();
		var keycode = e.keyCode ? e.keyCode: e.which;
		if(keycode != 13){
			var keyword = $("#postid").val();
			if(keyword != ""){
				if(keyword != gLastKeyword){
					$("#area").val("");
					clearTimeout(gAjaxTime);
					gAjaxTime = setTimeout("getKeyword()",200);
				}
			}else{
				clearTimeout(gAjaxTime);
				$("#input-tips").hide();
				gSelectKeywordIndex = -1;
			}
		}
	}).keydown(function(e){
		var keycode = e.keyCode ? e.keyCode: e.which;
		if(keycode == 13){
			clearTimeout(gAjaxTime);
			if(gSelectKeywordIndex >= 0){
				$("#postid").val($("#input-tips li:eq(" + gSelectKeywordIndex + ")").attr("text"));
				$("#area").val($("#input-tips li:eq(" + gSelectKeywordIndex + ")").attr("fullname"));
				gSelectKeywordIndex = -1;
				queryClick2();
			}else{
				queryClick2();
			}
		}else if(keycode == 40){
			if($("#input-tips").is(":hidden")){
				$("#input-tips").show();
			}else{
				if(gSelectKeywordIndex == -1){
					gSelectKeywordIndex = 0;
				}else if(gSelectKeywordIndex == $("#input-tips li:last").attr("index")){
					gSelectKeywordIndex = 0;
				}else{
					gSelectKeywordIndex ++;
				}
				$("#input-tips li").removeClass("hover");
				$("#input-tips li:eq(" + gSelectKeywordIndex + ")").addClass("hover");
			}
		}else if(keycode == 38){
			if($("#input-tips").is(":hidden")){
				$("#input-tips").show();
			}else{
				if(gSelectKeywordIndex == ""){
					gSelectKeywordIndex = $("#input-tips li:last").attr("index");
				}else if(gSelectKeywordIndex == 0){
					gSelectKeywordIndex = $("#input-tips li:last").attr("index");
				}else {
					gSelectKeywordIndex --;
				}
				$("#input-tips li").removeClass("hover");
				$("#input-tips li:eq(" + gSelectKeywordIndex + ")").addClass("hover");
			}
		}
	});
	
	$("#input-tips").delegate("li","mouseenter",function(){
		$("#input-tips li").removeClass("hover");
		$(this).addClass("hover");
		gSelectKeywordIndex = $(this).attr("index");
	}).delegate("li","click",function(){
		$("#postid").val($(this).attr("text"));
		$("#area").val($(this).attr("fullname"));
		gSelectKeywordIndex = -1;
		queryClick();
	});
	
	$("#provinceSelect").click(function(){
		$("#provinces").toggle();
	});
	countyinit("provinces", 0);   //页面载入即执行
	/*
	var areaCode = GetQueryString("areaCode");
	var areaName = GetQueryString("areaName");
	var searchText = GetQueryString("searchText");
	if(areaName != null&&areaName != ""){
		areaName = decode(areaName);
		$("#cityName_input").val(areaName);
	}
	if(areaCode != null&&areaCode != ""){
		$("#cityId_input").val(areaCode);
	}
	if(searchText != null&&searchText != ""){
		searchText = decode(searchText);
		$("#postid").val(searchText);
	}
	if((areaCode != null && areaCode != "") || (searchText != null&&searchText != "")){
		queryClick();
	}*/
});

function getKeyword(){
	var keyword = $("#postid").val();
	gLastKeyword = keyword;
	$("#input-tips").html("");
	if(gAjaxObject){
		gAjaxObject.abort();
	}
	gAjaxObject = $.ajax({
		type:"post",
		url:"/network/www/searchapi.do",
		data:"method=hintlist&text=" + encodeURIComponent(keyword) + "&area=" + $("#cityId_input").val(),
		dataType:"json",
		success:function(result) {
			if (result.status == 200) {
				if(result.total > 0){
					gSelectKeywordIndex = -1;
					for(var i in result.keywordList){
						var fullName = result.keywordList[i].fullName;
						var text = result.keywordList[i].text;
						$("#input-tips").append("<li index=\"" + i + "\" fullname=\"" + fullName + "\" text=\"" + text + "\"><strong>" + text + "</strong>" + fullName + "</li>");
					}
					$("#input-tips").show();
				}else{
					$("#input-tips").hide();
					gSelectKeywordIndex = -1;
				}
			}
		}
	});
}

/* 选择快递公司事件 */
function selectCompany(companyCode, selectElement) {
	selectCompanyHide();// 隐藏信息
	$("#exampleContext").show();
	$("#companyList a.select-cp").each(function() {// 清除上次选择公司样式
		$(this).removeClass("select-cp");
	});
	$("#corpId").val(companyCode);
	$("#subCorpId").val("");
	$(selectElement).addClass("select-cp");// 选中公司样式
	if ($("html").scrollTop() > $("#topShow").offset().top) {
		$("html").animate({
			scrollTop : $("#topShow").offset().top
		}, "normal");
	}
	$("#postid").focus();
}

/* 例如事件 */
function exampleClick(){
	$("#postid").focus();
	$('#cityId_input').val('440300');
	$('#cityName_input').val('广东省-深圳市');
	$('#postid').val('赛格');
	$("#postid").blur();
}
/* 隐藏信息 */
function hideAndClean(){
	$("#exampleContext").hide();
	$("#adDiv").hide();
	// $("#leftad").hide();
	$("#countContext").hide();
	$("#queryContext").hide();
	$("#notFindTip").hide();
	$("#queryWait").hide();
	$("#queryResult").html("");
	if (gAjaxObject) {
		gAjaxObject.abort();
	}
}

function selectCompanyHide(){
	$("#exampleContext").hide();
	$("#leftad").hide();
	$("#adDiv").show();
	$("#countContext").hide();
	$("#queryContext").hide();
	$("#notFindTip").hide();
	$("#queryWait").hide();
	$("#queryResult").html("");
	if (gAjaxObject) {
		gAjaxObject.abort();
	}
}

/* 改变查看视图 */
function changeDisplayView(){
	$("#notFindTip").hide();
	if(gDisplayView=="list"){
		gDisplayView="map";
		$("#queryResult").hide();
		// $("#queryResult").animate({left: '+50px'}, "slow");
		$("#mapResult").show();
		$("#displayView").text("查看列表");
		if(gNetworkListJson!=""){
			networkResultDisplay(gNetworkListJson);
		}else{
			networkListMap(null);
		}
	}else if(gDisplayView=="map"){
		gDisplayView="list";
		$("#mapResult").hide();
		$("#queryResult").show();
		$("#displayView").text("查看地图");
		if(gNetworkListJson!=""){
			networkResultDisplay(gNetworkListJson);
		}
	}
}

/* 查询网点 事件 */
function queryClick(){
	gCurrentPage=1;// 页面回到第一页
	$("#input-tips").hide();
	$("#subCorpId").val("");
	networkQuery();
	return false;
}

function networkQuery(){
	hideAndClean();
	
	var postid = $.trim($("#postid").val());
	if(postid == gQueryTipText){
		$("#postid").val("");
	}
	if(($("#cityName_input").val() == "" || $("#cityName_input").val() == gNetworkCityQueryTip) && (postid == "" || postid == gQueryTipText)){
		$("#notFindErro").text("请选择城市或输入网点信息进行查询");
		$("#notFindS1").text("·您可以选择城市来查询");
		$("#notFindS2").text("·您可以输入的网点地址、名称等关键词来查询");
		// $("#leftad").hide();
		$("#notFindTip").show();
		return;
	}else if($("#cityName_input").val() != "" && $("#cityName_input").val() != gNetworkCityQueryTip && $("#cityId_input").val() == ""){
		$("#notFindErro").text("请选择完整的城市信息");
		$("#notFindS1").text("·您需要选择到城市来查询");
		$("#notFindS2").text("");
		// $("#leftad").hide();
		$("#notFindTip").show();
		return;
	}
	
	$("#queryWait").show();
	
	if($("#postid").val() == ""){
		$("#area").val("");
	}
	var areaName = "";
	if($("#area").val() != ""){
		areaName = $("#area").val();
	}else if($("#cityName_input").val() != "" && $("#cityName_input").val() != gNetworkCityQueryTip){
		areaName = $("#cityName_input").val();
	}
	
	var corpId = "";
	if($("#subCorpId").val() != ""){
		corpId = $("#subCorpId").val();
	}else{
		corpId = $("#corpId").val();
		$("#subCorpId").val(corpId);
	}
	
	$.ajax({
		type : "post",
		url : "/network/www/searchapi.do",
		data : {
			method : "searchnetwork",
			area : areaName,
			company :  corpId,
			keyword : $("#postid").val(),
			offset : (gCurrentPage-1) * gPageSize,
			size : gPageSize
		},
		dataType : "json",
		success : function(result) {
			if (result.status == 200) {
				$("#queryWait").hide();
				$("#queryContext").show();
				gNetworkListJson=result;
				networkResultDisplay(result);
			}
		}
	});
}

/* 显示查询结果 */
function networkResultDisplay(responseObject){
	var netList = responseObject.netList;
	if(netList.length>0){// 查询到网点
		if(gDisplayView=="list"){// 显示列表
			networkListList(responseObject);
		}else{// 显示地图
			//networkListMap(netList);
		}
		countList(responseObject.companyTotal);
		$("#countContext").show();
		$("#leftad").show();
	}else{// 没有查询到网点
		hideAndClean();
		$("#notFindErro").text("抱歉，没有查到网点");
		$("#notFindS1").text("·您可以核对一下网点信息是否正确");
		$("#notFindS2").text("·您可以减少输入的关键词来扩大查询范围");
		// $("#leftad").hide();
		$("#notFindTip").show();
		$("#countContext").hide();
	}
	
	if($("#corpId").val() != "" || $("#subCorpId").val() != ""){
		// 分页
		var totalCount = responseObject.total;
		if(totalCount % gPageSize == 0){
			gTotalPage = parseInt(totalCount / gPageSize);
		}else{
			gTotalPage = parseInt(totalCount / gPageSize) + 1;
		}
		if(gTotalPage>0){
			$("#pager").html(genPagerStr(totalCount, gPageSize, gTotalPage, gCurrentPage, "lastPage()", "nextPage()", "toPage", 4));	
		}else{
			$("#pager").html("");
		}
	}else{
		$("#pager").html("");
	}
}

/* 显示省份、公司查询网点数汇总 */
function countList(companyTotal){
	var companyHtml="<span style='width:70px;float:left;'>快递公司：</span><ul id='companyCount' class='com-count'>";
	for(var i=0;i<companyTotal.length;i++){
		companyHtml+="<li class='li1" + (($("#subCorpId").val() == companyTotal[i].companyId)?" li1-select":"") + "' onclick=\"$('#subCorpId').val('"+companyTotal[i].companyId+"');gCurrentPage=1;networkQuery();\"><a href='#' onclick='this.blur();return false;'><span class='sp1'>"+companyTotal[i].companyName+"</span><span class='sp2'>("+companyTotal[i].count+")</span></a></li>";
	}
	companyHtml+="</ul>";
	var countHtml="<div class='count'>"+companyHtml+"</div>";
	$("#countDisplay").html(countHtml);
}

/* 显示网点列表 */
function networkListList(responseObject){
	var networkList = responseObject.netList;
	var companyTotal = responseObject.companyTotal;
	
	var networkHtml="";
	for(var i=0;i<networkList.length;i++){
		var networkSD="";
		if(networkList[i].workArea!=""||networkList[i].refuseArea!=""){
			networkSD="<a onfocus='this.blur();' href='#' id='showOrHide"+networkList[i].id+"' onclick=\"showOrHideNetworkDetail('"+networkList[i].id+"');return false;\">派送范围</a>";
		}
		var fullName=$.trim(networkList[i].xzqFullName);
		if(fullName!=""){
			fullName="<dd>地区："+fullName+"</dd>";
		}
		var address=$.trim(networkList[i].address);
		if(address!=null && address!=""){
			address="<dd>公司地址："+address+"</dd>";
		}
		var tel=$.trim(networkList[i].tel);
		if(tel!=""){
			tel="<dd>联系电话："+tel+"</dd>";
		}
		var lastModify=$.trim(networkList[i].lastModify);
		if(lastModify != null && lastModify != ""){
			lastModify="<dd>快递100更新日期："+lastModify+"</dd>";
		}
		var workArea = $.trim(networkList[i].workArea);
		var refuseArea = $.trim(networkList[i].refuseArea);
		var workAreaBool = "false";
		if(workArea == ""){
			workAreaBool = "true";
			workArea="";
		}else{
			workAreaBool="false";
			workArea="<div>派送范围："+workArea+"&nbsp;<a target='_blank' href='/network/networkdt"+networkList[i].id+".htm' onfocus='this.blur();'>[详情]</a></div>";
		}
		if(refuseArea != ""){
			workArea += "<div>不派送范围：" + refuseArea+ "</div>";
		}
		
		var workAreaHtml = "";
		
		if($("#corpId").val() != "" || $("#subCorpId").val() != ""){
			workAreaHtml = "<dd>";
		}else{
			for(var j = 0;j < companyTotal.length; j ++){
				if(companyTotal[j].companyId == networkList[i].companyId){
					if(companyTotal[j].count > 1){
						workAreaHtml = "<dd><a class='fr' href='#' style='padding-top:6px;' onclick=\"$('#subCorpId').val('"+networkList[i].companyId+"');gCurrentPage=1;networkQuery();\">更多" + networkList[i].companyName + "网点</a>";
					}else{
						workAreaHtml = "<dd>";
					}
					break;
				}
			}
		}
		
		workAreaHtml += "<a href='#' onfocus='this.blur();' id='shWorkArea"+networkList[i].id+"' onclick=\"showOrHideWorkArea('"+networkList[i].id+"','"+workAreaBool+"',this);return false;\" class='toOrder toOrderDown' >派送范围</a>"
					+"<a href='/comtimecost_" + networkList[i].companyId + "_" + networkList[i].xzqNumber.substring(0,6) + ".htm' onfocus='this.blur();' class='toOrder' target='_blank'>派送耗时</a>"
					+"<a href='/price/?source=kuaidi100&orderSource=networkQuery' onfocus='this.blur();' class='toOrder toOrder2' target='_blank'>我要寄快递</a></dd>"
					+"<dd style='display:none;' id='workArea"+networkList[i].id+"'>"+workArea+"<div style='display:none;' id='refuseArea"+networkList[i].id+"'></div></dd>";
		
		networkHtml += "<dl><dt><span style='float:left;margin-right:10px;'>"+networkList[i].companyName+"</span><a style='float:left;' target='_blank' href='/network/networkdt"+networkList[i].id+".htm' onfocus='this.blur();'>"+networkList[i].name+"</a></dt>"
			+fullName
			+address
			+tel
			+lastModify
			+workAreaHtml
			+"</dl>";
	}
	$("#queryResult").html(networkHtml);
	
	/*		
	var html = "";
	for(var i=0; i<result.netList.length; i++){
		var net = result.netList[i];
		html = html + "<div style=\"margin:10px 0px 20px 20px\">";

		if(net.audit){
			html = html + "<img src=\"images/audit.png\" />";
		}
		html = html + 
			"[" + net.companyName +"]&nbsp;<a href=\"/network/www/detail.jsp?id=" + net.id + "&audit=" + net.audit + "\">" + net.name + "</a><br/>" +
			"<span  style=\"margin:10px 0px 10px 0px\">地址:" + net.address +"</span><br/>"+
			"<span  style=\"margin:10px 0px 10px 0px\">" + net.detailText +"</span>"+
			"<br/>[<a href=\"/network/www/courier.jsp?id=" + net.id + "\">快递员信息</a>]&nbsp;" +
			"[<a href=\"/network/manage/login.jsp?networkId=" + net.id + "\">收派范围</a>]&nbsp;" +
			"[<a href=\"/network/manage/audit.jsp?networkId=" + net.id + "\">查时效</a>]&nbsp;" +
			"[<a href=\"/network/manage/audit.jsp?networkId=" + net.id + "\">查价格</a>]&nbsp;" +
			"[<a href=\"/network/manage/login.jsp?networkId=" + net.id + "\">地图</a>]&nbsp;" +
			"[<a href=\"/network/manage/audit.jsp?networkId=" + net.id + "\">认证</a>]&nbsp;" +
			"[<a href=\"/network/manage/login.jsp?networkId=" + net.id + "\">登录</a>]";

		if(net.netUsers.length>0){
			html = html + "<div style=\"margin:10px 0px 5px 50px\">" +
			"<span  style=\"margin:10px 5px 10px 0px\">网点直属快递员：</span><br/>";
			for(var u in net.netUsers){
				html = html + "<img src=\"images/courier.png\" />" +
					"<span  style=\"margin:10px 5px 10px 0px\">" + net.netUsers[u].name + "</span>" +
					"<span  style=\"margin:10px 15px 10px 0px\">" + net.netUsers[u].mobile + "</span>" +
					"<span  style=\"margin:10px 10px 10px 0px\">[" + net.netUsers[u].detail + "]</span>[<a href=\"\">详情</a>]</br>";
			}
			html = html + "</div>";
		}
			
		html = html + "</div>";

	}
	$("#result").html(html);
	*/
}

function showOrHideWorkArea(networkId,workAreaBool,self){
	if($("#workArea"+networkId).css("display")!="none"){
		$("#workArea"+networkId).slideUp("fast");
		$("#shWorkArea"+networkId).text("派送范围");
		$(self).removeClass("toOrderUp").addClass("toOrderDown");
	}else{
		$("#workArea"+networkId).slideDown("fast");
		$("#shWorkArea"+networkId).text("派送范围");
		$(self).addClass("toOrderUp").removeClass("toOrderDown");
	}
}

/* 上一页 */
function lastPage(){
	if(gCurrentPage>1){
		gCurrentPage = gCurrentPage-1;
		networkQuery();
	}
}

/* 下一页 */
function nextPage(){
	if(gCurrentPage < gTotalPage){
		gCurrentPage = gCurrentPage+1;
		networkQuery();
	}
}

/* 跳到某页 */
function toPage(toPg){
	if(toPg<1){
		alert("页码不能小于1");
	}else if(toPg > gTotalPage){
		alert("页码不能大于总页数");
	}else{
		gCurrentPage=toPg;
		networkQuery();
	}
}

/* 空字符串处理 */
function nullToEmpty(str){
	if(str==null){
		return "";
	}else{
		return str;
	}
}

/* 显示网点地图 */
function networkListMap(networkList){
	if(networkList==null){
		map = new BMap.Map("baidumap");// 初始化
		map.centerAndZoom(new BMap.Point(110.08452,32.542193),4);
		map.addControl(new BMap.NavigationControl());  // 添加鱼骨
		map.enableScrollWheelZoom();// 滚轮缩放
		myDis = new BMap.DistanceTool(map);// 测距离
		addDisControl();
		addBackControl();
		return;
	}
	var pointArray=new Array();
	for(var i=0;i<networkList.length;i++){
		if(networkList[i].latitude==0&&networkList[i].longitude==0){
			$("#notFindErro").text("部分网点没有相应的地图坐标");
			$("#notFindS1").text("·您可以切换到列表视图来查看这些网点信息");
			// $("#leftad").hide();
			$("#notFindTip").show();
			continue;
		}
		var point=new BMap.Point(networkList[i].longitude,networkList[i].latitude);
		pointArray.push(point);
	}
	map = new BMap.Map("baidumap");// 初始化
	viemport=map.getViewport(pointArray);
	var center=viemport.center;
	var zoom=viemport.zoom;
	if(center.equals(new BMap.Point(0,0))){
		center=new BMap.Point(110.08452,32.542193);
		zoom=4;
		$("#notFindErro").text("网点都没有相应的地图坐标");
		$("#notFindS1").text("·您可以切换到列表视图来查看这些网点信息");
		// $("#leftad").hide();
		$("#notFindTip").show();
	}
	map.centerAndZoom(center,zoom);
	map.addControl(new BMap.NavigationControl());  // 添加鱼骨
	map.enableScrollWheelZoom();// 滚轮缩放
	myDis = new BMap.DistanceTool(map);// 测距离
	
	for(var i=0;i<networkList.length;i++){
		if(networkList[i].latitude==0&&networkList[i].longitude==0){
			continue;
		}
		var label=new BMap.Label("");
		label.setPoint(new BMap.Point(networkList[i].longitude,networkList[i].latitude));
		label.setStyle({position:"absolute",border:"none",background:"none",zIndex:"1"});
		var ct="<div style='float: left; white-space: nowrap; height: 28px;'>"
				+"<span style=\"height: 28px; width: 10px; background: url('images/m.png') no-repeat scroll left -269px #000000; display: inline-block; vertical-align: middle;\"></span>"
				+"<span style=\"display: inline-block; font-size: 12px; color: rgb(255, 255, 255); height: 28px; background: url('images/m.png') no-repeat scroll right -269px #000000; padding: 0pt 10px 0pt 0pt; line-height: 18px; vertical-align: middle;\">"+networkList[i].companyName+networkList[i].name+"</span></div>";
		label.setContent(ct);
		label.setOffset(new BMap.Size(-3,-28));
		var opts = {
				  width : 200,     // 信息窗口宽度
				  // height: 60, // 信息窗口高度
				  title :"<div style='font-weight:bold;'>"+networkList[i].companyName+"</div>"  // 信息窗口标题
				}
		label.infoWindow=new BMap.InfoWindow("<div><a href='networkdt"+networkList[i].id+".htm'>"+networkList[i].name+"</a></div><div>"+networkList[i].address+"</div><div>"+networkList[i].tel+"</div>", opts);// 创建信息窗口
		label.setTitle("滑鼠或点击可放大");
		label.addEventListener("click",markClick); 
		map.addOverlay(label);
	}
	
	addDisControl();
	addBackControl();
	
	function markClick(e){
		map.centerAndZoom(e.target.point,15);
		map.openInfoWindow(e.target.infoWindow,e.target.point);
	}
	
	function addDisControl(){
		// 定义一个控件类,即function
		function DisControl(){
		  // 默认停靠位置和偏移量
		  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		  this.defaultOffset = new BMap.Size(50, 10);
		}
		// 通过JavaScript的prototype属性继承于BMap.Control
		DisControl.prototype = new BMap.Control();
		// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
		// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
		DisControl.prototype.initialize = function(map){
		  // 创建一个DOM元素
		  var btn = document.createElement("input");
		  // 添加文字说明
		  btn.type="button";
		  btn.id="disBtn";
		  btn.value="开启测量距离";
		  btn.style.width="85px";
		  btn.onclick = function(e){
			  if(this.value=="开启测量距离"){
				  myDis.open();
				  this.value="关闭测量距离";
			  }else{
				  myDis.close();
				  this.value="开启测量距离";
			  }
		  };
		  btn.onfocus=function(e){this.blur();};
		  // 添加DOM元素到地图中
		  map.getContainer().appendChild(btn);
		  // 将DOM元素返回
		  return btn;
		};
		// 创建控件
		var disCtrl = new DisControl();
		// 添加到地图当中
		map.addControl(disCtrl);
		
		map.addEventListener("rightclick",function(){
			$("#disBtn").val("开启测量距离");
		});
	}
	
	function addBackControl(){
		function BackControl(){
			  // 默认停靠位置和偏移量
			  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
			  this.defaultOffset = new BMap.Size(10, 10);
			}
			// 通过JavaScript的prototype属性继承于BMap.Control
			BackControl.prototype = new BMap.Control();
			// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
			// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
			BackControl.prototype.initialize = function(map){
			  // 创建一个DOM元素
			  var btn = document.createElement("input");
			  // 添加文字说明
			  btn.type="button";
			  btn.id="backBtn";
			  btn.value="返回";
			  btn.style.width="36px";
			  btn.onclick = function(e){
				  map.centerAndZoom(viemport.center,viemport.zoom);
			  };
			  btn.onfocus=function(e){this.blur();};
			  // 添加DOM元素到地图中
			  map.getContainer().appendChild(btn);
			  // 将DOM元素返回
			  return btn;
			};
			// 创建控件
			var backCtrl = new BackControl();
			// 添加到地图当中
			map.addControl(backCtrl);
	}
	
}

function doInitSearch(){
	if(initSearch==true){	 	
		$("#postid").focus();
		$('#postid').val(searchText);
		$("#postid").blur();

		queryClick();
	}	
}

function decode(utftext){  
	var string = "";  
	var i = 0;  
	var c = c1 = c2 = 0; 
	while ( i < utftext.length ) {  
		c = utftext.charCodeAt(i);  
		if (c < 128) {  
			string += String.fromCharCode(c);  
			i++;  
		} else if((c > 191) && (c < 224)) {  
			c2 = utftext.charCodeAt(i+1);  
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
			i += 2;  
		} else {  
			c2 = utftext.charCodeAt(i+1);  
			c3 = utftext.charCodeAt(i+2);  
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
			i += 3;  
		}  
	}  
	return string;  
}