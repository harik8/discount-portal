import bottle 
import json
import logging
import os, sys
import requests

from bottle import route, request, response, run

logging.basicConfig(stream=sys.stdout, level=logging.INFO)

MONGO_API_KEY = os.environ['MONGO_DATA_API_KEY']
MONGO_DATA_END_POINT = os.environ['MONGO_DATA_END_POINT']

headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'api-key': "{0}".format(MONGO_API_KEY)
}
    
app = bottle.app()

@app.route('/adddiscount', method=['POST','OPTIONS'])
def add_discount():
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

    try:
        if bottle.request.method != 'OPTIONS':
            payload = json.dumps({
                "collection": "discounts",
                "database": "dportal",
                "dataSource": "discount-portal",
                "document": request.json['obj']
            })
            results = requests.request("POST", MONGO_DATA_END_POINT, headers=headers, data=payload)

            logging.info("RESPONSE - {0}".format(results))
            return response
    except Exception as e:
        logging.error(e)
        return e

app.run(host='127.0.0.1',port=5000, debug=True)