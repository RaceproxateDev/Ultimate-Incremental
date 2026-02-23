function SaveGame() {
    localStorage.setItem("PlayerData1", JSON.stringify(Data));
}

function LoadGame() {
    let SaveData = JSON.parse(localStorage.getItem("PlayerData1"));

    if (SaveData) {
        Data = SaveData;
    } else {
        Data = Template;
    }
}

function ResetData() {
    if (confirm("Are you sure you want to reset your data? This action cannot be undone.")) {
        localStorage.removeItem("PlayerData1");
        Data = Template;
        UpdateText();
        RepetitionUpdateText();
        PPUpdateText();
    }
}

function SetAutosaveInterval() {
    let inp = prompt("Enter the new autosave interval in milliseconds (between 1000 ms and 60000 ms):", Data.AutoSaveInterval);

    if (inp !== null && !isNaN(inp) && inp >= 1000 && inp <= 60000) {
        Data.AutoSaveInterval = parseInt(inp);
        SaveGame();
    }
}

setInterval(SaveGame, Data.AutoSaveInterval);

window.addEventListener("load", LoadGame);
window.addEventListener("load", UpdateText);