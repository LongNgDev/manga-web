import os
from pymongo import MongoClient



# mongodb://admin:admin@localhost:27017/

class MongoDBClient():

  def __init__(self, col:str, db:str = "manga-web", uri:str = os.getenv("MONGO_URI", "mongodb://localhost:27017/")):
    self.client = MongoClient(uri)
    self.db = self.client.get_database(db)
    self.col = self.db.get_collection(col)


  def health(self):
    try:
      SERVER_INFO = self.client.server_info() 
      print("Connected successfully to MongoDB!")
      print("Server Information:", SERVER_INFO)
    except Exception as e:
      print(f"Error connecting to MongoDB: {e}")
    return

  def save_raw(self, data: dict):
    return self.col.update_one({"id": data["id"]}, {"$set": data}, upsert=True)
  
  def retrieve(self, uid: str):
    return  self.col.find_one({"id": uid})
  
  def retrieve_all(self):
    return  self.col.find().to_list()
  
  def delete(self, uid: str):
    return self.col.delete_one({"id": uid})
  
  def close(self):
    return self.client.close()
    
  

