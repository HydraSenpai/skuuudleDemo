from app import create_app
from flask import Flask, render_template, request
import os

flask_app = create_app()

if __name__ == '__main__':
    flask_app.run(host="0.0.0.0", port=5000, debug=True)
