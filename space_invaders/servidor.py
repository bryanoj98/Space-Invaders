#coding=utf-8
#!/usr/bin/env python
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("", 9999))
s.listen(3)
class Nave:
    def __init__(self, jd,pox):
        self.j = jd
        self.p = pox
Naves=[]
jugadores=0
otro=""
posx=""
while(1):
    try:
            sc, addr = s.accept()
            print("llega")
            recibido = sc.recv(1024)
            print str(addr[0]) + " dice: ", recibido
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
                print (partes[1].replace("/",""))
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
            elif(partes[0]=="POST" and partes[1]=="/Navexy"):
                datos= recibido.find("xs")
                print("find:"+str(datos))
                for value in range(datos+3,len(recibido)-2):
                    posx+=recibido[value]
                    print(recibido[value])
                if(datos>=0):
                    print("posx:"+posx)
                    print("final:"+recibido[len(recibido)-1])
                print("jugadores:"+str(jugadores))
                print("Naves:"+str(len(Naves)))
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

            F.close()

            #respu="POST /test HTTP/1.1\nHost: foo.example\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 27\n\nfield1=value1&field2=value2"
            try:
                sc.sendall(respu)
            except:
                print "sepu"

    except:
            print ("Error fatal, Intente de nuevo")
            # sc.close()
            s.close()
            exit()

    sc.close()
s.close()
