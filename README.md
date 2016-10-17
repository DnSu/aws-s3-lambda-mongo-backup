## aws-s3-lambda-mongo-backup
Lambda script for backup mongo DB and pipe to S3.

### Dependencies
/bin mongodump binary from mongodb.com. 64bit Amazon AMI

```bash
$ npm i moment fs path util
```
### Configure

```bash
$ cp config.json.sample config.json
```

Sample config.json

```
{
  "bucket": "xxxx",
  "mongo": {
    "db": "xxxx",
    "username": "xxxx",
    "password": "xxxx",
    "host": "xxxx:####"
  }
}
```


### Deploy

### Notes


