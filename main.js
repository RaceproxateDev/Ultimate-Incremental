// Game
let Data = {
    // Currency
    Points: new OmegaNum(0), PtsMulti: new OmegaNum(1), AutobuyPointsBuyables: false,
    PrestigePoints: new OmegaNum(0), PPMulti: new OmegaNum(1), PPStorage: new OmegaNum(0), PPresetsNothing: false,
    RepetitionPoints: new OmegaNum(0), RepetitionReq: new OmegaNum(20), RepetitionBulk: new OmegaNum(1), RepetitionScale: new OmegaNum(2),
    RebirthPoints: new OmegaNum(0), RebirthMulti: new OmegaNum(1), RebirthStorage: new OmegaNum(0), RebirthEssence: new OmegaNum(0), RebirthEssenceMulti: new OmegaNum(1),
    // Buyables
    PtsBuyable1Price: new OmegaNum("10"), PtsBuyable1Scaling: new OmegaNum("3"), PtsBuyable1Amount: new OmegaNum(0),
    PtsBuyable2Price: new OmegaNum("100"), PtsBuyable2Scaling: new OmegaNum("5"), PtsBuyable2Amount: new OmegaNum(0),
    PPBuyable1Price: new OmegaNum("1"), PPBuyable1Scaling: new OmegaNum("4"), PPBuyable1Amount: new OmegaNum(0),
    PPBuyable2Price: new OmegaNum("5"), PPBuyable2Scaling: new OmegaNum("3"), PPBuyable2Amount: new OmegaNum(0),
    // Settings
    AutoSaveInterval: 10000,
    // Unlocks
    PrestigeUnlocked: false, RepetitionsUnlocked: false, RebirthUnlocked: false,
    // Tree Upgrades
    RPUpg1: false, RPUpg2: false, RPUpg3: false, RPUpg4: false, RPUpg5: false, RPUpg6: false,
}

let Template = {
    // Currency
    Points: new OmegaNum(0), PtsMulti: new OmegaNum(1), AutobuyPointsBuyables: false,
    PrestigePoints: new OmegaNum(0), PPMulti: new OmegaNum(1), PPStorage: new OmegaNum(0), PPresetsNothing: false,
    RepetitionPoints: new OmegaNum(0), RepetitionReq: new OmegaNum(20), RepetitionBulk: new OmegaNum(1), RepetitionScale: new OmegaNum(2),
    RebirthPoints: new OmegaNum(0), RebirthMulti: new OmegaNum(1), RebirthStorage: new OmegaNum(0), RebirthEssence: new OmegaNum(0), RebirthEssenceMulti: new OmegaNum(1),
    // Buyables
    PtsBuyable1Price: new OmegaNum("10"), PtsBuyable1Scaling: new OmegaNum("3"), PtsBuyable1Amount: new OmegaNum(0),
    PtsBuyable2Price: new OmegaNum("100"), PtsBuyable2Scaling: new OmegaNum("5"), PtsBuyable2Amount: new OmegaNum(0),
    PPBuyable1Price: new OmegaNum("1"), PPBuyable1Scaling: new OmegaNum("4"), PPBuyable1Amount: new OmegaNum(0),
    PPBuyable2Price: new OmegaNum("5"), PPBuyable2Scaling: new OmegaNum("3"), PPBuyable2Amount: new OmegaNum(0),
    // Settings
    AutoSaveInterval: 10000,
    // Unlocks
    PrestigeUnlocked: false, RepetitionsUnlocked: false, RebirthUnlocked: false,
    // Tree Upgrades
    RPUpg1: false, RPUpg2: false, RPUpg3: false, RPUpg4: false, RPUpg5: false, RPUpg6: false,
}

function ChangeWindows(targetId) {
    let divs = document.querySelectorAll("div");

    divs.forEach(div => {
        div.style.display = (div.id === targetId) ? "block" : "none";
    })
    
}

var htmlItems = {
    PtsDisplay: document.getElementById("PtsDisplay"),
    PrestigePointsDisplay: document.getElementById("PrestigePointsDisplay"),
    PtsBuyable1Btn: document.getElementById("PtsBuyable1Btn"),
    PtsBuyable2Btn: document.getElementById("PtsBuyable2Btn"),
    PtsBuyable3Btn: document.getElementById("PtsBuyable3Btn"),
    PrestigeTabBtn: document.getElementById("PrestigeTabBtn"),
    PPTextCalc: document.getElementById("PPTextCalc"),
    PrestigeUpgradesBtn: document.getElementById("PrestigeUpgradesBtn"),

    // Stats
    PtsMultiStatTxt: document.getElementById("PtsMultiStatTxt"),
}

