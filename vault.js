(() => {
  const input = document.getElementById("lookup");
  const output = document.getElementById("lookup-results");
  const index = window.learningSearchIndex;
  if (!input || !output || !Array.isArray(index)) return;
  input.disabled = false;
  input.addEventListener("input", () => {
    output.replaceChildren();
    const terms = input.value.normalize("NFKC").toLowerCase().trim().split(/\s+/).filter(Boolean);
    output.hidden = !terms.length;
    if (!terms.length) return;
    const matches = index.filter(e => terms.every(term => e[3].includes(term))).slice(0, 14);
    if (!matches.length) {
      const message = document.createElement("p");
      message.textContent = "没有匹配项";
      output.append(message);
      return;
    }
    const list = document.createElement("ul");
    for (const [url, title, kind] of matches) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = url;
      link.textContent = title;
      const category = document.createElement("span");
      category.className = "category";
      category.textContent = kind;
      li.append(link, category);
      list.append(li);
    }
    output.append(list);
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".search")) output.hidden = true;
  });
  input.addEventListener("focus", () => {
    if (output.childNodes.length) output.hidden = false;
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Escape") output.hidden = true;
  });
})();
