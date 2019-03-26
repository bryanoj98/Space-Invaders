#coding=utf-8
#!/usr/bin/env python
import socket
import json
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("", 9999))
s.listen(1)
class Nave:
    def __init__(self, jd,pox):
        self.j = jd
        self.p = pox
class Alien:
    def __init__(self,pos,estado):
        # self.d = direc
        self.p = pos
        self.v = estado
class Bala:
    def __init__(self,posx,posy,pam):
        self.px = posx
        self.py = posy
        self.pam = pam

Naves=[]
Aliens=[]
Balas=[]
jugadores=0
otro=""
posx=""
Balas.append(Bala(0,0,0))
for value in range(0,12):
    Aliens.append(Alien(550,1))
# contar=100
while(1):
    try:
            sc, addr = s.accept()
            recibido = sc.recv(1024)
            # print str(addr[0]) + " dice: ", recibido
            partes= recibido.split()
            if(partes[0]=="GET" and partes[1]=="/"):
                F=open("game.html","r")
                d=F.read()
                tama=len(d)
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(tama)+"\nContent-Type:text/html\n\n"
                respu+=d
                jugadores=jugadores+1
                Naves.append(Nave(jugadores,10))
            elif(partes[0]=="GET" and partes[1]=="/space.css"):
                F=open("space.css","r")
                e=F.read()
                tama=len(e)
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(tama)+"\nContent-Type:text/css\n\n"
                respu+=e
            elif(partes[0]=="GET" and (partes[1]=="/alien.js" or partes[1]=="/alien_A.js" or partes[1]=="/jquery-3.3.1.min.js")):
                F=open(partes[1].replace("/",""),"r")
                #print (partes[1].replace("/",""))
                e=F.read()
                tama=len(e)
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(tama)+"\nContent-Type:text/js\n\n"
                respu+=e
            elif(partes[0]=="GET" and (partes[1]=="/naveT.png" or partes[1]=="/naveT2.png" or partes[1]=="/NaveBT.png" or partes[1]=="/azuP.png" or partes[1]=="/favicon.ico")):
                F=open(partes[1].replace("/",""),"r")
                e=F.read()
                tama=len(e)
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(tama)+"\nContent-Type:image\n\n"
                respu+=e
            elif(partes[0]=="GET" and partes[1]=="/Ngamers"):
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(1)+"\nContent-Type:text/html\n\n"
                respu+=str(jugadores)
            elif(partes[0]=="POST" and partes[1]=="/Cola"):
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(1)+"\nContent-Type:text/html\n\n"
                respu+=str(3)
            elif(partes[0]=="POST" and partes[1]=="/Navexy"):
                datos= recibido.find("[")
                divi=""
                otro=""
                for value in range(datos,len(recibido)):
                    divi+=recibido[value]
                deco = json.loads(divi)
                if(deco[1]=="1"):
                    Naves[0].j=int(deco[0])
                    if(jugadores>=2):
                        otro=str(Naves[1].j)
                    else:
                        otro=str(0)
                elif(deco[1]=="2"):
                    Naves[1].j=int(deco[0])
                    otro=str(Naves[0].j)
                else:
                    otro=str(0)
                otro=json.dumps([otro])
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(len(otro))+"\nContent-Type:text/html\n\n"
                respu+=otro
                posx=""
            # elif(partes[0]=="POST" and partes[1]=="/Score"):
            #     datos= recibido.find("wx")
            #     for value in range(datos+3,len(recibido)-2):
            #         posx+=recibido[value]
            #     if(recibido[len(recibido)-1]=="1"):
            elif(partes[0]=="POST" and partes[1]=="/Bala"):
                # print str(addr[0]) + " dice: ", recibido

                datos= recibido.find("[")
                divi=""
                tempo=""
                otro=""
                for value in range(datos,len(recibido)):
                    divi+=recibido[value]
                deco = json.loads(divi)
                if(deco[0]=="1"):
                    Balas[0].pam=deco[1];
                    Balas[0].px=deco[2];
                    Balas[0].py=deco[3];
                    otro=str(0)
                elif(deco[0]=="2"):
                    otro=json.dumps([Balas[0].pam,Balas[0].px,Balas[0].py])
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(len(otro))+"\nContent-Type:text\n\n"
                respu+=otro
                print(respu)
            elif(partes[0]=="POST" and partes[1]=="/Aliensxy"):
                datos= recibido.find("[")
                divi=""
                tempo=""
                otro=""
                for value in range(datos,len(recibido)):
                    divi+=recibido[value]
                deco = json.loads(divi)
                tempo=deco[0]
                for valu in range(0,len(tempo)):
                    if(not(Aliens[valu].v==0 and int(tempo[valu])==1)):
                        Aliens[valu].v=int(tempo[valu])
                mache=""
                for value in range(0,12):
                    mache+=str(Aliens[value].v)
                # print(mache)
                if(deco[2]=="1"):
                    Aliens[0].p=int(deco[1])
                    otro+=str(0)
                elif(deco[2]=="2"):
                    otro+=str(Aliens[0].p)
                otro=json.dumps([otro,mache])
                # print("otro: "+otro)
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(len(otro))+"\nContent-Type:text\n\n"
                respu+=otro
                posx=""
            F.close()

            #respu="POST /test HTTP/1.1\nHost: foo.example\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 27\n\nfield1=value1&field2=value2"
            try:
                sc.sendall(respu)
                respu=""
                #s.close()
                #s.shutdown(socket.SHUT_RDWR)
            except BaseException as e:
                print "sepu"
                print(str(e))
            # contar=contar+1
            # print(contar)

    except:
            print ("Error, Intente de nuevo")
            #s.shutdown(socket.SHUT_RDWR)
            sc.close()
            s.close()
            exit()

    sc.close()
s.close()
