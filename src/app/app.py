from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.metrics import classification_report
import os

HOST = '0.0.0.0'
PORT = 8081

app = Flask(__name__)
CORS(app)

@app.route('/api/predict', methods=['POST'])
def predict():
    numeros_para_revisao = []
    resposta_correta = []
    resposta_usuario = []
    max_numbers = 10
    X = request.get_json()
    for question in X:
        resposta_correta.append(int(question['resultadoesperado']))
        resposta_usuario.append(int(question['resultado']))

    relatorio = classification_report(resposta_correta, resposta_usuario, output_dict=True)
    relatorio.pop('weighted avg', None)
    relatorio.pop('accuracy', None)
    relatorio.pop('macro avg', None)
    ordenado = sorted(relatorio.items(), key=lambda x: x[1]["f1-score"] if isinstance(x[1], dict) and 'f1-score' in x[1] else x[1])
    if(len(ordenado) < 10): max_numbers = len(ordenado)
    for number in range(max_numbers):
        numeros_para_revisao.append(ordenado[number][0])
    #print(sorted(relatorio, key=lambda x: x[1]["f1-score"]))

    data = {
        'numeros': numeros_para_revisao,
    }

    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', PORT)))