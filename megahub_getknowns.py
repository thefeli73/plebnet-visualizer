#!/usr/bin/env python3
import time
import json
import os.path, os
import requests
from bs4 import BeautifulSoup 

known_plebs = set()
dir_path = os.path.dirname(os.path.realpath(__file__))
plebs_path = os.path.join(dir_path, 'known_plebs.json')


def get_plebs():
    url='https://lightningwiki.net/g/?g=-1001234988097&t=Group&ns=False'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    nodes = soup.findAll('g', attrs={"class":"node"})
    for node in nodes:
        id = node.title.text
        known_plebs.add(id)

if __name__ == '__main__':
    #Plebnet
    if os.path.isfile(plebs_path):
        with open(plebs_path, 'r', encoding='utf8') as file:
            data = file.read()
        known_plebs = set(json.loads(data))
    
    t0 = time.time()
    n0 = len(known_plebs)
    
    get_plebs()
    
    with open(plebs_path, "w") as outfile:
        out = list(known_plebs)
        outfile.write(json.dumps(out, indent=2))
    t3 = time.time()
    n3 = len(known_plebs)
    print("\nPlebnet")
    print("Total new nodes: " + str(n3-n0))
    print("Total time: " + str(round(t3-t0, 2)) + "s")