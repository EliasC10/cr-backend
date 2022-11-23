
######## Preperation
FROM node:alpine

COPY package.json package-lock.json ./
RUN npm version --allow-same-version 1.0.0


######## Building
FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 80
CMD ["npm", "start"]
