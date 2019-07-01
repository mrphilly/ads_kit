# import
import os
from flask import Flask, request, redirect, url_for,send_from_directory, jsonify
from werkzeug import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
from flask_cors import CORS


# configs
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config['JSON_SORT_KEYS'] = False
CORS(app)

# extension checker
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.errorhandler(RequestEntityTooLarge)
def handle_file_size_exception(error):
    '''Return a custom message and 413 status code'''
    return jsonify({'message': 'File is too big'}), 413

# check size


# image compressor

# upload handler
@app.route('/', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_url = url_for('uploaded_file', filename=filename, _external=True)
        data = {
            'success':True,
            'message': 'File successfully uploaded',
            'data': {
                'file_url': file_url
            }
        }
        return jsonify(data)

    else:
        data = {
            'success':False,
            'message': 'Please provide a correct extension',
        }
        return jsonify(data), 404



# download handler
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8001)
