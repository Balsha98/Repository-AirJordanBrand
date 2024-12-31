let possibleOptions;
const readFile = new XMLHttpRequest();

readFile.addEventListener("load", function () {
    possibleOptions = JSON.parse(this.responseText);
});

readFile.open("GET", "assets/json/data.json", true);
readFile.send();

export { possibleOptions };
