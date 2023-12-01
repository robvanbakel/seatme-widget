const widgetUrl = new URL("http://localhost:5173");

const restaurantId = document.currentScript.getAttribute("restauraunt-id");
widgetUrl.searchParams.append("restaurantId", restaurantId);

const iframe = document.createElement("iframe");

iframe.src = widgetUrl.href;

iframe.style.position = "fixed";
iframe.style.border = "none";
iframe.style.zIndex = 9999;
iframe.style.right = 0;
iframe.style.bottom = 0;

document.body.appendChild(iframe);

const resetIframesize = () => {
  iframe.width = 96;
  iframe.height = 96;
};

resetIframesize();

window.addEventListener("message", (event) => {
  if (event.origin !== widgetUrl.origin) return;

  if (event.data.open) {
    iframe.width = event.data.width;
    iframe.height = event.data.height;
  } else {
    setTimeout(resetIframesize, 150);
  }
});
