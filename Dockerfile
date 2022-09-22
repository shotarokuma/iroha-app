FROM node:14.17.0-alpine

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn graphql install

RUN yarn graphql generate \
&& yarn graphql build \
&& yarn server build \
&& yarn client build

CMD ["bash", "./startup.sh"]