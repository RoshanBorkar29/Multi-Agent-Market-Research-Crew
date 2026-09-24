import requests
from bs4 import BeautifulSoup

def scrape_url(url:str)->dict:
    """Extract readable text from a webpage."""
    response=requests.get(url,timeout=15,headers={
        "User-agent":"Mozilla/5.0"
    })
    response.raise_for_status()

    soup=BeautifulSoup(
        response.text,
        "html.parser"
    )
    for element in soup(
        ["script", "style", "noscript"]
    ):
        element.decompose()

    text = soup.get_text(
        separator=" ",
        strip=True
    )
    return {
        "url": url,
        "title": soup.title.string.strip()
        if soup.title and soup.title.string
        else "",
        "content": text
    }