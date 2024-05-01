export default function ResizeHandle({ $target, onResize }) {
  const resizeHandle = document.createElement("div");
  resizeHandle.className = "resize-handle";
  $target.appendChild(resizeHandle);

  let isReSizing = false;

  resizeHandle.addEventListener("mousedown", function (e) {
    isReSizing = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);
  });

  function handleMouseMove(e) {
    if (!isReSizing) return;
    const newWidth = e.clientX;
    onResize(newWidth);
  }

  function stopResize() {
    isReSizing = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResize);
  }
}
