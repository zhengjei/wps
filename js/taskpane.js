function onbuttonclick(idStr)
{
    if (typeof (wps.Enum) != "object") { // 如果没有内置枚举值
        wps.Enum = WPS_Enum
    }
    switch(idStr)
    {
        case "dockLeft":{
                let tsId = wps.PluginStorage.getItem("taskpane_id")
                if (tsId){
                    let tskpane = wps.GetTaskPane(tsId)
                    tskpane.DockPosition = wps.Enum.msoCTPDockPositionLeft
                }
                break
            }
        case "dockRight":{
            let tsId = wps.PluginStorage.getItem("taskpane_id")
                if (tsId){
                    let tskpane = wps.GetTaskPane(tsId)
                    tskpane.DockPosition = wps.Enum.msoCTPDockPositionRight
                }
                break
        }
        case "hideTaskPane":{
            let tsId = wps.PluginStorage.getItem("taskpane_id")
                if (tsId){
                    let tskpane = wps.GetTaskPane(tsId)
                    tskpane.Visible = false
                }
                break
        }
        case "addString":{
            var str ='[{ "name": "cxh", "sex": "man"},{"name":"cxh1","sex":"man1"},{"name":"cxh2","sex":"man2"}]';
            var obj = JSON.parse(str);
            var arr = Object.keys(obj);
            var keys = Object.keys(obj[0]);
            let curSheet = wps.EtApplication().ActiveSheet;
            if (curSheet){
                for(let i = 1; i <= keys.length; i++) {
                    curSheet.Cells.Item(1, i).Formula = keys[i-1]
                    for (let j = 1; j <= arr.length; j++) {
                        curSheet.Cells.Item(1 + j, i).Formula = obj[j - 1][keys[i-1]]
                    }
                    // curSheet.Cells.Item(1, 1).Formula="Hello, wps加载项!" + curSheet.Cells.Item(1, 1).Formula
                }
            }
            break;
        }
        case "getDocName":{
            let doc = wps.EtApplication().ActiveWorkbook
                let textValue = "";
                if (!doc){
                    textValue = textValue + "当前没有打开任何文档"
                    return
                }
                textValue = textValue + doc.Name
                document.getElementById("text_p").innerHTML = textValue
                break
        }
        case "clear":{
            let curSheet = wps.EtApplication().ActiveSheet;
            if (curSheet){
               curSheet.Cells.Clear();
            }
            break
        }
    }
}