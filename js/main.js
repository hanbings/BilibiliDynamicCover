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
var server = 'http://127.0.0.1:5000'

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
    // 上传图片到bilibili图库
    imageUploader();
    // 上传动态封面到视频
    coverUploader();
    // 再提示下 XD
    alert('请在此页面停留至已投稿 或许发送成功了 快去看看吧！ ^ _ ^');
}

function imageUploader() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', server + '/iu');

    /*if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }*/

    var data = new FormData();
    data.append('csrf', bilijct);
    data.append('sessdata', sessdata);
    data.append('cover', base64);
    xhr.send(data)
}

function coverUploader() {

}