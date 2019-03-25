#coding=utf-8
#!/usr/bin/env python
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("", 9999))
s.listen(1)
class Nave:
    def __init__(self, jd,pox):
        self.j = jd
        self.p = pox
class Alien:
    def __init__(self, direc,pos,estado):
        self.d = direc
        self.p = pos
        self.v = estado
Naves=[]
Aliens=[]
jugadores=0
otro=""
posx=""
for value in range(0,12):
    Aliens.append(Alien(0,550,1))
# contar=100
while(1):
    try:
            # print("pre coenecion")
            #
            # print("pre accept")
            sc, addr = s.accept()
            #s.close()
            #print("llega")
            recibido = sc.recv(1024)
            #print str(addr[0]) + " dice: ", recibido
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
            elif(partes[0]=="GET" and (partes[1]=="/alien.js" or partes[1]=="/jquery-3.3.1.min.js")):
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
                datos= recibido.find("xs")
                for value in range(datos+3,len(recibido)-2):
                    posx+=recibido[value]
                if(recibido[len(recibido)-1]=="1"):
                    Naves[0].j=int(posx)
                    if(jugadores==2):
                        otro=str(Naves[1].j)
                    else:
                        otro=str(0)
                elif(recibido[len(recibido)-1]=="2"):
                    Naves[1].j=int(posx)
                    otro=str(Naves[0].j)
                else:
                    otro=str(0)
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(len(otro))+"\nContent-Type:text/html\n\n"
                respu+=otro
                posx=""
            elif(partes[0]=="POST" and partes[1]=="/Aliensxy"):
                datos= recibido.find("wx")
                a=0
                b=0
                divi=""
                otro=""
                #print("datos:"+str(datos))
                for value in range(datos+3,len(recibido)):
                    if(recibido[value]=="_"):
                        b=b+1
                    if(a<=11 and b==0):
                        Aliens[a].v=int(recibido[value])
                        #print(Aliens[a].v)
                        a=0
                    a=a+1
                    posx+=recibido[value]
                #print("posx:"+posx)
                divi=posx.split("_")
                #print("divi: "+divi[3])

                if(divi[3]=="1"):
                    Aliens[0].p=int(divi[1])
                    Aliens[0].d=int(divi[2])

                    #print("Aliens[0].p"+str(Aliens[0].p))
                    otro+=str(0)
                elif(divi[3]=="2"):
                    otro+=str(Aliens[0].p)
                    #print("Aliens[0].p: "+str(Aliens[0].p))
                respu="HTTP/1.1 200 OK\nContent-Length: {}".format(len(otro))+"\nContent-Type:text\n\n"
                respu+=otro
                # respu+="\n4"
                print(respu)
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
