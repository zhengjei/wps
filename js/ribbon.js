
//这个函数在整个wps加载项中是第一个执行的
function OnAddinLoad(ribbonUI){
    if (typeof (wps.ribbonUI) != "object"){
		wps.ribbonUI = ribbonUI
    }
    
    if (typeof (wps.Enum) != "object") { // 如果没有内置枚举值
        wps.Enum = WPS_Enum
    }

    wps.PluginStorage.setItem("EnableFlag", false) //往PluginStorage中设置一个标记，用于控制两个按钮的置灰
    wps.PluginStorage.setItem("ApiEventFlag", false) //往PluginStorage中设置一个标记，用于控制ApiEvent的按钮label
    return true
}

function OnAction(control) {
    const eleId = control.Id
    switch (eleId) {
        case "btnShowMsg":
            {
                const doc = wps.EtApplication().ActiveWorkbook
                if (!doc) {
                    alert("当前没有打开任何文档")
                    return
                }
                alert(doc.Name)
            }
            break;
        case "btnIsEnbable":
            {
                let bFlag = wps.PluginStorage.getItem("EnableFlag")
                wps.PluginStorage.setItem("EnableFlag", !bFlag)
                
                //通知wps刷新以下几个按饰的状态
                wps.ribbonUI.InvalidateControl("btnIsEnbable")
                wps.ribbonUI.InvalidateControl("btnShowDialog2")


                wps.ribbonUI.InvalidateControl("btnShowTaskPane")
                wps.ribbonUI.InvalidateControl("btnShowTaskPane2")
                wps.ribbonUI.InvalidateControl("clear")
                wps.ribbonUI.InvalidateControl("table")
                //wps.ribbonUI.Invalidate(); //这行代码打开则是刷新所有的按钮状态
                break
            }
        case "table":

            wps.ShowDialog(GetUrlPath() + "/ui/table.html", "筛选", 900 * window.devicePixelRatio, 600 * window.devicePixelRatio, false)

            break;

        case "btnShowDialog":
            wps.ShowDialog(GetUrlPath() + "/ui/login.html", "欢迎登录", 900 * window.devicePixelRatio, 600 * window.devicePixelRatio, false)

            break;

        case "cancellation":
           $.cookie("token",null)
            alert("注销成功");
            var a = -1
            wps.PluginStorage.setItem("EnableFlag", !a)
            //通知wps刷新以下几个按饰的状态
            wps.ribbonUI.InvalidateControl("btnIsEnbable")
            wps.ribbonUI.InvalidateControl("btnShowDialog2")


            wps.ribbonUI.InvalidateControl("btnShowTaskPane")
            wps.ribbonUI.InvalidateControl("btnShowTaskPane2")
            wps.ribbonUI.InvalidateControl("clear")
            break;
        case "btnShowTaskPane":
            {
                let tsId = wps.PluginStorage.getItem("taskpane_id1")
                if (!tsId) {
                    let tskpane = wps.CreateTaskPane(GetUrlPath() + "/ui/caidan.html")
                    let id = tskpane.ID
                    wps.PluginStorage.setItem("taskpane_id1", id)
                    tskpane.Visible = true
                } else {
                    let tskpane = wps.GetTaskPane(tsId)
                    tskpane.Visible = !tskpane.Visible
                }
            }
            break

        case "btnShowTaskPane2":
        {
            let tsId2 = wps.PluginStorage.getItem("taskpane_id2")
            if (!tsId2) {
                let tskpane2 = wps.CreateTaskPane(GetUrlPath() + "/ui/taskpane.html")
                let id2 = tskpane2.ID
                wps.PluginStorage.setItem("taskpane_id2", id2)
                tskpane2.Visible = true
            } else {
                let tskpane2 = wps.GetTaskPane(tsId2)
                tskpane2.Visible = false
            }
        }
            break


        case "btnApiEvent":
            {
                let bFlag = wps.PluginStorage.getItem("ApiEventFlag")
                let bRegister = bFlag ? false : true
                wps.PluginStorage.setItem("ApiEventFlag", bRegister)
                if (bRegister){
                    wps.ApiEvent.AddApiEventListener('NewWorkbook', OnNewDocumentApiEvent)
                }
                else{
                    wps.ApiEvent.RemoveApiEventListener('NewWorkbook', OnNewDocumentApiEvent)
                }

                wps.ribbonUI.InvalidateControl("btnApiEvent") 
            }
            break

        case "clear":{
            let curSheet = wps.EtApplication().ActiveSheet;
            if (curSheet){
                curSheet.Cells.Clear();
            }
            break}




        case "btnWebNotify":
            {
                let currentTime = new Date()
                let timeStr = currentTime.getHours() + ':' + currentTime.getMinutes() + ":" + currentTime.getSeconds()
                wps.OAAssist.WebNotify("这行内容由wps加载项主动送达给业务系统，可以任意自定义, 比如时间值:" + timeStr)
            }
            break
        default:
            break
    }
    return true
}

