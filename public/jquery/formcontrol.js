$("#tag1").on("change",function(){
    let tag1 = $("#tag1").val();
    // let masculinoTags = $(".masculino").text();
    let masculinoTags = document.getElementsByClassName("masculino");
    let femininoTags = document.getElementsByClassName("feminino");
    let infMasculinoTags = document.getElementsByClassName("infantil-masculino");
    let infFemininoTags = document.getElementsByClassName("infantil-feminino");
    switch (tag1) {
        case 'Masculino':
            document.getElementById("tag2").innerHTML = getString(masculinoTags);
        break;
        case 'Feminino':
            document.getElementById("tag2").innerHTML = getString(femininoTags);
        break;
        case 'Infantil masculino':
            document.getElementById("tag2").innerHTML = getString(infMasculinoTags);
        break;
        case 'Infantil feminino':
            document.getElementById("tag2").innerHTML = getString(infFemininoTags);
        break;
    }
});

function getString (object) {
    let string = "";
    for (let i = 0; i < object.length; i++){
        string = string + "<option>" + object[i].text + "</option>";
    }
    return string;
}