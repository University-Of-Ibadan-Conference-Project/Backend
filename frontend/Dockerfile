FROM node:18.9.1

WORKDIR /frontend/
COPY package.json /frontend/
RUN npm install --global serve
RUN npm install
COPY . /frontend/
RUN npm run build
COPY . /frontend/