function UpdateText() {
    htmlItems.PtsDisplay.innerText = `You Have ${format(Data.Points)} Points`;
    htmlItems.PrestigePointsDisplay.innerText = `You Have ${format(Data.PrestigePoints)} Prestige Points`;
    htmlItems.PrestigePointsDisplay.style.visibility = (Data.PrestigeUnlocked === true) ? "visible" : "hidden";
    htmlItems.PtsBuyable1Btn.innerText = `${format(Data.PtsBuyable1Price)} Points`;
    htmlItems.PtsBuyable2Btn.innerText = `${format(Data.PtsBuyable2Price)} Points`;
    htmlItems.PtsBuyable3Btn.style.visibility = (Data.PrestigeUnlocked === false) ? "visible" : "hidden";
    htmlItems.PrestigeTabBtn.style.visibility = (Data.PrestigeUnlocked === true) ? "visible" : "hidden";
    htmlItems.PPTextCalc.innerText = `You will gain ${format(Data.PPStorage)} Prestige Points.`;
    htmlItems.PrestigeUpgradesBtn.style.visibility = (Data.PrestigeUnlocked === true) ? "visible" : "hidden";

    // Stats
    htmlItems.PtsMultiStatTxt.innerText = `Points Multiplier: ${format(Data.PtsMulti)}x`;
}

function GainPoints() {
    Data.Points = OmegaNum.add(Data.Points, Data.PtsMulti);
    UpdateText();
}

function UpdatePtsMulti() {
    let mult = new OmegaNum(1);
    if (OmegaNum.gt(Data.PtsBuyable1Amount, 0)) mult = OmegaNum.mul(mult, OmegaNum.pow(1.25, Data.PtsBuyable1Amount));
    if (OmegaNum.gt(Data.PtsBuyable2Amount, 0)) mult = OmegaNum.mul(mult, OmegaNum.pow(2, Data.PtsBuyable2Amount));
    if (OmegaNum.gt(Data.PPBuyable1Amount, 0)) mult = OmegaNum.mul(mult, OmegaNum.pow(3, Data.PPBuyable1Amount));
    if (OmegaNum.gte(Data.RepetitionPoints, 1)) mult = OmegaNum.mul(mult, 3);
    if (OmegaNum.gte(Data.RepetitionPoints, 2)) mult = OmegaNum.mul(mult, OmegaNum.add(1, OmegaNum.pow(Data.PrestigePoints, 0.25)))
    if (OmegaNum.gte(Data.RepetitionPoints, 4)) mult = OmegaNum.pow(mult, 1.01);
    if (OmegaNum.gte(Data.RepetitionPoints, 12)) mult = OmegaNum.mul(mult, 3.5);
    if (OmegaNum.gte(Data.RepetitionPoints, 20)) mult = OmegaNum.pow(mult, 1.1);
    if (Data.RPUpg4 === true) mult = OmegaNum.mul(mult, 10)
    Data.PtsMulti = mult;
    return mult;
}


setInterval(UpdatePtsMulti, 100);

window.addEventListener("load", UpdateText);

function BuyUpgrade(UpgId) {
    if (UpgId === 1) {
        if (OmegaNum.gte(Data.Points, Data.PtsBuyable1Price)) {
            Data.Points = OmegaNum.sub(Data.Points, Data.PtsBuyable1Price);
            Data.PtsBuyable1Price = OmegaNum.mul(Data.PtsBuyable1Price, Data.PtsBuyable1Scaling);
            Data.PtsBuyable1Amount = OmegaNum.add(Data.PtsBuyable1Amount, 1);
            UpdateText();
            UpdatePtsMulti();
        }
    }

    if (UpgId === 2) {
        if (OmegaNum.gte(Data.Points, Data.PtsBuyable2Price)) {
            Data.Points = OmegaNum.sub(Data.Points, Data.PtsBuyable2Price);
            Data.PtsBuyable2Price = OmegaNum.mul(Data.PtsBuyable2Price, Data.PtsBuyable2Scaling);
            Data.PtsBuyable2Amount = OmegaNum.add(Data.PtsBuyable2Amount, 1);
            UpdateText();
            UpdatePtsMulti();
        }
    }

    if (UpgId === 3) {
        if (OmegaNum.gte(Data.Points, new OmegaNum("1000"))) {
            Data.Points = OmegaNum.sub(Data.Points, "1000");
            Data.PrestigeUnlocked = true;
            UpdateText();
            UpdatePtsMulti();
        }
    }
}

setInterval(UpdateText, 100);

