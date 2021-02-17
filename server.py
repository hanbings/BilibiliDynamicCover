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

    payload = "cover="+str(request.json.get('base64'))+"&csrf="+str(request.json.get('bilijct'))
    headers = {
    'Content-Type': "application/x-www-form-urlencoded",
    'Cookie': "SESSDATA="+str(request.json.get('sessdata'))+"; bili_jct="+str(request.json.get('bilijct'))+";",
    'cache-control': "no-cache"
    }

    response = requests.request("POST", url, data=payload, headers=headers,verify=False)
    print(payload)
    print(response.text)
    return response.text

if __name__ == '__main__':
    app.run()
