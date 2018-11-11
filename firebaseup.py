from firebase import firebase

fb = firebase.FirebaseApplication('https://daalab-87e19.firebaseio.com/', None)
filename = "part-r-00000"
data = []

with open(filename, "r") as ins:
    for line in ins:
        line = line.split("\n")[0]
        s = line.split(",")
        data.append({"id": s[0].strip(), "interests": s[1:] })

result = fb.post('/database', data)
print result