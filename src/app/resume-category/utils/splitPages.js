export default function splitIntoPages(container) {
  const A4_HEIGHT = 1122; // px (screen preview)

  const originalContent = container.innerHTML;
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.style.width = "210mm";
  wrapper.style.position = "absolute";
  wrapper.style.visibility = "hidden";
  wrapper.innerHTML = originalContent;
  document.body.appendChild(wrapper);

  let page = document.createElement("div");
  page.className = "a4-page";
  container.appendChild(page);

  let currentHeight = 0;
  const children = Array.from(wrapper.childNodes);

  children.forEach((node) => {
    const clonedNode = node.cloneNode(true);
    page.appendChild(clonedNode);

    if (page.scrollHeight > A4_HEIGHT) {
      page.removeChild(clonedNode);
      page = document.createElement("div");
      page.className = "a4-page";
      container.appendChild(page);
      page.appendChild(clonedNode);
    }
  });

  document.body.removeChild(wrapper);
}
