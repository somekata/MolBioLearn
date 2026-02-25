// MolBioLearn / script.js
// - toc.json から目次を生成
// - md ファイルを fetch して Markdown→HTML表示
// - 目次検索
// - URLパラメータ (?file=md/xxx.md) で初期表示も可能

let tocData = null;
let flatItems = []; // { title, sectionTitle, file, button, sectionDetails }
let activeButton = null;

async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
  return await res.json();
}

async function fetchText(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
  return await res.text();
}

function setActive(btn) {
  if (activeButton) activeButton.classList.remove("active");
  activeButton = btn;
  if (activeButton) activeButton.classList.add("active");
}

function setViewer(html) {
  document.getElementById("viewer").innerHTML = html;
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[c];
  });
}

async function loadAndShow(file, btn = null) {
  try {
    // 読み込み中表示
    setViewer(`<p>読み込み中…</p>`);

    const md = await fetchText(file);

    // Markdown → HTML
    const html = marked.parse(md);
    setViewer(html);

    if (btn) setActive(btn);

    // URLに file パラメータを反映（直リンク可能に）
    const url = new URL(location.href);
    url.searchParams.set("file", file);
    history.replaceState(null, "", url);

    // スクロールを先頭へ
    document.querySelector(".content")?.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    setViewer(
      `<p style="color:#b91c1c;font-weight:700;">読み込みエラー</p>
       <pre>${escapeHTML(e.message)}</pre>`
    );
  }
}

function buildTOC(data) {
  const toc = document.getElementById("toc");
  toc.innerHTML = "";
  flatItems = [];

  data.sections.forEach((sec) => {
    const details = document.createElement("details");
    details.className = "section";
    details.open = true;

    const summary = document.createElement("summary");
    summary.textContent = sec.title;
    details.appendChild(summary);

    (sec.items || []).forEach((it) => {
      const btn = document.createElement("button");
      btn.className = "item";
      btn.type = "button";
      btn.textContent = it.title;
      btn.dataset.file = it.file;

      btn.addEventListener("click", () => loadAndShow(it.file, btn));

      details.appendChild(btn);

      flatItems.push({
        title: it.title,
        sectionTitle: sec.title,
        file: it.file,
        button: btn,
        sectionDetails: details
      });
    });

    toc.appendChild(details);
  });
}

function applySearch(query) {
  const q = query.trim().toLowerCase();
  const sections = document.querySelectorAll("#toc .section");

  if (!q) {
    // 全表示に戻す
    flatItems.forEach((x) => (x.button.style.display = ""));
    sections.forEach((d) => {
      d.style.display = "";
      d.open = true;
    });
    return;
  }

  // item の表示/非表示
  const sectionHasHit = new Map();

  flatItems.forEach((x) => {
    const hay = `${x.sectionTitle} ${x.title}`.toLowerCase();
    const hit = hay.includes(q);
    x.button.style.display = hit ? "" : "none";
    if (hit) sectionHasHit.set(x.sectionTitle, true);
  });

  // section 自体の表示/非表示
  sections.forEach((d) => {
    const title = d.querySelector("summary")?.textContent ?? "";
    const show = sectionHasHit.has(title);
    d.style.display = show ? "" : "none";
    if (show) d.open = true;
  });
}

function tryOpenFromURL() {
  const params = new URLSearchParams(location.search);
  const file = params.get("file");
  if (!file) return false;

  // file に対応するボタンがあれば active に
  const match = flatItems.find((x) => x.file === file);
  loadAndShow(file, match?.button ?? null);
  return true;
}

async function init() {
  // Markdownレンダラ設定（必要ならここで拡張）
  marked.setOptions({
    gfm: true,
    breaks: true
  });

  tocData = await fetchJSON("toc.json");

  // タイトル（index.html側のロゴは固定表示なので、ここでは触らない）
  buildTOC(tocData);

  // 検索
  const searchBox = document.getElementById("searchBox");
  searchBox.addEventListener("input", (e) => applySearch(e.target.value));

  // URL指定で初期表示
  const opened = tryOpenFromURL();
  if (!opened) {
    // 何も指定がなければ最初の項目を自動表示（任意）
    const first = flatItems[0];
    if (first) loadAndShow(first.file, first.button);
  }
// フッターリンク動作
document.querySelectorAll(".footer a[data-file]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const file = link.dataset.file;
    const match = flatItems.find(x => x.file === file);
    loadAndShow(file, match?.button ?? null);
  });
});
// 最終更新日表示（ファイル更新日時）
const updated = document.getElementById("lastUpdated");
if (updated) {
  const now = new Date();
  const formatted = now.toISOString().split("T")[0];
  updated.textContent = `最終更新日: ${formatted}`;
}  
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch((e) => {
    setViewer(
      `<p style="color:#b91c1c;font-weight:700;">初期化エラー</p>
       <pre>${escapeHTML(e.message)}</pre>`
    );
  });
});