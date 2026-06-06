import { DownloadIcon, ExternalIcon, FileIcon } from "./icons";

interface Props {
  url?: string;
  path?: string;
}

const IMAGE_RE = /\.(png|jpe?g|gif|webp)(\?|$)/i;

function looksLikeImage(url: string, path?: string): boolean {
  return IMAGE_RE.test(path ?? "") || IMAGE_RE.test(url);
}

/** Filename portion of the storage path, for the download attribute. */
function fileName(path?: string, url?: string): string {
  const source = path || url || "receipt";
  const tail = source.split("/").pop() ?? "receipt";
  return decodeURIComponent(tail.split("?")[0]) || "receipt";
}

export function ReceiptView({ url, path }: Props) {
  if (!url) {
    return <p className="receipt receipt--empty">No receipt uploaded.</p>;
  }

  const isImage = looksLikeImage(url, path);

  return (
    <div className="receipt">
      <a
        className="receipt__preview"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title="Open receipt in a new tab"
      >
        {isImage ? (
          <img src={url} alt="Payment receipt" loading="lazy" />
        ) : (
          <span className="receipt__file">
            <FileIcon width={28} height={28} />
            <span>{fileName(path, url)}</span>
          </span>
        )}
      </a>
      <div className="receipt__actions">
        <a
          className="btn btn--sm"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalIcon />
          <span>Open</span>
        </a>
        <a
          className="btn btn--sm"
          href={url}
          download={fileName(path, url)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DownloadIcon />
          <span>Download</span>
        </a>
      </div>
    </div>
  );
}
