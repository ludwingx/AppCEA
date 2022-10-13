class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

print(f"{bcolors.OKGREEN}BoiShit{bcolors.FAIL}")

class RPS:
    def main(self):
        num = int(input("Ingrese el numero de la canción que desee escuchar : "))
        self.run()

    def run(self):
        self.playlist()

    def playlist(self):

        if num == 1:
            num= "MAMI MIRAME FT ANO7HER"
        elif num == 2:
            num = "ESA BITCH"
        elif num == 3:
            num= "AIN'T FUCKING THAT BITCH"
        elif num == 4:
            num = "NO MORE"
        elif num == 5:
            num = "JANGUEAR 'Demo'"
        elif num == 6:
            num = "ATRAPADO"
        elif num == 7:
            num = "BITCH GOING ON"
        elif num > 7:
            num = "Por favor ingrese un numero del 1 al 6 y vuelva a intentarlo"
            rps.main()
        print(num)
    def cancion(self,num):
        pass

rps = RPS()
rps.main()