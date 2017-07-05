FROM node:6.4 as base

RUN mkdir -p /src/

RUN npm install knex -g

ADD /package.json /src/package.json

WORKDIR /src/

RUN npm install


# -----------------------------------------

FROM base as compiler

RUN npm install -g gulp

ADD / /src/ 

RUN gulp build

# -----------------------------------------

FROM base as output

ENV NODE_ENV=production

RUN mkdir -p /src/

ADD /entrypoint.sh /
RUN chmod +x /entrypoint.sh

COPY --from=compiler /src/dist/ /src/

ENTRYPOINT ["/entrypoint.sh"]