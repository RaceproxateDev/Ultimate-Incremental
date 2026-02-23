// Prestige

function CalculatePrestige() {
    Data.PPStorage = OmegaNum.mul(OmegaNum.pow(OmegaNum.div(Data.Points, 1000), 0.35), Data.PPMulti);
    UpdateText();
}

setInterval(() => {
    CalculatePrestige();
}, 100);

function Prestige() {
    if (Data.PPStorage.gte(1) && Data.PPresetsNothing === false) {
        Data.PrestigePoints = OmegaNum.add(Data.PrestigePoints, Data.PPStorage);
        Data.Points = new OmegaNum(0);
        Data.PtsBuyable1Price = new OmegaNum(10);
        Data.PtsBuyable2Price = new OmegaNum(100);
        Data.PtsBuyable1Amount = new OmegaNum(0);
        Data.PtsBuyable2Amount = new OmegaNum(0);
        Data.PPStorage = new OmegaNum(0);
    }

    if (Data.PPStorage.gte(1)) {
        Data.PrestigePoints = OmegaNum.add(Data.PrestigePoints, Data.PPStorage);
    }
}

var PPHtmlItems = {
    PPBuyable1Btn: document.getElementById("PPBuyable1Btn"),
    PPMultiStatTxt: document.getElementById("PPMultiStatTxt"),
    PPBuyable2Btn: document.getElementById("PPBuyable2Btn"),
    PPBuyable3Btn: document.getElementById("PPBuyable3Btn"),
    RepetitionsTabBtn: document.getElementById("RepetitionsTabBtn"),
}

function PPUpdateText() {
    PPHtmlItems.PPBuyable1Btn.innerText = `${format(Data.PPBuyable1Price)} Prestige Points`;
    PPHtmlItems.PPMultiStatTxt.innerText = `Prestige Points Multiplier: ${format(Data.PPMulti)}x`;
    PPHtmlItems.PPBuyable2Btn.innerText = `${format(Data.PPBuyable2Price)} Prestige Points`;
    PPHtmlItems.PPBuyable3Btn.style.visibility = (Data.RepetitionsUnlocked === false) ? "visible" : "hidden";
    PPHtmlItems.RepetitionsTabBtn.style.visibility = (Data.RepetitionsUnlocked === true) ? "visible" : "hidden";
}

function UpdatePPMulti() {
    let mult = new OmegaNum(1);
    if (OmegaNum.gt(Data.PPBuyable2Amount, 0)) mult = OmegaNum.mul(mult, OmegaNum.pow(1.5, Data.PPBuyable2Amount));
    if (OmegaNum.gte(Data.RepetitionPoints, 1)) mult = OmegaNum.mul(mult, 3);
    if (OmegaNum.gte(Data.RepetitionPoints, 12)) mult = OmegaNum.mul(mult, 3.5);
    Data.PPMulti = mult;
    return mult;
}

setInterval(UpdatePPMulti, 100);

function BuyPPUpgrade(UpgId) {
    if (UpgId === 1) {
        if (OmegaNum.gte(Data.PrestigePoints, Data.PPBuyable1Price)) {
            Data.PrestigePoints = OmegaNum.sub(Data.PrestigePoints, Data.PPBuyable1Price);
            Data.PPBuyable1Price = OmegaNum.mul(Data.PPBuyable1Price, Data.PPBuyable1Scaling);
            Data.PPBuyable1Amount = OmegaNum.add(Data.PPBuyable1Amount, 1);
            PPUpdateText();
            UpdateText();
            UpdatePtsMulti();
        }
    }

    if (UpgId === 2) {
        if (OmegaNum.gte(Data.PrestigePoints, Data.PPBuyable2Price)) {
            Data.PrestigePoints = OmegaNum.sub(Data.PrestigePoints, Data.PPBuyable2Price);
            Data.PPBuyable2Price = OmegaNum.mul(Data.PPBuyable2Price, Data.PPBuyable2Scaling);
            Data.PPBuyable2Amount = OmegaNum.add(Data.PPBuyable2Amount, 1);
            PPUpdateText();
            UpdateText();
            UpdatePtsMulti();
        }
    }

    if (UpgId === 3) {
        if (OmegaNum.gte(Data.PrestigePoints, new OmegaNum(25))) {
            Data.PrestigePoints = OmegaNum.sub(Data.PrestigePoints, new OmegaNum(25));
            Data.RepetitionsUnlocked = true;
            PPUpdateText();
            UpdateText();
        }
    }
}

function PassivePPGain() {
    let p = new OmegaNum(0);
    if (OmegaNum.gte(Data.RepetitionPoints, 8)) p = OmegaNum.add(p, 0.01);
    Data.PrestigePoints = OmegaNum.add(Data.PrestigePoints, OmegaNum.mul(Data.PPStorage, p));
    return p;
}

