var Genes;
(function (Genes) {
    let BaseColor;
    (function (BaseColor) {
        BaseColor[BaseColor["B"] = 0] = "B";
        BaseColor[BaseColor["b"] = 1] = "b";
        BaseColor[BaseColor["b1"] = 2] = "b1";
    })(BaseColor = Genes.BaseColor || (Genes.BaseColor = {}));
    let Scale;
    (function (Scale) {
        Scale[Scale["T"] = 0] = "T";
        Scale[Scale["t"] = 1] = "t";
    })(Scale = Genes.Scale || (Genes.Scale = {}));
    let MultiColorism;
    (function (MultiColorism) {
        MultiColorism[MultiColorism["R"] = 0] = "R";
        MultiColorism[MultiColorism["r1"] = 1] = "r1";
        MultiColorism[MultiColorism["r2"] = 2] = "r2";
        MultiColorism[MultiColorism["r3"] = 3] = "r3";
    })(MultiColorism = Genes.MultiColorism || (Genes.MultiColorism = {}));
    let Dilution;
    (function (Dilution) {
        Dilution[Dilution["O"] = 0] = "O";
        Dilution[Dilution["o"] = 1] = "o";
    })(Dilution = Genes.Dilution || (Genes.Dilution = {}));
    let Point;
    (function (Point) {
        Point[Point["P"] = 0] = "P";
        Point[Point["pw"] = 1] = "pw";
    })(Point = Genes.Point || (Genes.Point = {}));
    let Silver;
    (function (Silver) {
        Silver[Silver["W"] = 0] = "W";
        Silver[Silver["w"] = 1] = "w";
        Silver[Silver["wn"] = 2] = "wn";
    })(Silver = Genes.Silver || (Genes.Silver = {}));
    let GildPattern;
    (function (GildPattern) {
        GildPattern[GildPattern["L"] = 0] = "L";
        GildPattern[GildPattern["l"] = 1] = "l";
    })(GildPattern = Genes.GildPattern || (Genes.GildPattern = {}));
    let Depth;
    (function (Depth) {
        Depth[Depth["D"] = 0] = "D";
        Depth[Depth["d"] = 1] = "d";
    })(Depth = Genes.Depth || (Genes.Depth = {}));
    let Breaking;
    (function (Breaking) {
        Breaking[Breaking["Z"] = 0] = "Z";
        Breaking[Breaking["z"] = 1] = "z";
        Breaking[Breaking["z1"] = 2] = "z1";
    })(Breaking = Genes.Breaking || (Genes.Breaking = {}));
    let Albinism;
    (function (Albinism) {
        Albinism[Albinism["C"] = 0] = "C";
        Albinism[Albinism["c"] = 1] = "c";
    })(Albinism = Genes.Albinism || (Genes.Albinism = {}));
    let AccentingColor;
    (function (AccentingColor) {
        AccentingColor[AccentingColor["A"] = 0] = "A";
        AccentingColor[AccentingColor["a"] = 1] = "a";
        AccentingColor[AccentingColor["a1"] = 2] = "a1";
        AccentingColor[AccentingColor["a2"] = 3] = "a2";
    })(AccentingColor = Genes.AccentingColor || (Genes.AccentingColor = {}));
    let AccentGradient;
    (function (AccentGradient) {
        AccentGradient[AccentGradient["Ag"] = 0] = "Ag";
        AccentGradient[AccentGradient["ag"] = 1] = "ag";
    })(AccentGradient = Genes.AccentGradient || (Genes.AccentGradient = {}));
    let AccentEyespot;
    (function (AccentEyespot) {
        AccentEyespot[AccentEyespot["Ae"] = 0] = "Ae";
        AccentEyespot[AccentEyespot["ae"] = 1] = "ae";
    })(AccentEyespot = Genes.AccentEyespot || (Genes.AccentEyespot = {}));
    let AccentingFin;
    (function (AccentingFin) {
        AccentingFin[AccentingFin["Af"] = 0] = "Af";
        AccentingFin[AccentingFin["af"] = 1] = "af";
    })(AccentingFin = Genes.AccentingFin || (Genes.AccentingFin = {}));
})(Genes || (Genes = {}));
var _a, _b;
const parents = [createBlankGeneSet(), createBlankGeneSet()];
function createBlankGeneSet() {
    let temp = {};
    Object.keys(Genes).forEach(gene => {
        temp[gene] = [0, 0];
    });
    return temp;
}
function getRandomGene(genes) {
    if (genes === undefined)
        throw new Error('Genes must be defined');
    return genes[Math.floor(Math.random() * genes.length)];
}
function InheritGene(g1, g2) {
    const a = getRandomGene(g1);
    const b = getRandomGene(g2);
    return a > b ? [b, a] : [a, b];
}
function breed(genes1, genes2) {
    let temp = {};
    Object.keys(Genes).forEach(gene => {
        temp[gene] = InheritGene(genes1[gene], genes2[gene]);
    });
    return temp;
}
function translateIntToString(val, geneName) {
    const Gene = Genes[geneName];
    return Gene[val];
}
function getCommonName(s) {
    return s.split(/(?=[A-Z])/).join(' ');
}
function getGeneOptions(s, id) {
    return Object.keys(Genes[s]).map(i => {
        if (parseInt(i) != i)
            return `
      <option value="${i}">${i}</option>
    `;
    }).join('');
}
const getId = (gene, parent, i) => `${gene}_${parent}_${i}`;
const GenParentHTML = (elementId, pid) => {
    const container = document.getElementById(elementId);
    if (!container) {
        console.error('No container found');
        return;
    }
    console.log('Container found.');
    container.innerHTML = Object.keys(Genes).map(gene => {
        return `
        <div class="item-card">
            <h3 class="item-title">${getCommonName(gene)}</h3>
            <label for="genes">Choose genes</label>
            <select name="genes" id = ${getId(gene, pid, 0)}>
                ${getGeneOptions(gene, 0)}
            </select>
            <select name="genes" id = ${getId(gene, pid, 1)}>
                ${getGeneOptions(gene, 1)}
            </select>
        </div>
  `;
    }).join('');
};
GenParentHTML('parent-1', 0);
GenParentHTML('parent-2', 1);
(_a = document.getElementById('grid-main')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (event) => {
    const target = event.target;
    const targetId = target.id;
    const params = targetId.split('_');
    if (params.length !== 3) {
        console.error('Invalid Parameters: ' + params);
        return;
    }
    console.log(targetId);
    try {
        const [geneName, parentNo, geneNo] = params;
        const parentId = parseInt(parentNo);
        const geneId = parseInt(geneNo);
        console.log(`Update Event Detected: ${geneName} - parentId: ${parentId} - geneId: ${geneId}`);
        const p = parents[parentId];
        const geneVal = target.value;
        const Gene = Genes[geneName];
        const geneValInt = Gene[geneVal];
        const tuple = p[geneName];
        console.dir(tuple);
        tuple[geneId] = parseInt(geneValInt);
        console.dir(p);
    }
    catch (e) {
        console.error(e);
    }
});
let child = null;
(_b = document.getElementById('breedButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (event) => {
    child = breed(parents[0], parents[1]);
    if (child === null) {
        console.error('No child found');
        return;
    }
    const container = document.getElementById('child-1');
    if (!container) {
        console.error('No container found');
        return;
    }
    console.log('Container found.');
    container.innerHTML = Object.keys(Genes).map(gene => {
        var _a;
        return `
        <div class="item-card">
            <h3 class="item-title">${getCommonName(gene)}</h3>
            <label>${(_a = child[gene]) === null || _a === void 0 ? void 0 : _a.map((val) => translateIntToString(parseInt(val), gene))}</label>
        </div>
  `;
    }).join('');
});
