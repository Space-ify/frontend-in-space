FROM node:16.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY public /app/public
COPY src /app/src

RUN npm run build
RUN npm install --global serve

EXPOSE 3000

CMD ["serve", "-s", "build"]