function Yunxin(){}
Yunxin.prototype = {
    /**
     * 为商户提供的跳转地址
     * 商户使用的是mpassport如果直接跳转至云信页面仍然需要登录
     * 需要先跳转至授信地址然后再转到targetUrl(云信地址)
     * added by 19015794 v20191114
     */
    maccess: function (data) {
        var self = this;
        data = self._parse(data);
        var protocol = window.location.protocol || 'http:';
        // wap灰度方案，根据接口返回值切换wap 新老域名 add by 19043604 v20191125
        var callback = function (domainCode) {
            var url = protocol + self._getWapUrl(domainCode) + '?' + data;
            var mUrl = self._getMpass() + '/ids/trustLogin?sysCode=suning&targetUrl=' + encodeURIComponent(url);
            self.openChat(mUrl,'maccess');
        };
        self._getWapDomain(callback);
    },
    /**
     * access	会员模式正常接入方法
     * @param {Object} data 会员模式入参
     * annotated by shy 2020/02/24 v20200319
     */
    access: function(data){
        var self = this;
        data = self._parse(data);
        // wap灰度方案，根据接口返回值切换wap 新老域名 add by 19043604 v20191125
        var callback = function (domainCode) {
            var url = self._getWapUrl(domainCode) + '?' + data;
            self.openChat(url);
        };
        self._getWapDomain(callback);
    },
    /**
     * touristAccess 游客模式接入方法
     * @param {Object} data 游客模式入参
     * data:{
     * custNo（游客会员编码），appcode，bizCode，bizSeq，chatModel=guest
     * }
     *add by 18045800 2020/02/24 v20200319
     */
    touristAccess: function(data){
        var self = this;
        data = self._parse(data);
        // add by 20011535 游客模式不需要灰度校验直接跳转到新版本
        var url = self._getWapUrl('Y') + '?' + data;//游客模式只进入新版本
        self.openChat(url);
        // var callback = function () {
        // 	var url = self._getWapUrl('Y') + '?' + data;//游客模式只进入新版本
        // 	self.openChat(url);
        // };
        // self._getWapDomain(callback);
    },
    /**
     * auth 二狗
     * 2019-06-06 10:43:06
     * 打开会话页面
     */
    openChat: function(url,flag) {
        var terminal = this._getTerminalType();
        if (terminal === "pc") {
            var opener = window.open(url);
            if (opener === null || typeof opener === 'undefined') {
                window.location.href = url;
                return;
            }
            //iphone QQ 浏览器不兼容
        } else if(terminal === "mobile") {
            if(flag === 'maccess'){
                //增加标识maccess， maccess接入方式已经转码一次，无需再次转码。 modified by 18045800 2020/04/26 v20200506
                window.location.assign(url);
            }else{
                var encodeUrl = window.encodeURI(url);
                window.location.assign(encodeUrl);
            }
        }

    },

    broswers: {
        type:{
            isSafari:function(){
                var ua = navigator.userAgent;
                return ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
            }
        }
    },

    /**
     * auth 二狗
     * 2019-06-06 10:43:06
     * 找通道参数对象转化为URL
     */
    _parse: function(data){
        try {
            var tempArr = [];
            for (var i in data) {
                var key = encodeURIComponent(i);
                var value = encodeURIComponent(data[i]);
                tempArr.push(key + '=' + value);
            }
            var urlParamsStr = tempArr.join('&');
            return urlParamsStr;
        } catch (err) {
            return '';
        }
    },

    /**
     * auth 二狗
     * 2019-06-06 10:43:06
     * 根据当前页面域名获取系统环境
     * 主要用四种
     * 	xgpre新港PRE
     * 	pre徐庄PRE
     * 	prd生产环境
     * 	sit
     */
    _getEnv: function(){
        var hostname = window.location.hostname;
        var xgpre = hostname.indexOf('xgpre') >= 0 || hostname.indexOf('prexg') >= 0;
        if(xgpre){
            return 'xgpre';
        }
        var pre = hostname.indexOf('pre') >= 0;
        if(pre){
            return 'pre';
        }
        var sit = hostname.indexOf('sit') >= 0;
        if(sit){
            return 'sit';
        }
        return 'prd';
    },
    /**
     * 2019/08/18
     * 这里考虑PC，wap 两个终端
     * pc端打开手机站，但是设备切换工具没有打开认为是PC站，默认会打开云信PC端
     * 如果wap 内嵌在APP内默认跳转云信wap端
     * 微信APP内嵌wap页页默认跳转云信wap端
     */
    _getTerminalType: function(){
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
        var flag = "pc";
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = "mobile";
                break;
            }
        }
        return flag;
    },
    /**
     * 2019/11/05
     * 根据环境获取商户授信地址
     * added by 19015794 v20191114
     */
    _getMpass: function() {
        var env = this._getEnv();
        switch(env){
            case 'pre':
                return '//mpassportpre.cnsuning.com';
            case 'xgpre':
                return '//mpassportxgpre.cnsuning.com';
            case 'sit':
                return '//mpassportsit.cnsuning.com';
            case 'prd':
                return '//mpassport.suning.com';
            default:
                return '//mpassport.suning.com';
        }
    },
    /**
     * auth 二狗
     * 2019-06-06 10:44:00
     * 根据环境获得跳转的云信会话页URL地址
     * wap灰度方法，通过接口返回值判断跳转地址 add by 19043604 v20191125
     * @param {String} domainCode 灰度结果 Y-yxwap
     */
    _getWapUrl: function(domainCode){
        var self = this;
        var env = self._getEnv();
        var terminal = self._getTerminalType();
        if(terminal === "pc"){
            switch(env){
                case 'pre':
                    return '//yxchatpre.cnsuning.com/index.html';
                case 'xgpre':
                    return '//yxchatxgpre.cnsuning.com/index.html';
                case 'sit':
                    return '//yxchatsit.cnsuning.com/index.html';
                case 'prd':
                default:
                    return '//yxchat.suning.com/index.html';
            }
        }else if(terminal === "mobile"){
            if (domainCode == 'Y') { // yxwap
                switch(env){
                    case 'pre':
                        return '//yxwappre.cnsuning.com/#/';
                    case 'xgpre':
                        return '//yxwapxgpre.cnsuning.com/#/';
                    case 'sit':
                        return '//yxwapsit.cnsuning.com/#/';
                    case 'prd':
                    default:
                        return '//yxwap.suning.com/#/';
                }
            } else { // talk8
                switch(env){
                    case 'pre':
                        return '//talk8pre.cnsuning.com/yunxin-web/wap/index.html';
                    case 'xgpre':
                        return '//talk8xgpre.cnsuning.com/yunxin-web/wap/index.html';
                    case 'sit':
                        return '//talk8sit.cnsuning.com/yunxin-web/wap/index.html';
                    case 'prd':
                    default:
                        return '//talk8.suning.com/yunxin-web/wap/index.html';
                }
            }
        }

    },
    /**
     * 获取接口host add by 19043604 v20191125
     */
    _getApiHost: function () {
        var env = this._getEnv();
        switch(env){
            case 'pre':
                return '//talk8pre.cnsuning.com/yunxin-web';
            case 'xgpre':
                return '//talk8xgpre.cnsuning.com/yunxin-web';
            case 'sit':
                return '//talk8sit.cnsuning.com/yunxin-web';
            case 'prd':
            default:
                return '//talk8.suning.com/yunxin-web';
        }
    },
    /**
     * wap灰度方案，通过接口返回值进行新/老域名切换
     * add by 19043604 v20191125
     * @param {Function} callback 回调
     * @returns {String} 域名切换标识 'Y'-yxwap 'N'-talk8
     */
    _getWapDomain: function (callback) {
        var self = this;
        var domainCode = 'N';
        $.ajax({
            url: self._getApiHost() + '/rest/wap/gary/garyVerify.do',
            dataType: 'jsonp',
            success: function (res) {
                if (res.meta && res.meta.result === 'success' && res.data && res.data.body) {
                    domainCode = res.data.body.returnFlag || 'N';
                } else {
                    domainCode = 'N';
                }
                callback && callback(domainCode);
            },
            error: function () {
                domainCode = 'N';
                callback && callback(domainCode);
            }
        })
    }
}