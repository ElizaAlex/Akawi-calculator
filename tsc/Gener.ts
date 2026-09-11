type GeneTuple<T> = [T, T] | undefined;

type GeneSet = {
  BaseColor: GeneTuple<Genes.BaseColor>;
  Scale: GeneTuple<Genes.Scale>;
  MultiColorism: GeneTuple<Genes.MultiColorism>;
  Dilution: GeneTuple<Genes.Dilution>;
  Point: GeneTuple<Genes.Point>;
  Silver: GeneTuple<Genes.Silver>;
  GildPattern: GeneTuple<Genes.GildPattern>;
  Depth: GeneTuple<Genes.Depth>;
  Breaking: GeneTuple<Genes.Breaking>;
  Albino: GeneTuple<Genes.Albinism>;
  AccentingColor: GeneTuple<Genes.AccentingColor>;
  AccentGradient: GeneTuple<Genes.AccentGradient>;
  AccentEyespot: GeneTuple<Genes.AccentEyespot>;
  AccentFin: GeneTuple<Genes.AccentingFin>;
};

const parents: GeneSet[] = [createBlankGeneSet(), createBlankGeneSet()];

function createBlankGeneSet(): GeneSet {
  let temp = {};
  return {
    BaseColor: [0,0],
    Scale: [0,0],
    MultiColorism:[0,0],
    Dilution:[0,0],
    Point: [0,0],
    Silver:[0,0],
    GildPattern:[0,0],
    Depth:[0,0],
    Breaking:[0,0],
    Albino:[0,0],
    AccentingColor:[0,0],
    AccentGradient:[0,0],
    AccentEyespot: [0,0],
    AccentFin:[0,0],
  }
}

function getRandomGene<T>(genes: GeneTuple<T>): T {
  if (genes === undefined) throw new Error('Genes must be defined');

  return genes[Math.floor(Math.random() * genes.length)];
}

function InheritGene<T>(g1: GeneTuple<T>, g2: GeneTuple<T>): GeneTuple<T> {
  const a = getRandomGene(g1);
  const b = getRandomGene(g2);

  return (a as number) > (b as number) ? [b, a] : [a, b];
}

function breed(genes1: GeneSet, genes2: GeneSet): GeneSet {
  return {
    BaseColor: InheritGene(genes1.BaseColor, genes2.BaseColor),
    Scale: InheritGene(genes1.Scale, genes2.Scale),
    MultiColorism: InheritGene(genes1.MultiColorism, genes2.MultiColorism),
    Dilution: InheritGene(genes1.Dilution, genes2.Dilution),
    Point: InheritGene(genes1.Point, genes2.Point),
    Silver: InheritGene(genes1.Silver, genes2.Silver),
    GildPattern: InheritGene(genes1.GildPattern, genes2.GildPattern),
    Depth: InheritGene(genes1.Depth, genes2.Depth),
    Breaking: InheritGene(genes1.Breaking, genes2.Breaking),
    Albino: InheritGene(genes1.Albino, genes2.Albino),
    AccentingColor: InheritGene(genes1.AccentingColor, genes2.AccentingColor),
    AccentGradient: InheritGene(genes1.AccentGradient, genes2.AccentGradient),
    AccentEyespot: InheritGene(genes1.AccentEyespot, genes2.AccentEyespot),
    AccentFin: InheritGene(genes1.AccentFin, genes2.AccentFin),
  };
}

function getCommonName(s: string): string {
  return s.split(/(?=[A-Z])/).join(' ');
}

function getGeneOptions(s:string, id: number) {
  return Object.keys(Genes[s as keyof typeof Genes] as object).map(i => {
    if(parseInt(i) != (i as unknown as number)) return `
      <option value="${i}">${i}</option>
    `
  }).join('');
}

const GenParentHTML = (elementId: string, parent: 0 | 1) => {
  const container = document.getElementById(elementId);

  if (!container) {
    console.error('No container found');
    return;
  }
  console.log('Container found.');


  const getId = (gene: string, i: number) => `${gene}p${parent}g${i}`;




  container.innerHTML = Object.keys(Genes).map(gene => {
    const setGenes = () => {
      if (!document) return;
      const p : GeneSet = parents[parent];
      const g0 = document.getElementById(getId(gene,0))?.innerHTML;
      const g1 = document.getElementById(getId(gene,1))?.innerHTML;

      if (g0 === undefined || g1 === undefined) throw new Error('Could not find element: ' + gene);

      try {
        const Gene = Genes[gene as unknown as keyof typeof Genes]
        const G0 = Gene[g0 as keyof typeof Gene];
        const G1 = Gene[g1 as keyof typeof Gene];
        p[]
      }



    };
    return `
        <div class="item-card">
            <h3 class="item-title">${getCommonName(gene)}</h3>
            <label for="genes">Choose genes</label>
            <select name="genes" id = ${getId(gene,0)} onchange = "setGenes()">
                ${getGeneOptions(gene, 0)}
            </select>
            <select name="genes" id = ${getId(gene,0)} onchange = "setGenes()">
                ${getGeneOptions(gene, 1)}
            </select>
        </div>
  `
  }).join('');
}

GenParentHTML('parent-1', 0);
GenParentHTML('parent-2', 1);

