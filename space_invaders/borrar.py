import json
x={"123","56"}
otro=json.dumps(["1234","hola"])
deco = json.loads(otro)
print(deco[1])
tempo=deco[0]
for value in range(0,len(tempo)):
    print(tempo[value])
