from uuid import uuid4
from src.fetcher import Fetcher
from src.db import MongoDBClient



db = MongoDBClient("raw_metadata")
client = Fetcher()


recommended = client.get_recommended_by_month()
# if recommended is not None: 
# db.save_raw(recommended["data"][0])

res = client.get_latest_updated()

print(res)
