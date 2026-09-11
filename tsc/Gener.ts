import { randomInt } from 'node:crypto';
import * as Genes from './GenePriority';

type GeneTuple<T> = [T, T] | undefined;

type GeneSet = {
  baseColors: GeneTuple<Genes.BaseColor>;
  scale: GeneTuple<Genes.Scale>;
  multiColor: GeneTuple<Genes.MultiColorism>;
  dilution: GeneTuple<Genes.Dilution>;
  point: GeneTuple<Genes.Point>;
  silver: GeneTuple<Genes.Silver>;
  gild: GeneTuple<Genes.GildPattern>;
  depth: GeneTuple<Genes.Depth>;
  breaking: GeneTuple<Genes.Breaking>;
  albino: GeneTuple<Genes.Albinism>;
  accentColor: GeneTuple<Genes.AccentingColor>;
  accentGradient: GeneTuple<Genes.AccentGradient>;
  accentEyespot: GeneTuple<Genes.AccentEyespot>;
  accentFin: GeneTuple<Genes.AccentingFin>;
};

function getRandomGene<T>(genes: GeneTuple<T>): T {
  if (genes === undefined) throw new Error('Genes must be defined');

  return genes[randomInt(0, 1)];
}

function InheritGene<T>(g1: GeneTuple<T>, g2: GeneTuple<T>): GeneTuple<T> {
  const a = getRandomGene(g1);
  const b = getRandomGene(g2);

  return (a as number) > (b as number) ? [b, a] : [a, b];
}

function breed(genes1: GeneSet, genes2: GeneSet): GeneSet {
  return {
    baseColors: InheritGene(genes1.baseColors, genes2.baseColors),
    scale: InheritGene(genes1.scale, genes2.scale),
    multiColor: InheritGene(genes1.multiColor, genes2.multiColor),
    dilution: InheritGene(genes1.dilution, genes2.dilution),
    point: InheritGene(genes1.point, genes2.point),
    silver: InheritGene(genes1.silver, genes2.silver),
    gild: InheritGene(genes1.gild, genes2.gild),
    depth: InheritGene(genes1.depth, genes2.depth),
    breaking: InheritGene(genes1.breaking, genes2.breaking),
    albino: InheritGene(genes1.albino, genes2.albino),
    accentColor: InheritGene(genes1.accentColor, genes2.accentColor),
    accentGradient: InheritGene(genes1.accentGradient, genes2.accentGradient),
    accentEyespot: InheritGene(genes1.accentEyespot, genes2.accentEyespot),
    accentFin: InheritGene(genes1.accentFin, genes2.accentFin),
  };
}

// const test = async () => {
//   const gene1: GeneTuple<Genes.BaseColor> = [
//     Genes.BaseColor.B,
//     Genes.BaseColor.b1,
//   ];
//   const gene2: GeneTuple<Genes.BaseColor> = [
//     Genes.BaseColor.b,
//     Genes.BaseColor.b1,
//   ];
//
//   const out = InheritGene(gene1, gene2);
//   console.log(out);
// };
//
// test();
