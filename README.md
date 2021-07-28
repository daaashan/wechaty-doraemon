# wechaty-doraemon

wechaty service

## nest

#### 启动服务

> 启动后浏览器访问： http://localhost:3000

```shell
yarn workspace nest start:dev
```

## wechaty-bot

#### 开发模式

> 执行命令后，扫码登陆机器人微信

```
yarn workspace wechaty-bot start
```

#### 线上运行

第一步：启动服务

```
docker-compose up -d --build
```

第二步：扫码登陆机器人微信

```
docker logs wechaty-doraemon_wechaty_1
```
