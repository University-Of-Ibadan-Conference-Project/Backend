import { openGatedExternalLink } from "../../utils/registrationGate";

export default function GatedCmtLink({ href, children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    openGatedExternalLink(href);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
