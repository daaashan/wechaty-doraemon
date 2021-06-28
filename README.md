# echaty-doraemon

a wechaty bot service

## nest

启动服务

> 启动后浏览器访问： 127.0.0.1:3000

```shell
yarn workspace nest start:dev
```

### wechaty

前台运行

```
docker run -it --name=wechaty-doraemon --rm --volume="$(pwd)":/bot wechaty/wechaty packages/wechaty/index.js
```

后台运行

```
docker run -dt --name=wechaty-doraemon --rm --volume="$(pwd)":/bot wechaty/wechaty packages/wechaty/index.js
```
