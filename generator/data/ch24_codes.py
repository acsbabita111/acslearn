# अध्याय-24 के code-डिब्बे — builder असली python3 से चलाकर data-out भरता है
CODES = {
 # पाठ-204: पूरे कोर्स का नक़्शा
 'l204_naksha': ('''bhaag = ["Bhaag-A: bina computer ki soch (adhyay 1-6)",
         "Bhaag-B: phone, internet, HTML, CSS (adhyay 7-15)",
         "Bhaag-C: Python - print se poore khel tak (adhyay 16-23)",
         "Bhaag-D: aage ki raahen (adhyay 24)"]
ginti = 1
for ek in bhaag:
    print(ginti, "-", ek)
    ginti = ginti + 1
print("Kul bhaag:", len(bhaag))
''', None, None),

 # पाठ-205: 12 भाषाओं का परिवार
 'l205_parivar': ('''bhasha = ["Scratch", "HTML", "JavaScript", "Python", "SQL", "Excel",
          "Kotlin", "Java", "C", "PHP", "Bash", "Machine"]
kaam = ["bachchon ki pehli soch", "panne ka dhancha", "panne me jaan",
        "AI, data, swachalan", "hisab-ghar (database)", "daftar ka hisab",
        "Android app", "bade app aur bank", "machine ke andar",
        "website ka server", "computer ko hukm", "0 aur 1 - asli boli"]
for pata in range(len(bhasha)):
    print(pata + 1, bhasha[pata], "-", kaam[pata])
''', None, None),

 # पाठ-206: Python से data — छोटा विश्लेषण
 'l206_data': ('''bikri = [120, 85, 200, 150, 95, 210, 180]
din = ["Som", "Mangal", "Budh", "Guru", "Shukra", "Shani", "Ravi"]
kul = sum(bikri)
ausat = kul // len(bikri)
sabse = max(bikri)
print("Hafte ki kul bikri:", kul)
print("Rozana ausat:", ausat)
print("Sabse achha din:", din[bikri.index(sabse)], "-", sabse)
for pata in range(len(bikri)):
    if bikri[pata] < ausat:
        print("Dhyaan do:", din[pata], "ausat se kam")
''', None, None),
 'l206_swachalan': ('''def rasid(naam, kul):
    print("Rasid -", naam, "-", kul, "rupaye - Dhanyavaad")

grahak = ["Sita", "Ramu", "Gita", "Mohan"]
bill = [230, 85, 140, 60]
for pata in range(len(grahak)):
    rasid(grahak[pata], bill[pata])
print(len(grahak), "rasidein ek pal me bani.")
''', None, None),

 # पाठ-207: JavaScript के नमूने का Python-जुड़वाँ
 'l207_jodwa': ('''for i in range(1, 6):
    print(i, end=" ")
print()

def badlo():
    print("Aapne button dabaya!")

badlo()
''', None, None),

 # पाठ-209: SQL — Python की sqlite3 पेटी से असली चलता हिसाब-घर
 'l209_sql': ('''import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE saman (naam TEXT, bhav INTEGER)")
db.execute("INSERT INTO saman VALUES ('aalu', 40)")
db.execute("INSERT INTO saman VALUES ('pyaaz', 30)")
db.execute("INSERT INTO saman VALUES ('tamatar', 50)")
db.execute("INSERT INTO saman VALUES ('namak', 20)")

for pankti in db.execute("SELECT naam, bhav FROM saman WHERE bhav >= 30 ORDER BY bhav"):
    print(pankti)
''', None, None),
 'l209_ginti': ('''import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE saman (naam TEXT, bhav INTEGER)")
db.execute("INSERT INTO saman VALUES ('aalu', 40)")
db.execute("INSERT INTO saman VALUES ('pyaaz', 30)")
db.execute("INSERT INTO saman VALUES ('tamatar', 50)")
db.execute("INSERT INTO saman VALUES ('namak', 20)")

ginti = db.execute("SELECT COUNT(*) FROM saman").fetchone()
kul = db.execute("SELECT SUM(bhav) FROM saman").fetchone()
print("Kitni cheezein:", ginti[0])
print("Sab bhav ka jod:", kul[0])
''', None, None),

 # पाठ-210: Excel-सूत्र का हिसाब — Python से दो-रास्ते जाँच
 'l210_jaanch': ('''ank = [45, 28, 72, 33, 90]
print("SUM:", sum(ank))
print("AVERAGE:", sum(ank) / len(ank))
print("MAX:", max(ank), "| MIN:", min(ank))
for a in ank:
    if a >= 33:
        print(a, "Paas")
    else:
        print(a, "Mehnat")
''', None, None),
 # पाठ-211: C-नमूने का Python-जुड़वाँ
 'l211_jodwa': ('''ank = 40
if ank >= 33:
    print("Paas")
else:
    print("Mehnat")
print(type(ank))
''', None, None),
}
