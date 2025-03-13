import qrcode

# Dirección IP de tu red local y puerto
url = "http://192.168.1.35:5000"

# Generar el código QR
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)

# Crear la imagen del código QR
qr.add_data(url)
qr.make(fit=True)

# Guardar la imagen del código QR
img = qr.make_image(fill_color="black", back_color="white")
img.save("qr_code.png")