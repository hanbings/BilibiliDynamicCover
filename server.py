from flask import Flask,send_file,request
from datetime import timedelta
import requests
import base64
from io import BytesIO

app = Flask(__name__,static_url_path='')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
 
@app.route('/')
def main():
    return app.send_static_file("index.html")
 
@app.route('/upload', methods=['POST'])
def upload():
    '利用相簿图床上传api上传封面'
    bvid=request.form.get('bvid')
    cookies=request.form.get('cookies')
    cover=request.files.get('cover')

    url = "https://api.vc.bilibili.com/api/v1/drawImage/upload"
    headers={
        'cookie':cookies,
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
    }
    payload ={
        'file_up':cover,
        'biz':(None,'draw'),
        'category':(None,'daily'),
        'build':(None,0),
        'mobi_app':(None,'web')
    }
    resp=requests.post(url,headers=headers,files=payload).json()
    print(resp)
    response=resp
    return response

if __name__ == '__main__':
    app.run()
