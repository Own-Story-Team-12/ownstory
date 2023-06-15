from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc
from clarifai_grpc.grpc.api import service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2
from IPython.display import Image, display

stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())
YOUR_CLARIFAI_API_KEY = "935b6ea5b10e42998d669593fa58c7d8" #your api key
#YOUR_APPLICATION_ID = "your app_id "


class Keyword_Extraction:
    def __init__(self, image_url):
        """
        args:
            image_url : input image
        """
        self.image_url = image_url

    #local file이면 file_bytes로 인코딩
    def clarifai(self):
        image_url = self.image_url
        with open(image_url, "rb") as f:
            file_bytes = f.read()
        metadata = (("authorization", f"Key {YOUR_CLARIFAI_API_KEY}"),)
        request = service_pb2.PostModelOutputsRequest(
            model_id="general-image-recognition",
            #user_app_id=resources_pb2.UserAppIDSet(app_id=YOUR_APPLICATION_ID),
            inputs=[
                resources_pb2.Input(
                    # data=resources_pb2.Data(image=resources_pb2.Image(url=image_url))
                    data=resources_pb2.Data(image=resources_pb2.Image(base64=file_bytes))

                )
            ],
        )
        response = stub.PostModelOutputs(request, metadata=metadata)

        if response.status.code != status_code_pb2.SUCCESS:
            print(response)
            raise Exception(f"Request failed, status code: {response.status}")
        keyword = []
        for concept in response.outputs[0].data.concepts:
            keyword.append(concept.name)
        
        return keyword[:10]
        
   
if __name__ == "__main__":
    SAMPLE_URL = "https://samples.clarifai.com/metro-north.jpg"
    #SAMPLE_URL = "https://yourelc.com.au/wp-content/uploads/2022/07/Blog.png"
    #SAMPLE_URL = 'https://artprojectsforkids.org/wp-content/uploads/2020/03/Boy-with-hat-simple-791x1024.jpg'
    #SAMPLE_URL = "file://static\dog.jpg"
    test = Keyword_Extraction(image_url=SAMPLE_URL)
    result = test.clarifai()
    print(result)