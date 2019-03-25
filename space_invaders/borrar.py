class Alien:
    def __init__(self, direc,pos,estado):
        self.d = direc
        self.p = pos
        self.v = estado
Aliens=[]
for value in range(0,12):
    Aliens.append(Alien(0,550,1))
print(len(Aliens))
