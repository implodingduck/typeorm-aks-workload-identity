FROM node:22

RUN apt-get update && apt-get install -y tcpdump

WORKDIR /app

COPY tsconfig.json /app/tsconfig.json
COPY package.json /app/package.json

RUN npm install

COPY src /app/src
COPY entry.sh /app/entry.sh

ENTRYPOINT [ "/app/entry.sh" ]
