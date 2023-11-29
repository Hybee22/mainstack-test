FROM node:16-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

RUN npm run build

EXPOSE 7077

CMD ["npm", "run", "start"]