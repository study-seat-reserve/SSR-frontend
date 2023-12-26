# 使用 Nginx 镜像作为基础
FROM nginx:alpine

# 将当前目录下的前端静态文件复制到 Nginx 服务器的文件目录
COPY . /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/

# 暴露 80 端口
EXPOSE 80

# 使用 Nginx 默认命令启动服务器
CMD ["nginx", "-g", "daemon off;"]
