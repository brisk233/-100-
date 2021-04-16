var page = page || '';
var getMiniCodeStatusAjaxTimer = null;
(function(){
  var mobileReg = /^1\d{10}$/;
  var lock = false;
  var loginway = getcookie('logintype');
  var redirect = encodeURIComponent(GetQueryString('redirectUri') || (document.referrer.indexOf('reg.jsp') == -1 ? document.referrer : ''));
  redirect && $("#find").attr('href', 'https://sso.kuaidi100.com/sso/findpwd.jsp?redirectUri='+redirect);
  $(function(){
    if(+$("#isvalid").val()){
        var accountName = $("input[name='name']").val();
      $(".form-ctrl img").attr("src", "/pc_web/verifyCode/generateVerifyCode?name=" + accountName + "&random=" + Math.random());
      $("#validcode").show()
    }
    $("#type").on('click', 'a', function(event) {//change login type
      event.preventDefault();
      getMiniCodeStatusAjaxTimer && clearTimeout(getMiniCodeStatusAjaxTimer);
      var role = $(this).attr('role');
      $("#submit").attr('role',role);
      $.inArray(role, ['code','phone','account', 'miniprogram']) != -1 && setcookie('logintype',role);
      $("#warn,#voice").hide();
      $(this).hide().siblings('a').show();
      page != 'bind' && $(this).siblings(':visible').eq(0).addClass('bd').siblings('a').removeClass('bd');
      if(role == 'phone'){
        $("#phone,#submit").show();
        $("#account,#code, #minicode, #qrtab").hide();
        $("#title").text('手机短信登录');
        !$("#mobile").val() && mobileReg.test($("#name").val()) && $("#mobile").val($("#name").val());//切换时用户格式符合手机自动填充
      } else if(role == 'account'){
        $("#phone,#code, #minicode, #qrtab").hide();
        $("#account,#submit").show();
        $("#title").text('账号密码登录')
      } else if(role == 'code') {
        $("#phone,#account,#submit, #minicode").hide();
        $("#code, #qrtab").show();
        $("#title").text('APP扫码登录');
        $("#qrtab [role=app]").addClass("active").siblings("span").removeClass("active");
        gettwocode();
      } else if(role == 'reg'){
        location.href = 'https://sso.kuaidi100.com/sso/reg.jsp?redirectUri=' + redirect;
      }
    });
    $(".agreement i").click(function(event) {
      $(this).toggleClass('active');
      $(this).is('.active') && $("#warn").hide()
    });
    page != 'bind' && $.inArray(loginway, ['code','phone','account']) != -1 && setTimeout(function(){$("#type a[role="+loginway+"]").click()},0);
    page != 'bind' && loginway == 'miniprogram' && setTimeout(function(){$("#miniprogram").click()},0);
    if($("#warn").text()){
      setTimeout(function(){
        showError($("#warn").text());
      },10)
    }
    $("#submit").click(function(event) {//submit the form
      if(!validate($(this).attr('role'))) return;
      if(page == 'bind' && !$(".agreement i").is('.active')){
        showError('您没有同意注册协议');
        return;
      }
      $("#"+$(this).attr('role')).submit()
    });
    $("#send").click(function(){//send validcode
      send();
    });
    $("#voice a").click(function(event) {//send voice validcode
      send(true);
    });
    $("#refreshCode").click(function(event) {//get code for code loginway
      gettwocode();
    });
    $("#refreshMiniCode").click(function() {
      getMiniCode();
    })
    $("input").on('click', function(event) {
      event.preventDefault();
      $("#warn").hide()
    }).on('keyup', function(event) {
      //enter to submit
      event.preventDefault();
      var code = event.keyCode || event.which;
      if(code == 13){
        $("#submit").click()
      }
    });
    $('.form-ctrl img').click(function(event) {
      var accountName = $("input[name='name']").val();
      $('.form-ctrl img').attr("src", "/pc_web/verifyCode/generateVerifyCode?name=" + accountName + "&random=" + Math.random());
    });
    $('#phoneValidcode img').click(function(event) {
      $('.form-ctrl img').attr("src",  "/pc_web/verifyCode/generateVerifyCode?name="+$("#mobile").val()+"&random=" + Math.random());
    });
    $("#oauth").on('click','#qq,#wx', function(event) {
      getMiniCodeStatusAjaxTimer && clearTimeout(getMiniCodeStatusAjaxTimer);
      event.preventDefault();
      // 第三方登录
      var roleValue = $(this).attr('role');
      if ('qq' === roleValue) {
          $("#thirdLogin").attr('action', '/pc_web/qrCode/generateQqQrCode').submit();
      } else {
          $("#thirdLogin").attr('action', '/sso/login.do?method='+$(this).attr('role')).submit();
      }
    }).on("click", "#miniprogram", function() {
      getMiniCodeStatusAjaxTimer && clearTimeout(getMiniCodeStatusAjaxTimer);
      $("#phone,#account,#submit, #code").hide();
        $("#minicode, #qrtab").show();
        $("#title").text('微信扫码登录');
        $("#qrtab [role=mini]").addClass("active").siblings("span").removeClass("active");
        setcookie('logintype', 'miniprogram');
        getMiniCode();
    });
    $("#qrtab").on("click", 'span', function() {
      var role = $(this).attr('role');
      if(role == 'app') {
        $("#type [role=code]").click()
      } else if(role == 'mini') {
        $("#miniprogram").click()
      }
    });
    $("#minicode img").on("error", function() {
      $("#minicode .img-mask").show().find(".code-txt").hide();
      $("#minicodeErr").text("加载失败，请刷新重试").closest('#minicode').show();
      getMiniCodeStatusAjaxTimer && clearTimeout(getMiniCodeStatusAjaxTimer);
    })
  });
  var needValidate = false;
  function send(voice) {
    if(lock){
      showError('验证码一分钟内不能重复发送');
      return;
    }
    if(!validate('send')) return;
    lock = true;
    var data = {name: $("#mobile").val()};
    voice && (data.smstype='voicesms');
    needValidate && (data.validcode = $.trim($("#phoneValidcode input").val()))
    $.ajax({
      type: "POST",
      // url: "/sso/smssend.do",
      url: "/pc_web/sms/loginSendSms",
      data: data,
      success: function (resultJson) {
        var code = resultJson.status;
        if (code == 200) {
          tictor();
          needValidate = false;
          $('#phoneValidcode').hide();
          showError('验证码已发送，请查收');
        } else if(code == 10010 || code == 10011) {
          needValidate = true;
          lock = false;
          typeof timer != 'undefined' && timer && clearInterval(timer);
          showError(code == 10010 ? '请输入图片验证码' : "图片验证码错误");
          $('#phoneValidcode').show().find('img').attr("src", "/pc_web/verifyCode/generateVerifyCode?name="+data.name+"&random=" + Math.random());
        } else {
          lock = false;
          showError(resultJson.message);
        }
      }
    });
  }
  var timer = null, codeTime = null;
  function tictor(){
    var time = 60;
    timer && clearInterval(timer);
    timer = setInterval(function(){
      $("#send").text('重新发送'+ time-- +'秒');
      if(time <= 0) {
        clearInterval(timer);
        lock = false;
        $("#send").text('重新发送');
        $("#voice").show();
      }
    },1000);
  }
  function validate(type) {
    switch(type){
      case 'send':
      case 'phone':
        if(!mobileReg.test($("#mobile").val())) {
          showError('请输入正确的手机号');
          $("#mobile").focus();
          return false;
        }
        if(type == 'send' && needValidate && !$.trim($("#phoneValidcode input").val())) {
          showError("请输入图片验证码");
          return false;
        }
        if(type == 'phone' && !$("#dpassword").val()) {
          $("#dpassword").focus();
          showError('请输入短信验证码');
          return false;
        }
        break;
      case 'account':
        if(!$("#name").val()) {
          $("#name").focus();
          showError('请输入用户名');
          return false;
        }
        if(!$("#password").val() || $("#password").val().length < 6) {
          $("#password").focus();
          showError('密码长度不能少于6位');
          return false;
        }
        if(+$("#isvalid").val() && !$("#validcode input").val()){
          $("#validcode input").focus()
          showError('请输入图片验证码');
          return false;
        }
        break;
    }
    return true;
  }
  function showError(content){
    $("#warn").text(content).show(function(){
      $('#warn').animate({opacity: 0,},
        'slow', function() {
        $("#warn").animate({opacity:1},'slow')
      });
    });
  }

  function generateUUid() {//generate a uuid
    var s = [];
    var uuid = "";
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    uuid = s.join("");
    return uuid;
  }

  function getMiniCode() { 
    var uuid = generateUUid().replace(/-/g, "");
    var t = new Date().getTime();
    $("#minicode .img-mask").hide();
    $("#minicode img").attr('src', '/xcx/createQrCode?scene=' + uuid + '&_t=' + t);
    $("#minicode").find(".code-txt").show()
    getMiniCodeStatusAjaxTimer && clearTimeout(getMiniCodeStatusAjaxTimer);
    getMiniCodeStatusAjaxTimer = setTimeout(function() {
      getMiniCodeStatus(uuid);
    }, 1000)
  }
  function getMiniCodeStatus(uuid) {
    $.ajax({
      type: "POST",
      url: "/xcx/qrCodeLogin",
      data: {
        scene: uuid
      },
      success: function (resultJson) {
        if (resultJson.status == 200) {
          location.href = redirect ? decodeURIComponent(redirect) : "https://sso.kuaidi100.com/user/account.jsp";
        } else if (resultJson.status == 402) {
          $("#minicode .img-mask").show();
          $("#minicodeErr").text('二维码失效，请刷新').closest('#minicode').show();
        } else if(resultJson.status == 202) {
          getMiniCodeStatusAjaxTimer && clearTimeout(getMiniCodeStatusAjaxTimer);
          getMiniCodeStatusAjaxTimer = setTimeout(function() {
            getMiniCodeStatus(uuid);
          }, 1000);
        } else {
          $("#minicode .img-mask").show();
          $("#minicodeErr").text("登录失败，刷新二维码重试").closest('#minicode').show();
        }
      }
    })
  }

  function gettwocode() {
    var uuid = generateUUid();
    var t = new Date().getTime();
    codeTime = new Date();
    $("#code .img-mask").hide();
    $("#code img").attr('src', '/pc_web/qrCode/generateAppQrCode?uuid=' + uuid + '&_t=' + t);
    codeTime.setTime(new Date().getTime() + 2 * 60 * 1000);
    getcodeStatus(uuid);
  }


  function getcodeStatus(uuid) {
    var date = codeTime.getTime() - new Date().getTime();
    if (date > 0) {
      $.get('//sso.kuaidi100.com/push/wait?siid=' + uuid, function (result) {
        if (result == "messagearrive") {
          var t = new Date().getTime();
          $.ajax({
            type: "POST",
            url: "/pc_web/login/appQrCodeLoginCallback",
            data: "uuid=" + uuid + "&_t=" + t,
            success: function (resultJson) {
              if (resultJson.status == 200) {
                location.href = "https://sso.kuaidi100.com/user/account.jsp";
              } else if (resultJson.status == 10003) {
                $("#code .img-mask").show();
                $("#codeErr").text('二维码失效，请刷新');
              } else {
                $("#codeErr").text("登录失败，刷新二维码重试").closest('#code').show();
              }
            }
          })
        } else if (result == "timeout") {
          getcodeStatus(uuid);
        }
      })
    } else {//code expired
      $("#code .img-mask").show();
      $("#codeErr").text('二维码失效，请刷新');
    }
  }
})();