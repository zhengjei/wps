function apiJson() {
   result="";
    $.ajax({
        async:false,
        type: "GET",
        url: "https://api.apishop.net/common/joke/getJokesByRandom?apiKey=Xn8TqB9a2294f6a36e4716726bce47baf9df0815204776e&pageSize=20",
        dataType: "json",
        success: function(data) {
            return data;
           /* var list = "";
            result = data.result;
            var keys = Object.keys(result[0])
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]
                list +=
                    '<li><button style="margin:3px;" class="b1" value="'+key+'">'+key+'</button></li>'
                    // '<li><button style="margin:3px;" id="b1" onclick="f('+key+')">'+key+'</button></li>'
            }
                document.getElementById('ol').innerHTML = list;*/
        }
    });
   
}
function f(key) {
    console.log(key)
    var arr = Object.keys(result);
    let curSheet = wps.EtApplication().ActiveSheet;
    if (curSheet){
        var i=1;
        while (curSheet.Cells.Item(1, i).Formula){
            i++;
        }
            curSheet.Cells.Item(1, i).Formula = key
            for (let j = 1; j <= arr.length; j++) {
                curSheet.Cells.Item(1 + j, i).Formula = result[j - 1][key]
            }
            // curSheet.Cells.Item(1, 1).Formula="Hello, wps加载项!" + curSheet.Cells.Item(1, 1).Formula

    }
}
