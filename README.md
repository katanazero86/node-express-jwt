## node-express

- express-generator(4.16.1) 를 통해 앱 생성
- viewTemplate : ejs
- style : css

- startTime : 2020-03-10 20:30
- endTime : 2020-03-11 00:26

---

## conditions
```
0. express, express-session, jwt를 이용
1. babel-node를 이용해 자바스크립트 ES6 이상 문법으로 작성
2. JWT로 encode하고 decode 하는 부분을 async await를 이용해서 작성
3. 3개의 API 모두 매 요청이 들어왔을 때 클라이언트에서 보내는 값이 빈 값인지 체크해서 빈 값이면 404를 응답하는 middleware를 작성

```

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