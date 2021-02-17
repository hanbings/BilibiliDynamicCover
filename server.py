from flask import Flask,send_file,request
from datetime import timedelta
import requests
import base64
from io import BytesIO
import json

app = Flask(__name__,static_url_path='')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
 
@app.route('/')
def main():
    return app.send_static_file("index.html")
 
@app.route('/upload', methods=['POST'])
def upload():
    
    bvid=request.form.get('bvid')
    sessdata=request.form.get('sessdata')
    csrf=request.form.get('bilijct')
    cover=request.files.get('cover')
    cookies=str("SESSDATA="+sessdata+"; bili_jct"+csrf+";")

    # 利用相簿图床上传api上传封面
    url = "http://api.vc.bilibili.com/api/v1/drawImage/upload"
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
    CoverUploaderResp=requests.post(url,headers=headers,files=payload).json()

    # 获取视频信息
    url = "http://member.bilibili.com/x/web/archive/view?history=&bvid=" + bvid
    headers={
        'cookie':cookies,
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
    }
    VideoGetterResp=requests.get(url,headers=headers).json()
    print(VideoGetterResp)

    # 视频模板 上传封面
    url = "http://member.bilibili.com/x/vu/web/edit?csrf=" + csrf
    headers= {

        'cookie':cookies,
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
    }
    payload = {
        "copyright": VideoGetterResp['data']['archive']['copyright'],
	    "videos": VideoGetterResp['data']['videos'],
	    "no_reprint": VideoGetterResp['data']['archive']['no_reprint'],
	    "interactive": VideoGetterResp['data']['archive']['interactive'],
	    "tid": VideoGetterResp['data']['archive']['tid'],
	    "cover": CoverUploaderResp['data']['image_url'],
	    "title": VideoGetterResp['data']['archive']['title'],
	    "tag": VideoGetterResp['data']['archive']['tag'],
	    "desc_format_id": VideoGetterResp['data']['archive']['desc_format_id'],
	    "desc": VideoGetterResp['data']['archive']['desc'],
	    "dynamic": VideoGetterResp['data']['archive']['dynamic'],
	    "subtitle": {
		    "open": 0,
		    "lan": VideoGetterResp['data']['subtitle']['lan']
	        },
	    "handle_staff": VideoGetterResp['data']['show_staff'],
	    "is_360": VideoGetterResp['data']['archive']['is_360'],
	    "aid": VideoGetterResp['data']['archive']['aid']
    }
    VideoUploaderResp=requests.post(url,headers=headers,data=json.dumps(payload)).json()

    # 聚合信息 返回前端
    response=VideoUploaderResp
    return response

if __name__ == '__main__':
    app.run()
