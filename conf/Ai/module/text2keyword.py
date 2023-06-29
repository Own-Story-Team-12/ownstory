from collections import Counter
from collections import defaultdict
from scipy.sparse import csr_matrix
import numpy as np
import nltk
from sklearn.preprocessing import normalize
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import re



def download_nltk_resources():
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')

    try:
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('stopwords')


# 전처리 함수
def preprocess_sentence(sentence):
    stop_words = stopwords.words('english')
    # 영어를 제외한 숫자, 특수 문자 등은 전부 제거. 모든 알파벳은 소문자화
    sentence = [re.sub(r'[^a-zA-z\s]', '', word).lower() for word in sentence]
    # 불용어가 아니면서 단어가 실제로 존재해야 한다.
    return [word for word in sentence if word not in stop_words and word]

# 위 전처리 함수를 모든 문장에 대해서 수행. 이 함수를 호출하면 모든 행에 대해서 수행.
def preprocess_sentences(sentences):
    return [preprocess_sentence(sentence) for sentence in sentences]

def scan_vocabulary(sents, tokenize, min_count=1):
    sents = [tokenize(sent) for sent in sents]
    sents = preprocess_sentences(sents)
    counter = Counter(word for sent in sents for word in sent)
    counter = {w:c for w,c in counter.items() if c >= min_count}
    idx_to_vocab = [w for w, _ in sorted(counter.items(), key=lambda x:-x[1])]
    vocab_to_idx = {vocab:idx for idx, vocab in enumerate(idx_to_vocab)}
    return idx_to_vocab, vocab_to_idx

#두 단어 간의 유사도를 정의하기 위해서는 두 단어의 co-occurrence 를 계산
def cooccurrence(tokens, vocab_to_idx, window=2, min_cooccurrence=2):
    counter = defaultdict(int)
    for s, tokens_i in enumerate(tokens):
        vocabs = [vocab_to_idx[w] for w in tokens_i if w in vocab_to_idx]
        n = len(vocabs)
        for i, v in enumerate(vocabs):
            if window <= 0:
                b, e = 0, n
            else:
                b = max(0, i - window)
                e = min(i + window, n)
            for j in range(b, e):
                if i == j:
                    continue
                counter[(v, vocabs[j])] += 1
                counter[(vocabs[j], v)] += 1
    counter = {k:v for k,v in counter.items() if v >= min_cooccurrence}
    n_vocabs = len(vocab_to_idx)
    return dict_to_mat(counter, n_vocabs, n_vocabs)

#dict of dict 형식의 그래프를 scipy 의 sparse matrix 로 변환하는 함수
def dict_to_mat(d, n_rows, n_cols):
    rows, cols, data = [], [], []
    for (i, j), v in d.items():
        rows.append(i)
        cols.append(j)
        data.append(v)
    return csr_matrix((data, (rows, cols)), shape=(n_rows, n_cols))

def word_graph(sents, tokenize=None, min_count=2, window=2, min_cooccurrence=2):
    idx_to_vocab, vocab_to_idx = scan_vocabulary(sents, tokenize, min_count)
    tokens = [tokenize(sent) for sent in sents]
    g = cooccurrence(tokens, vocab_to_idx, window, min_cooccurrence)
    return g, idx_to_vocab

#만들어진 그래프에 PageRank 를 학습하는 함수
def pagerank(x, df=0.85, max_iter=30):
    assert 0 < df < 1

    # initialize
    A = normalize(x, axis=0, norm='l1')
    R = np.ones(A.shape[0]).reshape(-1,1)
    bias = (1 - df) * np.ones(A.shape[0]).reshape(-1,1)

    # iteration
    for _ in range(max_iter):
        R = df * (A * R) + bias

    return R

def textrank_keyword(sents, tokenize = word_tokenize, min_count = 1, window = -1, min_cooccurrence=2, df=0.85, max_iter=30, topk=30):
    download_nltk_resources()
    
    g, idx_to_vocab = word_graph(sents, tokenize, min_count, window, min_cooccurrence)
    R = pagerank(g, df, max_iter).reshape(-1)
    idxs = R.argsort()[-topk:]
    keywords = [(idx_to_vocab[idx], R[idx]) for idx in reversed(idxs)]
    keywords = [word[0] for word in keywords][:5]
    return keywords


if __name__ == "__main__":
    sents = ['Cheolsu was a kind boy who loved to sing. He lived with a cat who was also kind. The cat listened to Cheolsu sing every day and always purred in pleasure.',
    'One day, the cat got lost and Cheolsu was very sad.',
    'But the kind cat found its way back home with the help of friendly animals. Cheolsu was happy again and sang a song to thank the kind cat.']

    test = textrank_keyword(sents)
    print(test)