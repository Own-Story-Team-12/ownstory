from TTS.api import TTS
import os, subprocess, uuid

def saveuuid(original_file_path):

    # UUID 생성
    unique_id = str(uuid.uuid4())
    
    # 파일 확장자 추출
    file_extension = os.path.splitext(original_file_path)[1]
    file_name = os.path.splitext(original_file_path)[0]

    # 새 파일 이름
    new_file_name = file_name + unique_id + file_extension

    # 새 파일 경로
    new_file_path = os.path.join(new_file_name)

    # 파일 이름 변경 및 저장
    os.rename(original_file_path, new_file_path)

    return new_file_path


def text2TTS(script):
    tts = TTS(model_name="tts_models/en/ljspeech/glow-tts", progress_bar=False, gpu=False)
   
    tts.tts_to_file(text = script, file_path="media/example_voice.wav")
       
    original_file_path = "media/example_voice.wav"

    file_path = '/' + saveuuid(original_file_path)
    file_name = os.path.basename(file_path)

    return file_name
    

def text2TTS_myvoice(script):
    command = f'tts --text "{script}" --model_path tts_model/model_file_me.pth --config_path tts_model/config.json --out_path media/my_voice.wav'
    print(command)
    subprocess.call(command, shell=True)
    original_file_path = "media/my_voice.wav"

    file_path = '/' + saveuuid(original_file_path)
    file_name = os.path.basename(file_path)

    return file_name



if __name__ == "__main__":
    script = 'There was once a dreadfully ugly beast called Silenus.'
    # result = text2TTS(script)
    text2TTS_myvoice(script)