function GetImage(control) {
    const eleId = control.Id
    switch (eleId) {
        case "btnShowMsg":
            return "images/1.svg"
        case "btnShowDialog":
            return "images/2.svg"
        case "btnShowTaskPane":
            return "images/3.svg"
        default:
            ;
    }
    return "images/newFromTemp.svg"
}

function OnGetEnabled(control) {
    const eleId = control.Id
    switch (eleId) {
        case "btnShowMsg":
            return true
            break
        case "btnShowDialog":
            {
                //let bFlag = wps.PluginStorage.getItem("EnableFlag")
               // return bFlag
                break
            }
        case "btnShowTaskPane":
            {
                let bFlag = wps.PluginStorage.getItem("EnableFlag")
                return bFlag
                break
            }

            /////////////////////////////////////
        case "btnShowTaskPane2":
        {
            let bFlag = wps.PluginStorage.getItem("EnableFlag")
            return bFlag
            break
        }
        case "clear":
        {
            let bFlag = wps.PluginStorage.getItem("EnableFlag")
            return bFlag
            break
        }
        case "btnShowDialog2":
        {
            let bFlag = wps.PluginStorage.getItem("EnableFlag")
            return bFlag
            break
        }


        default:
            break
    }
    return true
}

function OnGetVisible(control){
    return true
}

function OnGetLabel(control){
    const eleId = control.Id
    switch (eleId) {
        case "btnIsEnbable":
        {
            let bFlag = wps.PluginStorage.getItem("EnableFlag")
            return bFlag ?  "按钮Disable" : "按钮Enable"
            break
        }
        case "btnApiEvent":
        {
            let bFlag = wps.PluginStorage.getItem("ApiEventFlag")
            return bFlag ? "清除新建文件事件" : "注册新建文件事件"
            break
        }    
    }
    return ""
}

function OnNewDocumentApiEvent(doc){
    alert("新建文件事件响应，取文件名: " + doc.Name)
}

function LoginSuccess() {
    var token=$.cookie("token");
    //var token=3;

    if (token!=null){
        //alert("开");
        let bOpen=0;
        wps.PluginStorage.setItem("EnableFlag", !bOpen);
        wps.ribbonUI.InvalidateControl("btnShowDialog2");
        wps.ribbonUI.InvalidateControl("btnShowTaskPane");
        wps.ribbonUI.InvalidateControl("btnIsEnbable");
        wps.ribbonUI.InvalidateControl("clear");
        wps.ribbonUI.InvalidateControl("btnShowTaskPane2");

    }
    else {
        //alert("关了哟");
        let bClose=-1;
        wps.PluginStorage.setItem("EnableFlag", !bClose);
        //wps.ribbonUI.InvalidateControl("btnShowDialog");
        wps.ribbonUI.InvalidateControl("btnShowTaskPane");
        wps.ribbonUI.InvalidateControl("btnIsEnbable");
        wps.ribbonUI.InvalidateControl("clear");
        wps.ribbonUI.InvalidateControl("btnShowTaskPane2");

    }
}


function station() {
    let tsId3 = wps.PluginStorage.getItem("taskpane_id3")
    if (!tsId3) {
        let tskpane3 = wps.CreateTaskPane(GetUrlPath() + "/taskpane.html")
        let id3 = tskpane3.ID
        wps.PluginStorage.setItem("taskpane_id3", id3)
        tskpane3.Visible = true
    } else {
        let tskpane3 = wps.GetTaskPane(tsId3)
        tskpane3.Visible = !tskpane3.Visible
    }
    //alert(tsId3);
    //alert(!tsId3);
}
