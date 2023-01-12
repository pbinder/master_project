
from glob import glob
import os
from PIL import Image, ImageDraw
import random


path_to_icons = './input/championicons'
path_to_map = './input/map/map_with_wards.png'
glob_train_imgs = os.path.join(path_to_icons, '*.png')
all_champion_paths = glob(glob_train_imgs)
label_width, label_height = '0.075000', '0.075000'
champion_size = 80
circle_size = champion_size-1
map_size = 1024


def _main():
    map = Image.open(path_to_map)
    map = map.resize((map_size, map_size))

    champion = Image.open(all_champion_paths[0])
    champion = champion.resize((champion_size, champion_size))
    mask_im = Image.new("L", champion.size)
    draw = ImageDraw.Draw(mask_im)
    draw.ellipse((0, 0, circle_size, circle_size), fill=255)
    mask_im.save('mask_circle.png')
    championIndex = 0

    for index in range(5000):
        final_image = map.copy()
        champion_amount = 161
        champion_list = all_champion_paths.copy()
        print(index)

        for i in range(10):
            #if championIndex == champion_amount:
          #      championIndex = 0
            random_champion = random.randint(0, champion_amount-1)
            champion = Image.open(champion_list[random_champion])
            champion_list.pop(random_champion)
            champion_amount = champion_amount - 1
            champion = champion.resize((champion_size, champion_size))
            draw = ImageDraw.Draw(champion)
            if i < 5:
                draw.arc((0, 0, circle_size, circle_size), start=0, end=360, fill=(150, 0, 0), width=2)
            else:
                draw.arc((0, 0, circle_size, circle_size), start=0, end=360, fill=(0, 150, 150), width=2)
            random_x = random.randint(champion_size/2, map_size-champion_size*2)
            random_y = random.randint(champion_size/2, map_size-champion_size*2)
            final_image.paste(champion, (random_x, random_y), mask_im)
            x_percent = (random_x + champion_size/2) / map_size
            y_percent = (random_y + champion_size/2) / map_size
            writeToLabelFile(random_champion, index, x_percent, y_percent)
          #  championIndex += 1

        final_image.save('input/generated_maps_big/map_' + str(index) + '.png')


def writeToLabelFile(championIndex, index, x, y):
    with open('input/generated_labels_big/map_' + str(index) + '.txt', 'a') as f:
        f.write(str(championIndex) + ' ' + str(x) + ' ' + str(y) + ' ' + label_width + ' ' + label_height)
        f.write('\n')


def writeChampionNamesToFile():
    with open('championNames.txt', 'w') as f:
        for i in range(len(all_champion_paths)):
            split = all_champion_paths[i].split('\\')[1]
            print(i)
            f.write(str(i) + ': ' + split.split('.png')[0])
            f.write('\n')


if __name__ == '__main__':
    _main()