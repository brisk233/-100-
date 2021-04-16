/**
 * Created by 19010313 on 2019/2/27.
 */
function goJobs(flag){
//        var message = {flag: flag};
//        var obj = window.open("/staticFiles/pages/jobs.html", "*");
//        obj.postMessage(message, "*");
//        window.location.href = "/staticFiles/pages/jobs.html?flag=" + flag;
    window.open("/staticFiles/pages/jobs.html?tab=" + flag, "_blank")
}