# अध्याय-23 के code-डिब्बे — builder इन्हें असली python3 से चलाकर data-out भरता है
# हर प्रविष्टि: key -> (code, seed या None, दौड़ों की सूची — हर दौड़ "जवाब1|जवाब2", या None = बिना input)
GAME_FULL = '''import random

# --- purzon ki peti ---
def swagat():
    print("Andaaza Lagao! 1 se 20 ke beech ek sankhya maine soch li hai.")

def poochho():
    return int(input("Aapka andaaza? "))

def ishara(andaaza, gupt):
    if andaaza < gupt:
        return "Upar!"
    elif andaaza > gupt:
        return "Neeche!"
    else:
        return "Sahi!"

def jashn(koshish):
    if koshish == 1:
        print("Kamaal! Pehli hi baar me!")
    elif koshish <= 3:
        print("Bahut badhiya!", koshish, "koshish me pakda.")
    else:
        print("Shabash!", koshish, "koshish me pakda.")

def khel():
    gupt = random.randint(1, 20)
    koshish = 0
    while koshish < 5:
        andaaza = poochho()
        koshish = koshish + 1
        jawab = ishara(andaaza, gupt)
        print(jawab)
        if jawab == "Sahi!":
            jashn(koshish)
            return
    print("Koshishein khatam - sankhya thi", gupt)

# --- kahani ---
swagat()
while True:
    khel()
    phir = input("Phir khelein? (haan/nahi) ")
    if phir != "haan":
        break
print("Khelne ke liye dhanyavaad!")
'''

GAME_COMMENTED = '''import random

# --- purzon ki peti ---

# khiladi ka swagat - sirf dikhata hai
def swagat():
    print("Andaaza Lagao! 1 se 20 ke beech ek sankhya maine soch li hai.")

# andaaza poochho, ginti bana kar lautao
def poochho():
    return int(input("Aapka andaaza? "))

# chhota/bada/barabar - teen me se ek ishara lautao
def ishara(andaaza, gupt):
    if andaaza < gupt:
        return "Upar!"
    elif andaaza > gupt:
        return "Neeche!"
    else:
        return "Sahi!"

# jeet par koshishon ke hisab se alag shabashi
def jashn(koshish):
    if koshish == 1:
        print("Kamaal! Pehli hi baar me!")
    elif koshish <= 3:
        print("Bahut badhiya!", koshish, "koshish me pakda.")
    else:
        print("Shabash!", koshish, "koshish me pakda.")

# ek poora khel - zyada se zyada 5 koshish (suraksha-ginti)
def khel():
    gupt = random.randint(1, 20)
    koshish = 0
    while koshish < 5:
        andaaza = poochho()
        koshish = koshish + 1
        jawab = ishara(andaaza, gupt)
        print(jawab)
        if jawab == "Sahi!":
            jashn(koshish)
            return   # jeet gaye - khel yahin khatam
    print("Koshishein khatam - sankhya thi", gupt)

# --- kahani: swagat, phir khel jab tak "haan" ---
swagat()
while True:
    khel()
    phir = input("Phir khelein? (haan/nahi) ")
    if phir != "haan":
        break
print("Khelne ke liye dhanyavaad!")
'''

