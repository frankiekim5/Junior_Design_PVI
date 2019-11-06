import re


test_string = """<!DOCTYPE html>
<html>
<head>
        <title>Home</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300&display=swap" rel="stylesheet">
        <link href="/static/home.css" rel="stylesheet" />
</head>
<body>



<div id="homeContainer">
        <h1 id="homeWelcomeTitle">Hello,<br/>Evelyn S.!</h1>
        <h2>User statistics</h2>
        <p><i>The last time you visited was 11/4/2019. Welcome back!</i></p>
</div>





</body>
</html>"""

a = re.findall(r"<body>(.*)</body>", test_string, flags=re.M|re.S)

print(a)