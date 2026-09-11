type GeneTuple<T> = [T, T] | undefined;

type GeneSet = {
  [T in keyof typeof Genes] : GeneTuple<T>;
}

const parents: GeneSet[] = [createBlankGeneSet(), createBlankGeneSet()];

function createBlankGeneSet(): GeneSet {
  let temp: Record<string, [number, number]> = {};
  Object.keys(Genes).forEach(gene => {
    temp[gene] = [0,0];
  });
  return temp as unknown as GeneSet;
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
  let temp: any = {};
  Object.keys(Genes).forEach(gene => {
    temp[gene] = InheritGene(genes1[gene as keyof GeneSet],genes2[gene as keyof GeneSet]);
  });

  return temp as unknown as GeneSet;
}

function translateIntToString(val: number, geneName: string){
  const Gene = Genes[geneName as keyof typeof Genes];
  return Gene[val];
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

const getId = (gene: string, parent:number, i: number) => `${gene}_${parent}_${i}`;

const GenParentHTML = (elementId: string, pid:number) => {
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
            <select name="genes" id = ${getId(gene,pid, 0)}>
                ${getGeneOptions(gene, 0)}
            </select>
            <select name="genes" id = ${getId(gene,pid, 1)}>
                ${getGeneOptions(gene, 1)}
            </select>
        </div>
  `
  }).join('');
}

GenParentHTML('parent-1', 0);
GenParentHTML('parent-2', 1);


document.getElementById('grid-main')?.addEventListener('change', (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const targetId = target.id;
  const params = targetId.split('_');
  if (params.length !== 3) {
    console.error('Invalid Parameters: ' + params);
    return;
  }

  console.log(targetId);

  try {
    const [geneName, parentNo, geneNo] = params;
    const parentId =  parseInt(parentNo);
    const geneId = parseInt(geneNo);

    console.log(`Update Event Detected: ${geneName} - parentId: ${parentId} - geneId: ${geneId}`);


    const p: GeneSet = parents[parentId];
    const geneVal = target.value;
    const Gene = Genes[geneName as keyof GeneSet];
    const geneValInt = Gene[geneVal as keyof typeof Gene];

    const tuple = p[geneName as keyof GeneSet];
    console.dir(tuple);
    tuple![geneId] = parseInt(geneValInt) as any;

    console.dir(p);
  } catch(e){
    console.error(e);
  }
});

let child: GeneSet | null = null;
document.getElementById('breedButton')?.addEventListener('click', (event: Event) => {
  child = breed(parents[0],parents[1]);

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
    return `
        <div class="item-card">
            <h3 class="item-title">${getCommonName(gene)}</h3>
            <label>${child![gene as keyof GeneSet]?.map((val) => translateIntToString(parseInt(val), gene))}</label>
        </div>
  `
  }).join('');

})




