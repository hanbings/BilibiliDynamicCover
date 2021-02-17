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
    # 从私信API上传封面图片
    url = "https://api.vc.bilibili.com/api/v1/drawImage/upload"

    print(request.json.get('base64'))
    '''
    payload ={
        'file_up':BytesIO(base64.b64decode()),
        'category':(None,'daily')
    }
    cookies={
        'SESSDATA':request.json.get('sessdata'),
        'bili_jct':request.json.get('bilijct')
    }
    '''
    '''
    hearders={
        'Content-Type':''
    }
    '''
    '''
    response = requests.post(url,files=payload, cookies=cookies)
    print(payload)
    print(response.text)
    return response.text
    '''

if __name__ == '__main__':
    app.run()
