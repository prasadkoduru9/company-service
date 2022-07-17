FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=development
RUN yarn install enhanced-resolve@3.3.0

COPY . .

RUN yarn run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
RUN ls ./dist
RUN rm -rf ./src

RUN mkdir /src

COPY ./dist /src

CMD ["node", "dist/main"]
