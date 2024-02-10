FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9005

CMD [ "node", "app.js" ]