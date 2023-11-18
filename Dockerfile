FROM node:18-alpine

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# FIXME deletar ao deployar com sucesso
# ENTRYPOINT ["sh", "-c", "npm run build && npm start"]
ENTRYPOINT ["sh", "-c", "npm start"]
