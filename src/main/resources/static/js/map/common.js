$("#selfOrderServiceBtn").click(function () {
    //add 17030544 使用 spring security 校验是否登录,如果没有登录跳转passport.因为passport是跨域请求所有ajax会有异常
    //这里就不处理了.
    window.open("/workOrder!initVSelfHelpWorkOrder.action");
    // $.ajax({
    //     type:"post",
    //     url:"/customerAction!isLogin.action",
    //     error: function(){
    //     },
    //     success:function(data){
    //         try{
    //             var obj = eval('(' + data + ')');
    //             if(obj.success){  //已经登录
    //                 window.open("/workOrder!initVSelfHelpWorkOrder.action");
    //             }
    //         }catch(error){
    //             window.open("/workOrder!initSelfHelpWorkOrder.action");
    //         }
    //
    //     }
    // });
})