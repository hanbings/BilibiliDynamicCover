/**正如你所见 我刻意隐藏了上传到Bilibili的代码
 * 您放心 我不会保留您的任何数据
 * 如果您迫切希望得到这一部分代码
 * 您可以来联系我
 * Bilibili 不寂寒冰
 */
var cover;
var bvid;
var cookies;
var server = '/upload'

function saveBvid(obj) {
    bvid = obj.value;
}

function saveCookies(obj) {
    cookies = obj.value;
}

function imgChange(obj) {
    cover = obj.files[0]; //获取文件域中选中的图片
}

// 上传信息
function upload() {
    //创建xhr对象
    (xhr = new XMLHttpRequest()).open('POST', server, true);   //初始化url及方式
    //创建并添加form表单
    (form = new FormData).append('bvid',bvid);                 //稿件bvid
    form.append('cookies',cookies);                            //所有Cookies
    form.append('cover',cover);                                //封面文件
    //发送form表单
    xhr.send(form);
    /**
     * 获取数据后的处理程序
     */
    xhr.onreadystatechange = function() { //请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (xhr.readyState == 4 && xhr.status == 200) { //验证请求是否发送成功
            var json = xhr.responseText; //获取到服务端返回的数据
            alert(json);
        }
    };
    alert('bwt 我不会保留你们任何的数据 以及......能不能过审看运气咯～')
}