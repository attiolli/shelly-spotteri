let CONFIG = {
  paivitystaajuusPatteri:  5 * 60000, // 5 minuutin välein
  paivitystaajuusVaraaja: 5 * 60500,
  paivitystaajuusLattia: 5 * 60800,
  patteriUrl: "https://api.spot-hinta.fi/JustNowRank/8/5", // Patterit päälle jos kuluva tunti kuuluu 8 halvimman joukkoon TAI jos alle 5 senttiä
  varaajaUrl: "https://api.spot-hinta.fi/JustNowRank/6/5", // Varaaja päälle jos kuluva tuntu kuuluu 6 halvimman joukkoon TAI jos alle 5 senttiä
  lattiaUrl: "https://api.spot-hinta.fi/JustNowRank/8/5", // Lattialämmitys päälle jos kuluva tunti kuulu, 8 halvimman joukkoon TAI jos alle 5 senttiä
};

function PatteriOhjaus() {
  Shelly.call("HTTP.GET", { url: CONFIG.patteriUrl},
  function (res, error_code, error_msg, ud) {
  if (res.code === 200) { // Halpaa
    Shelly.call("Switch.Set","{ id:0, on:true}", null,null); // Patterirele päälle
    Shelly.call("Switch.Set","{ id:3, on:false}", null,null); // Lämmöntiputusrele pois päältä
  }
  else if (res.code === 400) { // Kallista
    Shelly.call("Switch.Set","{ id:0, on:true}", null,null); // Patterirele päälle
    Shelly.call("Switch.Set","{ id:3, on:true}", null,null); // Lämmöntiputusrele päälle
  }
  }, null);
}

function VaraajaOhjaus() {
  Shelly.call("HTTP.GET", { url: CONFIG.varaajaUrl},
  function (res, error_code, error_msg, ud) {
  if (res.code === 200) { // Halpaa
    Shelly.call("Switch.Set","{ id:1, on:true}", null,null); // Varaajarele päälle
  }
  else if (res.code === 400) { // Kallista
    Shelly.call("Switch.Set","{ id:1, on:false}", null,null); // Varaajarele pois
  }
  }, null);
}

function LattiaOhjaus() {
  Shelly.call("HTTP.GET", { url: CONFIG.lattiaUrl},
  function (res, error_code, error_msg, ud) {
  if (res.code === 200) { // Halpaa
    Shelly.call("Switch.Set","{ id:2, on:true}", null,null); // Lattialämmitysrele päälle
  }
  else if (res.code === 400) { // Kallista
    Shelly.call("Switch.Set","{ id:2, on:false}", null,null); // Lattialämmitysrele pois
  }
  }, null);
}

// Ajastusten suoritus
Timer.set(CONFIG.paivitystaajuusPatteri, true, function (ud) { PatteriOhjaus(); }, null);
Timer.set(CONFIG.paivitystaajuusVaraaja, true, function (ud) { VaraajaOhjaus(); }, null);
Timer.set(CONFIG.paivitystaajuusLattia, true, function (ud) { LattiaOhjaus(); }, null);
