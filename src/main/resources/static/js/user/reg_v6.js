var page  = page || '';

(function(){
  var mobileReg = /^1\d{10}$/,
      emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      ua = navigator.userAgent;
  var lock = false,timer = null;
  var ctoken;
  var redirect = encodeURIComponent(GetQueryString('redirectUri') || (document.referrer.indexOf('login.jsp') == -1 ? document.referrer : ''));
  var source = /android|ios|ipod|ipad|iphonewebos|blackberry/i.test(ua) ? "MPOINT" : "PC";
  var channel = GetQueryString("coname") || source;
  $(function(){
    if(window !== top && page == 'findpwd'){
      $(".log-head").hide() && $(".form-container").css('padding-top','2rem')
      $(".back-text").show()
    } else {
      $(".log-head").show()
    }
    ctoken = $('#ct').val().split(":");
    ctoken = ctoken[ctoken.length -1];
    $(".agreement i").click(function(event) {
      $(this).toggleClass('active');
      $(this).is('.active') && $("#warn").hide()
    });
    $("#goLogin,.go-login").click(function(event) {
      setcookie_kuaidi100("TOKEN","");
      location.replace(window === top ? 'login.jsp?redirectUri='+redirect : 'sentlogin.jsp');
    });
    $("input").on('keyup', function(event) {
      event.preventDefault();
      $("#warn").hide()
      var code = event.keyCode || event.which;
      if(code == 13){
        $("#submit").click()
      }
    });
    $("#send").click(function(){//send validcode
      send();
    });
    $("#voice a").click(function(event) {//send voice validcode
      send(true);
    });
    $("#submit").click(function(event) {
      if(!validate('submit')) return;
      if(page != 'findpwd' && !$(".agreement i").is('.active')){
        showError('您没有同意注册协议');
        return;
      }
      handle();
    });
    $('#phoneValidcode img').click(function(event) {
      $('.form-ctrl img').attr("src",  "/sso/v2/verifycode.do?method=getVerification&name="+$("#name").val()+"&random=" + Math.random());
    });
  });
  var needValidate = false;
  function send(voice) {
    if(lock){
      showError('验证码一分钟内不能重复发送');
      return;
    }
    if(!validate('send')) return;
    lock = true;
    var data = {name: $("#name").val()};
    voice && (data.smstype='voicesms');
    needValidate && (data.validcode = $.trim($("#phoneValidcode input").val()))
    $.ajax({
      type: "POST",
      url: "/sso/v2/mobileapi.do?method=sendcode",
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("kdcsrftoken", ctoken);
      },
      success: function (resultJson) {
        var code = resultJson.status;
        if (code == 200) {
          tictor($("#send"));
          needValidate = false;
          $('#phoneValidcode').hide();
          showError('验证码已发送，请查收');
        } else if(code == 10010 || code == 10011) {
          lock = false;
          typeof timer != 'undefined' && timer && clearInterval(timer);
          needValidate = true;
          showError(code == 10010 ? '请输入图片验证码' : "图片验证码错误");
          $('#phoneValidcode').show().find('img').attr("src", "/sso/v2/verifycode.do?method=getVerification&name="+data.name+"&random=" + Math.random());
        } else {
          lock = false;
          showError(resultJson.message || "页面过期，请刷新重试");
        }
      },
      error: function(){
        showError('页面过期，请刷新重试');
        lock = false;
      }
    });
  }
  function tictor(dom){
    var time = 60, dom = $("#send");
    timer && clearInterval(timer);
    timer = setInterval(function(){
      dom.text('重新发送'+ time-- +'秒');
      if(time <= 0) {
        clearInterval(timer);
        lock = false;
        dom.text('重新发送');
        mobileReg.test($("#name").val()) && $("#voice").show();
      }
    },1000);
  }
  function validate(type) {
    if(!mobileReg.test($("#name").val()) && !emailReg.test($("#name").val())) {
      showError('请输入正确的手机号或邮箱');
      $("#name").focus();
      return false;
    }
    if(needValidate && !$.trim($("#phoneValidcode input").val())) {
      showError("请输入图片验证码");
      return false;
    }
    if(type == 'submit'){
      if(!$("#code").val()) {
        $("#code").focus();
        showError('请输入验证码');
        return false;
      }
      if(!$("#pass input").val() || $("#pass input").val().length < 6) {
        showError('密码不能少于6位');
        $("#pass input").focus();return;
      }
      if(!/^[\w\$\*\+-\.\?#]{6,}$/.test($("#pass input").val())){
        showError('密码仅能包含字母、数字或.$+-_?*#字符');
        $("#pass input").focus();
        return;
      }
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
  function handle() {
    var url = page == 'findpwd' ? '/sso/v2/login.do?method=forgetpw' : '/sso/v2/register.do?method=register_www';
    $.ajax({
      type: "post",
      url: url,
      dataType: 'json',
      data:{
        name: $("#name").val(),
        password: $("#pass input").val(),
        dpassword: $("#code").val(),
        source: source,
        channel:channel
      },
      success:function(resultJson){
        if(resultJson.status ==200){
          if(page == 'findpwd'){
            $(".form-container").hide();
            $(".find-success").show();
          } else {
            window.location.href= redirect ? decodeURIComponent(redirect) : "/user/";
          }
        }else {
          showError(resultJson.message);
        }
      }
    });
  }
})();