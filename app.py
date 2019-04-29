# NOTE: THIS IS STOLEN DIRECTLY FROM PROJECT 2 AND WILL NEED TO BE UPDATED
# <3 - BECKY


#from flask import Flask
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from sqlalchemy.pool import NullPool
from flask import Flask, jsonify, render_template, abort, request, send_from_directory, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import pymysql


pymysql.install_as_MySQLdb()

# engine = create_engine("sqlite:///Resources/hawaii.sqlite",
#                 poolclass=NullPool)
engine = create_engine("sqlite:///data/new_olympics.db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Olympian = Base.classes.olympics_raw
# Save references to each table



# Create our session (link) from Python to the DB
session = Session(engine)
###############################################
######## TESTING TABLE EXISTENCE ##############
###############################################
conn = sqlite3.connect('data/new_olympics.db')
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())
################################################
################## WORKS ######################
################################################

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/new_olympics.db'
db = SQLAlchemy(app)

from models import *

@app.route('/map')
def hello_world():
  
    return (
      render_template("map.html")
    )
@app.route('/')
def home():
  return(
    render_template('home.html')
  )

@app.route('/country/')
def land():
  print('in a country')
  return redirect(url_for('countryPlot',NOC ='SUI'))
  
@app.route('/data/<csv>')
def data(csv):
  return send_from_directory('data/',csv, as_attachment=True)
@app.route('/mapData')
def map_data():
  subq = (db.session.query(raw.country_id,raw.Medal,func.count(raw.id)).group_by(raw.country_id,raw.Medal)).subquery()
  results=db.session.query(country_ref.country_name, country_ref.code, subq).join(subq).all()
  country_dic ={}
  for result in results:
    if result[2] in country_dic:
        country_dic[result[2]]['medals'][result[3]] = result[4]
    else:
        country ={}
        country['name']  = result[0]
        country['code'] = result[1]
        country['medals'] = {}
        country['medals'][result[3]] = result[4]
        country_dic[result[2]] = country
  return(
    jsonify(country_dic)
  )
@app.route('/countryData/<id>')
def countryData(id):
  count = db.session.query(raw.NOC,raw.Edition, raw.Sport, func.count(raw.id)).group_by(raw.Edition,raw.Sport).filter(raw.country_id == id).all()
  return jsonify(count)
@app.route('/country/<NOC>')
def countryPlot(NOC):
  country_data = db.session.query(country_ref.id, country_ref.code, country_ref.country_name,country_ref.flag_image).filter(country_ref.code== NOC).all()
  print(country_data)
  word_cloud = db.session.query(raw.Sport,func.count(raw.id).label('nMed')).group_by(raw.Sport).filter(raw.country_id== country_data[0].id).all()
  words = []
  for sport in word_cloud:
    sp ={}
    sp['word'] = sport.Sport
    sp['size'] = sport.nMed
    words.append(sp)
  print(words)
  
  return render_template('country.html', data= country_data,words = words)
@app.route("/api/v1.0/olympians", methods=['GET'])
def names():
    """Return a list of all olympian data"""

    df = pd.read_sql_query(f"SELECT * FROM olympics_raw", con = engine)
    print(df.head())
    

    # return jsonify(all_olympians)
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/v1.0/olympians/params/', methods=['GET'])
# example : http://127.0.0.1:5000/api/v1.0/olympians/params?Edition=2000&Sport=Aquatics
def get_parameters():
  params = request.args.to_dict()
  
  def parameters(params):
    possible_params = ["City",	"Edition",	"Sport",	"Discipline",	"Athlete",	"NOC",	"Gender",	"Event",	"Event_gender",	"Medal"]
    param_keys = [p.capitalize() for p in list(params.keys())]
    fin_list = [key for key in param_keys if key in possible_params]
    return fin_list

  # testing return
  # return jsonify(params)
  param_keys = parameters(params)
  
  print(param_keys)
  where_clause =  ' AND '.join([f"{x} = '{params[x].capitalize()}'" for x in param_keys])
  print("----------------------------------------------------------------------")
  print(where_clause)
  df = pd.read_sql_query(f"SELECT * FROM olympics_raw WHERE {where_clause}", con = engine)
  
  print(df.head())

  # return jsonify(all_olympians)
  return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
