FROM node:20-alpine

WORKDIR /app

# Copia arquivos de configuração
COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY .nvmrc ./

# Instala dependências
RUN npm ci

# Copia código fonte
COPY . .

# Compila o projeto
RUN npm run build

# Comando padrão
CMD ["npm", "test"]

