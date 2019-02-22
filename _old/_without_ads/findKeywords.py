import sys
import os
import pandas as pd
keywords = []
result = {}
allFiles = []

def read_keywords(file):
    global keywords
    with open(file) as f:
        keywords = f.read().split("\n")

def read_a_file(folder,fileName):
    global keywords
    global result
    dict = {}
    with open(os.path.join(folder,fileName)) as f:
        data = f.read()
        for i in keywords:
            # print "-",i
            dict[i] = len(data.split(i)) -1
    result[fileName] = dict

def read_dir(folder):
    global allFiles
    allFiles = os.listdir(folder)
    allFiles = filter(lambda x: x [-2:] == "js", allFiles)
 

def printJSON(folder,data):
    for i in keywords:
        for j in data:
            print (folder,i,j,data[j][i])

def main():
    folder = sys.argv[1]
    read_dir(folder)
    read_keywords("tokens")
    for i in allFiles:
        read_a_file(folder,i)
    # printJSON(folder,result)

    df = pd.DataFrame(result,columns = list((result.keys())).sort())
    with open("mycsv.csv",'a') as fin:
        # fin.write(df)
        df.to_csv(fin,header = True)

    print result

main()
