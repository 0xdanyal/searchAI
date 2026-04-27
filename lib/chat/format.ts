export function formatAnswerHtml(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(\d+)\]/g, "")
    .replace(/\n\n/g, "</p><p class='mb-3'>")
    .replace(/\n/g, "<br/>");
}

export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}
