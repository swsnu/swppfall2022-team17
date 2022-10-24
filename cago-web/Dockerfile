FROM node:16-alpine
WORKDIR /usr/src/cago-web

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
