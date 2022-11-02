# shelly-spotteri
Shelly 4pm laitteelle tehty skripti joka ohjaa kontaktoreita sähkön hinnan mukaan.
Tehty ympäristöön jossa:
- Switch_0 = Pattereiden kontaktorin ohjaus
- Switch_1 = Lämminvesivaraajan kontaktorin ohjaus
- Switch_2 = Lattialämmityksen kontaktorin ohjaus
- Switch_3 = Lämmöntiputuksen kontaktorin ohjaus
(Kytketään päälle yhdessä Switch_0 kanssa, jotta lämmöntiputus pattereille aktivoituu)

Shelly 4pm laitteen tiedot:
https://www.shelly.cloud/knowledge-base/devices/shelly-pro-4pm/

Skriptin asennus:
1. Avaa shellyn web hallinta selaimella ja valitse "Scripts" menu
2. Klikkaa Add script
3. Kirjoita nimeksi "shelly_spotteri" ja klikkaa Save
4. Kopioi shelly-spotteri.js tiedoston sisältö valkoiseen isoon tekstikenttään
5. Muokkaa koodia tarpeittesi mukaan (esim releet ja urlien lämmitystunnit alussa)
<img src="https://user-images.githubusercontent.com/5729471/199428485-e11ff5bc-5c51-4f08-95d7-bb2d403b0fa8.png" width="600" height="150">
6. Klikkaa save and run.
<img src="https://user-images.githubusercontent.com/5729471/199425810-8dfd4d6c-bc7f-4e9d-b1c4-a1009d4d8d13.png" width="600" height="600">
7. Palaa aiempaan ruutuun klikkaamalla "nuoli vasemmalle" kuvasta.
<img src="https://user-images.githubusercontent.com/5729471/199427340-6cfa81ff-eca9-4009-b4ce-f46ec64f7aa7.png" width="600" height="150">
8. Klikkaa "enable" jotta skripti tulee käyttöön
<img src="https://user-images.githubusercontent.com/5729471/199426757-96a11543-b343-4ab0-859d-e2c4aea124e0.png" width="600" height="150">

9. Jos joudut jatkossa muokkaamaan skriptiä uudelleen niin skripti täytyy ensin pysäyttää "Stop" napista. Tämän jälkeen tee skriptin editointi ja sitten taas "Save and run"
