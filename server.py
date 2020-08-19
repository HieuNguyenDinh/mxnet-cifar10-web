import os
import uuid
import matplotlib.pyplot as plt
import numpy as np
from flask import Flask, jsonify, send_from_directory, request, render_template
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from model import mxnet_cifar10

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER = '/images/'
HOSTNAME = os.environ.get('HOSTNAME') or '127.0.0.1'
PORT = int(os.environ.get('PORT') or 5000)

app = Flask(__name__)
CORS(app, support_credentials=True)

# Maximum 16MB file
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
@cross_origin(supports_credentials=True)
def index():
    return render_template('index.html')

# POST API for processing uploaded images
@app.route('/process',  methods=['POST'])
def predict():
    if 'image' not in request.files:
        resp = jsonify({'message' : 'No file part in the request'})
        resp.status_code = 400
        return resp
    
    # Init response 
    resp = {}
    # get list of all uploaded files
    files = request.files.getlist('image')    
    for i in range(len(files)):
        # get file name
        fileName = secure_filename(files[i].filename)
        # get directory for saving file
        fileDir = os.path.join(UPLOAD_FOLDER, fileName)
        # save file
        files[i].save(fileDir)
        # predict
        res = mxnet_cifar10(fileDir)

        # add results to response
        resp[f'image${i}'] = {'imgName': fileName, 'prediction': res}
    return jsonify(resp)
    

@app.route('/getImg/<fileName>', methods=['GET'])
def getImage(fileName):
    return send_from_directory(UPLOAD_FOLDER, filename=fileName)

if __name__ == "__main__":
    app.run(host=HOSTNAME, port=PORT, debug=True)
