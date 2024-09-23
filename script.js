document.getElementById("generate-btn").addEventListener("click", function() {
    const token = document.getElementById("token-input").value;

    if (token === '') {
        document.getElementById("output").textContent = 'トークンを入力してください。';
        return;
    }

    // GitHub Actionsのワークフローをトリガーする
    fetch('https://api.github.com/repos/Ry02024/ci-cd/actions/workflows/ci.yml/dispatches', {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,  // ユーザーが入力したトークンを使用
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ref: 'main'  // 実行するブランチ名
        })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("output").textContent = 'GitHub Actionsをトリガーしました。CSV生成中です...';
            setTimeout(fetchCSV, 60000);  // 60秒後にCSVの取得を試みる
        } else {
            document.getElementById("output").textContent = 'トークンが無効です。';
            throw new Error('Invalid token');
        }
    })
    .catch(error => {
        document.getElementById("output").textContent = `エラーが発生しました: ${error.message}`;
    });
});

function fetchCSV() {
    // CSVファイルを取得
    fetch('https://raw.githubusercontent.com/Ry02024/ci-cd/main/output/result.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n');
        const tableHeader = document.getElementById('csv-header');
        const tableBody = document.getElementById('csv-body');

        // テーブルをクリア
        tableHeader.innerHTML = '';
        tableBody.innerHTML = '';

        rows.forEach((row, rowIndex) => {
            const columns = row.split(',');
            const tableRow = document.createElement('tr');

            columns.forEach(column => {
                const cell = document.createElement(rowIndex === 0 ? 'th' : 'td');
                cell.textContent = column;
                tableRow.appendChild(cell);
            });

            if (rowIndex === 0) {
                tableHeader.appendChild(tableRow);
            } else {
                tableBody.appendChild(tableRow);
            }
        });

        document.getElementById("output").textContent = 'CSVの取得が完了しました。';
    })
    .catch(error => {
        document.getElementById("output").textContent = `CSVの取得中にエラーが発生しました: ${error.message}`;
    });
}
