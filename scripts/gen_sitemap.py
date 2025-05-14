import json, requests
from datetime import datetime

products = requests.get(
  'https://raw.githubusercontent.com/jkjj8899/main-site/main/products.json'
).json()

urls = "\n".join([
  f"""  <url>
    <loc>{p['link']}</loc>
    <lastmod>{datetime.utcnow().date()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""" for p in products
])

xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls}
</urlset>"""

with open('sitemap.xml', 'w') as f:
    f.write(xml)
