let stored_errors = [];
Timer.set(60000, true,
    function() {
        Shelly.call(
            "Script.GetStatus",
            {id: 1},
            function(result) {
                if(result.running === false) {
                    stored_errors.push({
                    time: Shelly.getComponentStatus("sys").unixtime,
                    error: JSON.stringify(result.errors)
                    });
                    Shelly.call(
                        "Script.Start",
                        {id: 1},
                    );      
                }
            }
        );

if(stored_errors.length > 0) {
print("Shelly 4pm tarkistaja: ", JSON.stringify(stored_errors))

}
})
