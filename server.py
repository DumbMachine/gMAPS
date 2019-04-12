
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Another useless python script
@author: ratin
"""
#TODO: Implement Authentication System
#TODO: Implement feature to save in Mongo the books which are asked often
#TODO: Implement feature to ask for the number of books sent in the API

import datetime
import sys
from json import dumps

from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS
from flask_restful import Api, Resource


app = Flask(__name__)
cors = CORS(app, resources={r"/ppi/*": {"origins": "*"}})
api = Api(app , errors={
    'NotFound': {
        'message': "Something is missing.",
        'status': 404,
        }
    }
)


class Nothing(Resource):
    def __init__(self):
        self.error = "Not hitting the correct api point"
    
    def get(self):
        return "High"

#api.add_resource(BookFinder, "/ppi")
api.add_resource(Nothing,'/*')

if __name__ == "__main__":
    app.run(port="5002",debug=True)

