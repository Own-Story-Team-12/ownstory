from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc
from clarifai_grpc.grpc.api import service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2
import os
from conf.settings import get_secret

stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())
YOUR_CLARIFAI_API_KEY = get_secret("YOUR_CLARIFAI_API_KEY")

class Img2keyword:
    def __init__(self, image_url):
        """
        args:
            image_url : input image
        """
        self.image_url = image_url

    #local file이면 file_bytes로 인코딩
    def clarifai(self):

        current_dir = os.getcwd()
        image_url = os.path.join(current_dir + self.image_url)
        with open(image_url, "rb") as f:
            file_bytes = f.read()
        metadata = (("authorization", f"Key {YOUR_CLARIFAI_API_KEY}"),)
        request = service_pb2.PostModelOutputsRequest(
            model_id="general-image-recognition",
            inputs=[
                resources_pb2.Input(
                    #data=resources_pb2.Data(image=resources_pb2.Image(url=SAMPLE_URL))
                    data=resources_pb2.Data(image=resources_pb2.Image(base64=file_bytes))
                )
            ],
        )
        response = stub.PostModelOutputs(request, metadata=metadata)

        if response.status.code != status_code_pb2.SUCCESS:
            print(response)
            raise Exception(f"Request failed, status code: {response.status}")
        
        #keyword 추출
        keyword = []
        for concept in response.outputs[0].data.concepts:
            keyword.append(concept.name)
        
        #그림과 관련된 단어들 예외 처리
        exception = ['illustration','painting','vintage','print','art','sketch','vector','design','visuals','graphic design', 'no person', 'paper', 'chalk out', 'scribble', 'retro']
        for word in exception:
            if word in keyword:
                keyword.remove(word)

        return keyword[:5]
        
   
if __name__ == "__main__":
    #SAMPLE_URL = "https://samples.clarifai.com/metro-north.jpg"
    #SAMPLE_URL = "https://yourelc.com.au/wp-content/uploads/2022/07/Blog.png"
    SAMPLE_URL = 'https://artprojectsforkids.org/wp-content/uploads/2020/03/Boy-with-hat-simple-791x1024.jpg'
    #SAMPLE_URL = "C:\Users\lee\Downloads\IE001219155_STD.jpg"
    test = Img2keyword(SAMPLE_URL)
    result = test.clarifai()
    print(result)