#!/home/webpark2237/local/python/bin/python3

import sys
sys.path.append('/home/webpark2237/www/brain/proj_shitsukan/')

import cgitb
cgitb.enable()

from wsgiref.handlers import CGIHandler
from config.wsgi import application

CGIHandler().run(application)
