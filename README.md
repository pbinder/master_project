This is a master project for Real time Training and Visualization for League of Legends.
The programm consists of 4-5 distinct programs.
All of the can be found under apps
Note that the image detection part is set to work with 1920x 1080 resolution and a 300x300 minimap and other metrics might lead to complications. you can change that thought under the main.py in imageGen just change the variables and adjust them accordingly.

Setup
To start the main application you need to start 3 application the node backend the angular frontend and the python detection.

The frontend and backend requirements can easily be installed with and 'npm install' command.
and then started with 'ng s' for the frontend and 'npm run start backend' for the node backend.

The python part has to be done seperatly for this navigate in the terminal to apps/imageGen
there use 'pip install -r requirements.txt' to install all the requirements.

For the detection to be working it needs a yolov5 repository cloned in the repository.
So go under apps and clone the yolov5 repo with:
git clone https://github.com/ultralytics/yolov5

and install requirements again with the same:
'pip install -r requirements.txt'

after this you should be able to start the python backend with:
'python -m uvicorn main:app --reload'
