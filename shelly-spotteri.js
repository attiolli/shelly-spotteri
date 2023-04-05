// General Settings
let Region = "FI"; // See supported regions in Swagger documentation: https://api.spot-hinta.fi/swagger/ui
let cHour = ""; let Executed = false; let rclosed = false;

// Relay 0 (Radiators on/off)
let R0rclosed = true;

// Relay 1 (Heat boiler)
let R1Rank = "24"; // How many hours relay is on (cheapest hours) 
let R1PriceAllowed = "4"; // Heating is always on, when price is below this (Euro cents)
let R1PriorityHours = "23,00,01,02,03,04,05,06,07,08"; // These hours are prioritized (smallest ranks to these hours, f.ex. if you want to heat boiler during night). Use "99", if not wanted.
let R1BackupHours = ["01", "02", "03", "04", "05", "06"]; // If API or Internet connection is down, heat these hours
let R1urlToCall = "https://api.spot-hinta.fi/JustNowRank/" + R1Rank + "/" + R1PriceAllowed + "?priorityHours=" + R1PriorityHours + "&region=" + Region;
let R1bhour = false;
let R1Executed = false;
let R1rclosed = false;

// Relay 2 (Floor heating)
let R2Rank = "24"; 
let R2PriceAllowed = "4"; 
let R2PriorityHours = "99";
let R2BackupHours = ["23","00", "01", "02", "03", "04", "05", "06"];
let R2urlToCall = "https://api.spot-hinta.fi/JustNowRank/" + R2Rank + "/" + R2PriceAllowed + "?priorityHours=" + R2PriorityHours + "&region=" + Region;
let R2bhour = false;
let R2Executed = false;
let R2rclosed = false;

// Relay 3 (Radiators normal/drop)
let R3Rank = "7"; 
let R3PriceAllowed = "4"; 
let R3PriorityHours = "99";
let R3BackupHours = ["23","00", "01", "02", "03", "04", "05", "06"];
let R3urlToCall = "https://api.spot-hinta.fi/JustNowRank/" + R3Rank + "/" + R3PriceAllowed + "?priorityHours=" + R3PriorityHours + "&region=" + Region;
let R3bhour = false;
let R3Executed = false;
let R3rclosed = false;

// **********************************************************************************************

// R1 - Create timer and RunResponse
Timer.set(60000, true, function () {
   Shelly.call("Shelly.GetStatus", "", function (res) {
       let hour = res.sys.time.slice(0, 2); // f.ex. "21:34"
       if (cHour !== hour) { cHour = hour; R1Executed = false; }
       if (R1Executed === true) { print("R1 - Current hour is already done."); return; }
       R1bhour = false; for (let i = 0; i < R1BackupHours.length; i++) { if (R1BackupHours[i] === cHour) { bhour = true; } }
       print("R1 - URL to call: " + R1urlToCall);
       // Send HTTP GET to API
       Shelly.call("HTTP.GET", { url: R1urlToCall, timeout: 15, ssl_ca: "*" }, R1RunResponse);
   });
});
function R1RunResponse(result) {
   if (result !== null) {
       if (result.code === 400 && R1rclosed === true) { print("R1 - Relay already turned OFF by this script."); R1Executed = true; return; } // Allows possible other script to control relay while this is closed
       if (result.code === 400 && R1rclosed === false) { Shelly.call("Switch.Set", "{ id:1, on:false}", null, null); print("R1 - Relay OFF"); R1rclosed = true; R1Executed = true; return; }
       if (result.code === 200) { Shelly.call("Switch.Set", "{ id:1, on:true}", null, null); print("R1 - Relay ON"); R1rclosed = false; R1Executed = true; return; }
   }
   // Backup hour execution because request response was not an expected result. 
   if (R1bhour === true) { Shelly.call("Switch.Set", "{ id:1, on:true}", null, null); print("R1 - Relay ON (backup)"); R1Executed = false; return; }
   Shelly.call("Switch.Set", "{ id:1, on:false}", null, null); print("R1 - Relay OFF (non-backup)"); R1Executed = false; return;
}

