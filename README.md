# shelly-spotteri
Shelly 4pm laitteelle tehty skripti joka tutkii tasaisin välein sähkön spot hintatietoa ja ohjaa kontaktoreita tämän mukaan. Käyttäjä voi päättää monta halvinta tuntia mitäkin piiriä pidetään päällä ja mikä on ns. halvan hinnan raja jolloin syöttö on aina päällä ko. piirille. Skriptiä muokkaamalla voidaan hintaohjaus sovittaa
eri ympäristöihin (ja myös muihin Shelly gen2 laitteisiin kuten kuvista näkyy) mutta vakiona skripti on tehty ympäristöön jossa Shelly 4pm laitteena ja siinä:
- Switch_0 = Pattereiden kontaktorin ohjaus
- Switch_1 = Lämminvesivaraajan kontaktorin ohjaus
- Switch_2 = Lattialämmityksen kontaktorin ohjaus
- Switch_3 = Lämmöntiputuksen kontaktorin ohjaus
(Kytketään päälle yhdessä Switch_0 kanssa, jotta lämmöntiputus pattereille aktivoituu aka. ollaan kalliin sähkön puolella)

Shelly 4pm laitteen tiedot:
https://www.shelly.cloud/knowledge-base/devices/shelly-pro-4pm/
(Huom! Sähköverkon työt tulee teettää aina ammattilaisella, jolla on työhön soveltuvat luvat kunnossa!)

Shelly-spotteri skriptin asennus:
1. Avaa shellyn web hallinta selaimella ja valitse "Scripts" menu
2. Klikkaa Add script
3. Kirjoita nimeksi "shelly_spotteri" ja klikkaa Save
4. Kopioi shelly-spotteri.js tiedoston sisältö valkoiseen isoon tekstikenttään.
5. Muokkaa koodia tarpeittesi mukaan (R1-3 kohdissa olevat let arvot skriptin alussa)
6. Klikkaa save and run.
7. Palaa aiempaan ruutuun klikkaamalla "nuoli vasemmalle" kuvasta.
<img src="https://user-images.githubusercontent.com/5729471/199427340-6cfa81ff-eca9-4009-b4ce-f46ec64f7aa7.png" width="600" height="150">
8. Klikkaa "enable" jotta skripti tulee käyttöön
<img src="https://user-images.githubusercontent.com/5729471/199426757-96a11543-b343-4ab0-859d-e2c4aea124e0.png" width="600" height="150">

9. Jos joudut jatkossa muokkaamaan skriptiä uudelleen niin skripti täytyy ensin pysäyttää "Stop" napista. Tämän jälkeen tee skriptin editointi ja sitten taas "Save and run"

Kansiossa on myös watchdog skripti jonka voit varmuuden vuoksi asentaa erillisenä skriptinä spotterin rinnalle. Watchdog valvoo 60sec välein että spotteri on hengissä ja jos spotteri jostain syystä on stopped tilassa, niin se käynnistetään uudelleen. Huom! Watchdog koodissa oletetaan että spotteri pyörii id:llä "1". Jos näin ei ole omassa ympäristössäsi (eli sinulla on muitakin skriptejä pyörimässä) niin vaihda oikea spotteri skriptin id watchdogin kohtaan "MonitoredScript_1".
