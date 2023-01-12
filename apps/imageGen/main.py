import json
import numpy as np
import os
import torch
from PIL import ImageGrab
from glob import glob
import requests
from fastapi import FastAPI, Response

'''
To start use
uvicorn main:app --reload
'''

app = FastAPI()

conf = 0.2 # confidence
iou = 0.4  # NMS IoU threshold
agnostic = False  # NMS class-agnostic
multi_label = False  # NMS multiple labels per box
classes = None  # (optional list) filter by class, i.e. = [0, 15, 16] for COCO persons, cats and dogs
max_det = 10  # maximum number of detections per image
amp = False  # Automatic Mixed Precision (AMP) inference

lol_model = torch.hub.load('../yolov5', 'custom', path='best.pt', force_reload=True,  source='local')
lol_model.conf = conf
lol_model.max_det = max_det
lol_model.multi_label = multi_label
lol_model.eval()

# The path for all the images of the video we are analyzing
path_to_icons = './input/championicons'
glob_train_imgs = os.path.join(path_to_icons, '*.png')
all_champion_paths = glob(glob_train_imgs)


#when you need to generate a json file with champion names
def writeChampionNamesToFile():
    with open('championNames.json', 'w') as f:
        f.write('{')
        for i in range(len(all_champion_paths)):
            split = all_champion_paths[i].split('\\')[1]
            f.write('"' + str(i) + '": ' + '"' + split.split('.png')[0] + '"' + ',')
            f.write('\n')
        f.write('}')


@app.post("/setChampions")
def set_champions():
    setChampions()
    print(lol_model.classes)
    return 0


@app.get("/getChampionDetection")
async def get_detected_champions():
    detect = getJsonData()
    print('Classes',lol_model.classes)
    return Response(content=detect, media_type="application/json")


def getJsonData():
    image_pil = ImageGrab.grab((1620, 780, 1920, 1080)).convert('RGB')
    opencv_image = np.array(image_pil)
    output = lol_model(opencv_image)
    output.print()
    panda_output = output.pandas().xyxy[0]
    detection_json = panda_output.to_json(orient='records')
    return detection_json


def setChampions():
    names = open("championNames.json")
    champions = requests.get('https://127.0.0.1:2999/liveclientdata/playerlist', verify=False).json()

    ''' 
    For Test purposes
    champions = [{'championName': 'Corki'}, {'championName': 'Draven'}, {'championName': 'Diana'}, {'championName': 'Ezreal'}, {'championName': 'Ekko'},
                 {'championName': 'Darius'}, {'championName': 'Elise'}]
    '''

    championlist = []
    data = json.load(names)
    for j in range(len(champions)):
        for key, value in data.items():
            name = champions[j]['championName'].replace(" ", "").replace("'", "").replace(".", "")
            if name == 'Wukong':
                name = 'MonkeyKing'
            if value == name:
                championlist.append(int(key))

    lol_model.classes = championlist