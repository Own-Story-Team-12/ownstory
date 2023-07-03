import requests
import json
import time

class Txt2img():
    def __init__(self):
        self.headers = {
            'x-api-key': '',
            'Authorization': '',
            'Content-Type': 'application/json'
        }
    def txt2img(self, keyword):
        url = "https://api.monsterapi.ai/apis/add-task"
        payload = json.dumps({
        "model": "txt2img",
        "data": {
            "prompt": keyword + "cartoon, best quality, ultra-detailed, looking at viewer",
            "negprompt": "lowres, signs, memes, labels, title, food, text, error, mutant, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, caricature, ugly, boring, lacklustre, repetitive, cropped, (long neck), facebook, youtube, body horror, out of frame, mutilated, tiled, frame, border, porcelain skin, doll like, doll, bad quality, low quality, worst quality, ugly, disfigured, inhuman",
            "samples": 1,
            "steps": 500,
            "aspect_ratio": "square",
            "guidance_scale": 12.5,
            "seed": 2414
        }
        })
        
        response = requests.request("POST", url, headers = self.headers, data=payload)
        result = response.text
        parsed_data = json.loads(result)
        process_id = parsed_data["process_id"]
        return process_id

    def process_id(self, process_id):
        url = "https://api.monsterapi.ai/apis/task-status"

        payload = json.dumps({
        "process_id": process_id
        })
        while True:
            response = requests.request("POST", url, headers = self.headers, data=payload)
            result = response.text
            parsed_data = json.loads(result)
            try:
                result = parsed_data["response_data"]['result']['output']
                return result[0]
            except KeyError:
                time.sleep(3)
                continue
                
        
                

if __name__ == "__main__":
    keyword = 'singing lion, kind monkey'
    test = Txt2img()
    pc_id = test.txt2img(keyword)
    #time.sleep(45)
    start_time = time.time()  # 함수 실행 전 시간 측정
    print(test.process_id(pc_id))
    end_time = time.time()  # 함수 실행 후 시간 측정
    elapsed_time = end_time - start_time  # 걸린 시간 계산
    print(f"Elapsed Time: {elapsed_time:.2f} seconds")