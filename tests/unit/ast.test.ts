import { describe, it, expect } from 'vitest';
import { vStack, hStack, skeleton, repeat } from '../../src/ast/builder.js';
import type { VStack, HStack, Skeleton, Repeat, Node } from '../../src/ast/types.js';

describe('AST Builder', () => {
  describe('VStack', () => {
    it('cria VStack com todas propriedades', () => {
      const stack = vStack({
        gap: 4,
        marginBottom: 6,
        paddingBottom: 6,
        borderBottom: true,
        flex: 1,
        children: [],
      });

      expect(stack.type).toBe('VStack');
      expect(stack.gap).toBe(4);
      expect(stack.marginBottom).toBe(6);
      expect(stack.paddingBottom).toBe(6);
      expect(stack.borderBottom).toBe(true);
      expect(stack.flex).toBe(1);
      expect(stack.children).toEqual([]);
    });

    it('cria VStack vazio sem propriedades', () => {
      const stack = vStack();
      expect(stack.type).toBe('VStack');
      expect(stack.children).toEqual([]);
    });

    it('cria VStack com children', () => {
      const child = skeleton({ height: 4 });
      const stack = vStack({ children: [child] });
      expect(stack.children).toHaveLength(1);
      expect(stack.children[0]).toEqual(child);
    });
  });

  describe('HStack', () => {
    it('cria HStack com todas propriedades', () => {
      const stack = hStack({
        gap: 4,
        marginBottom: 6,
        paddingBottom: 6,
        borderBottom: true,
        flex: 1,
        children: [],
      });

      expect(stack.type).toBe('HStack');
      expect(stack.gap).toBe(4);
      expect(stack.marginBottom).toBe(6);
      expect(stack.paddingBottom).toBe(6);
      expect(stack.borderBottom).toBe(true);
      expect(stack.flex).toBe(1);
      expect(stack.children).toEqual([]);
    });

    it('cria HStack vazio sem propriedades', () => {
      const stack = hStack();
      expect(stack.type).toBe('HStack');
      expect(stack.children).toEqual([]);
    });
  });

  describe('Skeleton', () => {
    it('cria Skeleton com width e height numéricos', () => {
      const skel = skeleton({ width: 16, height: 16 });
      expect(skel.type).toBe('Skeleton');
      expect(skel.width).toBe(16);
      expect(skel.height).toBe(16);
    });

    it('cria Skeleton com width decimal', () => {
      const skel = skeleton({ width: 0.75, height: 4 });
      expect(skel.type).toBe('Skeleton');
      expect(skel.width).toBe(0.75);
      expect(skel.height).toBe(4);
    });

    it('cria Skeleton com width "auto"', () => {
      const skel = skeleton({ width: 'auto', height: 4 });
      expect(skel.type).toBe('Skeleton');
      expect(skel.width).toBe('auto');
      expect(skel.height).toBe(4);
    });

    it('cria Skeleton com rounded', () => {
      const skel = skeleton({ width: 16, height: 16, rounded: true });
      expect(skel.rounded).toBe(true);
    });

    it('cria Skeleton com shrink false', () => {
      const skel = skeleton({ width: 16, height: 16, shrink: false });
      expect(skel.shrink).toBe(false);
    });

    it('cria Skeleton vazio', () => {
      const skel = skeleton();
      expect(skel.type).toBe('Skeleton');
    });
  });

  describe('Repeat', () => {
    it('cria Repeat com count e child', () => {
      const child = skeleton({ height: 4 });
      const rep = repeat(3, child);
      expect(rep.type).toBe('Repeat');
      expect(rep.count).toBe(3);
      expect(rep.child).toEqual(child);
    });

    it('cria Repeat com count 0', () => {
      const child = skeleton({ height: 4 });
      const rep = repeat(0, child);
      expect(rep.count).toBe(0);
    });

    it('cria Repeat com Stack como child', () => {
      const child = vStack({ gap: 4 });
      const rep = repeat(2, child);
      expect(rep.child.type).toBe('VStack');
    });
  });

  describe('Aninhamento', () => {
    it('cria Stack dentro de Stack', () => {
      const inner = hStack({ gap: 4 });
      const outer = vStack({ gap: 4, children: [inner] });
      expect(outer.children).toHaveLength(1);
      expect(outer.children[0].type).toBe('HStack');
    });

    it('cria estrutura complexa aninhada', () => {
      const skel1 = skeleton({ width: 16, height: 16 });
      const skel2 = skeleton({ height: 4, width: 0.75 });
      const inner = vStack({ gap: 2, flex: 1, children: [skel2] });
      const outer = hStack({ gap: 4, children: [skel1, inner] });
      
      expect(outer.type).toBe('HStack');
      expect(outer.children).toHaveLength(2);
      expect(outer.children[0].type).toBe('Skeleton');
      expect(outer.children[1].type).toBe('VStack');
      
      const innerStack = outer.children[1] as HStack;
      expect(innerStack.children).toHaveLength(1);
    });

    it('cria Repeat dentro de Stack', () => {
      const child = skeleton({ height: 4 });
      const rep = repeat(2, child);
      const stack = vStack({ children: [rep] });
      expect(stack.children[0].type).toBe('Repeat');
    });
  });

  describe('Validação de tipos TypeScript', () => {
    it('Node union type aceita todos os tipos', () => {
      const nodes: Node[] = [
        vStack(),
        hStack(),
        skeleton(),
        repeat(1, skeleton()),
      ];
      expect(nodes).toHaveLength(4);
    });

    it('children aceita array de Nodes', () => {
      const stack = vStack({
        children: [
          skeleton(),
          hStack(),
          repeat(2, skeleton()),
        ],
      });
      expect(stack.children).toHaveLength(3);
    });
  });
});

