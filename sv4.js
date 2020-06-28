function decsojson4(jsf) {
    var head="['sojson.v4']"
    if(jsf.indexOf(head)==-1){return "Failed!\nGiven code is not encoded as Sojson v4."}
    args=jsf.substring(240,jsf.length-58).split(/[a-zA-Z]{1,}/)
    var str="";
    for(var i=0;i<args.length;i++){
        str+=String.fromCharCode(args[i])
    }
    return str
}