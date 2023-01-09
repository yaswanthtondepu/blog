from bs4 import BeautifulSoup

with open("index.html") as fp:
    soup = BeautifulSoup(fp,"html.parser")
    mydivs = soup.find_all("div", {"class": "pa3 pb0 ph4-m"})
    count = 0
    for i in mydivs:
        price =  i.find("div", {"class": "f5 b black tr"})
        print("<div>")
        print(i.span)
        print(i.img)
        count += float(price.span.contents[0][1:])
        print(price.span.contents[0][1:])
        print("</div>")
    print(count)


