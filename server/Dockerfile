FROM node:10.15

ENV APP_ROOT /server

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN ["npm","install","global","@nestjs/cli"]
RUN ["npm", "install"]

EXPOSE 3042

ENTRYPOINT ["npm","run","start"]