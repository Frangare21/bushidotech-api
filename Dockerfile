FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --build-from-source

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