setInterval(PPUpdateText, 100);
setInterval(PassivePPGain, 1000);

// Repetitions

function Repeat() {
    if (OmegaNum.gte(Data.PrestigePoints, Data.RepetitionReq)) {
        Data.RepetitionPoints = OmegaNum.add(Data.RepetitionPoints, Data.RepetitionBulk);
        Data.PrestigePoints = new OmegaNum(0);
        Data.Points = new OmegaNum(0);
        Data.PtsBuyable1Price = new OmegaNum(10);
        Data.PtsBuyable2Price = new OmegaNum(100);
        Data.PtsBuyable1Amount = new OmegaNum(0);
        Data.PtsBuyable2Amount = new OmegaNum(0);
        Data.PPBuyable1Price = new OmegaNum(1);
        Data.PPBuyable2Price = new OmegaNum(5);
        Data.PPBuyable1Amount = new OmegaNum(0);
        Data.PPBuyable2Amount = new OmegaNum(0);
        Data.RepetitionReq = OmegaNum.mul(Data.RepetitionReq, Data.RepetitionScale);
    }

}

var RepetitionsHtmlItems = {
    RepetitionsTextCalc: document.getElementById("RepetitionsTextCalc"),
    RepetitionMilestone1: document.getElementById("RepetitionMilestone1"),
    RepetitionMilestone2: document.getElementById("RepetitionMilestone2"),
    RepetitionMilestone3: document.getElementById("RepetitionMilestone3"),
    RepetitionMilestone4: document.getElementById("RepetitionMilestone4"),
    RepetitionMilestone5: document.getElementById("RepetitionMilestone5"),
    RepetitionMilestone6: document.getElementById("RepetitionMilestone6"),
    RepetitionMilestone7: document.getElementById("RepetitionMilestone7"),
    RepetitionPointsDisplay: document.getElementById("RepetitionPointsDisplay"),
    RebirthTabBtn: document.getElementById("RebirthTabBtn"),
}

function RepetitionUpdateText() {
    RepetitionsHtmlItems.RepetitionsTextCalc.innerText = `You need ${format(Data.RepetitionReq)} Prestige Points to perform a Repetition.`;
    RepetitionsHtmlItems.RepetitionPointsDisplay.innerText = `You Have ${format(Data.RepetitionPoints)} Repetition Points`;
    RepetitionsHtmlItems.RepetitionMilestone1.style.backgroundColor = (OmegaNum.gte(Data.RepetitionPoints, 1)) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)";
    RepetitionsHtmlItems.RepetitionMilestone2.style.backgroundColor = (OmegaNum.gte(Data.RepetitionPoints, 2)) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)";
    RepetitionsHtmlItems.RepetitionMilestone3.style.backgroundColor = (OmegaNum.gte(Data.RepetitionPoints, 4)) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)";
    RepetitionsHtmlItems.RepetitionMilestone4.style.backgroundColor = (OmegaNum.gte(Data.RepetitionPoints, 6)) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)";
    RepetitionsHtmlItems.RepetitionMilestone5.style.backgroundColor = (OmegaNum.gte(Data.RepetitionPoints, 8)) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)";
    RepetitionsHtmlItems.RepetitionMilestone6.style.backgroundColor = (OmegaNum.gte(Data.RepetitionPoints, 12)) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)";
    RepetitionsHtmlItems.RepetitionMilestone7.style.backgroundColor = (OmegaNum.gte(Data.RepetitionPoints, 20)) ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)";
    RepetitionsHtmlItems.RebirthTabBtn.style.visibility = (Data.RebirthUnlocked === true) ? "visible" : "hidden";
}

function UpdateRepetitionBulk() {
    let bulk = new OmegaNum(1);
    if (Data.RPUpg3 === true) bulk = OmegaNum.mul(bulk, 2)
    Data.RepetitionBulk = bulk;
    return bulk;
}

function EnableAutobuyers() {
    if (OmegaNum.gte(Data.RepetitionPoints, 4)) Data.AutobuyPointsBuyables = true;
    
}

function CalcPrestigeReset() {
    if (OmegaNum.gte(Data.RepetitionPoints, 6)) Data.PPresetsNothing = true;
}

function AutobuyPointUpg() {
    if (Data.AutobuyPointsBuyables === true) {
        BuyUpgrade(1);
        BuyUpgrade(2);
    }
}

function CalcRepetitionScaling() {
    let scale = new OmegaNum(2);
    if (OmegaNum.gte(Data.RepetitionPoints, 6)) scale = OmegaNum.mul(scale, 2);
    if (OmegaNum.gte(Data.RepetitionPoints, 12)) scale = OmegaNum.mul(scale, 3);
    Data.RepetitionScale = scale;
    return scale;
}

