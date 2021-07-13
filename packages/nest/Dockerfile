FROM node:14-alpine as builder

ENV NODE_ENV build

USER $user
WORKDIR /home/node

COPY . /home/node

RUN yarn install --frozen-lockfile && yarn build

# ---

FROM node:14-alpine

ENV NODE_ENV production

USER $user
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN yarn install --frozen-lockfile

CMD ["yarn", "start:prod"]