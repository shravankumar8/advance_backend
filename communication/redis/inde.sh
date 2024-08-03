# Run Docker exec and redis-cli commands
docker exec -it redis-stack redis-cli <<REDIS_COMMANDS
HSET Shravankumar firstname "Shravan kumar" age 20 phoneno 4874848484 email fetvftevft@gmail.com
HSET Vigneshwari firstname "heck" age 19 phoneno 4848444979 email fetvftevft@gmail.com
HSET nothing firstname "heck" age 19 phoneno 4848444979 email fetvftevft@gmail.com
HSET mlsa firstname "heck" age 19 phoneno 4848444979 email fetvftevft@gmail.com
HSET github firstname "heck" age 19 phoneno 4848444979 email fetvftevft@gmail.com
REDIS_COMMANDS

echo "running"
