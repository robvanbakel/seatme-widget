const widgetUrl = new URL("http://localhost:5173");

const restaurantId = document.currentScript.getAttribute("restauraunt-id");
widgetUrl.searchParams.append("restaurantId", restaurantId);

const wrapper = document.createElement("div");

wrapper.style.zIndex = 9999;
wrapper.style.position = "fixed";
wrapper.style.right = 0;
wrapper.style.bottom = 0;
wrapper.style.overflow = "hidden";

const iframe = document.createElement("iframe");

iframe.src = widgetUrl.href;

iframe.style.border = "none";
iframe.style.width = "416px";
iframe.style.height = "374px";
iframe.style.position = "absolute";
iframe.style.right = 0;
iframe.style.bottom = 0;

wrapper.appendChild(iframe);

const resetIframesize = () => {
  wrapper.style.width = "96px";
  wrapper.style.height = "96px";
};

resetIframesize();

document.body.appendChild(wrapper);

window.addEventListener("message", (event) => {
  if (event.origin !== widgetUrl.origin) return;

  if (event.data.open) {
    wrapper.style.width = `${event.data.width}px`;
    wrapper.style.height = `${event.data.height}px`;
    return;
  }

  setTimeout(resetIframesize, 200);
});
