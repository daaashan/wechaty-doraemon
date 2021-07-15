FROM node:15.13.0-alpine3.13 AS builder

WORKDIR /home/node

COPY *.json ./

RUN yarn

COPY src src

RUN yarn build

# ---

FROM node:15.13.0-alpine3.13

WORKDIR /home/node

COPY --from=builder /home/node/dist/package.json .

RUN yarn --prod

COPY --from=builder /home/node/dist dist

CMD ["yarn", "start:prod"]
