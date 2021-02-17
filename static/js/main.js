/**正如你所见 我刻意隐藏了上传到Bilibili的代码
 * 您放心 我不会保留您的任何数据
 * 如果您迫切希望得到这一部分代码
 * 您可以来联系我
 * Bilibili 不寂寒冰
 * 很感谢小易哥哥的帮助 没有小易哥哥我可能需要更多的时间完成这个页面
 */
var cover;
var bvid;
var sessdata;
var bilijct;
var server = '/upload';

function saveBvid(obj) {
    bvid = obj.value;
}

function saveSessdata(obj) {
    sessdata = obj.value;
}

function saveBilijct(obj) {
    bilijct = obj.value;
}

function saveChange(obj) {
    cover = obj.files[0]; //获取文件域中选中的图片
}

// 上传信息
function upload() {
    //创建xhr对象
    (xhr = new XMLHttpRequest()).open('POST', server, true); //初始化url及方式
    //创建并添加form表单
    (form = new FormData).append('bvid', bvid); //稿件bvid
    form.append('sessdata', sessdata);
    form.append('bilijct', bilijct);
    form.append('cover', cover); //封面文件
    //发送form表单
    xhr.send(form);
    /**
     * 获取数据后的处理程序
     */
    xhr.onreadystatechange = function() { //请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (xhr.readyState == 4 && xhr.status == 200) { //验证请求是否发送成功
            var json = xhr.responseText; //获取到服务端返回的数据
            alert(json);
        } else { alert("看上去失败了呢... 或许是填错参数了 不会的话可以找找作者哦~"); }
    };
    alert('btw 我不会保留你们任何的数据 以及......能不能过审看运气咯～ 还有还有 如果发送成功 那么应该能在下一个窗口看到相关信息 如果没有任何提醒 您可以再次点击发送按钮')
}