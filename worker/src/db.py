import os
from pymongo import MongoClient


class MongoDBClient():

  def __init__(self, db:str, col:str, uri:str = os.getenv("MONGO_URI", "mongodb://admin:admin@localhost:27017/")):
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
  
  def save(self, data: dict):
    return self.col.update_one({"_id": data["_id"]}, {"$set": data}, upsert=True)
  
  def retrieve(self, id: str):
    return  self.col.find_one({"_id": id})
  
  def retrieve_all(self):
    return  self.col.find().to_list()
  
  def delete(self, id: str):
    return self.col.delete_one({"_id": id})
    
  