function CalcUnlockRebirth() {
    if (OmegaNum.gte(Data.RepetitionPoints, 20)) Data.RebirthUnlocked = true;
}

setInterval(RepetitionUpdateText, 100);
setInterval(UpdateRepetitionBulk, 100);
setInterval(AutobuyPointUpg, 100);
setInterval(EnableAutobuyers, 100);
setInterval(CalcPrestigeReset, 100);
setInterval(CalcRepetitionScaling, 100);
setInterval(CalcUnlockRebirth, 100);

// Rebirth
function CalculateRebirth() {
    Data.RebirthStorage = OmegaNum.mul(OmegaNum.pow(OmegaNum.div(Data.PrestigePoints, 1e100), 0.01), Data.RebirthMulti);
}

function Rebirth() {
    if (OmegaNum.gte(Data.RebirthStorage, 1)) {
        Data.RebirthPoints = OmegaNum.add(Data.RebirthPoints, Data.RebirthStorage);
        Data.PrestigePoints = new OmegaNum(0);
        Data.Points = new OmegaNum(0);
        Data.PtsBuyable1Amount = new OmegaNum(0);
        Data.PtsBuyable2Amount = new OmegaNum(0);
        Data.PPBuyable1Amount = new OmegaNum(0);
        Data.PPBuyable2Amount = new OmegaNum(0);
        Data.PtsBuyable1Price = new OmegaNum(10);
        Data.PtsBuyable2Price = new OmegaNum(100);
        Data.PPBuyable1Price = new OmegaNum(1);
        Data.PPBuyable2Price = new OmegaNum(5);
        Data.RepetitionPoints = new OmegaNum(0);
        Data.RepetitionReq = new OmegaNum(20);
        Data.RepetitionScale = new OmegaNum(2);
        Data.AutobuyPointsBuyables = false;
        Data.PPresetsNothing = false;
    }
}

function GainRebirthEssence() {
    if (Data.RPUpg1 === true) {
        Data.RebirthEssence = OmegaNum.add(Data.RebirthEssence, Data.RebirthEssenceMulti);
        UpdateRebirthText();
    }
}

function UpdateRebirthMulti() {
    let mult = new OmegaNum(1);

    Data.RebirthMulti = mult;
    return mult;
}

function UpdateRebirthEssenceMulti() {
    let mult = new OmegaNum(1);
    if (Data.RPUpg2 === true) mult = OmegaNum.mul(mult, 3);
    Data.RebirthEssenceMulti = mult;
    return mult;
}

var RebirthHtmlItems = {
    RebirthTextCalc: document.getElementById("RebirthTextCalc"),
    RebirthPointsDisplay: document.getElementById("RebirthPointsDisplay"),
    RebirthTreeBtn: document.getElementById("RebirthTreeBtn"),
    RebirthEssenceDisplay: document.getElementById("RebirthEssenceDisplay"),
    // Rebirth Tree
    RebirthTreeUpg1Btn: document.getElementById("RebirthTreeUpg1Btn"),
    RPUpg1BtnCost: document.getElementById("RPUpg1BtnCost"),
    RebirthTreeUpg2Btn: document.getElementById("RebirthTreeUpg2Btn"),
    RPUpg2BtnCost: document.getElementById("RPUpg2BtnCost"),
    RebirthTreeUpg3Btn: document.getElementById("RebirthTreeUpg3Btn"),
    RPUpg3BtnCost: document.getElementById("RPUpg3BtnCost"),
    RebirthTreeUpg4Btn: document.getElementById("RebirthTreeUpg4Btn"),
    RPUpg4BtnCost: document.getElementById("RPUpg4BtnCost"),
    RebirthTreeUpg5Btn: document.getElementById("RebirthTreeUpg5Btn"),
    RPUpg5BtnCost: document.getElementById("RPUpg5BtnCost"),
    RebirthTreeUpg6Btn: document.getElementById("RebirthTreeUpg6Btn"),
    RPUpg6BtnCost: document.getElementById("RPUpg6BtnCost"),
    
}

