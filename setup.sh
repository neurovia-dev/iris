#!/bin/bash

# IRIS Setup Script
# Verifica e configura o ambiente Node.js usando nvm

set -e

echo "🔧 IRIS Setup Script"
echo "===================="

# Verifica se nvm está instalado
if [ ! -s "$HOME/.nvm/nvm.sh" ]; then
  echo "❌ nvm não encontrado. Por favor, instale o nvm primeiro:"
  echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
  exit 1
fi

# Carrega nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Verifica se .nvmrc existe
if [ ! -f ".nvmrc" ]; then
  echo "❌ Arquivo .nvmrc não encontrado"
  exit 1
fi

# Lê a versão do .nvmrc
NODE_VERSION=$(cat .nvmrc)
echo "📦 Versão Node.js requerida: $NODE_VERSION"

# Verifica se a versão está instalada
if ! nvm list "$NODE_VERSION" &> /dev/null; then
  echo "📥 Instalando Node.js $NODE_VERSION..."
  nvm install "$NODE_VERSION"
fi

# Usa a versão correta
echo "🔄 Ativando Node.js $NODE_VERSION..."
nvm use "$NODE_VERSION"

# Verifica a versão atual
CURRENT_VERSION=$(node -v)
echo "✅ Node.js ativo: $CURRENT_VERSION"

# Instala dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências..."
  npm install
else
  echo "✅ Dependências já instaladas"
fi

echo ""
echo "✨ Setup completo! Você pode agora:"
echo "   npm test        - Rodar testes"
echo "   npm run build   - Compilar o projeto"
echo "   npm run dev     - Modo desenvolvimento"

