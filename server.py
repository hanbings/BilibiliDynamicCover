from flask import Flask, request
import requests
 
app = Flask(__name__)
 
@app.route('/')
def root():
    return '如果你误打误撞进入到了这个页面 请立即离开 如果不是 希望网站管理员人没事'
    
 
@app.route('/iu', methods=['GET', 'POST'])
def image():
    url = "https://member.bilibili.com/x/vu/web/cover/up"
    querystring = {"cover":request.args.get("cover"),"csrf":request.args.get("csrf")}
    payload = ""
    headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': "SESSDATD="+str(request.args.get("sessdata")) +"; bili_jct="+str(request.args.get("csrf")) +";",
        'cache-control': "no-cache"
    }
    response = requests.request("POST", url, data=payload, headers=headers, params=querystring)
    print(request.args)
    print(headers)
    print(response.text)
    return response.text

@app.route('/cu', methods=['GET', 'POST']) 
def cover():
    url = "https://member.bilibili.com/x/vu/web/edit"
    querystring = {"csrf":request.args.get("csrf")}
    payload = ''
    headers = {
        'Cookie': "SESSDATD="+request.args.get("sessdata")+"; bili_jct="+request.args.get("csrf") +";",
        'Content-Type': "application/json",
        'cache-control': "no-cache"
    }
    response = requests.request("POST", url, data=payload, headers=headers, params=querystring)
    return response.text
 
if __name__ == '__main__':
    app.run()
