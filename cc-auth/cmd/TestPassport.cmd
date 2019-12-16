curl -X GET http://localhost:3000 -c cookie-file.txt
curl -X GET http://localhost:3000 -b cookie-file.txt
curl -X POST http://localhost:3000/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"kanri@test.com", "password":"password"}'
curl -X GET http://localhost:3000/logout -b cookie-file.txt
curl -X GET http://localhost:3000 -b cookie-file.txt

curl -X GET http://localhost:8341 -c cookie-file.txt
curl -X GET http://localhost:8341 -b cookie-file.txt
curl -X POST http://localhost:8341/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"kanri@test.com", "password":"password"}'
curl -X GET http://localhost:8341/logout -b cookie-file.txt
curl -X GET http://localhost:8341 -b cookie-file.txt
