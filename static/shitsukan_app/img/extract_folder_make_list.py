import os
import pandas as pd

# Specify the directory path where you want to list the folder names
directory_path = '/home/sawayama/workspace/myprj/proj_jitter_app/static/shitsukan_app/img/material_swym'
# Specify the output CSV file path
csv_file_path = 'list_shitsukan.csv'

# Get a list of folder names in the specified directory
folder_names = [folder for folder in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, folder))]

# Create a pandas DataFrame with the folder names
df = pd.DataFrame(folder_names, columns=['Folder Name'])


# Save the DataFrame to a CSV file
df.to_csv(csv_file_path, index=False)

print(f"Folder names have been saved to {csv_file_path}.")