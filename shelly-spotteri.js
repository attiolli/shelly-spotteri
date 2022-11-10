let CONFIG = {
  // Päivitystaajuuden asetukset eli kuinka usein ohjelma tarkastaa API rajapinnasta hinnat
  paivitystaajuusPatteri:  5 * 60000, // 5 minuutin välein
  paivitystaajuusVaraaja: 5 * 60500,
  paivitystaajuusLattia: 5 * 60800,
  // API asetukset. Patterit päälle jos kuluva tunti kuuluu 8 halvimman joukkoon TAI jos alle 5 senttiä.
  patteriUrl: "https://api.spot-hinta.fi/JustNowRank/8/5",
  varaajaUrl: "https://api.spot-hinta.fi/JustNowRank/6/5",
  lattiaUrl: "https://api.spot-hinta.fi/JustNowRank/8/5",
  // Fallback asetukset. Jos hintatietoa ei saada API rajapinnasta, niin mennään näillä manuaalisilla ajastuksilla.
  // Pattereiden tapuksessa tarkoitetaan aikaväliä, jolloin pidetään normaalilämpö, muuten on tiputusmoodi.
  // Huom! StartHour pitää kaikissa olla asetettu suuremmaksi kuin StopHour lukema.
  patteriStartHour: 23,
  patteriStopHour: 7,
  varaajaStartHour: 23,
  varaajaStopHour: 7,
  lattiaStartHour: 23,
  lattiaStopHour: 7,
};

function PatteriManuaaliOhjaus() {
        Shelly.call('Sys.GetStatus', {}, function (status) {
        let hour = JSON.parse(status.time.slice(0, 2));
        if (hour >= CONFIG.patteriStartHour || hour < CONFIG.patteriStopHour) {
          print("Patterit normaalilammolle");
          Shelly.call("Switch.Set","{ id:3, on:false}", null,null);
        } else {
          print("Patterit tiputukselle");
          Shelly.call("Switch.Set","{ id:3, on:true}", null,null);
        }
      });
}

function VaraajaManuaaliOhjaus() {
        Shelly.call('Sys.GetStatus', {}, function (status) {
        let hour = JSON.parse(status.time.slice(0, 2));
        if (hour >= CONFIG.varaajaStartHour || hour < CONFIG.varaajaStopHour) {
          print("Varaaja paalle");
          Shelly.call("Switch.Set","{ id:1, on:true}", null,null);
        } else {
          print("Varaaja pois paalta");
          Shelly.call("Switch.Set","{ id:1, on:false}", null,null);
        }
      });
}

function LattiaManuaaliOhjaus() {
        Shelly.call('Sys.GetStatus', {}, function (status) {
        let hour = JSON.parse(status.time.slice(0, 2));
        if (hour >= CONFIG.lattiaStartHour || hour < CONFIG.lattiaStopHour) {
          print("Lattialammitys paalle");
          Shelly.call("Switch.Set","{ id:2, on:true}", null,null);
        } else {
          print("Lattialammitys pois paalta");
          Shelly.call("Switch.Set","{ id:2, on:false}", null,null);
        }
      });
}

function PatteriOhjaus() {
  Shelly.call("Switch.Set","{ id:0, on:true}", null,null);
  Shelly.call("HTTP.GET", { url: CONFIG.patteriUrl},
  function (res, error_code, error_msg, ud) {
  if(error_code === 0) {
      if (res.code === 200) { // Halpaa
        Shelly.call("Switch.Set","{ id:3, on:false}", null,null); // Lämmöntiputusrele pois päältä
      }
      else if (res.code === 400) { // Kallista
        Shelly.call("Switch.Set","{ id:3, on:true}", null,null); // Lämmöntiputusrele päälle
      }
  } else {
      print("Virhe patteri API rajapinnassa!");
      PatteriManuaaliOhjaus();
  }
  }, null);
}

function VaraajaOhjaus() {
  Shelly.call("HTTP.GET", { url: CONFIG.varaajaUrl},
  function (res, error_code, error_msg, ud) {
  if(error_code === 0) {
    if (res.code === 200) { // Halpaa
      Shelly.call("Switch.Set","{ id:1, on:true}", null,null); // Varaajarele päälle
    }
    else if (res.code === 400) { // Kallista
      Shelly.call("Switch.Set","{ id:1, on:false}", null,null); // Varaajarele pois
    }
  } else {
      print("Virhe varaaja API rajapinnassa!");
      VaraajaManuaaliOhjaus();
  }
  }, null);
}

function LattiaOhjaus() {
  Shelly.call("HTTP.GET", { url: CONFIG.lattiaUrl},
  function (res, error_code, error_msg, ud) {
  if(error_code === 0) {
    if (res.code === 200) { // Halpaa
      Shelly.call("Switch.Set","{ id:2, on:true}", null,null); // Lattialämmitysrele päälle
    }
    else if (res.code === 400) { // Kallista
      Shelly.call("Switch.Set","{ id:2, on:false}", null,null); // Lattialämmitysrele pois
    }
  } else {
      print("Virhe lattia API rajapinnassa!");
      LattiaManuaaliOhjaus();
  }
  }, null);
}

// Ajastusten suoritus
Timer.set(CONFIG.paivitystaajuusPatteri, true, function (ud) { PatteriOhjaus(); }, null);
Timer.set(CONFIG.paivitystaajuusVaraaja, true, function (ud) { VaraajaOhjaus(); }, null);
Timer.set(CONFIG.paivitystaajuusLattia, true, function (ud) { LattiaOhjaus(); }, null);
