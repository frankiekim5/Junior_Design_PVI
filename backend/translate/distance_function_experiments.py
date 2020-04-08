import numpy as np
from test_lcs import lcs
from process_data import loadJSON, clean


receipt_names = ["G/ADE FR GLAC FREE", "CHIPS AHOY", "PF M/CH MILANO CKI", "KELL FR STRW MINWH", "GREEN ONIONS"]
target_names = ["GATORADE FROST THIRST QUENCHER GLACIER FREEZE FLAVORED", "CHIPS AHOY CHEWY COOKIES FAMILY SIZE ", "PEPPERIDGE FARM MILANO MILK CHOCOLATE COOKIES", "MINI WHEATS CEREAL STRAWBERRY", "GREEN SCALLION ONIONS"]

def lcs_score(str1, str2, score=True):
    m = len(str1)
    n = len(str2)
    j = 0
    i = 0

    # L = [[None]*(n+1) for i in xrange(m+1)] 
    L = np.zeros((m+1, n+1))

    for i in range(1, m+1, 1): 
        for j in range(1, n+1, 1): 
            if str1[i-1] == str2[j-1]: 
                L[i][j] = L[i-1][j-1]+1
            else: 
                L[i][j] = max(L[i-1][j] , L[i][j-1]) 
    # print(L[-1][-1])
    if score:
        return L[-1][-1] / m
    else:
        return L[-1][-1] == m

def bow(name, one=False):
    # TESTS TO RUN:
    # 1) Include spaces?
    # 2) Exclude numbers?
    # 3) Combo?
    legals = set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    
    word = np.zeros((len(legals),))
    for letter in clean(name):
        if letter in legals:
            word[legals.index(letter)] = 1 if one else word[legals.index(letter)] + 1
    
    return word

def cosine_score(receipt_name, full_name):
    # receipt_one = bow(receipt_name, one=True)
    receipt_bow = bow(receipt_name)

    full_one = bow(full_name, one=True)
    # full_bow = bow(full_name)

    # sim = receipt_bow @ full_one
    # overlap = receipt_one @ full_one
    sim = (receipt_bow @ full_one) / len(receipt_name)

    return sim

def cosine_score_2(receipt_name, full_name):
    receipt_one = bow(receipt_name, one=True)

    full_bow = bow(full_name)

    sim = (receipt_one @ full_bow) / len(full_name)

    try:
        assert sum(full_bow) <= len(full_name)
        assert sim <= 1
    except:
        print("RECEIPT:", receipt_one)
        print("FULL:", full_bow, sum(full_bow))
        print(full_name, len(full_name))
        print(receipt_one @ full_bow)
        print(sim)
        input()
    return sim

def cosine_score_combined(receipt_name, full_name):
    return cosine_score(receipt_name, full_name) * cosine_score_2(receipt_name, full_name)


def test_score(r_name, names, score, head=10, t_name=None):
    print(r_name)
    r_name = clean(r_name).strip()
    score_names = sorted(map(lambda name: (score(r_name, name.strip()), name.strip()), names), key=lambda a: -a[0])
    max_score = score_names[0][0]
    score_names = list(map(lambda s: (s[0] / max_score, s[1]), score_names))

    for score, name in score_names[:head]:
        print("\t%1.2f\t%s" % (score, name))
    
    # scores = {}
    if not t_name is None:
        for score, name in score_names:
            if t_name.strip() == name:
                print("\t", t_name.strip(), score)
                break
    return score_names

if __name__ == "__main__":
    names = loadJSON("../../data/publix_cleaned.json")

    for r_name, t_name in zip(receipt_names, target_names):
        # print(r_name)
        # r_name = clean(r_name).strip()

        # TESTING COSINE SCORE
        cosine_scores = test_score(r_name, names, cosine_score_combined, t_name=t_name)

        filtered_names = list(map(lambda c: c[1], filter(lambda c: c[0] > 0.5, cosine_scores)))

        # TESTING LCS SCORES
        lcs_scores = test_score(r_name, filtered_names, lcs_score, t_name=t_name)
        lcs_scores = test_score(r_name, names, lcs_score, t_name=t_name)
        # print(t_name)
