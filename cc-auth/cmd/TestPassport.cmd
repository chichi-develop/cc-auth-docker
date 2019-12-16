curl -X GET http://localhost:3001 -c cookie-file.txt
curl -X GET http://localhost:3001 -b cookie-file.txt
curl -X POST http://localhost:3001/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test4@test.com", "password":"password"}'
curl -X GET http://localhost:3001/logout -b cookie-file.txt
curl -X GET http://localhost:3001 -b cookie-file.txt

curl -X GET http://localhost:8341 -c cookie-file.txt
curl -X GET http://localhost:8341 -b cookie-file.txt
curl -X POST http://localhost:8341/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test4@test.com", "password":"password"}'
curl -X GET http://localhost:8341/logout -b cookie-file.txt
curl -X GET http://localhost:8341 -b cookie-file.txt
