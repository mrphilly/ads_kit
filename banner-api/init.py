# coding=utf-8
from flask import Flask, render_template, request, session, redirect, url_for,send_from_directory, jsonify
import sys
import json
import cgi
import os
import googleads
from googleads import adwords
from ads import ads
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
import base64
from io import BytesIO
from PIL import Image
import suds
from flask_cors import CORS
import time
import requests
import sqlite3
from ads_scripts.basic_operations.add_campaigns import add_campaign
from ads_scripts.basic_operations.get_campaigns_with_awql import get_campaign_with_email
from ads_scripts.basic_operations.add_ad_groups import add_ad_groups
from ads_scripts.basic_operations.get_ad_groups import get_ad_group
from ads_scripts.advanced_operations.add_responsive_display_ad import add_responsive_display_ad
from ads_scripts.basic_operations.remove_campaign import deleteCampaign
from ads_scripts.basic_operations.update_campaign_status import UpdateCampaignStatus
from ads_scripts.basic_operations.update_campaign_name import UpdateCampaignName
from ads_scripts.basic_operations.update_campaign_name_and_status import UpdateCampaignNameAndStatus
from ads_scripts.targeting.targeting_ages import TargetAge
from ads_scripts.targeting.target_location import TargetLocation
from ads_scripts.basic_operations.update_ad_group_status import UpdateAdGroupStatus
from ads_scripts.basic_operations.remove_ad_group import DeleteAdGroup
from ads_scripts.basic_operations.update_campaign_start_date import UpdateCampaignStartDate
from ads_scripts.basic_operations.update_campaign_end_date import UpdateCampaignEndDate
from ads_scripts.basic_operations.get_campaigns_data import get_campaigns_data 


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config['JSON_SORT_KEYS'] = False
NUMBER_OF_CAMPAIGNS_TO_ADD = 1
NUMBER_OF_ADGROUPS_TO_ADD = 1
NUMBER_OF_KEYWORDS_TO_ADD = 5
DESCRIPTION = ""
EMAIL = ""
TITRE = ""
IMG = ""
TAB = []
USER = ""
CAMPAGNE_NAME = ""

    

def method_waraper(self, record):
    def filter(self, record):
        if record.args:
            arg = record.args[0]
            if isinstance(arg, suds.transport.Request):
                new_arg = suds.transport.Request(arg.url)
                sanitized_headers = arg.headers.copy()
                if self._AUTHORIZATION_HEADER in sanitized_headers:
                    sanitized_headers[self._AUTHORIZATION_HEADER] = self._REDACTED
                new_arg.headers = sanitized_headers
                msg = arg.message
                if sys.version_info.major < 3:
                    msg = msg.decode('utf-8')
                new_arg.message = self._DEVELOPER_TOKEN_SUB.sub(
                    self._REDACTED, str(msg, encoding='utf-8'))
                record.args = (new_arg,)
    return filter(self, record)


@app.route("/")
def main():
    return "ok"


@app.route('/upload', methods=['POST','GET'])
def upload():
     if request.method == 'POST':
        _result = request.form.to_dict()
        email = _result['email']
        file = _result['input-image']
        description = _result['description']
        titre = _result['titre']
        print(description)
        print(email)
        print(titre)
        starter = file.find(',')
        image_data = file[starter+1:]
        image_data = bytes(image_data, encoding="ascii")
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        print(im.save('uploads/image.png'))
        url = url_for('uploaded_file', filename='image.png', _external=True)
        googleads.util._SudsTransportFilter.filter = method_waraper
        adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
        print(ads.ads(adwords_client, NUMBER_OF_CAMPAIGNS_TO_ADD, NUMBER_OF_ADGROUPS_TO_ADD,NUMBER_OF_KEYWORDS_TO_ADD, url, description, titre, email))

     return  url



# configs
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])



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




@app.route("/getCampaignData", methods=["POST"])
def getData():
    campaign_id = request.json['campaign_id']
    adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
    update = get_campaigns_data(adwords_client, campaign_id)
    return jsonify(update)


