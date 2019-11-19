'use strict'

loadGift(xhr => {
    if(xhr.status != 201) {
        console.log("algo salió mal");
        console.log(xhr.response);
    }
    else {
        console.log("Todo va bien, tu tranquilo");
        console.log(xhr.response);
    }
});