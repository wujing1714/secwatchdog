﻿var num = data.total;
var searchNum;
$(function(){
            var html = "";
            var logintime = "";

            if (data != null) {
                if (data.data3.privilegelevel == 1) {
                    // $("#h3_adminname").html("国家管理员——" +
					// data.data1.managername);
                    $("#h3_adminname").html("国家管理员");
                    data.data2 = objToArray(data.data2);
                    for (var i = 0; i < data.data2.length; i++) {
                        logintime = ChangeTimeFormat(data.data2[i].logintime).split(" ")[0];
                        html += "<tr><td><a onclick=\"nameOnClick(this.id)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "\">" + data.data2[i].managername + "</a></td><td>" + logintime + "</td><td><a onclick=\"areaOnClick(this.id,2)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "*\">" + data.data2[i].managearea + "</a></td><td>" + data.data2[i].job + "</td><td>" + data.data2[i].dogtotalnum + "</td><td>" + data.data2[i].neckletedtotal + "</td><td>" + 0 + "</td><td>" + data.data2[i].officecall + "</td><td>" + data.data2[i].telphonecall + "</td></tr>";              
                    }

                } else {

                }
            }

            $("#tbody_pagemanagecommon").append(html);
            Page(1, 8);
            var tempOption = "";
            for (var i = 1; i <= totalPage; i++) {
                tempOption += '<option value=' + i + '>' + i + '</option>'
            }
            $("#jumpWhere").html(tempOption);
            document.getElementById("jumpWhere").options[0].selected = true;       
           
            $("#div_usersearch").click(function () {
                var searchhtml = "";
                var managername = $("#input_managername").val();
                if ($.trim(managername) == "") {
                	goPage(0,8);
                	 
                }
                else {
                	goSearchPage(0,8);
                
                }
            });

            $("#li_countrysee").click(function () {
                window.location.href = "../user/index.do";
            });
        }
  )

  function objToArray(array) {
    var arr = []
    for (var i in array) {
        arr.push(array[i]); 
    }
    return arr;
}

$(function () {
    $("#pagereflash").click(function () {
        window.location.reload();
    });
})

function areaOnClick(id, privilegelevel) {
    switch (privilegelevel) {
        case 2:
            id = id.substring(0, id.length - 1);
            window.location.href = "/PageManageCommon/ManageToNext?clickname=" + id + "&clicknamelevel=" + privilegelevel;
    }
}

