import { describe, it, expect } from 'vitest';
import { parse, parseFile } from '../../src/parser/parser.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { VStack, HStack, Skeleton, Repeat } from '../../src/ast/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Parser', () => {
  describe('Exemplo completo do README', () => {
    it('parseia exemplo completo do README', () => {
      const iris = 'V(g4 mb6 pb6 bb){ x2{ H(g4){ S(w16 h16 r sh0) V(g2 f1){ S(h4 w.75) S(h3 w.5) } S(h4 w16) } } }';
      const ast = parse(iris);
      
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.gap).toBe(4);
      expect(vstack.marginBottom).toBe(6);
      expect(vstack.paddingBottom).toBe(6);
      expect(vstack.borderBottom).toBe(true);
      expect(vstack.children).toHaveLength(1);
      
      const repeat = vstack.children[0] as Repeat;
      expect(repeat.type).toBe('Repeat');
      expect(repeat.count).toBe(2);
      
      const hstack = repeat.child as HStack;
      expect(hstack.type).toBe('HStack');
      expect(hstack.gap).toBe(4);
      expect(hstack.children).toHaveLength(3);
      
      const skeleton1 = hstack.children[0] as Skeleton;
      expect(skeleton1.width).toBe(16);
      expect(skeleton1.height).toBe(16);
      expect(skeleton1.rounded).toBe(true);
      expect(skeleton1.shrink).toBe(false);
      
      const innerVstack = hstack.children[1] as VStack;
      expect(innerVstack.type).toBe('VStack');
      expect(innerVstack.gap).toBe(2);
      expect(innerVstack.flex).toBe(1);
      expect(innerVstack.children).toHaveLength(2);
      
      const skeleton2 = innerVstack.children[0] as Skeleton;
      expect(skeleton2.height).toBe(4);
      expect(skeleton2.width).toBe(0.75);
      
      const skeleton3 = innerVstack.children[1] as Skeleton;
      expect(skeleton3.height).toBe(3);
      expect(skeleton3.width).toBe(0.5);
    });
  });

  describe('Casos simples', () => {
    it('parseia VStack simples', () => {
      const ast = parse('V{ S(h4) }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.children).toHaveLength(1);
      expect(vstack.children[0].type).toBe('Skeleton');
    });

    it('parseia HStack simples', () => {
      const ast = parse('H{ S(w16) }');
      expect(ast.type).toBe('HStack');
      const hstack = ast as HStack;
      expect(hstack.children).toHaveLength(1);
      expect(hstack.children[0].type).toBe('Skeleton');
    });

    it('parseia Skeleton com propriedades', () => {
      const ast1 = parse('S(w16 h16 r)');
      expect(ast1.type).toBe('Skeleton');
      const skel1 = ast1 as Skeleton;
      expect(skel1.width).toBe(16);
      expect(skel1.height).toBe(16);
      expect(skel1.rounded).toBe(true);

      const ast2 = parse('S(w.75 h4)');
      expect(ast2.type).toBe('Skeleton');
      const skel2 = ast2 as Skeleton;
      expect(skel2.width).toBe(0.75);
      expect(skel2.height).toBe(4);

      const ast3 = parse('S(w auto)');
      expect(ast3.type).toBe('Skeleton');
      const skel3 = ast3 as Skeleton;
      expect(skel3.width).toBe('auto');
    });

    it('parseia Repeat', () => {
      const ast = parse('x3{ S(h4) }');
      expect(ast.type).toBe('Repeat');
      const rep = ast as Repeat;
      expect(rep.count).toBe(3);
      expect(rep.child.type).toBe('Skeleton');
    });
  });

  describe('Números decimais', () => {
    it('parseia números decimais corretamente', () => {
      const ast = parse('S(w.75 h.5)');
      expect(ast.type).toBe('Skeleton');
      const skel = ast as Skeleton;
      expect(skel.width).toBe(0.75);
      expect(skel.height).toBe(0.5);
    });

    it('parseia números decimais com múltiplos dígitos', () => {
      const ast = parse('S(w.125 h.875)');
      expect(ast.type).toBe('Skeleton');
      const skel = ast as Skeleton;
      expect(skel.width).toBe(0.125);
      expect(skel.height).toBe(0.875);
    });
  });

  describe('Espaçamento', () => {
    it('parseia gap em VStack', () => {
      const ast = parse('V(g4){ S(h4) }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.gap).toBe(4);
    });

    it('parseia gap em HStack', () => {
      const ast = parse('H(g8){ S(w16) }');
      expect(ast.type).toBe('HStack');
      const hstack = ast as HStack;
      expect(hstack.gap).toBe(8);
    });

    it('parseia múltiplas propriedades de espaçamento', () => {
      const ast = parse('V(g4 mb6 pb6){ S(h4) }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.gap).toBe(4);
      expect(vstack.marginBottom).toBe(6);
      expect(vstack.paddingBottom).toBe(6);
    });
  });

  describe('Aninhamento complexo', () => {
    it('parseia múltiplos níveis de aninhamento', () => {
      const ast = parse('V(g4){ H(g4){ S(w16) V(g2){ S(h4) } } }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.children).toHaveLength(1);
      
      const hstack = vstack.children[0] as HStack;
      expect(hstack.children).toHaveLength(2);
      
      const innerVstack = hstack.children[1] as VStack;
      expect(innerVstack.gap).toBe(2);
    });

    it('parseia Repeat dentro de Stack', () => {
      const ast = parse('V(g4){ x2{ S(h4) } }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.children).toHaveLength(1);
      expect(vstack.children[0].type).toBe('Repeat');
    });
  });

  describe('Casos edge', () => {
    it('parseia Skeleton sem parâmetros', () => {
      const ast = parse('S');
      expect(ast.type).toBe('Skeleton');
    });

    it('parseia Stack sem parâmetros', () => {
      const ast = parse('V{ S(h4) }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.children).toHaveLength(1);
    });

    it('parseia com espaços extras', () => {
      const ast = parse('V( g4 mb6 ){ S( h4 ) }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.gap).toBe(4);
      expect(vstack.marginBottom).toBe(6);
    });

    it('parseia propriedades booleanas sem valor', () => {
      const ast = parse('V(bb){ S(h4) }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.borderBottom).toBe(true);
    });

    it('parseia flex sem valor explícito', () => {
      const ast = parse('V(f){ S(h4) }');
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.flex).toBe(1);
    });
  });

  describe('Validação de erros', () => {
    it('lança erro para sintaxe inválida', () => {
      expect(() => parse('Invalid')).toThrow();
    });

    it('lança erro para token desconhecido', () => {
      expect(() => parse('X{ S(h4) }')).toThrow();
    });

    it('lança erro para bloco não fechado', () => {
      expect(() => parse('V{ S(h4)')).toThrow();
    });
  });

  describe('Fixtures', () => {
    it('parseia fixture simple.iris', () => {
      const fixturePath = join(__dirname, '../fixtures/parser/simple.iris');
      const ast = parseFile(fixturePath);
      expect(ast.type).toBe('VStack');
    });

    it('parseia fixture complex.iris', () => {
      const fixturePath = join(__dirname, '../fixtures/parser/complex.iris');
      const ast = parseFile(fixturePath);
      expect(ast.type).toBe('VStack');
      const vstack = ast as VStack;
      expect(vstack.gap).toBe(4);
      expect(vstack.children).toHaveLength(1);
    });

    it('parseia fixture edge-cases.iris', () => {
      const fixturePath = join(__dirname, '../fixtures/parser/edge-cases.iris');
      const ast = parseFile(fixturePath);
      expect(ast.type).toBe('VStack');
    });
  });
});

