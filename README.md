# How to Config to Development

## Container Docker para MySQL

```shell
docker run --name some-mysql -e MYSQL_DATABASE=todo -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:latest
```

Onde `some-mysql` é o nome do container.
