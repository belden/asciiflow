FROM node:18-alpine AS build
WORKDIR /build
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /build/dist /usr/share/nginx/html
EXPOSE 80
