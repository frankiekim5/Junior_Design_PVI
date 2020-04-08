import numpy as np
from functools import reduce
from load import *
from distance_function_experiments import bow, lcs_score
from process_data import *

def _bow(name, one=False, legals=None):
    
    word = np.zeros((len(legals.keys()),))
    for w in clean(name):
        if w in legals:
            word[legals[w]] = 1 if one else word[legals[w]] + 1
    
    return word
    
receipt_names = ["G/ADE FR GLAC FREE", "CHIPS AHOY", "PF M/CH MILANO CKI", "KELL FR STRW MINWH", "GREEN ONIONS"]

words_file = "words.npy"
dictionary_file = "dictionary.json"

names_file = "names.npy"
names_dictionary_file = "names_dictionary.json"

def generate_bigrams(names):
    names = map(lambda name: name.strip().split(), names)
    names = list(names)
    words = set(reduce(lambda a,b: a + b, names))

    for name in names:
        for i in range(len(name) - 1):
            words.add("%s %s" % (name[i], name[i+1]))
    
    dictionary = dict(enumerate(words))

    words = np.array(list(map(lambda word: bow(word, one=True), words)))

    return dictionary, words

def generate_word_bows(names, word_to_index):
    names_array = list(map(lambda name: _bow(name, one=True, legals=word_to_index), list(names)))
    return dict(enumerate(names)), np.asarray(names_array)

def lcs_mapping(name, dictionary): #needs word to index
    def _lcs_word(word):
        mapped = np.zeros(len(dictionary)).astype(bool)
        for w in dictionary.keys():
            mapped[dictionary[w]] = lcs_score(word, w, score=False)
        return mapped
    name = name.strip().split()
    if not name:
        return None
    result = np.ones(len(dictionary)).astype(bool)
    for word in name:
        result = np.logical_or(_lcs_word(word), result)
    return result.astype(int)

def word_lcs_score(r_name_mapped, names_array, names_to_index):
    print("in word score")
    r_name_mapped = np.reshape(r_name_mapped, (-1, 1))
    scores = names_array @ r_name_mapped
    print('dot_product_finished')

    names = list(names_to_index.keys())
    names.sort(key=lambda name: -scores[names_to_index[name]])
    
    return names



if __name__ == "__main__":
    names = loadJSON("../../data/publix_cleaned.json")

    if not words_file or not dictionary_file:
        dictionary, words_array = generate_bigrams(names)

        np.save("words.npy", words)
        writeJSON(dictionary, "dictionary.json")
    else:
        dictionary = loadJSON(dictionary_file)
        words_array = np.load(words_file)

    word_to_index = {v: int(k) for k, v in dictionary.items()}
    index_to_word = dictionary

    if not names_file or not names_dictionary_file:
        names_dictionary, names_array = generate_word_bows(names, word_to_index)

        np.save("names.npy", names_array)
        writeJSON(names_dictionary, "names_dictionary.json")
    else:
        names_dictionary = loadJSON(names_dictionary_file)
        names_array = np.load(names_file)

    names_to_index = {v: int(k) for k, v in names_dictionary.items()}

    words = list(dictionary.values())

    for r_name in receipt_names:
        mapped = lcs_mapping(r_name, word_to_index)
        
        # TEST WORD LEVEL SCORES
        print(r_name)
        wl_scores = word_lcs_score(mapped, names_array, names_to_index)
        for name in wl_scores[:10]:
            print(name)
        

    
