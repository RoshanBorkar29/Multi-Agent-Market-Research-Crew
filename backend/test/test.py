from app.tools.web_search import web_search


results = web_search(
    "AI recruitment software market India"
)

for result in results:
    print("\nTITLE:", result["title"])
    print("URL:", result["url"])
    print("CONTENT:", result["content"][:300])