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
		
		

def initialize_words(name, times=1, words_in_token=2):
	"""
	"initialize" a set of words.

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
		randnum = random.randint(0, len(words) - 1)
		if len(words[randnum]) >= min_word_len:
			character = random.randint(1, len(words[randnum]) - 1)
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


def delete_vowels(name, times=1, min_word_len=1):
	"""
	Delete 'times' number of vowels.
	
	Rules:
	1. DO NOT DELETE THE FIRST LETTER
	2. If the 'min_word_len' is reached for a particular word, no vowels can be deleted from that string
	3. Do not delete last character unless absolutely necessary
	4. If you cannot delete 'times' number of vowels, return best result
	"""
	count = 0
	iterations = 0
	words = name.split(" ")
	while count < times:
		randnum = random.randint(0, len(words) - 1)
		if len(words[randnum]) > min_word_len:
			if len(words[randnum]) == 2:
				if words[randnum][1] in "aeiouAEIOU":
					words[randnum] = words[randnum][0]
					count+=1
			else:
				character = random.randint(1, len(words[randnum]) - 2)
				if words[randnum][character] in "aeiouAEIOU":
					words[randnum] = words[randnum][0:character:] + words[randnum][character+1::]
					count+=1
		iterations += 1
		if iterations > 100000:
			return " ".join(words)
	return " ".join(words)

def delete_chars_restricted(name, target_length=20, min_word_len=1):
	"""
	(Might have to adjust this method periodically, sorry Mitchell)
	Delete characters from the receipt name until length of `target_length` is achieved

	Rules:
	1. DO NOT DELETE THE FIRST CHARACTER
	2. If the 'min_word_len' is reached for a particular word, do not delete from that word
	   unless necessary to meet the `target_length`
	3. Do not delete the last character unless it is 's' or necessary to meet the `target_length`
	"""
	
	length = 0
	iterations = 0
	words = name.split(" ")
	for i in range(len(words)):
		for j in range(len(words[i])):
			length += 1
		
	while length > target_length:
		randnum = random.randint(0, len(words) - 1)
		if len(words[randnum]) > min_word_len:
			character = random.randint(1, len(words[randnum]) - 1)
			if character == len(words[randnum])-1:
				if words[randnum][character] in "sS" or iterations >  1000000:
					words[randnum] = words[randnum][0:character:] + words[randnum][character+1::]
					length-=1
			else:
				words[randnum] = words[randnum][0:character:] + words[randnum][character+1::]
				length-=1
		iterations += 1
	return " ".join(words)

def initialize_restricted(name, target_word_count=10):
	"""
	Keep concatenating/initializing consecutive words until the number of words is at most `target_word_count`

	"""
	words = name.split(" ")
	words = initialize_words(name, 1, len(words) - target_word_count + 1) 
	return words

def master_permutation(name, target_length=20, min_word_len=1, vowel_deletion_proportion=.8):
	"""
	Optional to implement but kinda helpful to Max.

	Goals by priority:
	1. Reach `target_length`
	2. Delete at the minimum `vowel_deletion_proportion`% of the vowels present
	3. maintain min_word_len

	The order of permutations should be the following:
	1. Apply concatentations (one of the intialize methods)
	2. Apply swaps
	3. Apply deletion of vowels
	4. Apply deletion of chars restricted
	"""
	words = initialize_restricted(name,int(target_length/min_word_len))
	words = swap_words(words, int(target_length/min_word_len))
	counter = words.split(" ")
	length = 0
	for i in range(len(counter)):
		for j in range(len(counter[i])):
			length += 1
	words = delete_vowels(words, length - target_length + 1)
	words = delete_chars_restricted(name, target_length)
	return words
	"""Dont think my implementation is quite right here but hope this helps"""


def main():
	name = "PEPPERIDGE FARM MILANO MILK CHOCOLATE COOKIES"
	print(swap_words(name))
	print(concatenate_words(name))
	print(delete_chars(name))
	print(delete_vowels(name))
	print(delete_chars_restricted(name))
	print(initialize_restricted(name,3))
	print(master_permutation(name,20,1,.5))





if __name__ == "__main__":
	main()