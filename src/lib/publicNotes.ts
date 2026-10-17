const DEFAULT_PUBLIC_NOTES_API = "https://notes.mxjxn.com/api/public";

export type PublicNoteSummary = {
  title: string;
  mtime?: number;
  article?: boolean;
};

type PublicNotesIndex = {
  pages?: PublicNoteSummary[];
};



function publicNotesApi() {
  return import.meta.env.NOTES_PUBLIC_API || DEFAULT_PUBLIC_NOTES_API;
}

// Opt-in only: a page appears here when the graph tags it `article:: true`.
// The reader (notes.mxjxn.com) ignores that flag — it is mxjxn.com-specific.
function isArticle(page: PublicNoteSummary) {
  return page.article === true;
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
