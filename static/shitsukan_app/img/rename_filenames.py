import os
import numpy as np
from PIL import Image


def correct_gamma_in_folder(folder_path,vec_gamma=[2.2,2.2,2.2]):
    # Get all PNG files in the folder
    jpg_files = [f for f in os.listdir(folder_path) if f.endswith('.jpg')]

    # Process each PNG file: convert to JPG, resize, and delete original PNG
    for jpg_file in jpg_files:
        jpg_path = os.path.join(folder_path, jpg_file)

        # Open the image
        with Image.open(jpg_path) as img:
            img_np = np.array(img)/255
            # recorrect from jpeg gamma
            img_np[:,:,0] = img_np[:,:,0]**(2.2)**(1/vec_gamma[0])
            img_np[:,:,1] = img_np[:,:,1]**(2.2)**(1/vec_gamma[1])
            img_np[:,:,2] = img_np[:,:,2]**(2.2)**(1/vec_gamma[2])
            img = Image.fromarray((img_np*255).astype(np.uint8))

            jpg_path = os.path.join(folder_path, jpg_file)
            # Save the image as JPG
            img.save(jpg_path, 'JPEG')
            print(f"Gamma corrected {jpg_file}")


# Function to convert PNG images to JPG, resize them to 384x384, and delete the original PNGs
def convert_and_resize_images_in_folder(folder_path, target_size=(384, 384)):
    # Get all PNG files in the folder
    png_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]

    # Process each PNG file: convert to JPG, resize, and delete original PNG
    for png_file in png_files:
        png_path = os.path.join(folder_path, png_file)

        # Open the image
        with Image.open(png_path) as img:
            # Convert image to RGB (PNG may have transparency which JPEG doesn't support)
            img = img.convert("RGB")

            # Resize the image to 384x384
            img = img.resize(target_size)

            # Create the new JPG filename
            jpg_file = png_file.replace('.png', '.jpg')
            jpg_path = os.path.join(folder_path, jpg_file)

            # Save the image as JPG
            img.save(jpg_path, 'JPEG')
            print(f"Converted {png_file} to {jpg_file} and resized to {target_size}")

        # Remove the original PNG file
        os.remove(png_path)
        print(f"Deleted original file: {png_file}")
def swap_image_names(folder_path, name1, name2):
    file1 = os.path.join(folder_path, name1)
    file2 = os.path.join(folder_path, name2)

    if os.path.exists(file1) and os.path.exists(file2):
        temp_name = os.path.join(folder_path, 'temp.png')
        os.rename(file1, temp_name)
        os.rename(file2, file1)
        os.rename(temp_name, file2)
        print(f"{name1} and {name2} replaced")
    else:
        print(f"{name1} and {name2} no files")

# Function to rename PNG files in a folder sequentially
def rename_images_in_folder(folder_path):
    # Get a sorted list of all PNG files in the folder
    png_files = sorted([f for f in os.listdir(folder_path) if f.endswith('.png')])

    # Rename each PNG file to a new sequential name
    for idx, old_name in enumerate(png_files, start=1):
        new_name = f"{idx:02}.png"  # Generate a new name like "01.png", "02.png", etc.
        old_path = os.path.join(folder_path, old_name)
        new_path = os.path.join(folder_path, new_name)
        os.rename(old_path, new_path)
        print(f"Renamed {old_path} to {new_path}")


# Specify the main directory where the folders are located
main_directory = "C:/Users/masas/OneDrive/Desktop/git/proj_shitsukan-db/static/shitsukan_app/img/material_swym"
vec_gamma = [2.3857,2.3943,2.6699]
# Iterate through each folder in the main directory
for folder_name in os.listdir(main_directory):
    folder_path = os.path.join(main_directory, folder_name)

    # Check if it's a directory
    if os.path.isdir(folder_path):
        # Look for the "1" and "0" subfolders
        for subfolder in ['1', '0']:
            subfolder_path = os.path.join(folder_path, subfolder)

            # Check if the subfolder exists
            if os.path.exists(subfolder_path) and os.path.isdir(subfolder_path):
                # Rename PNG images in this subfolder
                # rename_images_in_folder(subfolder_path)

                # Swap the wrong sorting.
                #swap_image_names(subfolder_path, '03.png', '05.png')

                #convert_and_resize_images_in_folder(subfolder_path, target_size=(384, 384))
                correct_gamma_in_folder(subfolder_path, vec_gamma=vec_gamma)
