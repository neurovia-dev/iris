import { describe, it, expect } from 'vitest';
import { parseIrisFile, compileFile, compileToReactFromAST } from '../../src/index.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Node } from '../../src/ast/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

describe('Integration Tests', () => {
  describe('Pipeline completo', () => {
    it('compila DSL → AST → React', () => {
      const iris = 'V(g4){ S(h4) }';
      const ast = parseIrisFile(join(__dirname, '../fixtures/integration/simple.iris'));
      const jsx = compileToReactFromAST(ast);
      
      expect(ast.type).toBe('VStack');
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('<Skeleton');
    });
  });

  describe('Exemplo do README', () => {
    it('parseia exemplo completo do README', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const ast = parseIrisFile(fixturePath);
      
      expect(ast.type).toBe('VStack');
      const vstack = ast as any;
      expect(vstack.gap).toBe(4);
      expect(vstack.marginBottom).toBe(6);
      expect(vstack.paddingBottom).toBe(6);
      expect(vstack.borderBottom).toBe(true);
    });

    it('valida AST gerado do exemplo do README', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const expectedPath = join(__dirname, '../fixtures/integration/expected-ast.json');
      
      const ast = parseIrisFile(fixturePath);
      const expected = JSON.parse(readFileSync(expectedPath, 'utf-8'));
      
      // Compara estruturas (normaliza para comparação)
      expect(ast).toEqual(expected);
    });

    it('valida output React gerado do exemplo do README', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const jsx = compileFile(fixturePath);
      
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

  describe('Múltiplos exemplos', () => {
    it('compila fixture simple.iris', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/simple.iris');
      const ast = parseIrisFile(fixturePath);
      const jsx = compileFile(fixturePath);
      
      expect(ast.type).toBe('VStack');
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('gap-4');
    });

    it('compila fixture complex.iris', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/complex.iris');
      const ast = parseIrisFile(fixturePath);
      const jsx = compileFile(fixturePath);
      
      expect(ast.type).toBe('VStack');
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('w-[75%]');
      expect(jsx).toContain('w-[50%]');
    });
  });

  describe('Snapshot tests', () => {
    it('gera snapshot do AST do exemplo do README', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const ast = parseIrisFile(fixturePath);
      
      // Snapshot do AST
      expect(ast).toMatchSnapshot();
    });

    it('gera snapshot do output React do exemplo do README', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const jsx = compileFile(fixturePath);
      
      // Snapshot do JSX (normalizado)
      expect(normalizeWhitespace(jsx)).toMatchSnapshot();
    });
  });

  describe('Round-trip', () => {
    it('compila e valida que output é válido JSX', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const jsx = compileFile(fixturePath);
      
      // Validações básicas de JSX
      expect(jsx).toContain('<div');
      expect(jsx).toContain('className=');
      expect(jsx).toContain('</div>');
      expect(jsx).toContain('<Skeleton');
      
      // Valida que não há erros de sintaxe óbvios
      const openDivs = (jsx.match(/<div/g) || []).length;
      const closeDivs = (jsx.match(/<\/div>/g) || []).length;
      expect(openDivs).toBe(closeDivs);
    });

    it('valida estrutura JSX aninhada', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/complex.iris');
      const jsx = compileFile(fixturePath);
      
      // Conta abertura e fechamento de divs
      const openDivs = (jsx.match(/<div/g) || []).length;
      const closeDivs = (jsx.match(/<\/div>/g) || []).length;
      expect(openDivs).toBe(closeDivs);
    });
  });

  describe('Comparação com expected', () => {
    it('compara AST com expected-ast.json', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const expectedPath = join(__dirname, '../fixtures/integration/expected-ast.json');
      
      const ast = parseIrisFile(fixturePath);
      const expected = JSON.parse(readFileSync(expectedPath, 'utf-8'));
      
      expect(ast).toEqual(expected);
    });

    it('valida que output contém elementos esperados', () => {
      const fixturePath = join(__dirname, '../fixtures/integration/example.iris');
      const jsx = compileFile(fixturePath);
      
      // Valida elementos esperados
      expect(jsx).toContain('flex flex-col');
      expect(jsx).toContain('gap-4');
      expect(jsx).toContain('mb-6');
      expect(jsx).toContain('pb-6');
      expect(jsx).toContain('border-b');
      expect(jsx).toContain('flex-1');
      expect(jsx).toContain('w-16');
      expect(jsx).toContain('h-16');
      expect(jsx).toContain('rounded-full');
      expect(jsx).toContain('shrink-0');
      expect(jsx).toContain('w-[75%]');
      expect(jsx).toContain('w-[50%]');
    });
  });
});

