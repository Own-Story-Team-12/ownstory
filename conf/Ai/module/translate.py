import requests
from conf.settings import get_secret

client_id = "kWDLr7w6bYqAvIXfikpC" # 개발자 센터에서 발급받은 Client ID 값
client_secret = get_secret("papago_api_key") # 개발자 센터에서 발급받은 Client Secret 값
# text: 입력 텍스트, source: 입력 텍스트 언어, target: 출력 텍스트 언어
def get_trans_papago(text, source, target) -> str:

    url = "https://openapi.naver.com/v1/papago/n2mt"
    header = {"X-Naver-Client-Id": client_id,
                "X-Naver-Client-Secret": client_secret}
    data = {'text': text,
            'source':source,
            'target':target}
    
    trans = ""
    try:
        response = requests.post(url, headers=header, data=data)
        rescode = response.status_code
        if rescode==200:
            json_data = response.json()
            trans = json_data['message']['result']['translatedText']
    except Exception as e:
        print(e)
    
    return trans

if __name__ == "__main__":
    text = get_trans_papago("Once upon a time in a country, far, far away, there lived an old man who loved nature", 'en', 'ko')
    print(text)