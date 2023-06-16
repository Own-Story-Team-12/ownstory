import openai

openai.api_key = "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"# 원장희 gpt api key

def chatGPT(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "On the first line, write the title of your fairy tales, \
                   press enter and write a minimum of 20 words using very, very simple words,\
                    using the keyword  keywords are"+ str(prompt)}]
    )
    print(completion)
    result = completion.choices[0].message.content
    title = result.split("\n")[0]
    content = result.split("\n")[2:]
    content = ','.join(str(x) for x in content)
    return title, content

if __name__ == "__main__":

    title, content = chatGPT('lion, tiger')
    print(title)
    print(content)