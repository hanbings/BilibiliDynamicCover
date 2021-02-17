from flask import Flask,send_file,request
from datetime import timedelta
import requests

app = Flask(__name__,static_url_path='')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
 
@app.route('/')
def main():
    return app.send_static_file("index.html")
 
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    url = "http://member.bilibili.com/x/vu/web/cover/up"

    payload ={
        'cover':request.json.get('base64'),
        'csrf':request.json.get('bilijct')
    }
    cookies={
        'SESSDATA':request.json.get('sessdata'),
        'bili_jct':request.json.get('bilijct')
    }
    hearders={
        'Content-Type':''
    }

    response = requests.post(url, data=payload, cookies=cookies,verify=False)
    print(payload)
    print(response.text)
    return response.text

if __name__ == '__main__':
    app.run()
