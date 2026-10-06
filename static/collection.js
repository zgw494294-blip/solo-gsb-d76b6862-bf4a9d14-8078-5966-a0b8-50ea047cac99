"use strict";

// 匿名合辑公开只读页：只展示编号与稿文；无效公开链接由接口返回 404
const token = location.pathname.split("/").filter(Boolean)[1];

async function load() {
  let data;
  try {
    const r = await fetch("/api/c/" + token);
    data = await r.json();
    if (!r.ok) {
      document.getElementById("items").hidden = true;
      const fatal = document.getElementById("fatal");
      fatal.hidden = false;
      fatal.textContent = data.error || "公开链接无效";
      return;
    }
  } catch {
    const fatal = document.getElementById("fatal");
    fatal.hidden = false;
    fatal.textContent = "网络错误，请稍后重试";
    return;
  }
  render(data);
}

function render(data) {
  const box = document.getElementById("items");
  box.innerHTML = "";
  for (const item of data.items) {
    const card = document.createElement("section");
    card.className = "card";
    const h = document.createElement("h2");
    h.textContent = "第 " + item.number + " 篇";
    const pre = document.createElement("pre");
    pre.className = "manuscript-view";
    pre.textContent = item.manuscript;
    card.append(h, pre);
    box.appendChild(card);
  }
}

load();
