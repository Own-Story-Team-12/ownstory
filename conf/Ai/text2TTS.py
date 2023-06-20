from TTS.api import TTS
import os

def text2TTS(script):
    tts = TTS(model_name="tts_models/en/ljspeech/glow-tts", progress_bar=False, gpu=False)
    # Text to speech to a file
    tts.tts_to_file(text = script, file_path="media/output.wav")
    PATH = '../../media/output.wav'
    return PATH

if __name__ == "__main__":
    script = 'There was once a dreadfully ugly beast called Silenus. \
        He pranced over the mountains on a pair of hairy goat’s legs. \
        A long tail swished behind him, but from the waist up he was a man, more or less.'
    result = text2TTS(script)