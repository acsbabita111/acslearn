# अध्याय-24 भाग-2 (पाठ 212-218) के code-डिब्बे — builder असली python3 से चलाकर data-out भरता है
# html_* कुंजी = HTML-डिब्बा (data-lang="html") — robot tag-संतुलन और भीतरी CSS जाँचता है, चलाता नहीं
CODES = {
 'l212_jodwa': ('''naam = "Sita"
ank = 40
if ank >= 33:
    print(naam, "- Paas")
else:
    print(naam, "- Mehnat")
''', None, None),

 'l213_prompt': ('''def prompt_banao(bhoomika, kaam, sandarbh, roop):
    print("Tum " + bhoomika + " ho.")
    print("Kaam: " + kaam)
    print("Sandarbh: " + sandarbh)
    print("Jawab ka roop: " + roop)
    print("Agar pakka na ho, to saaf bata do.")

prompt_banao("ek dhairyavaan shikshak",
             "kaksha 6 ke bachche ko for-loop samjhao",
             "bachcha gaon ka hai, Hindi me padhta hai",
             "5 chhote vakya aur ek gaon ka udaharan")
''', None, None),

 'l214_ghat': ('''ghat = ["SWAYAM / NPTEL", "Skill India Digital Hub", "CS50 (Harvard)",
        "freeCodeCamp", "python.org", "MDN Web Docs"]
pramanpatra = ["vaikalpik, shulk wali pariksha", "chuninda courses par",
               "muft - sab kaam poore karne par", "muft",
               "nahi - padhai-pustak", "nahi - padhai-pustak"]
for pata in range(len(ghat)):
    print(ghat[pata], "| pramanpatra:", pramanpatra[pata])
print("Shuruat sab par muft. Kul ghat:", len(ghat))
''', None, None),

 'l215_dwar': ('''dwar = ["Sarkari naukri", "Swarozgar", "Sthaniya chhota udyam",
        "Corporate (badi company)", "Videsh"]
udaharan = ["pariksha aur sarkari portal ka rasta",
            "apni website-seva, dukan ka hisab-seva",
            "dukan, coaching ya daftar me computer ka kaam",
            "data, support ya software team",
            "sirf jaanche-parkhe raste se, eMigrate ke saath"]
for pata in range(len(dwar)):
    print(pata + 1, dwar[pata], "->", udaharan[pata])
''', None, None),

 'html_dukan': ('''<html>
<head>
<title>Ram Kirana - Gaon Bazaar</title>
<style>
body { font-size: 20px; background-color: #F5F7FA; color: #0B1F3A; }
h1 { color: #1565C0; }
td { padding: 6px; }
</style>
</head>
<body>
<h1>Ram Kirana</h1>
<p>Gaon bazaar - subah 7 se raat 9 tak</p>
<h2>Aaj ke bhav</h2>
<table>
<tr><th>Saman</th><th>Bhav</th></tr>
<tr><td>Aalu</td><td>40 rupaye kilo</td></tr>
<tr><td>Pyaaz</td><td>30 rupaye kilo</td></tr>
</table>
<p>Ghar tak saman: subah 10 se 12 baje</p>
</body>
</html>
''', None, None),

 'l217_seedhi': ('''seedhi = ["Pehla Code (yah course) - soch aur pehla program",
          "DCA - computer ke daftari kaam",
          "AI Digital Master - AI aur digital auzaar",
          "Hunar course + ek bhasha - kamai ki jodi"]
for pata in range(len(seedhi)):
    print("Paydan", pata + 1, ":", seedhi[pata])
''', None, None),

 'l218_vidaai': ('''naam = input("Aapka naam? ")
lur = input("Aapka lur (hunar) kya hai? ")
print("*" * 30)
print(naam + ", aapka lur hai: " + lur)
print("Pehla Code poora hua - aage ki raah aapki.")
print("Khagaria se vishva tak - shubhkamnayein!")
print("*" * 30)
''', None, ['Sita|computer', 'Ramu|silai']),
}
