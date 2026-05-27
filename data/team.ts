export type TeamGroup = "direction" | "operations" | "terrain";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  bio: string;
  bioEn: string;
  skills: string[];
  group: TeamGroup;
  avatar?: string;
  isGroup?: boolean;
}

export const team: TeamMember[] = [
  // ── Direction ──────────────────────────────────────────
  {
    id: "1",
    name: "Michel Moukam",
    avatar: "/images/team/michel.jpeg",
    role: "Directeur Général",
    roleEn: "Chief Executive Officer",
    bio: "Vision stratégique, relation partenaires clés, arbitrages inter-associés.",
    bioEn: "Strategic vision, key partner relations, inter-partner arbitration.",
    skills: ["Stratégie", "Partenariats", "Direction"],
    group: "direction",
  },
  {
    id: "2",
    name: "Eddy Siemeni",
    avatar: "/images/team/eddy.jpeg",
    role: "Directeur Technique",
    roleEn: "Chief Technology Officer",
    bio: "Expert certifié IA, Microsoft et Sage avec plus de 20 ans d'expérience en infrastructure IT et développement d'applications web. Architecture des solutions, contrôle qualité des livraisons, conformité. Il supervise tous les projets techniques d'EMS GABON.",
    bioEn: "AI, Microsoft and Sage certified expert with over 20 years of IT infrastructure and web application development experience. Solution architecture, delivery quality control, compliance. He oversees all technical projects at EMS GABON.",
    skills: ["IA", "Microsoft", "Sage 100", "Architecture IT", "Web Dev"],
    group: "direction",
  },
  {
    id: "3",
    name: "Simplice Tekoudjou",
    avatar: "/images/team/simplice.jpeg",
    role: "Directeur Technique Adjoint",
    roleEn: "Deputy Technical Director",
    bio: "Spécialiste en déploiement fibre optique, vidéosurveillance et systèmes anti-intrusion. Sécurité informatique, domotique, contrôle d'accès — suivi qualité projets sécurité. Il intervient sur tout le Gabon.",
    bioEn: "Specialist in fiber optic deployment, video surveillance and anti-intrusion systems. Cybersecurity, home automation, access control — security project quality monitoring. He operates throughout Gabon.",
    skills: ["Fibre Optique", "CCTV", "Domotique", "Contrôle d'accès"],
    group: "direction",
  },
  {
    id: "4",
    name: "Raoul DJANI NATCHA",
    avatar: "/images/team/raoul.jpeg",
    role: "Dir. Admin. & Commercial",
    roleEn: "Admin. & Sales Director",
    bio: "Spécialiste de la relation client et du développement commercial. Il accompagne les entreprises dans l'identification de leurs besoins IT. Prospection, offres commerciales, CRM, communication, admin.",
    bioEn: "Customer relations and business development specialist. He supports businesses in identifying their IT needs. Prospecting, commercial offers, CRM, communication, administration.",
    skills: ["Commercial B2B", "CRM", "Communication", "Administration"],
    group: "direction",
  },
  // ── Opérations ─────────────────────────────────────────
  {
    id: "5",
    name: "Dieudonné Nyamsi",
    avatar: "/images/team/dieudonne.jpeg",
    role: "Conducteur de Travaux",
    roleEn: "Site Manager",
    bio: "Gestion quotidienne du chantier, planning équipe, reporting. Décisions opérationnelles terrain.",
    bioEn: "Daily site management, team scheduling, reporting. Operational field decisions.",
    skills: ["Gestion chantier", "Planning", "Reporting"],
    group: "operations",
  },
  // ── Équipe terrain ──────────────────────────────────────
  {
    id: "6",
    name: "Techniciens",
    role: "Équipe terrain",
    roleEn: "Field Team",
    bio: "Exécution des travaux selon cahier des charges. Installation, câblage, configuration et maintenance sur le terrain.",
    bioEn: "Execution of works according to specifications. Installation, cabling, configuration and maintenance in the field.",
    skills: ["Installation", "Câblage", "Configuration", "Maintenance"],
    group: "terrain",
    isGroup: true,
  },
];
