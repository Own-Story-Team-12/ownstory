from TTS.api import TTS
import os, subprocess

def text2TTS(script):
    tts = TTS(model_name="tts_models/en/ljspeech/glow-tts", progress_bar=False, gpu=False)
    
    # Text to speech to a file
    tts.tts_to_file(text = script, file_path="media/output.wav")
    PATH = '../media/output.wav'
    return PATH

def text2TTS_myvoice(script):
    command = f'tts --text "{script}" --model_path tts_model/model_file_me.pth --config_path tts_model/config.json --out_path media/myvoice.wav'
    print(command)
    subprocess.call(command, shell=True)

    PATH = '../media/myvoice.wav'
    return PATH



if __name__ == "__main__":
    script = 'There was once a dreadfully ugly beast called Silenus.'
    # result = text2TTS(script)
    text2TTS_myvoice(script)