/**
 * Created by 17120847 on 2018/6/12.
 */
	var map,marker ;
	mapInit();
	function mapInit(){
		try{
			map = new AMap.Map("mapdiv", {
		        resizeEnable: true,
		        zoom: 13 //地图显示的缩放级别
				
		    });	
		}catch(err){
		}   
	}

    function geocoder(addressinfoa) {
    	try{
            var geocoder = new AMap.Geocoder({
                radius: 1000 //范围，默认：500
            });
            //地理编码,返回地理编码结果
            geocoder.getLocation(addressinfoa, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
    				//地理编码结果数组
    				var geocode = result.geocodes;
    				for (var i = 0; i < geocode.length; i++) {
    					//拼接输出html
    					
    					addMarkerof(i, geocode[i]);
    				}
    				map.setFitView();
                }
            });
    	}catch(err){
		} 
    }
    function addMarkerof(i, d) {
    	if(marker != null){
    		map.remove(marker);  
    	}
        marker = new AMap.Marker({
            map: map,
            position: [ d.location.getLng(),  d.location.getLat()]
        });
        var infoWindow = new AMap.InfoWindow({
            content: d.formattedAddress,
            offset: {x: 0, y: -30}
        });
        marker.on("mouseover", function(e) {
            infoWindow.open(map, marker.getPosition());
        });
    }
    function addMarker(i, d) {
        lnglatXY = [i, d]; //已知点坐标
    	var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });        
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
            }
        });        
        var marker = new AMap.Marker({  //加点
            map: map,
            position: lnglatXY
        });
        map.setFitView();
    }

    function isnullToString(obj){
        if (typeof(obj) == "undefined" || obj == null) {
            return "";
        }
    }

    function concatAddress(prv,city,county){
	    var arr = [prv,city,county];
	    var addres = "";
        for ( var i = 0; i <arr.length; i++){
            if(isnullToString(arr[i]) != ''){
                addres = addres+arr[i]+"/"
            }
        }
        if(addres == '/' || addres == ''){
            return "";
        }else{
            return addres.substring(0,addres.length - 1);
        }
    }

	function networkInfo(networkno){
		$.ajax({
			type:"post",	
			url:"/netWork/networkQuery!serchNetworkInfo.action",				
			data:{"peripheralUnit.zexid":networkno},
			error: function(){
					swal("", 'Error loading web_jsp document！', "warning");
			},
			success:function(data){
				if(data == 'fail'){
					swal("", '抱歉你所查询的地区暂时没有网点存在！', "warning");
				}else{
					var network = JSON.parse(data);
					$('#networkNameSpan').html("");
					$('#networkNoSpan').html("");
					$('#countyNoSpan').html("");
					$('#businessTelSpan').html("");
					$('#deliverySx').html("");
					// $('#businessFaxSpan').html("");
					$('#networkAddressSpan').html("");
                    $('#noDeliveryRangeSpan').html("");
                    $('#deliveryRangeSpan').html("");
                    $('#extRemarkSpan').html("");
					$('#deliveryTimeLimitSpan').html("");
					// $('#jc_append_serverSpan').html("");
                    $('.deliverySx span').css("display","block");
                    $('.deliveryOpenBtn span').css("display","block");
                    $('.noDeliveryOpenBtn span').css("display","block");
                    $('.extRemarkOpenBtn span').css("display","block");
                    $('.deliverySx span').html("展开");
                    $('.deliveryOpenBtn span').html("展开");
                    $('.noDeliverynoDeliveryOpenBtn span').html("展开");
                    $('.extRemarkOpenBtn span').html("展开");
					$('#networkNameSpan').html(network.vtext);
					$('#networkNoSpan').html((network.extsite==''|| network.extsite == null)?network.zexid:network.extsite);
					$('#countyNoSpan').html(concatAddress(network.province_text,network.city_text,network.district_text));
					$('#businessTelSpan').html(network.reserve1);
					if (network.delivery_sx != undefined && network.delivery_sx != null && network.delivery_sx.length > 70) {
                        $('#deliverySx').attr('desc',network.delivery_sx).html(network.delivery_sx.substring(0,70) + '...');
                    } else {
                        $('#deliverySx').attr('desc',network.delivery_sx).html(network.delivery_sx);
                        $('.deliverySx span').css("display","none");
                    }
                    if (network.deliveryarea != undefined && network.deliveryarea != null && network.deliveryarea.length > 70) {
                        $('#deliveryRangeSpan').attr('desc',network.deliveryarea).html(network.deliveryarea.substring(0,70) + '...');
                    } else {
                        $('#deliveryRangeSpan').attr('desc',network.deliveryarea).html(network.deliveryarea);
                        $('.deliveryOpenBtn span').css("display","none");
                    }
                    if (network.undeliveryarea != undefined && network.undeliveryarea != null && network.undeliveryarea.length > 70) {
                        $('#noDeliveryRangeSpan').attr('desc',network.undeliveryarea).html(network.undeliveryarea.substring(0,70) + '...');
                    } else {
                        $('#noDeliveryRangeSpan').attr('desc',network.undeliveryarea).html(network.undeliveryarea);
                        $('.noDeliveryOpenBtn span').css("display","none");
                    }
                    if (network.extremark != undefined && network.extremark != null && network.extremark.length > 70) {
                        $('#extRemarkSpan').attr('desc',network.extremark).html(network.extremark.substring(0,70) + '...');
                    } else {
                        $('#extRemarkSpan').attr('desc',network.extremark).html(network.extremark);
                        $('.extRemarkOpenBtn span').css("display","none");
                    }
//					$('#businessTelSpan').html(phoneTable(network.contact));
//					$('#businessTelSpan').html('<div style="display:inline-block;"><span style="display: inline-block;height: 40px;'+
//						    'line-height: 40px;border: 1px solid #e0e0e0;background: #F7F7F7;font-size:  14px;width:  100px;'+
//						    'text-align:  center;">网点负责人</span><span style="display: inline-block;height: 40px;line-height: 40px;'+
//						    'border: 1px solid #e0e0e0;font-size: 14px;width: 480px;vertical-align: top;border-left: 0;padding-left: 10px;">'+
//						    1+'</span></div>');
// 					$('#businessFaxSpan').html(network.fax);
					$('#networkAddressSpan').html(network.adrnr);
					if(network.freightcollect == 0){
						$('#deliveryTimeLimitSpan').html("不允许");
					}else{
						$('#deliveryTimeLimitSpan').html("允许");
					}
					// $('#jc_append_serverSpan').html(network.cat);
					$('.netContentModel').show();
					$('.mask').show();
					$('#jc_append_serverSpan').find('br').eq(0).remove();
//					addMarker(network.longitude,network.latitude);
					geocoder(network.adrnr);
				}
			} 	 		
		});
	}
	
	function phoneTable(params){
		var resulthtml = '<table style="width:555px;border-collapse: collapse;" border="1"><tbody>';
		var phones = params.split(',');
		var tabledata = [];
		tabledata[0] = {'name':'网点负责人','value':''}
		tabledata[1] = {'name':'客服经理','value':''}
		tabledata[2] = {'name':'查询号码','value':''}
		tabledata[3] = {'name':'取件号码','value':''}
		tabledata[4] = {'name':'投诉电话','value':''}
		for (var i = 0; i < phones.length; i++) {
			if(phones[i].split(':')[0] != null && phones[i].split(':')[0] != ''){
				var temp = tabledata[phones[i].split(':')[0]-1].value;
				tabledata[phones[i].split(':')[0]-1].value = temp + ((temp == '')?'':'&nbsp;;&nbsp;') +phones[i].split(':')[1];	
			}
		}
		for (var i = 0; i < tabledata.length; i++) {
			if( tabledata[i].value != '')
			resulthtml += '<tr><td style="padding: 10px;background: #F7F7F7;width: 100px;">'+tabledata[i].name+'</td><td style="padding: 10px; line-height: 22px;">'+
			    tabledata[i].value+'</td></tr>';
		}
		resulthtml += '</tbody></table>';
		return resulthtml;
	}
	
	function searchNetWork(countyName,cityName,opt){
		var data;
		if(opt == 'search'){
			var province = $("#ctityTextHtml").find(".select-item[data-count$='province']").attr('data-code');
			var city = $("#ctityTextHtml").find(".select-item[data-count$='city']").attr('data-code');
			var district = $("#ctityTextHtml").find(".select-item[data-count$='district']").attr('data-code');

			var condition = $("#countyNo").val();
			if(trim(province).length == 0 && trim(condition).length == 0){
				swal("", '请输入查询条件。', "info");
				return;
			}else if(trim($("#countyNo").val()).length > 20){
				swal("", '网点名称最多不超过20个字符。', "info");
				return;
			}
			data = {"peripheralUnit.vtext":condition,"peripheralUnit.city":city,"peripheralUnit.province":province,"peripheralUnit.district":district};
		}else if(opt == 'map'){
            if("010、020、030、320".indexOf(countyName) != -1){
                data = {"peripheralUnit.province":countyName,"peripheralUnit.district":cityName};
            }
            else{
                data = {"peripheralUnit.city":cityName,"peripheralUnit.province":countyName};
            }

		}
		$.ajax({
			type:"post",	
			url:"/netWork/networkQuery!serchNetwork.action",				
			data:data,
			error: function(){
					swal("", 'Error loading web_jsp document！', "warning");
			},
			success:function(data){
			    $(".queryResultContent").html(data);
			    $(".distributionScope").find('br').remove();
				if(data.length == 0){
					swal("", '抱歉你所查询的地区暂时没有网点存在！', "warning");
				}else{
                    var mao = $("#queryResultContent"); //获得锚点
                    if (mao.length > 0) {//判断对象是否存在
                        var pos = mao.offset().top;
                        var poshigh = mao.height();
                        var sc = pos - poshigh - 30;
                        if(sc > 0){
                            $("html,body").animate({scrollTop: sc}, 500);
                        }
                        else{
                            $("html,body").animate({scrollTop: sc*(-1)}, 500);
                        }
                    }
                }
			} 	 		
		});
	}
	
