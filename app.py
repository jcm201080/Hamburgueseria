from flask import Flask, render_template, request,  jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/carta')
def carta():
    return render_template('carta.html')



@app.route('/entretenimiento')
def entretenimiento():
    return render_template('entretenimiento.html')


@app.route('/contacto')
def contacto():
    return render_template('contacto.html')



#Paginas fotos.html
@app.route('/galeria')
def galeria():
    return render_template('galeria.html')

@app.route('/lista-imagenes')
def lista_imagenes():
    ruta = os.path.join(app.static_folder, "img/galeria")
    imagenes = [f for f in os.listdir(ruta) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return jsonify(imagenes)


if __name__ == '__main__':
    # Asegúrate de que el servidor se ejecuta en todas las interfaces de red (0.0.0.0)
    app.run(host='0.0.0.0', port=5000)