// R2 - Create timer and RunResponse
Timer.set(60000, true, function () {
   Shelly.call("Shelly.GetStatus", "", function (res) {
       let hour = res.sys.time.slice(0, 2); // f.ex. "21:34"
       if (cHour !== hour) { cHour = hour; R2Executed = false; }
       if (R2Executed === true) { print("R2 - Current hour is already done."); return; }
       R2bhour = false; for (let i = 0; i < R2BackupHours.length; i++) { if (R2BackupHours[i] === cHour) { bhour = true; } }
       print("R2 - URL to call: " + R2urlToCall);
       // Send HTTP GET to API
       Shelly.call("HTTP.GET", { url: R2urlToCall, timeout: 15, ssl_ca: "*" }, R2RunResponse);
   });
});
function R2RunResponse(result) {
   if (result !== null) {
       if (result.code === 400 && R2rclosed === true) { print("R2 - Relay already turned OFF by this script."); R2Executed = true; return; } // Allows possible other script to control relay while this is closed
       if (result.code === 400 && R2rclosed === false) { Shelly.call("Switch.Set", "{ id:0, on:false}", null, null); print("R2 - Relay OFF"); R2rclosed = true; R2Executed = true; return; }
       if (result.code === 200) { Shelly.call("Switch.Set", "{ id:0, on:true}", null, null); print("R2 - Relay ON"); R2rclosed = false; R2Executed = true; return; }
   }
   // Backup hour execution because request response was not an expected result. 
   if (R2bhour === true) { Shelly.call("Switch.Set", "{ id:0, on:true}", null, null); print("R2 - Relay ON (backup)"); R2Executed = false; return; }
   Shelly.call("Switch.Set", "{ id:0, on:false}", null, null); print("R2 - Relay OFF (non-backup)"); R2Executed = false; return;
}
// R3 - Create timer and RunResponse
Timer.set(60000, true, function () {
   Shelly.call("Shelly.GetStatus", "", function (res) {
       let hour = res.sys.time.slice(0, 2); // f.ex. "21:34"
       if (cHour !== hour) { cHour = hour; R3Executed = false; }
       if (R3Executed === true) { print("R3 - Current hour is already done."); return; }
       R3bhour = false; for (let i = 0; i < R3BackupHours.length; i++) { if (R3BackupHours[i] === cHour) { bhour = true; } }
       print("R3 - URL to call: " + R3urlToCall);
       // Send HTTP GET to API
       Shelly.call("HTTP.GET", { url: R3urlToCall, timeout: 15, ssl_ca: "*" }, R3RunResponse);
   });
});
function R3RunResponse(result) {
   if (result !== null) {
       if (R0rclosed === true) { Shelly.call("Switch.Set", "{ id:0, on:true}", null, null); R0rclosed = false; }
       if (result.code === 400 && R3rclosed === true) { print("R3 - Relay already turned OFF by this script."); R3Executed = true; return; } // Allows possible other script to control relay while this is closed
       if (result.code === 400 && R3rclosed === false) { Shelly.call("Switch.Set", "{ id:3, on:false}", null, null); print("R3 - Relay OFF"); R3rclosed = true; R3Executed = true; return; }
       if (result.code === 200) { Shelly.call("Switch.Set", "{ id:3, on:true}", null, null); print("R3 - Relay ON"); R3rclosed = false; R3Executed = true; return; }
   }
   // Backup hour execution because request response was not an expected result. 
   if (R3bhour === true) { Shelly.call("Switch.Set", "{ id:3, on:true}", null, null); print("R3 - Relay ON (backup)"); R3Executed = false; return; }
   Shelly.call("Switch.Set", "{ id:3, on:false}", null, null); print("R3 - Relay OFF (non-backup)"); R3Executed = false; return;
}
