import { describe, it, expect } from 'vitest';
import { compileToReact } from '../../src/codegen/react.js';
import { vStack, hStack, skeleton, repeat } from '../../src/ast/builder.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Codegen React', () => {
  describe('VStack básico', () => {
    it('gera VStack com classes Tailwind corretas', () => {
      const ast = vStack({ gap: 4 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('gap-4');
    });

    it('gera VStack vazio', () => {
      const ast = vStack();
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('/>');
    });

    it('gera VStack com children', () => {
      const ast = vStack({ gap: 4, children: [skeleton({ height: 4 })] });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('gap-4');
      expect(jsx).toContain('<Skeleton');
    });
  });

  describe('HStack básico', () => {
    it('gera HStack com classes Tailwind corretas', () => {
      const ast = hStack({ gap: 4 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex');
      expect(jsx).not.toContain('flex-col');
      expect(jsx).toContain('gap-4');
    });

    it('gera HStack vazio', () => {
      const ast = hStack();
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex');
      expect(jsx).toContain('/>');
    });
  });

  describe('Skeleton básico', () => {
    it('gera Skeleton sem propriedades', () => {
      const ast = skeleton();
      const jsx = compileToReact(ast);
      expect(jsx).toContain('<Skeleton />');
    });

    it('gera Skeleton com height', () => {
      const ast = skeleton({ height: 4 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('h-4');
    });

    it('gera Skeleton com width numérico', () => {
      const ast = skeleton({ width: 16 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('w-16');
    });
  });

  describe('Propriedades Tailwind', () => {
    it('converte gap corretamente', () => {
      const ast = vStack({ gap: 8 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('gap-8');
    });

    it('converte marginBottom corretamente', () => {
      const ast = vStack({ marginBottom: 6 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('mb-6');
    });

    it('converte paddingBottom corretamente', () => {
      const ast = vStack({ paddingBottom: 6 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('pb-6');
    });

    it('converte borderBottom corretamente', () => {
      const ast = vStack({ borderBottom: true });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('border-b');
    });

    it('converte flex corretamente', () => {
      const ast = vStack({ flex: 1 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex-1');
    });
  });

  describe('Width decimal', () => {
    it('converte width decimal para porcentagem', () => {
      const ast = skeleton({ width: 0.75 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('w-[75%]');
    });

    it('converte width decimal 0.5 para porcentagem', () => {
      const ast = skeleton({ width: 0.5 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('w-[50%]');
    });

    it('converte width decimal 0.125 para porcentagem', () => {
      const ast = skeleton({ width: 0.125 });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('w-[13%]');
    });
  });

  describe('Width auto', () => {
    it('converte width auto corretamente', () => {
      const ast = skeleton({ width: 'auto' });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('w-auto');
    });
  });

  describe('Aninhamento', () => {
    it('valida estrutura JSX aninhada', () => {
      const ast = vStack({
        gap: 4,
        children: [
          hStack({
            gap: 4,
            children: [
              skeleton({ width: 16, height: 16 }),
              skeleton({ height: 4 }),
            ],
          }),
        ],
      });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('flex');
      expect(jsx.split('<Skeleton').length).toBe(3); // 2 skeletons + 1 no início da string
    });

    it('gera estrutura correta com múltiplos níveis', () => {
      const ast = vStack({
        children: [
          hStack({
            children: [
              vStack({
                children: [skeleton({ height: 4 })],
              }),
            ],
          }),
        ],
      });
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('<Skeleton');
    });
  });

  describe('Repeat', () => {
    it('valida múltiplos elementos gerados', () => {
      const ast = repeat(3, skeleton({ height: 4 }));
      const jsx = compileToReact(ast);
      const matches = jsx.match(/<Skeleton/g);
      expect(matches).toHaveLength(3);
    });

    it('gera Repeat com count 0', () => {
      const ast = repeat(0, skeleton({ height: 4 }));
      const jsx = compileToReact(ast);
      expect(jsx).toBe('');
    });

    it('gera Repeat com Stack como child', () => {
      const ast = repeat(2, vStack({ gap: 4, children: [skeleton({ height: 4 })] }));
      const jsx = compileToReact(ast);
      const matches = jsx.match(/flex flex-col/g);
      expect(matches).toHaveLength(2);
    });
  });

  describe('Output completo', () => {
    it('gera output completo do exemplo do README', () => {
      const ast = vStack({
        gap: 4,
        marginBottom: 6,
        paddingBottom: 6,
        borderBottom: true,
        children: [
          repeat(2, hStack({
            gap: 4,
            children: [
              skeleton({ width: 16, height: 16, rounded: true, shrink: false }),
              vStack({
                gap: 2,
                flex: 1,
                children: [
                  skeleton({ height: 4, width: 0.75 }),
                  skeleton({ height: 3, width: 0.5 }),
                ],
              }),
              skeleton({ height: 4, width: 16 }),
            ],
          })),
        ],
      });
      
      const jsx = compileToReact(ast);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('gap-4');
      expect(jsx).toContain('mb-6');
      expect(jsx).toContain('pb-6');
      expect(jsx).toContain('border-b');
      expect(jsx).toContain('w-[75%]');
      expect(jsx).toContain('w-[50%]');
      expect(jsx).toContain('rounded-full');
      expect(jsx).toContain('shrink-0');
    });
  });

  describe('Fixtures', () => {
    it('compila AST simples do fixture', () => {
      const fixturePath = join(__dirname, '../fixtures/codegen/simple-ast.json');
      const astJson = JSON.parse(readFileSync(fixturePath, 'utf-8'));
      const jsx = compileToReact(astJson);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('gap-4');
    });

    it('compila AST complexo do fixture', () => {
      const fixturePath = join(__dirname, '../fixtures/codegen/complex-ast.json');
      const astJson = JSON.parse(readFileSync(fixturePath, 'utf-8'));
      const jsx = compileToReact(astJson);
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('mb-6');
      expect(jsx).toContain('w-[75%]');
    });
  });
});