　　 function trim(str){
	 if(str == null){
		 return "";
	 }
　　  	 return str.replace(/(^\s*)|(\s*$)/g, ""); 
　　 }
$(function () {
    var width  = 800;
    var height = 700;

    var svg = d3.select('#queryMapContent').append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");
    
    var scale = 600;
    if(IEVersion()==8){
        scale = scale*6.6
    }
    //由于 GeoJSON 文件中的地图数据，都是经度和纬度的信息。它们都是三维的，而要在网页上显示的是二维的，所以要设定一个投影函数来转换经度纬度
    var projection = d3.geo.mercator()
        .center([105, 31])
        .scale(600)
        .translate([width/2, height/2]);

    //为了根据地图的地理数据生成 SVG 中 path 元素的路径值，需要用到 d3.geo.path()，我称它为地理路径生成器
    var path = d3.geo.path()
        .projection(projection);


    var color = d3.scale.category20();

    showchinamap()
    //向服务器请求文件并绘制地图
    function showchinamap() {
        d3.json("/staticFiles/js/china.geojson", function(error, root) {
            svg.selectAll('*').remove()
            var china =svg.append("g");
            var provinces =svg.selectAll("path")
               /* .data( root.features ) */
                .enter()
                .append("path")
                .attr("stroke","#fff")
                .attr("stroke-width",1)
                .attr("fill", "#0293ED")
                .attr("d", path )//相当于  attr("d",funtion(d){return path(d);})
                .on("mouseover",function(d,i){
                    d3.select(this)
                        .attr("fill","yellow");
                })
                .on("mouseout",function(d,i){
                    d3.select(this)
                        .attr("fill",'#0293ED');
                })
                .on("click",function(d,i){
                    deal(d.properties.id)
                });

            //在地图上显示各个身份的名称
            svg.selectAll("text")
                .data(root.features)
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("style", "color:red;cursor:hand;")
                .on("click",function(d,i){
                    deal(d.properties.id)
                })

            //设置各个文本（省份名称）显示的文字
                .attr("transform",function(d,i)
                {
                    if(d.properties.id =="060") //河北
                    {
                        return "translate("+(path.centroid(d)[0]-20)+","+ (path.centroid(d)[1]+20)+")";
                    }
                    if(d.properties.id =="MAC") //澳门
                    {
                        return "translate("+(path.centroid(d)[0]-20)+","+ (path.centroid(d)[1]+10)+")";
                    }
                    else if(d.properties.id =="010") // 北京
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1])+")";
                    }else if(d.properties.id =="030") // 天津
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]+10)+")";
                    }
                    return "translate("+(path.centroid(d)[0]-10)+","+ path.centroid(d)[1]+")";
                })
                //显示省名
                .text(function(d)
                {
                    return d.properties.name;
                })
                .attr("font-size",12);
        });
    }
    //
    function drawMap(provinceName,name,centerX,centerY,scale,pid){
        d3.json("/staticFiles/js/mapJson/" + name + ".json",function(error, root) {
            if(error)
                return alert(error);
            if(IEVersion()==8){
                scale = scale*6.6
            }
            var projection = d3.geo.mercator()
                .center([centerX, centerY])
                .scale(scale)
                .translate([width/2, height/2]);
            var path = d3.geo.path()
                .projection(projection);

            svg.selectAll('*').remove()
            svg.selectAll("path")
                .data( root.features )
                .enter()
                .append("path")
                .attr("stroke","#fff")
                .attr("stroke-width",1)
                .attr("fill", "#0293ED")
                .attr("d", path )//相当于  attr("d",funtion(d){return path(d);})
                .on("mouseover",function(d,i){
                    d3.select(this)
                        .attr("fill","yellow");
                })
                .on("mouseout",function(d,i){
                    d3.select(this)
                        .attr("fill",'#0293ED');
                })
                .on("click",function(d,i){
					searchNetWork(pid,d.properties.id,'map');
                });
            //在地图上显示各个身份的名称
            svg.selectAll("text")
                .data(root.features)
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("style", "color:red;cursor:hand;")
                .on("click",function(d,i){
					searchNetWork(pid,d.properties.id,'map');
                })
                //设置各个文本（省份名称）显示的文字
                .attr("transform",function(d,i)
                {
                    if(d.properties.name =="杨浦区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }
                    else if(d.properties.name =="闸北区")
                    {
                        return "translate("+(path.centroid(d)[0]-30)+","+ (path.centroid(d)[1]-10)+")";
                    }
                    else if(d.properties.name =="长宁区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]+10)+")";
                    }
                    else if(d.properties.name =="静安区")
                    {
                        return "translate("+(path.centroid(d)[0]-30)+","+ (path.centroid(d)[1]+10)+")";
                    }
                    else if(d.properties.name =="黄浦区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }
                    else if(d.properties.name =="卢湾区")
                    {
                        return "translate("+(path.centroid(d)[0])+","+ (path.centroid(d)[1])+")";
                    }
                    else if(d.properties.name =="西城区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }
                    else if(d.properties.name =="崇文区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]+10)+")";
                    }else if(d.properties.name =="基隆市")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }else if(d.properties.name =="嘉义市")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }else if(d.properties.name =="昆明市")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }else if(d.properties.name =="丽江市")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }else if(d.properties.name =="图木舒克市")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }else if(d.properties.name =="塔城地区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }else if(d.properties.name =="昌吉回族自治州")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]-10)+")";
                    }else if(d.properties.name =="红桥区")
                    {
                        return "translate("+(path.centroid(d)[0]-30)+","+ (path.centroid(d)[1])+")";
                    }else if(d.properties.name =="南开区")
                    {
                        return "translate("+(path.centroid(d)[0]-30)+","+ (path.centroid(d)[1])+")";
                    }else if(d.properties.name =="西青区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]+15)+")";
                    }else if(d.properties.name =="河西区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]+15)+")";
                    }else if(d.properties.name =="和平区")
                    {
                        return "translate("+(path.centroid(d)[0]-10)+","+ (path.centroid(d)[1]+15)+")";
                    }else if(d.properties.name =="河北区")
                    {
                        return "translate("+(path.centroid(d)[0])+","+ (path.centroid(d)[1])+")";
                    }
                    return "translate("+(path.centroid(d)[0]-10)+","+ path.centroid(d)[1]+")";
                })
                //显示省名
                .text(function(d)
                {
                    return d.properties.name;
                })
                .attr("font-size",12);
        })
    }
    function deal(id) {
        for(var i=0,len=province.length;i<len;i++){
            if(province[i].id == id){
                showtitle(province[i].name)
                drawMap(province[i].name,province[i].no,province[i].centerX,province[i].centerY,province[i].scale,province[i].id);
                break;
            }
        }
    }
    function showtitle(name) {
        $('.queryMapContent .twoLev').show()
        $(".twoLevName").html(name);
        $(".imgmapgroup").hide()
        $(".onelevName").addClass('blue')
    }
    $(document).on('click','.onelevName',function () {
        $(".twoLevName").html('');
        $('.twoLev').hide();
        $(".imgmapgroup").show();
        $(".onelevName").removeClass('blue');
	    $(".queryResultContent").html('');
        showchinamap();

    })
})
var province = [{"id":"260","name":"甘肃省","no":"gansu","centerX":100,"centerY":36.3,"scale":2100},
    {"id":"280","name":"青海省","no":"qinghai","centerX":96,"centerY":34,"scale":2500},
    {"id":"210","name":"广西壮族自治区","no":"guangxi","centerX":108,"centerY":22.5,"scale":4000},
    {"id":"220","name":"贵州省","no":"guizhou","centerX":106.5,"centerY":25.8,"scale":5000},
    {"id":"320","name":"重庆市","no":"chongqing","centerX":107.5,"centerY":29.5,"scale":5900},
    {"id":"010","name":"北京市","no":"beijing","centerX":116.4,"centerY":39.9,"scale":14000},
    {"id":"150","name":"福建省","no":"fujian","centerX":118,"centerY":25,"scale":5000},
    {"id":"110","name":"安徽省","no":"anhui","centerX":117,"centerY":31,"scale":4200},
    {"id":"190","name":"广东省","no":"guangdong","centerX":114,"centerY":22,"scale":4000},
    {"id":"300","name":"西藏自治区","no":"xizang","centerX":88,"centerY":30,"scale":1500},
    {"id":"290","name":"新疆维吾尔自治区","no":"xinjiang","centerX":84,"centerY":39,"scale":1500},
    {"id":"200","name":"海南省","no":"hainan","centerX":109.5,"centerY":18.8,"scale":11000},
    {"id":"270","name":"宁夏回族自治区","no":"ningxia","centerX":106,"centerY":36.6,"scale":5000},
    {"id":"250","name":"陕西省","no":"shan3xi","centerX":108.5,"centerY":34,"scale":2800},
    {"id":"050","name":"山西省","no":"shan1xi","centerX":113,"centerY":36,"scale":3000},
    {"id":"170","name":"湖北省","no":"hubei","centerX":112,"centerY":30,"scale":4000},
    {"id":"160","name":"湖南省","no":"hunan","centerX":112,"centerY":26.4,"scale":4400},
    {"id":"230","name":"四川省","no":"sichuan","centerX":102.5,"centerY":28.8,"scale":2900},
    {"id":"240","name":"云南省","no":"yunnan","centerX":102,"centerY":23.5,"scale":3200},
    {"id":"060","name":"河北省","no":"hebei","centerX":117,"centerY":38,"scale":3000},
    {"id":"180","name":"河南省","no":"henan","centerX":114,"centerY":33,"scale":4000},
    {"id":"070","name":"辽宁省","no":"liaoning","centerX":122,"centerY":40,"scale":4000},
    {"id":"120","name":"山东省","no":"shandong","centerX":119,"centerY":35,"scale":4000},
    {"id":"030","name":"天津市","no":"tianjin","centerX":117,"centerY":39,"scale":12000},
    {"id":"140","name":"江西省","no":"jiangxi","centerX":117,"centerY":26,"scale":4000},
    {"id":"100","name":"江苏省","no":"jiangsu","centerX":119,"centerY":32,"scale":5000},
    {"id":"020","name":"上海市","no":"shanghai","centerX":121.6,"centerY":31,"scale":20000},
    {"id":"130","name":"浙江省","no":"zhejiang","centerX":121,"centerY":28,"scale":5000},
    {"id":"080","name":"吉林省","no":"jilin","centerX":126,"centerY":42.5,"scale":3500},
    {"id":"040","name":"内蒙古自治区","no":"neimenggu","centerX":110,"centerY":43,"scale":1200},
    {"id":"090","name":"黑龙江省","no":"heilongjiang","centerX":125,"centerY":47,"scale":1800},
    {"id":"HOK","name":"香港特别行政区","no":"hongkong","centerX":114.1,"centerY":22.28,"scale":60000},
    {"id":"MAC","name":"澳门特别行政区","no":"macau","centerX":113.56,"centerY":22.14,"scale":150000},
    {"id":"34","name":"台湾","no":"taiwan","centerX":120.8,"centerY":23,"scale":8000}]

function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}