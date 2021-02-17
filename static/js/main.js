/**正如你所见 我刻意隐藏了上传到Bilibili的代码
 * 您放心 我不会保留您的任何数据
 * 如果您迫切希望得到这一部分代码
 * 您可以来联系我
 * Bilibili 不寂寒冰
 */
var base64;
var bvid;
var sessdata;
var bilijct;
var server = '/upload'

function saveBvid(obj) {
    bvid = obj.value;
}

function saveSessdata(obj) {
    sessdata = obj.value;
}

function saveBilibiliJct(obj) {
    bilijct = obj.value;
}

function imgChange(obj) {
    var image = obj.files[0]; //获取文件域中选中的图片
    var reader = new FileReader(); //实例化文件读取对象
    reader.readAsDataURL(image); //将文件读取为 DataURL,也就是base64编码
    reader.onload = function(ev) { //文件读取成功完成时触发
        var dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
        console.log(dataURL);
        base64 = encodeURIComponent(dataURL);
    }
}

function upload() {
    // 上传
    var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
    httpRequest.open('POST', server, true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type", "application/json"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    var obj = { 'bvid': bvid, 'sessdata': sessdata, 'bilijct': bilijct, 'base64': base64 };
    httpRequest.send(JSON.stringify(obj)); //发送请求 将json写入send中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function() { //请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
            var json = httpRequest.responseText; //获取到服务端返回的数据
            alert(json);
        }
    };
    alert('bwt 我不会保留你们任何的数据 以及......能不能过审看运气咯～')
}