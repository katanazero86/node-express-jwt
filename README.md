## node-express

- express-generator(4.16.1) 를 통해 앱 생성
- viewTemplate : ejs
- style : css

- startTime : 2020-03-10 20:30
- endTime : 2020-03-11 00:26

---

### API list

- GET
```
request GET /api/decode HTTP/1.1
Host : ''
authorization : {jwt}

jwt 를 authorization 헤더에 담아 GET 요청합니다.  


```

- POST
```
request POST /api/encode HTTP/1.1
Host : ''
Content-Type : application/json

{ 
    "name" : "zero86"
}

request body 에 json 데이터를 담아 POST 요청합니다.

response 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemVybzg2IiwiaWF0IjoxNTgzODUyODAxfQ.MnjxGY71jRj3O2Cysa0yTIR7KVRoPrCSShMhtz7xa-0"
}

token : json web token

 

```

- DELETE

```
request DELETE /api/destroy HTTP/1.1
Host : ''
authorization : {jwt}

jwt 를 authorization 헤더에 담아 DELETE 요청합니다.  

```