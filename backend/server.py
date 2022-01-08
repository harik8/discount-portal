import pymongo
from bottle import route, request, response, run 
import bottle
import logging
import json
import os

def db_connect():
    client = pymongo.MongoClient(os.environ['MONGO_END_POINT'])
    return client
    
app = bottle.app()

@app.route('/adddiscount', method=['POST','OPTIONS'])
def add_discount():
    db = db_connect()['dportal']['discounts']
    
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

    results = None
    if bottle.request.method != 'OPTIONS':
        try:
            results = db.insert_one(request.json['obj']).inserted_id
            response.body(results)
            logging.info("Results - {}".format(results))
        except Exception as e:
            logging.error(e)

    return response

app.run(host='127.0.0.1',port=5000, debug=True)