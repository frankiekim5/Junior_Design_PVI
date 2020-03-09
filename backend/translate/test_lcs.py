from process_data import loadJSON, clean

receipt_names = ["G/ADE FR GLAC FREE", "CHIPS AHOY", "PF M/CH MILANO CKI", "KELL FR STRW MINWH"]


def editDistance(str1, str2, m, n): 
  
    # If first string is empty, the only option is to 
    # insert all characters of second string into first 
    if m == 0: 
         return n 
  
    # If second string is empty, the only option is to 
    # remove all characters of first string 
    if n == 0: 
        return m 
  
    # If last characters of two strings are same, nothing 
    # much to do. Ignore last characters and get count for 
    # remaining strings. 
    if str1[m-1]== str2[n-1]: 
        return editDistance(str1, str2, m-1, n-1) 
  
    # If last characters are not same, consider all three 
    # operations on last character of first string, recursively 
    # compute minimum cost for all three operations and take 
    # minimum of three values. 
    return 1 + min(editDistance(str1, str2, m, n-1),    # Insert 
                   editDistance(str1, str2, m-1, n),    # Remove 
                   editDistance(str1, str2, m-1, n-1)    # Replace 
                   )

def editDistDP(str1, str2, m, n): 
    # Create a table to store results of subproblems 
    dp = [[0 for x in range(n + 1)] for x in range(m + 1)] 
  
    # Fill d[][] in bottom up manner 
    for i in range(m + 1): 
        for j in range(n + 1): 
  
            # If first string is empty, only option is to 
            # insert all characters of second string 
            if i == 0: 
                dp[i][j] = j    # Min. operations = j 
  
            # If second string is empty, only option is to 
            # remove all characters of second string 
            elif j == 0: 
                dp[i][j] = i    # Min. operations = i 
  
            # If last characters are same, ignore last char 
            # and recur for remaining string 
            elif str1[i-1] == str2[j-1]: 
                dp[i][j] = dp[i-1][j-1] 
  
            # If last character are different, consider all 
            # possibilities and find minimum 
            else: 
                dp[i][j] = 1 + min(dp[i][j-1],        # Insert 
                                   dp[i-1][j],        # Remove 
                                   dp[i-1][j-1])    # Replace 
  
    return dp[m][n] 

def lcs(str1, str2):
    m = len(str1)
    n = len(str2)
    j = 0
    i = 0

    while j<m and i<n: 
        if str1[j] == str2[i]:     
            j = j + 1    
        i = i + 1
    
    return j == m
if __name__ == '__main__':
    names = loadJSON("../../data/publix_cleaned.json")

    for r_name in receipt_names:
        r_name = clean(r_name)
        
        try:
            try:
                result = min(filter(lambda name: lcs(r_name, name), names), key=lambda x: len(x))
            except:
                result = min(filter(lambda name: lcs(" ".join(r_name), " ".join(name)), names), key=lambda x: len(x))
                
        except:
            print("Nah", r_name)
            
            distances = map(lambda name: editDistDP(r_name, name, len(r_name), len(name)), names)
            print(min(zip(distances, names)))
            
            continue
        print(result)
        # for name in names:
        #     if lcs(r_name, name):
        #         print(name)
        input("\t%s\n\n" % r_name)
    