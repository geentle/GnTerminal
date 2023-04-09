# 使用官方 Node.js 轻量级镜像
# https://hub.docker.com/_/node
FROM node:16-slim

MAINTAINER geentle

# 定义工作目录
WORKDIR /app

COPY ./package.json /app/

RUN npm install

# 将本地代码复制到工作目录内
COPY . /app/

# 安装 pm2
# RUN npm install pm2 -g

# 暴露3000端口
EXPOSE 3000

# 启动服务
# CMD pm2-runtime 'npm start'
CMD npm start