@app.route("/deleteCampaign", methods=["POST"])
def delete_campaign():
    response = []
    id_campaign = request.json['id']
    adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
    deleteCampaign(adwords_client, id_campaign)
    response.append({
        "status": "ok",
        "handler": "campagne supprimée avec succès"
    })
    return jsonify(response)



@app.route('/upDateCampaignStartDate', methods=['POST'])
def updateCampaignStartDate():
    campaign_id = request.json['campaign_id']
    startDate = (request.json['startDate'])
    print(startDate)
    print(campaign_id)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateCampaignStartDate(adwords_client, campaign_id, startDate)
    return jsonify(update)


@app.route('/upDateCampaignEndDate', methods=['POST'])
def updateCampaignEndDate():
    campaign_id = request.json['campaign_id']
    endDate = (request.json['endDate'])
   
    print(endDate)
    print(campaign_id)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateCampaignEndDate(adwords_client, campaign_id, endDate)
    return jsonify(update)



@app.route("/updateCampaign", methods=["POST"])
def updateCampaign():
        response = []

        
        name= request.json[0]['name']
        new_name = request.json[0]['name'] +" "+request.json[0]['email']
        id_campaign = request.json[0]['id']
        status = request.json[0]['status']
        state = request.json[0]['state']  
        adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
        if state == "1":
            campagne = UpdateCampaignStatus(adwords_client, id_campaign, status)
            response.append({
                "id": campagne[0]['id'],
                "name": name,
                "status": campagne[0]['status'],
            })
        elif state == "2":
            campagne = UpdateCampaignName(adwords_client, id_campaign, new_name)
            response.append({
                "id": campagne[0]['id'],
                "name": name,
                "status": campagne[0]['status'],
            })
        elif state == "3":
            campagne = UpdateCampaignNameAndStatus(adwords_client, id_campaign, new_name, status)
            response.append({
                "id": campagne[0]['id'],
                "name": name,
                "status": campagne[0]['status'],
            })
  
        response.append({
            "status": "error"
        })
       
    
        return jsonify(response)



@app.route("/addCampaign", methods=["POST"])
def campagne():
    response = {}
    try:
        name = request.json['campaign_name']
        email = request.json['email']
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        campagne = add_campaign(adwords_client, name + " " + email)
       
        response = {
                "status": "ok",
                "id":  campagne[0]['id'],
                "name": campagne[0]['name'],
                "status_campaign": campagne[0]["status"],
                "startDate": campagne[0]["startDate"],
                "endDate": campagne[0]["endDate"],
                "startDateFrench": campagne[0]["startDateFrench"],
                "endDateFrench": campagne[0]["endDateFrench"],
                "servingStatus": campagne[0]["servingStatus"]          
                }
    except:
        response = {
            "status": "not_ok"
        }    
   
    return jsonify(response)

@app.route("/addAdGroup", methods=["POST"])
def addAdGroup():
    response = {}
    try:
        name = request.json['ad_group_name']
        campaign_id = request.json['campaign_id']
        print(name)
        print(campaign_id)
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        groupe_annonce = add_ad_groups(adwords_client, campaign_id, name)
        response = {
            "status": "ok",
            "id": groupe_annonce[0]["id"],
            "name": groupe_annonce[0]["name"],
            "status_adgroup": groupe_annonce[0]["status"]
        }
    except:
        response = {
            "status": "not_ok"
        }
    return jsonify(response)

@app.route("/updateAdGroupStatus", methods=["POST"])
def update():
    response = {}
    try:
        print(request.json['adgroup_id'])
        ad_group_id = request.json['adgroup_id']
        last_status = request.json['last_status']
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        update = UpdateAdGroupStatus(adwords_client, ad_group_id, last_status)
        response = {
            "status": "ok",
            "status_adgroup": update[0]['adgroup_status']
        }
    except:
        response = {
            "status": "not_ok"
        }
    return jsonify(response)



@app.route("/deleteAdGroup", methods=['POST'])
def deleteAdGroup():
    response = {}
    try:
        adgroup_id = request.json['adgroup_id']
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        delete = DeleteAdGroup(adwords_client, adgroup_id)
        response.append({
            "status": "ok",
            "handler": "groupe d'annonce supprimée avec succès"
        })
    except:
        response = response
    return jsonify(response)

