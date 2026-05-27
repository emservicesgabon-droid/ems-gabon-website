export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EMS GABON",
    description:
      "Entreprise informatique gabonaise proposant des services IT complets : maintenance, réseaux, Sage 100, sécurité, fibre optique, formation.",
    url: "https://ems-gabon.com",
    email: "ems@emsgabon.com",
    telephone: "+241011454973",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Libreville",
      addressCountry: "GA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 0.3902,
      longitude: 9.4536,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Gabon",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
