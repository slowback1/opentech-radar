# syntax=docker/dockerfile:1
FROM node:17

WORKDIR /app
COPY ["package.json", "package-lock.json*", "nx.json", "./"]

RUN npm install
RUN npm install -g @nrwl/cli@12.0.1

RUN apt-get update
RUN apt-get install -y fonts-liberation gconf-service libappindicator1 libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgbm-dev libgdk-pixbuf2.0-0 libgtk-3-0 libicu-dev libjpeg-dev libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libpng-dev libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 xdg-utils

RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium

COPY . .

CMD nx run apps-tech-radar:serve
