import json
import requests
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

# 读取 Google 服务账号
SCOPES = ["https://www.googleapis.com/auth/indexing"]
credentials = service_account.Credentials.from_service_account_file("key.json", scopes=SCOPES)
session = AuthorizedSession(credentials)

# 读取产品列表
with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

# 推送函数
def push(url):
    body = {"url": url, "type": "URL_UPDATED"}
    resp = session.post("https://indexing.googleapis.com/v3/urlNotifications:publish", json=body)
    print(f"✅ 提交：{url} | 状态：{resp.status_code}")

# 批量提交所有产品 link 字段
for p in products:
    push(p["link"])
