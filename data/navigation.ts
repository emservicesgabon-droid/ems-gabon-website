export interface NavItem {
  labelKey: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/a-propos" },
  {
    labelKey: "nav.services",
    href: "/services",
    children: [
      { labelKey: "nav.solutionsEntreprises", href: "/solutions-entreprises" },
      { labelKey: "nav.solutionsParticuliers", href: "/solutions-particuliers" },
      { labelKey: "nav.sage100", href: "/sage-100" },
      { labelKey: "nav.securite", href: "/securite-videosurveillance" },
      { labelKey: "nav.fibre", href: "/fibre-optique" },
      { labelKey: "nav.formation", href: "/formation" },
      { labelKey: "nav.support", href: "/support" },
    ],
  },
  { labelKey: "nav.realisations", href: "/realisations" },
  { labelKey: "nav.contact", href: "/contact" },
];

export const footerServiceLinks: NavItem[] = [
  { labelKey: "nav.solutionsEntreprises", href: "/solutions-entreprises" },
  { labelKey: "nav.solutionsParticuliers", href: "/solutions-particuliers" },
  { labelKey: "nav.sage100", href: "/sage-100" },
  { labelKey: "nav.securite", href: "/securite-videosurveillance" },
  { labelKey: "nav.fibre", href: "/fibre-optique" },
  { labelKey: "nav.formation", href: "/formation" },
  { labelKey: "nav.support", href: "/support" },
];

export const footerCompanyLinks: NavItem[] = [
  { labelKey: "nav.about", href: "/a-propos" },
  { labelKey: "nav.realisations", href: "/realisations" },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.contact", href: "/contact" },
];
