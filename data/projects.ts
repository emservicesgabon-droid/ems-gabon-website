export type ProjectCategory = "enterprise" | "public" | "security" | "network" | "training";

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  client: string;
  category: ProjectCategory;
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  result: string;
  resultEn: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Déploiement Sage 100 – Société Industrielle",
    titleEn: "Sage 100 Deployment – Industrial Company",
    client: "Groupe Industriel GABON",
    category: "enterprise",
    problem: "Gestion comptable et commerciale sur papier, erreurs fréquentes et perte de temps.",
    problemEn: "Paper-based accounting and commercial management, frequent errors and time waste.",
    solution: "Installation et configuration de Sage 100 Comptabilité et Gestion Commerciale, formation de 5 utilisateurs.",
    solutionEn: "Installation and configuration of Sage 100 Accounting and Commercial Management, training of 5 users.",
    result: "Réduction de 60% du temps de traitement comptable, zéro erreur de saisie, bilans générés en 1h.",
    resultEn: "60% reduction in accounting processing time, zero data entry errors, balance sheets generated in 1 hour.",
    tags: ["Sage 100", "Comptabilité", "Formation"],
    image: "/images/projects/sage100-gabon.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Infrastructure Réseau – Administration Publique",
    titleEn: "Network Infrastructure – Public Administration",
    client: "Direction Générale des Impôts",
    category: "public",
    problem: "Réseau vieillissant, connexions lentes, sécurité insuffisante des données.",
    problemEn: "Aging network, slow connections, insufficient data security.",
    solution: "Câblage fibre optique, déploiement Windows Server + Active Directory, mise en place de VLAN.",
    solutionEn: "Fiber optic cabling, Windows Server + Active Directory deployment, VLAN implementation.",
    result: "Débit multiplié par 10, sécurité renforcée, 150 postes gérés centralement.",
    resultEn: "Speed multiplied by 10, enhanced security, 150 workstations managed centrally.",
    tags: ["Fibre", "Windows Server", "Active Directory"],
    image: "/images/projects/reseau-impots.jpg",
    featured: true,
  },
  {
    id: "3",
    title: "Vidéosurveillance – Centre Commercial",
    titleEn: "Video Surveillance – Shopping Center",
    client: "Centre Commercial Libreville",
    category: "security",
    problem: "Absence de surveillance, vols répétés, accès non contrôlé.",
    problemEn: "No surveillance, repeated thefts, uncontrolled access.",
    solution: "Installation de 24 caméras IP HD, système anti-intrusion, contrôle d'accès badgeé, supervision en temps réel.",
    solutionEn: "Installation of 24 HD IP cameras, anti-intrusion system, badge access control, real-time supervision.",
    result: "Zéro incident en 6 mois, assurance réduite de 20%, sentiment de sécurité amélioré.",
    resultEn: "Zero incidents in 6 months, insurance reduced by 20%, improved sense of security.",
    tags: ["Caméras IP", "Anti-intrusion", "Contrôle d'accès"],
    image: "/images/projects/cameras-mall.jpg",
    featured: true,
  },
  {
    id: "4",
    title: "Formation Bureautique – École Privée",
    titleEn: "Office Training – Private School",
    client: "Lycée Technique de Libreville",
    category: "training",
    problem: "Enseignants peu à l'aise avec les outils numériques, cours non informatisés.",
    problemEn: "Teachers not comfortable with digital tools, non-computerized classes.",
    solution: "Formation de 30 enseignants sur Microsoft Office, outils pédagogiques numériques et sécurité en ligne.",
    solutionEn: "Training of 30 teachers on Microsoft Office, digital teaching tools and online safety.",
    result: "100% des enseignants autonomes sur les outils bureautiques, nouveaux cours numériques créés.",
    resultEn: "100% of teachers independent on office tools, new digital courses created.",
    tags: ["Formation", "Microsoft Office", "Pédagogie"],
    image: "/images/projects/formation-lycee.jpg",
  },
  {
    id: "5",
    title: "Déploiement Fibre – PME Logistique",
    titleEn: "Fiber Deployment – Logistics SME",
    client: "Transport & Logistique Gabon",
    category: "network",
    problem: "Connexion 3G instable, impossible de gérer les opérations à distance.",
    problemEn: "Unstable 3G connection, impossible to manage remote operations.",
    solution: "Déploiement fibre optique 1Gbps inter-sites, routeurs haut de gamme, VPN sécurisé.",
    solutionEn: "1Gbps inter-site fiber optic deployment, high-end routers, secure VPN.",
    result: "Connectivité stable 99.9%, gestion en temps réel des opérations, économies de 30% sur les déplacements.",
    resultEn: "99.9% stable connectivity, real-time operations management, 30% savings on travel.",
    tags: ["Fibre Optique", "VPN", "Réseaux"],
    image: "/images/projects/fibre-logistique.jpg",
  },
  {
    id: "6",
    title: "Portail Automatique – Résidence Privée",
    titleEn: "Automatic Gate – Private Residence",
    client: "Résidence Les Palmiers",
    category: "security",
    problem: "Portail manuel, accès non sécurisé, gêne au quotidien.",
    problemEn: "Manual gate, unsecured access, daily inconvenience.",
    solution: "Installation portail coulissant motorisé, télécommande, interphone vidéo, accès backup par code.",
    solutionEn: "Motorized sliding gate installation, remote control, video intercom, backup code access.",
    result: "Accès sécurisé et confortable, installation en 2 jours, client 100% satisfait.",
    resultEn: "Secure and comfortable access, installation in 2 days, 100% satisfied customer.",
    tags: ["Portail", "Sécurité", "Résidentiel"],
    image: "/images/projects/portail-palmiers.jpg",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
