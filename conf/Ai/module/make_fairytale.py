import openai

openai.api_key = "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"# 원장희 gpt api key

def chatGPT(prompt):

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Write the title of the fairy tale in isolation, \
                   Write contents of the fairy tale with a minimum of 20 words and a maximum of 50 words, using words that are too easy for 2-4 year olds.\
                    using the keywords below. keywords are"+ str(prompt)}]
    )#Don't write fairy tales in numerical order, 
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