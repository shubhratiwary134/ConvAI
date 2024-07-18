FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y docker-compose
COPY . /app
WORKDIR /app
CMD ["docker-compose", "up"]