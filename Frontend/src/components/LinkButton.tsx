import { Link } from "react-router-dom";

const LinkButton = ({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) => {
  return (
    <Link
      className={`bg-primary px-6 py-2 rounded-lg text-background border-2 text-center text-sm font-medium ${className}`}
      to={href}
    >
      {label}
    </Link>
  );
};

export default LinkButton;