function nameOnClick(id) {
    // alert("跳转至" + id + "信息页面");
    window.location.href = "/Index/UserProfile?viewuser=" + id;
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function ChangeTimeFormat(logintime) {
    // 20170926084552 ---> 2017.09.26 08:45:52
    var year = logintime.substring(0, 4);
    var month = logintime.substring(4, 6);
    var day = logintime.substring(6, 8);
    var hour = logintime.substring(8, 10);
    var min = logintime.substring(10, 12);
    var sec = logintime.substring(12);
    return year + "." + month + "." + day + " " + hour + ":" + min + ":" + sec;
}

// 如果需要设定自定义过期时间
// 那么把上面的setCookie 函数换成下面两个函数就ok;
// 程序代码
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

/**
 * 分页函数 pno--页数 psize--每页显示记录数 分页部分是从真实数据行开始，因而存在加减某个常数，以确定真正的记录数
 * 纯js分页实质是数据行全部加载，通过是否显示属性完成分页功能
 */

var pageSize = 0;// 每页显示行数
var currentPage_ = 1;// 当前页全局变量，用于跳转时判断是否在相同页，在就不跳，否则跳转。
var totalPage;// 总页数
function Page(pno, psize) {

    pageSize = psize;// 每页显示行数
    // 总共分几页
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;// 当前页数
    currentPage_ = currentPage;
 

    var tempStr = "共" + num + "条记录 分" + totalPage + "页 当前第" + currentPage + "页";
    document.getElementById("barcon1").innerHTML = tempStr;

    if (currentPage > 1) {
        $("#firstPage").on("click", function () {
        	 goPage(0, psize);

        }).removeClass("ban");
        $("#prePage").on("click", function () {
        	 goPage((currentPage -1 -1)*psize, psize);
        }).removeClass("ban");
    } else {
        $("#firstPage").off("click").addClass("ban");
        $("#prePage").off("click").addClass("ban");
    }

    if (currentPage < totalPage) {
        $("#nextPage").on("click", function () {
        	goPage((currentPage + 1 -1)*psize , psize);
        }).removeClass("ban")
        $("#lastPage").on("click", function () {
        	goPage((totalPage-1)*psize, psize);
        }).removeClass("ban")
    } else {
        $("#nextPage").off("click").addClass("ban");
        $("#lastPage").off("click").addClass("ban");
    }
    $("#jumpPage").on("click", function(){
    	jumpPage();
    })
 
}

function jumpPage() {
    var toPage = parseInt($("#jumpWhere").val());
    if (toPage != currentPage_) {
    	goPage((toPage-1)*pageSize, pageSize);
    }
}


function jumpSearchPage() {
    var toPage = parseInt($("#jumpWhere").val());
    if (toPage != currentPage_) {
    	goSearchPage((toPage-1)*pageSize, pageSize);
    }
}


function goPage(pno, psize){

    $.ajax({
        url: "../pageManageCommon/indexApi.do",
        type: "POST",
        data: JSON.stringify({'districtcode': "0",'managername': data.data3.managername,'startItem': pno, 'pageSize': psize}),                    
        contentType: "application/json",
        success: function (data) {
            data = eval("(" + data + ")");
            data.data2 = objToArray(data.data2);
            var searchhtml = "";
            var logintime = "";
            for (var i = 0; i < data.data2.length; i++) {
                logintime = ChangeTimeFormat(data.data2[i].logintime).split(" ")[0];
                searchhtml += "<tr><td><a onclick=\"nameOnClick(this.id)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "\">" + data.data2[i].managername + "</a></td><td>" + logintime + "</td><td>" + data.data2[i].managearea + "</td><td>" + data.data2[i].job + "</td><td>" + data.data2[i].dogtotalnum + "</td><td>" + data.data2[i].neckletedtotal + "</td><td>" + 0 + "</td><td>" + data.data2[i].officecall + "</td><td>" + data.data2[i].telphonecall + "</td></tr>";
            }
            $("#tbody_pagemanagecommon").html(searchhtml);
            num = data.total;
            Page(pno/psize+1, psize);
            var tempOption = "";
            for (var i = 1; i <= totalPage; i++) {
                tempOption += '<option value=' + i + '>' + i + '</option>'
            }
            $("#jumpWhere").html(tempOption);
            document.getElementById("jumpWhere").options[pno/psize+1-1].selected = true;
        }
    });
} 

function searchPage(pno, psize) {

    pageSize = psize;// 每页显示行数
    // 总共分几页
    if (searchNum / pageSize > parseInt(searchNum / pageSize)) {
        totalPage = parseInt(searchNum / pageSize) + 1;
    } else {
        totalPage = parseInt(searchNum / pageSize);
    }
    var currentPage = pno;// 当前页数
    currentPage_ = currentPage;
 

    var tempStr = "共" + searchNum + "条记录 分" + totalPage + "页 当前第" + currentPage + "页";
    document.getElementById("barcon1").innerHTML = tempStr;

    if (currentPage > 1) {
        $("#firstPage").on("click", function () {
        	goSearchPage(0, psize);

         //   Page(1, psize);
        }).removeClass("ban");
        $("#prePage").on("click", function () {
        	goSearchPage((currentPage -1 -1)*psize, psize);
  
          //  Page(currentPage - 1, psize);
        }).removeClass("ban");
    } else {
        $("#firstPage").off("click").addClass("ban");
        $("#prePage").off("click").addClass("ban");
    }

    if (currentPage < totalPage) {
        $("#nextPage").on("click", function () {
        	goSearchPage((currentPage + 1 -1)*psize , psize);
          //  Page(currentPage + 1, psize);
        }).removeClass("ban")
        $("#lastPage").on("click", function () {
        	goSearchPage((totalPage-1)*psize, psize)
        //    Page(totalPage, psize);
        }).removeClass("ban")
    } else {
        $("#nextPage").off("click").addClass("ban");
        $("#lastPage").off("click").addClass("ban");
    }
    $("#jumpPage").on("click", function(){
    	jumpSearchPage();
    })
   

}

function goSearchPage(pno, psize){
	var searchhtml = "";
    var managername = $("#input_managername").val();
    var logintime = "";

    if ($.trim(managername) == "") {
    	goPage(0,8);
    	Page(1,8);
    }
    else{
	    $.ajax({        
	        url: "../pageManageCommon/searchManagerApi.do",
	        type: "POST",
	        data: JSON.stringify({'clicktype': "onlynextonlinename",'managername':managername,'username':data.data1.username,'districtcode':"0",'startItem': pno, 'pageSize': psize}),                    
	        contentType: "application/json",
	        success: function (data) {
	            data = eval("(" + data + ")");
	            data.data1 = objToArray(data.data1);
	            for (var i = 0; i < data.data1.length; i++) {
	                logintime = ChangeTimeFormat(data.data1[i].logintime).split(" ")[0];
	                searchhtml += "<tr><td><a onclick=\"nameOnClick(this.id)\" style=\"cursor:pointer;\" id=\"" + data.data1[i].username + "\">" + data.data1[i].managername + "</a></td><td>" + logintime + "</td><td>" + data.data1[i].managearea + "</td><td>" + data.data1[i].job + "</td><td>" + data.data1[i].dogtotalnum + "</td><td>" + data.data1[i].neckletedtotal + "</td><td>" + 0 + "</td><td>" + data.data1[i].officecall + "</td><td>" + data.data1[i].telphonecall + "</td></tr>";
	            }
	            $("#tbody_pagemanagecommon").html(searchhtml);
	            searchNum = data.searchTotal
	            searchPage(pno/psize+1, psize)
	            var tempOption = "";
	            for (var i = 1; i <= totalPage; i++) {
	                tempOption += '<option value=' + i + '>' + i + '</option>'
	            }
	            $("#jumpWhere").html(tempOption);
	            document.getElementById("jumpWhere").options[pno/psize+1-1].selected = true;
	      
	        }
	    });
    }
} 