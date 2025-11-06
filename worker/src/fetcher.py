
import requests
from datetime import datetime, timezone
from dateutil.relativedelta import relativedelta # type: ignore

class Fetcher():

  def __init__(self, base_url:str = "https://api.mangadex.org"):
    self.__BASE_URL = base_url
    self._TIME_FORMAT = "%Y-%m-%dT%H:%M:%S"



  def get_recommended_by_month(self, limit:int=10) -> dict: 
    NOW = datetime.now(timezone.utc)
    last_month = (NOW - relativedelta(months=1)).strftime(self._TIME_FORMAT)

    raw = requests.get(f"{self.__BASE_URL}/manga", params={
      "limit": limit,
      "updatedAtSince": last_month,
      "order[followedCount]": "desc",
      "excludedTags[]":  ["Boys' Love","Reverse Harem", "Genderswap"],
      "status[]": "ongoing",
      "includes[]": ["manga", "cover_art", "artist" , "author", "tag", "creator"]
    })

    res = raw.json()

    return  res
  
  def get_recommended_by_week(self, limit:int=10) -> dict: 
    NOW = datetime.now(timezone.utc)
    last_week = (NOW - relativedelta(weeks=1)).strftime(self._TIME_FORMAT)

    raw = requests.get(f"{self.__BASE_URL}/manga", params={
      "limit": limit,
      "updatedAtSince": last_week,
      "order[followedCount]": "desc",
      "excludedTags[]":  ["Boys' Love","Reverse Harem", "Genderswap"],
      "status[]": "ongoing",
      "includes[]": ["manga", "cover_art", "artist" , "author", "tag", "creator"]
    })

    res = raw.json()

    return  res
  
  def get_recommended_by_day(self, limit:int=10) -> dict: 
    NOW = datetime.now(timezone.utc)
    yesterday = (NOW - relativedelta(days=1)).strftime(self._TIME_FORMAT)

    raw = requests.get(f"{self.__BASE_URL}/manga", params={
      "limit": limit,
      "updatedAtSince": yesterday,
      "order[followedCount]": "desc",
      "excludedTags[]":  ["Boys' Love","Reverse Harem", "Genderswap"],
      "status[]": "ongoing",
      "includes[]": ["manga", "cover_art", "artist" , "author", "tag", "creator"]
    })

    res = raw.json()

    return  res
  
  def get_latest_updated(self, limit:int=10) -> dict:
    raw = requests.get(f"{self.__BASE_URL}/manga", params={
      "limit":limit,
      "availableTranslatedLanguage[]": ["vi", "en"],
      "excludedTags[]":  ["Boys' Love","Reverse Harem", "Genderswap"],
      "order[updatedAt]":"desc",
      "includes[]": ["manga", "cover_art", "artist" , "author", "tag", "creator"]
    })

    res=raw.json()

    return res