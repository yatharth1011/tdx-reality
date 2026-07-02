import os
from PIL import Image, ImageDraw, ImageFont

def generate_windows_emoji_icon(size, filename):
    # Create dark canvas matching background (#0b0b0d)
    img = Image.new("RGBA", (size, size), "#0b0b0d")
    draw = ImageDraw.Draw(img)
    
    # Path to native Windows Segoe UI Emoji font
    font_path = "C:\\Windows\\Fonts\\seguiemj.ttf"
    
    if os.path.exists(font_path):
        # Scale factor optimized for Segoe UI's boundaries
        font_size = int(size * 0.60)
        try:
            # Segoe UI Emoji contains true vector outlines and scales without pixel-size errors
            font = ImageFont.truetype(font_path, font_size)
        except Exception as e:
            print(f"Error loading system font: {e}. Using default.")
            font = ImageFont.load_default()
    else:
        print("Segoe UI Emoji font not found in standard Windows directory. Using default.")
        font = ImageFont.load_default()
        
    # Draw the emoji centered on the canvas
    draw.text((size / 2, size / 2), "⚡", fill="white", font=font, anchor="mm")
    
    img.save(filename, "PNG")
    print(f"Generated: {filename} ({size}x{size})")

if __name__ == "__main__":
    # Clean up the problematic local Noto file if it was left behind
    if os.path.exists("NotoColorEmoji.ttf"):
        try:
            os.remove("NotoColorEmoji.ttf")
        except Exception:
            pass
            
    generate_windows_emoji_icon(192, "icon-192.png")
    generate_windows_emoji_icon(512, "icon-512.png")