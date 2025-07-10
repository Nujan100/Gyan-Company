from flask import Flask

app = Flask(__name__)

print("Attributes on app:", dir(app))

@app.before_first_request
def startup():
    print("Starting up")

@app.route("/")
def home():
    return "Hello Flask!"

if __name__ == "__main__":
    app.run(debug=True)
