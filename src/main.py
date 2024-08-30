# src/main.py
import csv

def add(a, b):
    return a + b

def save_result_to_csv(filename):
    results = [
        {"a": 1, "b": 2, "result": add(1, 2)},
        {"a": -1, "b": 1, "result": add(-1, 1)},
        {"a": 0, "b": 0, "result": add(0, 0)},
    ]

    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=["a", "b", "result"])
        writer.writeheader()
        for result in results:
            writer.writerow(result)

if __name__ == "__main__":
    csv_filename = "output/result.csv"
    save_result_to_csv(csv_filename)
    print(f"Results saved to {csv_filename}")
