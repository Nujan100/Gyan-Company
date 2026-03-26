from PIL import Image

# Load the original logo
img = Image.open('logo_gyans.png')

# Convert to RGBA to support transparency
img = img.convert('RGBA')

# Get image data
data = img.getdata()

# Replace white background with transparency
new_data = []
for item in data:
    # If pixel is mostly white (R, G, B > 240), make it transparent
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0))  # Transparent
    else:
        new_data.append(item)

img.putdata(new_data)

# Resize to favicon sizes
favicon_sizes = [(16, 16), (32, 32), (64, 64), (128, 128)]

# Save transparent PNG versions
for size in favicon_sizes:
    favicon = img.resize(size, Image.Resampling.LANCZOS)
    favicon.save(f'favicon-{size[0]}.png')
    print(f"✓ Created favicon-{size[0]}.png")

# Also save a 32x32 version as the main favicon.ico
favicon = img.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('favicon.ico')
print("✓ Created favicon.ico")

print("\nAll transparent favicons created successfully!")
