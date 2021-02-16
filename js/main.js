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
var server = 'ws://127.0.0.1:10086'

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
        base64 = dataURL;
    }
}

function upload() {
    // 上传
    var data = { 'csrf': bilijct, 'sessdata': sessdata, 'cover': base64, 'bvid': bvid }
    var ws = new WebSocket(server);
    //connection.send(JSON.stringify(data));
    //申请一个WebSocket对象，参数是服务端地址，同http协议使用http://开头一样，WebSocket协议的url使用ws://开头，另外安全的WebSocket协议使用wss://开头
    ws.onopen = function() {　　 //当WebSocket创建成功时，触发onopen事件
        console.log("open");　　
        ws.send(bvid);
        ws.send(sessdata);
        ws.send(bilijct);
        ws.send(base64);
    }
    ws.onmessage = function(e) {　　 //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据

        console.log(e.data);
    }
    ws.onclose = function(e) {　　 //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
        　　
        console.log("close");
    }
    ws.onerror = function(e) {　　 //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
            　　
            console.log(error);
        }
        // 再提示下 XD
    alert('请在此页面停留至已投稿 或许发送成功了 快去看看吧！ ^ _ ^');
}