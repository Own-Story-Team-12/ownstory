import openai
from conf.settings import get_secret

openai.api_key = get_secret("openai_api_key")

def chatGPT(prompt):

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "We're going to create a fairy tale. On the first line, write the title of the fairy tale, but don't start with Title:. \
                   Use a minimum of 100 words and a maximum of 150 words to write the story in very simple words that a 2 to 4 year old can read. \
                   Don't start your story with Content:. And use these keywords to describe your fairy tale. The keywords are " + str(prompt)}]
    )
    
    # "Write the title of the fairy tale in isolation, Don't start the title with title:. \
    #                Don't start the content with content:. Write contents of the fairy tale with a minimum of 20 words and a maximum of 50 words, using words that are too easy for 2-4 year olds.\
    #                 using the keywords below.  keywords are"
    print(completion)
    result = completion.choices[0].message.content
    title = result.split("\n")[0]
    content = result.split("\n")[2:]
    content = ','.join(str(x) for x in content)
    return title, content

if __name__ == "__main__":

    title, content = chatGPT('lee, brave lion, a lion meets many animals, forest')
    print(title)
    print(content)