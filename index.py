import qrcode
from PIL import Image

# vCard data
vcard_data = """
BEGIN:VCARD
VERSION:3.0
FN:Gyan Krishna Shrestha
N:Shrestha;Gyan;;;
ORG:Gyan & Company
TEL:+9779851035589
TEL;TYPE=WORK:+015093381
EMAIL:gyankrishna@gmail.com
ADR;TYPE=WORK:;;Sankhadhar;Madhyapur Thimi;Bagmati;44600;Nepal
URL:https://gyanandco.com.np/
END:VCARD

"""

# Generate QR Code
qr = qrcode.QRCode(
    version=1,  # controls the size of the QR Code (1 = smallest)
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # H = High, allows for logo
    box_size=10,  # size of each box in pixels
    border=4,  # thickness of the border (minimum is 4)
)
qr.add_data(vcard_data)
qr.make(fit=True)

# Customize QR Code with colors
img = qr.make_image(fill_color="black", back_color="white")

# Add a logo (optional)
try:
    logo = Image.open("./logo_gyans.png")  # Replace with your logo file
    logo = logo.resize((550, 250))  # Adjust size of the logo
    img = img.convert("RGBA")
    img.paste(logo, ((img.size[0] - logo.size[0]) // 2, (img.size[1] - logo.size[1]) // 2), logo)
except FileNotFoundError:
    print("Logo file not found. Proceeding without a logo.")

# Save the QR Code
img.save("styled_vcard_qr.png")

print("Styled QR code with vCard saved as styled_vcard_qr.png")