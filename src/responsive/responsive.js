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
            const storageId = result["storageList"][i].storageId
            $("#mainStorageLocation").append(`<button class='squareBtn' id=${storageId}>${storageName}</button>`); //create buttons with storage names
        }

        $(".squareBtn, .fileBtn").each(function() { //make buttons toggle-able
            const lightPurple = "rgb(98, 93, 110)"; //buttons are light purple when not selected, dark purple when they are select
            const darkPurple = "rgb(59, 54, 70)";
    
            $(this).attr("selected", false);

            $(this).on("click", function() {
                const currentColor = $(this).css("background-color")
                var currId = $(this).attr("id");

                if (currentColor === lightPurple) { //select element
                    $(this).css("background-color", darkPurple);
                    $(this).attr("selected", true);
                    
                    if ($(this).attr("class") === "squareBtn") { //deselect other storage buttons when another storage button is clicked
                        $(".squareBtn").each(function() {
                            if ($(this).attr("id") != currId) {
                                $(this).attr("selected", false);
                                $(this).css("background-color", lightPurple);
                            }
                        })
                    }

                } else {
                    $(this).css("background-color", lightPurple); //deselect element
                    $(this).attr("selected", false);
                }
            });
        });
    })

});