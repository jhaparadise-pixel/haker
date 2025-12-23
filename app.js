document.addEventListener("DOMContentLoaded", () => {
  console.log("ethers =", window.ethers);
  console.log("TronWeb =", window.TronWeb);

  document
    .getElementById("generateBtn")
    .addEventListener("click", generateBatch);
});

function generateBatch() {
  const count = Number(document.getElementById("count").value);
  const tbody = document.getElementById("result");
  tbody.innerHTML = "";

  // ✅ 正确的浏览器 TronWeb 构造方式
  const { TronWeb } = window.TronWeb;
  const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io"
  });

  for (let i = 0; i < count; i++) {
    // 1️⃣ 生成 ETH 私钥
    const wallet = ethers.Wallet.createRandom();
    const privateKeyHex = wallet.privateKey.replace("0x", "");

    // 2️⃣ 私钥 → 真 TRON 地址
    const tronAddress = tronWeb.address.fromPrivateKey(privateKeyHex);

    // 3️⃣ 渲染
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${tronAddress}</td>
      <td>${wallet.privateKey}</td>
    `;
    tbody.appendChild(tr);
  }

  console.log("✅ 批量生成完成");
}