@app.route("/targetAge", methods=["POST"])
def targetAge():
    response = {
        "status": "ok"
    }
    print(request.json['campaign_id'])
    campaign_id = request.json['campaign_id']
    ad_group_id_ = ''.join(request.json['ad_group_id']),
    ad_group_id = ''.join(ad_group_id_)
    request_ages = request.json['ages']
    ages = []
    for age in request_ages:
        ages.append(age['item_id'])
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    target = TargetAge(adwords_client, ad_group_id, ages)
   
   
    return jsonify(target)



@app.route("/targetLocation", methods=["POST"])
def targetLocation():
    campaign_id = request.json['campaign_id']
    location = request.json['location_id']
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    location = TargetLocation(adwords_client, campaign_id, location)
    return jsonify(location)



@app.route("/addUser", methods=["POST"])
def user():
    USER = request.json['email']
    session['user']=USER
    return "Current user: " + USER



@app.route("/session", methods=["POST"])
def session_save():
    result = request
    file = result.json['img']
    session['description'] = result.json['description']
    session['email'] = result.json["email"]
    session["titre"] = result.json["titre"]
    """     print(result.json['email']) """
    starter = file.find(',')
    image_data = file[starter+1:]
    image_data = bytes(image_data, encoding="ascii")
    im = Image.open(BytesIO(base64.b64decode(image_data)))
    print(im.save('uploads/image.png'))
    url = url_for('uploaded_file', filename='image.png', _external=True)
    session['img'] = url
    DESCRIPTION = session.get('description')
    EMAIL = session.get('email')
    TITRE = session.get('titre')
    IMG = session['img']
    if TAB==[]:
        TAB.append({
            "email": EMAIL,
            "titre": TITRE,
            "description": DESCRIPTION,
            "img": IMG
        })
    else:
        TAB.pop()
        TAB.append({
            "email": EMAIL,
            "titre": TITRE,
            "description": DESCRIPTION,
            "img": IMG
        })
    #print(session['img'])
    print(session)
    return "ok"


@app.route("/ads", methods = ['GET', 'POST'] )
def makeAds():
                final = ""            
              
            #try:
                adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
                CAMPAIGN = get_campaign_with_email(adwords_client, TAB[0]['email'])
                if CAMPAIGN == []:
                    campagne = add_campaign(adwords_client, TAB[0]['email'])
                    groupe_annonce = add_ad_groups(adwords_client, campagne[0]['id'], campagne[0]['name'])
                    add_responsive_display_ad(adwords_client, str(groupe_annonce[0]['id']), TAB[0]['img'], TAB[0]['titre'], TAB[0]['description'], "Comparateur")
                    

                else:

                    groupe_annonce = get_ad_group(adwords_client, CAMPAIGN[0]['name'])
                   
                    print("Campagne du nom de " + CAMPAIGN[0]['name'] + " contenant le groupe d'annonce " + groupe_annonce[0]['name'] + " ayant pour id " + str(groupe_annonce[0]['id']) + " existe déjà")
                    add_responsive_display_ad(adwords_client, str(groupe_annonce[0]['id']), TAB[0]['img'], TAB[0]['titre'], TAB[0]['description'], "Comparateur")
                    
                """   print(ads.ads(adwords_client, NUMBER_OF_CAMPAIGNS_TO_ADD, NUMBER_OF_ADGROUPS_TO_ADD,NUMBER_OF_KEYWORDS_TO_ADD, TAB[0]['img'], TAB[0]['description'], TAB[0]['titre'], TAB[0]['email'])) """
                final = "ok"
            #except:
                #print('Stop')
       


                return final

@app.route('/pay',  methods=['POST'])
def pay():
        """
        Get payexpress token
        """
        req = ""

        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = "http://127.0.0.1:5000/ads"
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        amount_due = round(2000)

        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url':success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"3e379206e070968fa5cb0f63c5ef1a4cb3a988f037cbe5af6f456d124af0b819",
            'API_SECRET':"f3a6c5f015ea7352fd067d4fd0fbcc2c106f89c9f3858af890f6d25aa75ffbae",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
        print(req['success'])
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']



        return jsonify(req)

# download handler
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)
if __name__ == "__main__":
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    app.run(debug=True)