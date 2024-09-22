import pandas as pd

# データフレームを作成
data = {
    "Name": ["Alice", "Bob", "Charlie"],
    "Age": [25, 30, 35],
    "City": ["New York", "Los Angeles", "Chicago"]
}

df = pd.DataFrame(data)

# CSVファイルとして保存
df.to_csv('output/result.csv', index=False)
