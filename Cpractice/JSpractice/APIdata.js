function Table_Name_Way() {  //  获取表名
    //var token=$.cookie("token");
    var token_local="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ" +
        "HUERJIiwiZXhwIjoxNjA5ODQwMDQ1LCJpYXQiOjE2MDk4MzI4NDUsInVzZXJuY" +
        "W1lIjoiY2xvdWQifQ.Nx3VZmyWPu3qRaymp6cH8IqYxS1zwrv-TcutH7qfcZ4";
    var url_local="http://139.9.83.195/api/dpass/openApi/getApiList?";

    var table_local= new Map();

    $.ajax({
        type:"GET",
        async:false,
        url:url_local+"token="+token_local,
        success: function (data){
            var result = data.result;
            for (var i=0;i<result.length;i++){
                table_local.set(result[i].apiId,result[i].name);
            }
        }
    });
    return table_local;
}

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


function zhuanhuan(map) {
    let obj= Object.create(null);
    for (let[k,v] of map) {
        obj[k] = v;
    }
//object转json
    var d=JSON.stringify(obj);   //  此时 为一长串 字符串
    var e=eval('(' + d + ')');   //  转为  对象 形式
    return e;
}

/////////////////////////////////////////////////////////////////


function Col_Name_Way() {   //  获取每个表 对应 的  列名
    var table_name_map = Table_Name_Way();
    var col_name = new Map();
    //var token=$.cookie("token");
    var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHUE" +
        "RJIiwiZXhwIjoxNjA5ODQwMDQ1LCJpYXQiOjE2MDk4MzI4NDUsInVzZXJ" +
        "uYW1lIjoiY2xvdWQifQ.Nx3VZmyWPu3qRaymp6cH8IqYxS1zwrv-TcutH7qfcZ4";
    var url="http://139.9.83.195/api/dpass/openApi/getApiMetadata?";


    ////////////////////////////////////  此段将 Map  转为  json 对象
    let obj= Object.create(null);
    for (let[k,v] of table_name_map) {
        obj[k] = v;
    }
    //object转json
    var table_name_object=JSON.stringify(obj);   //  此时 为一长串 字符串
    var table_name_json=eval('(' + table_name_object + ')');   //  转为  对象 形式
    //console.log(table_name_json)
    ////////////////////////////////////////   此时 便已经转换 完毕了

    let mi=new Map();
    for( let key in table_name_json){  //  构建 外层 Map
        //  准备 构建 内层 数组

        /*
        aaajskjakjjk  */


        let mi_id=table_name_map.get(key);

        let mi_col=new Array();  //  构建 数组  存储  列名

        //mi_col.push(mi_id);
        //alert(mi_id)
        $.ajax({
            type: "GET",
            async:false,
            url:url+"token="+token+"&apiId="+"销售数据",
            success: function (data) {
                var result = data.result;
                for (var i=0;i<result.length;i++){
                    mi_col.push(result[i].title);
                }
            }
        })

        mi.set(mi_id,mi_col);  //  存为 map
    }
    return mi;
}




//////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function gzkj() {
    var test=new Map();
    test.set("baXXX","销售数据");
    test.set("baYYY","出库数据");
    test.set("baZZZ","入库数据");

    var a=["客户","商品","数量"];
    var c=new Map();
    c.set("销售数据",a);
    c.set("出库数据",a);
    c.set("入库数据",a);

     //var c=Col_Name_Way();


//console.log(c);  // c  代表 表——》列  ；Map 形式

////////////////////////////////////  此段将 Map  转为  json 对象
    var e=zhuanhuan(c);
////////////////////////////////////////   此时 便已经转换 完毕了

//  c 与 e 等价；；一个是 map ；； 一个是 json
    var child1=new Array();
    for (let biao in e){
        var children1=new Map();

        var B_Id=zhuanhuan(test);
        children1.set("title",biao);
        //children1.set("as","测试");

        for (let B_id_b in B_Id){
            if (test.get(B_id_b) == biao){
                children1.set("id",B_id_b);
            }
        }



        var ta1=c.get(biao);

        var children2=new Array();
        for (var i=0;i<ta1.length;i++){

            var child2=new Map();
            child2.set("title",ta1[i]);
            child2.set("id",ta1[i]); ////////////////////////////////  加 idd
            child2.set("children","");
            var child22=zhuanhuan(child2);

            children2.push(child22);
        }
        children1.set("children",children2);
        //children1.set("as","测试");
        var children11=zhuanhuan(children1);
        child1.push(children11);

    }

//console.log(children2);
//console.log(child1);

    var kz=new Map();
/*    kz.set("title","工作空间");
    kz.set("id","1");   //////////////////////////////////////  加 idd*/
    //kz.set("as","测试");
    kz.set("children",child1);

    var kz2=zhuanhuan(kz);

    //console.log(kz2);
    return child1;
}

//var sad=JSON.stringify(gzkj());
//console.log(sad);

var a=new Map();
a.set("a",1);
a.set("b",2);
var c=zhuanhuan(a);
//var b=a.keys();
//console.log(c);
for (let d in c){
    if (a.get(d) == 1){
       // console.log(d);
    }

}

var test=new Map();
test.set("baXXX","销售数据");
test.set("baYYY","出库数据");
test.set("baZZZ","入库数据");
test=zhuanhuan(test);
//console.log(test);

function saed() {
    var a=["客户","商品","数量"];
    var c=new Map();
    c.set("销售数据",a);
    c.set("出库数据",a);
    c.set("入库数据",a);
    return c;
}
//console.log(saed());








