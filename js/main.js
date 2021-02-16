/**正如你所见 我们刻意隐藏了上传到Bilibili的代码
 * 您放心 我们不会保留您的任何数据
 * 如果您迫切希望得到这一部分代码
 * 您可以来联系我们
 * Bilibili 不寂寒冰
 */
function upload() {
    var fileInput = document.querySelector('#image');
    fileInput.onchange = function() {
        var filereader = new FileReader();
        var fileType = this.files[0].type;
        filereader.onload = function() {
            console.log(this.result);
        }
        console.log(this.files[0]);
        filereader.readAsDataURL(this.files[0]);
    }
    console.dir(fileInput);
    alert('或许发送成功了 快去看看吧！ ^ _ ^');
}