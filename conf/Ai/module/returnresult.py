from Ai.module.img2keyword import Img2keyword
from Ai.module.translate import get_trans_papago
from Ai.module.translate_deepL import get_trans_deepl
from Ai.module.make_fairytale import chatGPT
from Ai.module.text2img import Txt2img
from Ai.module.text2keyword import textrank_keyword
from Ai.module.text2TTS import text2TTS, text2TTS_myvoice
import os

def result_image(file_absolute_path):
        
        #img로부터 keyword 추출 후 DB에 저장
        img_keywords = Img2keyword(file_absolute_path)
        img_keywords = img_keywords.clarifai()
        print(img_keywords)
        #동화 생성 후 제목, 내용 가져오기
        title, content = chatGPT(img_keywords)

        #TTS
       
        tts_example = text2TTS(content)
        print(tts_example)
        tts_myvoice = text2TTS_myvoice(content)

        #생성 동화 번역
        #deepL
        ko_title = get_trans_deepl(title)
        ko_content = get_trans_deepl(content)

        #papago
        # ko_title = get_trans_papago(title, 'en','ko')
        # ko_content = get_trans_papago(content, 'en','ko')

        # current_dir = os.getcwd()
        # current_dir = os.path.dirname(os.path.abspath(__file__))
        image_url = os.path.basename(file_absolute_path)
        #image_url = os.path.join(file_absolute_path)
        print(image_url)
        #result 페이지에 넘겨줄 값
        context = {
        'image' : image_url,
        'title' : title,
        'content' : content,
        'ko_title' : ko_title,
        'ko_content' : ko_content,
        'TTS_example' : tts_example,
        'TTS_myvoice' : tts_myvoice,

        }
        
        return context


def result_keyword(ko_keyword):
    #입력받은 키워드 영어로 변환 후 동화 생성
    #deepL
    en_keyword = get_trans_deepl(ko_keyword)

    # en_keyword = get_trans_papago(ko_keyword, 'ko','en')
    title, content = chatGPT(en_keyword)
  
    #TTS
    tts_example = text2TTS(content)
   
    tts_myvoice = text2TTS_myvoice(content)

    #생성된 동화 번역
    #deepL
    ko_title = get_trans_deepl(title)
    ko_content = get_trans_deepl(content)
  
    #papago
    # ko_title = get_trans_papago(title, 'en','ko')
    # ko_content = get_trans_papago(content, 'en','ko')
 
    context = {
        'image' : "no",
        'title' : title,
        'content' : content,
        'ko_title' : ko_title,
        'ko_content' : ko_content,
        'TTS_example' : tts_example,
        'TTS_myvoice' : tts_myvoice,
        }
    
    return context