function UpdateRebirthText() {
    RebirthHtmlItems.RebirthTextCalc.innerText = `You will gain ${format(Data.RebirthStorage)} Rebirth Points`;
    RebirthHtmlItems.RebirthPointsDisplay.innerText = `You Have ${format(Data.RebirthPoints)} Rebirth Points`;
    RebirthHtmlItems.RebirthTreeBtn.style.display = (Data.RebirthUnlocked === true) ? "block" : "none";
    RebirthHtmlItems.RebirthEssenceDisplay.innerText = `Rebirth Essence: ${format(Data.RebirthEssence)}`;
    RebirthHtmlItems.RebirthEssenceDisplay.disabled = (Data.RPUpg1 === true) ? true : false;

    // Rebirth Tree
    RebirthHtmlItems.RPUpg1BtnCost.innerText = (Data.RPUpg1 === true) ? "Bought" : `Cost: Free!`;
    RebirthHtmlItems.RPUpg2BtnCost.innerText = (Data.RPUpg2 === true) ? "Bought" : `Cost: 10 Rebirth Essence`;
    RebirthHtmlItems.RPUpg3BtnCost.innerText = (Data.RPUpg3 === true) ? "Bought" : `Cost: 1 Rebirth Point`;
    RebirthHtmlItems.RPUpg4BtnCost.innerText = (Data.RPUpg4 === true) ? "Bought" : `Cost: 50 Rebirth Essence`
    RebirthHtmlItems.RPUpg5BtnCost.innerText = (Data.RPUpg5 === true) ? "Bought" : `Cost: 100 Rebirth Essence`
    RebirthHtmlItems.RPUpg6BtnCost.innerText = (Data.RPUpg6 === true) ? "Bought" : `Cost: 2 Rebirth Points`

    RebirthHtmlItems.RebirthTreeUpg1Btn.disabled = (Data.RPUpg1 === true) ? true : false;
    RebirthHtmlItems.RebirthTreeUpg2Btn.disabled = (Data.RPUpg2 === true) ? true : false;
    RebirthHtmlItems.RebirthTreeUpg3Btn.disabled = (Data.RPUpg3 === true) ? true : false;
    RebirthHtmlItems.RebirthTreeUpg4Btn.disabled = (Data.RPUpg4 === true) ? true : false;
    RebirthHtmlItems.RebirthTreeUpg5Btn.disabled = (Data.RPUpg5 === true) ? true : false;
    RebirthHtmlItems.RebirthTreeUpg6Btn.disabled = (Data.RPUpg6 === true) ? true : false;

    RebirthHtmlItems.RebirthTreeUpg2Btn.style.display = (Data.RPUpg1 === true) ? "block" : "none";
    RebirthHtmlItems.RebirthTreeUpg3Btn.style.display = (Data.RPUpg2 === true) ? "block" : "none";
    RebirthHtmlItems.RebirthTreeUpg4Btn.style.display = (Data.RPUpg2 === true) ? "block" : "none";
    RebirthHtmlItems.RebirthTreeUpg5Btn.style.display = (Data.RPUpg3 === true) ? "block" : "none";
    RebirthHtmlItems.RebirthTreeUpg6Btn.style.display = (Data.RPUpg5 === true) ? "block" : "none";
}

function BuyRebirthTreeUpgrade(RebirthUpgId) {
    if (RebirthUpgId === 1) {
        Data.RPUpg1 = true;
        UpdateRebirthText();
    }

    if (RebirthUpgId === 2) {
        if (OmegaNum.gte(Data.RebirthEssence, 10)) {
            Data.RebirthEssence = OmegaNum.sub(Data.RebirthEssence, 10);
            Data.RPUpg2 = true;
            UpdateRebirthText();
        }
    }

    if (RebirthUpgId === 3) {
        if (OmegaNum.gte(Data.RebirthPoints, 1)) {
            Data.RebirthPoints = OmegaNum.sub(Data.RebirthPoints, 1);
            Data.RPUpg3 = true;
            UpdateRebirthText();
        }
    }

    if (RebirthUpgId === 4) {
        if (OmegaNum.gte(Data.RebirthEssence, 50)) {
            Data.RebirthEssence = OmegaNum.sub(Data.RebirthEssence, 50)
            Data.RPUpg4 = true;
            UpdateRebirthText()
        }
    }

    if (RebirthUpgId === 5) {
        if (OmegaNum.gte(Data.RebirthEssence, 100)) {
            Data.RebirthEssence = OmegaNum.sub(Data.RebirthEssence, 100)
            Data.RPUpg5 = true;
            UpdateRebirthText()
        }
    }

    if (RebirthUpgId === 6) {
        if (OmegaNum.gte(Data.RebirthPoints, 2)) {
            Data.RebirthPoints = OmegaNum.sub(Data.RebirthPoints, 2)
            Data.RPUpg6 = true;
            UpdateRebirthText()
        }
    }
}

function GainAutomaticallyPoints() {
    if (Data.RPUpg5 === true) {
        GainPoints()
    }
}

function AutoBuyPPUpg() {
    if (Data.RPUpg6 === true) {
        BuyPPUpgrade(1);
        BuyPPUpgrade(2)
    }
}

setInterval(CalculateRebirth, 100);
setInterval(UpdateRebirthMulti, 100);
setInterval(UpdateRebirthEssenceMulti, 100);
setInterval(UpdateRebirthText, 100);
setInterval(GainRebirthEssence, 1000);
setInterval(GainAutomaticallyPoints, 1000);
setInterval(AutoBuyPPUpg, 100);