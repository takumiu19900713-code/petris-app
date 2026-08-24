export interface SharePayload {
  title: string;
  lines: string[];
  text: string;
}

export function openLineShare(text: string) {
  const url = `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function copyShareText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
