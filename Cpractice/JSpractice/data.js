var Work_Station=new Map();  // 工作空间
var sad=[1,3,4];
Work_Station.set("WK1","工作空间");
Work_Station.set("WK2","工作空间");
Work_Station.set("WK3",sad);
//console.log(Work_Station);

let obj= Object.create(null);
for (let[k,v] of Work_Station) {
    obj[k] = v;
}

console.log(obj);

//object转json
var s=JSON.stringify(obj);
// console.log(s)
var ssas=eval('(' + s + ')');
//console.log(ssas)

for (let keysa in ssas){
    //console.log(keysa);
    //console.log(Work_Station.get(keysa));
}
console.log(Work_Station.get("WK1"));





