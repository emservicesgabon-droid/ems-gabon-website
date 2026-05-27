export interface Partner {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  website?: string;
}

export const partners: Partner[] = [
  {
    id: "sage",
    name: "Sage",
    category: "Logiciel de gestion",
    description: "Partenaire officiel Sage 100 pour le Gabon",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    category: "Infrastructure & Cloud",
    description: "Solutions Microsoft Server et Azure",
  },
  {
    id: "hikvision",
    name: "Hikvision",
    category: "Sécurité & Vidéosurveillance",
    description: "Leader mondial des solutions de vidéosurveillance",
  },
  {
    id: "cisco",
    name: "Cisco",
    category: "Réseaux",
    description: "Équipements réseau Cisco pour entreprises",
  },
  {
    id: "dahua",
    name: "Dahua",
    category: "Sécurité",
    description: "Systèmes de sécurité et vidéosurveillance",
  },
  {
    id: "hp",
    name: "HP",
    category: "Matériel informatique",
    description: "Ordinateurs, serveurs et imprimantes HP",
  },
];
