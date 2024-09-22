import os
import pandas as pd

# ディレクトリが存在しない場合は作成する
output_dir = 'output'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# データフレームを作成
data = {
    "Name": ["Alice", "Bob", "Charlie"],
    "Age": [25, 30, 35],
    "City": ["New York", "Los Angeles", "Chicago"]
}

df = pd.DataFrame(data)

# CSVファイルとして保存
df.to_csv(f'{output_dir}/result.csv', index=False)
