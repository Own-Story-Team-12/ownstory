import requests
from conf.settings import get_secret

def get_trans_deepl(text) -> str:
    url = "https://text-translator2.p.rapidapi.com/translate"

    payload = {
        "source_language": "en",
        "target_language": "ko",
        "text": text
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": get_secret("deepL_api_key"),
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com"
    }

    response = requests.post(url, data=payload, headers=headers)
    rescode = response.status_code
    if rescode==200:
                json_data = response.json()
                trans = json_data['data']['translatedText']
    return trans

if __name__ == "__main__":
    script = "Once upon a time, there lived a brave tiger named James in a dense forest surrounded by tall trees. James was not like any other tiger in the forest as he always fought for what was right and never harmed any other animals. One day, a group of mischievous monkeys came to James and told him that a group of hunters were coming to the forest to catch them all. James knew that he had to protect his friends and all the animals in the forest. James went to all the animals in the forest and told them about the hunters’ plan. Together, they all decided to create a plan to scare the hunters away. James had an idea that he would use his roar to make the hunters think that they were in danger. When the hunters arrived, James started to roar loudly and fiercely. The hunters were so scared that they dropped their nets and ran away as fast as they could. The other animals appreciated James’ bravery and thanked him for protecting them."
    text = get_trans_deepl(script)
    print(text)