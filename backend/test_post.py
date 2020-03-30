import requests


url = 'http://127.0.0.1:8080/login'
myobj = {'username':'username', 'password':'password', 'action':'login'}

x = requests.post(url, data=myobj)


print(x.text)