CODES = {
 # पाठ-194: नियम छापो (कोई random नहीं)
 'l194_niyam': ('''print("Khel ke niyam:")
print("1. Computer 1 se 20 ke beech ek sankhya man me rakhega.")
print("2. Aap andaaza lagayenge.")
print("3. Computer kahega: Upar! ya Neeche! ya Sahi!")
print("4. Zyada se zyada 5 koshish.")
''', None, None),

 # पाठ-195: random
 'l195_paasa': ('''import random
for i in range(5):
    print(random.randint(1, 6), end=" ")
print()
''', 42, None),
 'l195_gupt': ('''import random
gupt = random.randint(1, 20)
print("Computer ne man me sankhya rakh li.")
print("(Jaanch ke liye) sankhya hai:", gupt)
''', 42, None),

 'l195_choice': ('''import random
phal = ["aam", "kela", "amrood", "papita"]
print("Aaj ka phal:", random.choice(phal))
''', 5, None),

 # पाठ-196: input की वापसी
 'l196_ek': ('''import random
gupt = random.randint(1, 20)
andaaza = int(input("1 se 20 me andaaza? "))
if andaaza == gupt:
    print("Sahi! Pakad liya!")
else:
    print("Galat - sankhya thi", gupt)
''', 7, ['11', '5', '20']),

 # पाठ-197: ऊपर-नीचे
 'l197_ishara': ('''import random
gupt = random.randint(1, 20)
andaaza = int(input("Andaaza? "))
if andaaza < gupt:
    print("Upar!")
elif andaaza > gupt:
    print("Neeche!")
else:
    print("Sahi!")
''', 7, ['5', '15', '11', '10', '12']),

 # पाठ-198: while खेल-चक्र
 'l198_chakra': ('''import random
gupt = random.randint(1, 20)
andaaza = 0
while andaaza != gupt:
    andaaza = int(input("Andaaza? "))
    if andaaza < gupt:
        print("Upar!")
    elif andaaza > gupt:
        print("Neeche!")
print("Sahi! Pakad liya.")
''', 7, ['5|15|11', '11', '1|2|20|11']),

 # पाठ-199: कोशिशें गिनो + सुरक्षा-गिनती
 'l199_ginti': ('''import random
gupt = random.randint(1, 20)
koshish = 0
mila = False
while koshish < 5:
    andaaza = int(input("Andaaza? "))
    koshish = koshish + 1
    if andaaza < gupt:
        print("Upar!")
    elif andaaza > gupt:
        print("Neeche!")
    else:
        print("Sahi!", koshish, "koshish me pakda.")
        mila = True
        break
if not mila:
    print("Koshishein khatam - sankhya thi", gupt)
''', 7, ['10|15|12|11', '1|2|3|4|5', '11']),

 # पाठ-200: पुर्ज़ों में (फिर-खेलें के बिना)
 'l200_purze': ('''import random

def swagat():
    print("Andaaza Lagao! 1 se 20 ke beech ek sankhya maine soch li hai.")

def poochho():
    return int(input("Aapka andaaza? "))

def ishara(andaaza, gupt):
    if andaaza < gupt:
        return "Upar!"
    elif andaaza > gupt:
        return "Neeche!"
    else:
        return "Sahi!"

def khel():
    gupt = random.randint(1, 20)
    koshish = 0
    while koshish < 5:
        andaaza = poochho()
        koshish = koshish + 1
        jawab = ishara(andaaza, gupt)
        print(jawab)
        if jawab == "Sahi!":
            print("Shabash!", koshish, "koshish me pakda.")
            return
    print("Koshishein khatam - sankhya thi", gupt)

swagat()
khel()
''', 7, ['10|15|12|11', '1|2|3|4|5']),
 'l200_ishara_alag': ('''def ishara(andaaza, gupt):
    if andaaza < gupt:
        return "Upar!"
    elif andaaza > gupt:
        return "Neeche!"
    else:
        return "Sahi!"

print(ishara(5, 11), ishara(15, 11), ishara(11, 11))
print(ishara(1, 1), ishara(20, 1))
''', None, None),

 # पाठ-201: पूरा खेल — जश्न + फिर खेलें
 'l201_poora': (GAME_FULL, 7, ['11|nahi', '10|15|12|11|haan|3|5|nahi', '1|2|3|4|5|nahi']),

 # पाठ-202: टिप्पणियों वाला अंतिम code (वही खेल)
 'l202_tippani': (GAME_COMMENTED, 7, ['10|15|12|11|haan|3|5|nahi', '11|nahi']),

 # पाठ-203: शाबाशी-पत्र
 'l203_shabashi': ('''def shabashi(naam):
    print("*" * 30)
    print("Shabash,", naam + "!")
    print("Aapne apna pehla khel khud banaya.")
    print("Aap ab ek Programmer hain.")
    print("*" * 30)

naam = input("Aapka naam? ")
shabashi(naam)
''', None, ['Sita', 'Ramu']),
}
