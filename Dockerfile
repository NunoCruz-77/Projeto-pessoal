FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont xvfb

ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . .

CMD ["npx", "playwright", "test"]