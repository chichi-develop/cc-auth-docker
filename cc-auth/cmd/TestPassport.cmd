curl -X GET http://localhost:3000/auth/check -c cookie-file.txt
curl -X GET http://localhost:3000/auth/check -b cookie-file.txt
curl -X POST http://localhost:3000/auth/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"kanri@test.com", "password":"password"}'
curl -X GET http://localhost:3000/auth/logout -b cookie-file.txt
curl -X GET http://localhost:3000/auth/check -b cookie-file.txt

curl -X GET http://localhost:8341/auth/check -c cookie-file.txt
curl -X GET http://localhost:8341/auth/check -b cookie-file.txt
curl -X POST http://localhost:8341/auth/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"kanri@test.com", "password":"password"}'
curl -X GET http://localhost:8341/auth/logout -b cookie-file.txt
curl -X GET http://localhost:8341/auth/check -b cookie-file.txt
