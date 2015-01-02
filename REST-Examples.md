 
# Sending a Push to another user.
 
 curl -X POST \
  -H "X-Parse-Application-Id:APP-ID-HERE" \
  -H "X-Parse-REST-API-Key:API-KEY-HERE" \
  -H "Content-Type: application/json" \
  -d '{
        "where": {
          "user": { 
            "$inQuery": { 
              "className": "_User", 
              "where": { "username": "alexpgates" }
            }
          }
        },
        "data": {
          "alert": "Peb-bro"
        }
      }' \
  https://api.parse.com/1/push

