FROM node:16

WORKDIR /workspace

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
