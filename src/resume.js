// Both actions stay inside the user gesture; browser PDF/popup settings still apply.
export const openResume = (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const href = event.currentTarget.href;
  event.preventDefault(); // The temporary link below owns the single download attempt.
  window.open(href, "_blank", "noopener,noreferrer");
  const download = document.createElement("a");
  download.href = href;
  download.download = "";
  document.body.append(download);
  download.click();
  download.remove();
};
