async function getData() {
    try {
        const response = await fetch('http://localhost:5500/list-storages'); //get data from backend
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

$(document).ready(function() {

    getData().then(result => {
        for (let i = 0; i < result["storageList"].length; i++) {
            const storageName = result["storageList"][i].storageName
            $("#mainStorageLocation").append(`<button class='squareBtn'>${storageName}</button>`); //create buttons with storage names
        }

        $(".squareBtn, .fileBtn").each(function() { //make buttons toggle-able
            const lightPurple = "rgb(98, 93, 110)";
            const darkPurple = "rgb(59, 54, 70)";
    
            $(this).attr("selected", false);
    
            $(this).on("click", function() {
                const currentColor = $(this).css("background-color")
                if (currentColor === lightPurple) {
                    $(this).css("background-color", darkPurple);
                    $(this).attr("selected", true);
                } else {
                    $(this).css("background-color", lightPurple);
                    $(this).attr("selected", false);
                }
            });
        });
    })

});