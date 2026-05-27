import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
  className?: string;
}

export function Breadcrumbs({ crumbs, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-sm ${className}`}>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={13} className="text-grey-400" aria-hidden="true" />}
          {crumb.href && i < crumbs.length - 1 ? (
            <Link href={crumb.href} className="text-grey-500 hover:text-primary-700 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className={i === crumbs.length - 1 ? "text-text-heading font-medium" : "text-grey-500"}>
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
