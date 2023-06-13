import requests
import json
import time

class txt2img():
    def __init__(self):
        self.headers = {
            'x-api-key': '7N3tPOOwK92nIiFfdrMUu6rDEI4gae6r1frRRVux',
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkyMzE4MzksImlhdCI6MTY4NjYzOTgzOSwic3ViIjoiOWFlYjc0YTQ2YWNkNWQ3NDNkYmY5YjhjOTJiZWM2YTgifQ.Rk0lfb8RE4qjhY-hyWqXzEMzzx1tkP82m38f7W3irqw',
            'Content-Type': 'application/json'
        }
    def input(self, script):
        url = "https://api.monsterapi.ai/apis/add-task"
        payload = json.dumps({
        "model": "txt2img",
        "data": {
            "prompt": script + "cartoon, fairytale, illustration",
            "negprompt": "",
            "samples": 1,
            "steps": 50,
            "aspect_ratio": "square",
            "strength": 0.75,
            "guidance_scale": 7.5,
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

        response = requests.request("POST", url, headers = self.headers, data=payload)
        result = response.text
        parsed_data = json.loads(result)
        result = parsed_data["response_data"]
        return result
                

if __name__ == "__main__":
    script = 'cartoon, tiger, tall trees, monkeys.'
    test = txt2img()
    pc_id = test.input(script)
    time.sleep(10)
    print(test.process_id(pc_id))