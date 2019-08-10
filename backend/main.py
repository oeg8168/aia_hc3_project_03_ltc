import numpy as np
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)
model = np.load("./model_XGB.pickle", allow_pickle=True)

sensor_feature = [f"M{i:03d}" for i in range(1, 32)]
time_feature = ["start_hour", "end_hour", "duration", "weekday"]
necessary_features = np.array(sensor_feature + time_feature)


@app.route("/")
def hello():
    return "Hello AIA HC3!"


@app.route("/xgb/predict/probability", methods=["POST"])
def predict_proba():
    x = pd.Series(request.json).to_frame().T

    if not np.array_equal(x.columns, necessary_features):
        return jsonify("Features are not match!"), 400

    result = model.predict_proba(x)[0].tolist()
    return jsonify(dict(zip(model.classes_, result)))


@app.after_request
def after_request_func(response):
    if response.status_code != 200 and response.mimetype == "text/html":
        response.set_data("")

    return response


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=False)
