const DEFAULT_PUBLIC_NOTES_API = "https://notes.mxjxn.com/api/public";

export type PublicNoteSummary = {
  title: string;
  mtime?: number;
};

type PublicNotesIndex = {
  pages?: PublicNoteSummary[];
};

const DATE_PAGE = /^\d{4}[-_]\d{2}[-_]\d{2}/;
const MONTH_SERIES = /^.+ \d{4}-\d{2}$/;
const SYSTEM_PAGE = /^(TODAY - |[A-Z][a-z]{2} \d{1,2}(st|nd|rd|th), \d{4})/;

function publicNotesApi() {
  return import.meta.env.NOTES_PUBLIC_API || DEFAULT_PUBLIC_NOTES_API;
}

function isArticle(page: PublicNoteSummary) {
  return !DATE_PAGE.test(page.title) &&
    !MONTH_SERIES.test(page.title) &&
    !SYSTEM_PAGE.test(page.title);
}

/** Read the gated public index during SSR; browsers never query the graph. */
export async function getRecentPublicNotes(limit = 4): Promise<PublicNoteSummary[]> {
  try {
    const response = await fetch(`${publicNotesApi()}/pages`, {
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return [];

    const data = (await response.json()) as PublicNotesIndex;
    return (data.pages || [])
      .filter(isArticle)
      .sort((a, b) => (b.mtime || 0) - (a.mtime || 0) || a.title.localeCompare(b.title))
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function publicNoteUrl(title: string) {
  return `https://notes.mxjxn.com/p/${encodeURIComponent(title)}`;
}
