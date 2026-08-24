export type TabId = "home" | "records" | "certificates" | "store";

const TAB_IDS: TabId[] = ["home", "records", "certificates", "store"];

export function buildShareUrl(
  tab: TabId,
  params: Record<string, string> = {},
): string {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("tab", tab);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

export function readTabFromUrl(): TabId | null {
  const tab = new URLSearchParams(window.location.search).get("tab");
  return TAB_IDS.includes(tab as TabId) ? (tab as TabId) : null;
}

export function readParamFromUrl(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}
