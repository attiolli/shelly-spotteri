# shelly-spotteri
Shelly 4pm laitteelle tehty skripti joka ohjaa releitä sähkön hinnan mukaan.
Tehty ympäristöön jossa:
- Switch_0 = Pattereiden kontaktori
- Switch_1 = Lämminvesivaraajan kontaktori
- Switch_2 = Lattialämmityksen kontaktori
- Switch_3 = Lämmöntiputuksen kontaktori
(Kytketään päälle yhdessä Switch_0 kanssa, jotta lämmöntiputus pattereille aktivoituu)

Skriptin asennus:
1. Avaa shellyn web hallinta selaimella ja valitse "Scripts" menu
2. Klikkaa Add script
3. Kirjoita nimeksi "shelly_spotteri" ja klikkaa Save
4. Kopioi shelly-spotteri.js tiedoston sisältö valkoiseen isoon tekstikenttään
5. Muokkaa koodia tarpeittesi mukaan (esim releet ja urlien hinnat alussa)
6. Klikkaa save and run ja palaa aiempaan ruutuun klikkaamalla "nuoli vasemmalle" kuvasta.
7. Klikkaa "enable" jotta skripti tulee käyttöön
