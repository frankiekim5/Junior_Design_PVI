import random

"""
OUR ASSUMPTIONS: The generation of receipt names by Publix and other stores
can be reduced to a number of specific types of string manipulations.

If we can be prepared for these types of string manipulations, we can be
better suited to "decode" these string manipulations
"""


def swap_words(name, times=1):
	"""
	swap two words in a name 'times' number of times
	Assumption: Swapped words should be next to each other

	a b c --> a c b
	"""
	words = name.split(" ")
	if len(words) <= 1: # return the name if it only has one word, this permutation is not applicable
		return name
	for _ in range(times):
		idx = random.randint(0, len(words) - 2)
		words[idx], words[idx + 1] = words[idx+1], words[idx]
	return " ".join(words)

def concatenate_words(name, times=1):
	"""
	concatenate two adjacent words in a name (not sure how relevant this one is)

	a b c --> ab c
	"""
	words = name.split(" ")
	if len(words) <= 1:
		return name
	for i in range(times):
		randnum = random.randint(0, len(words) - 2)
		removed = words.pop(randnum)
		words[randnum] = removed + words[randnum]
	return " ".join(words)
		
		

def tokenize_words(name, times=1, words_in_token=2):
	"""
	"Tokenize" a set of words.

	PEPPERIDGE FARM MILANO COOKIES --> PF MILANO COOKIES
	"""
	words = name.split(" ")
	if words_in_token > len(words):
		words_in_token = len(words)
	for i in range(times):
		randnum = random.randint(0, len(words) - words_in_token)
		removed = ""
		for index in range(words_in_token):
			removed = removed + words.pop(randnum)[0]
		words.insert(randnum, removed)
	return " ".join(words)

def delete_chars(name, times=1, min_word_len=2):
	"""
	Delete non-whitespace characters from a name as long as that word is at the minimum word length

	abc def ghi --> ac def ghi
	"""
	words = name.split(" ")
	for i in range(times):
		randnum = random.randint(1, len(words) - 1)
		if len(words[randnum]) >= min_word_len:
			character = random.randint(0, len(words[randnum]) - 1)
			words[randnum] = words[randnum][0:character:] + words[randnum][character+1::]
	return " ".join(words)


def delete_word(name, times=1, min_words=2):
	"""
	Delete a word from the name as long as the name has the request min_words

	a b c --> b c
	"""
	words = name.split(" ")
	if len(words) <= min_words:
		return words
	else: 
		for i in range(times):
			if len(words) <= min_words:
				return words
			else:
				randnum = random.randint(0, len(words)-1)
				words.pop(randnum)
		return " ".join(words)


# These were the manipulations that I can think of, please feel free to add more if you think of anything else





def main():
	name = "PEPPERIDGE FARM MILANO MILK CHOCOLATE COOKIES"
	print(swap_words(name))
	print(concatenate_words(name))
	print(tokenize_words(name))
	print(delete_chars(name))
	print(swap_words(tokenize_words(delete_chars(name))))





if __name__ == "__main__":
	main()