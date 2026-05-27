export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  textEn: string;
  avatar?: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jean-Pierre MBOUMBA",
    role: "Directeur Général",
    company: "Société Commerciale du Gabon",
    text: "EMS GABON a transformé notre infrastructure informatique. L'installation de Sage 100 et la mise en place du réseau ont été réalisées rapidement et professionnellement. Notre équipe est maintenant beaucoup plus productive.",
    textEn: "EMS GABON transformed our IT infrastructure. The Sage 100 installation and network setup were completed quickly and professionally. Our team is now much more productive.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marie NGUEMA",
    role: "Responsable Administrative",
    company: "Cabinet d'Avocats Nguema & Associés",
    text: "Grâce à EMS GABON, nous avons enfin un système de vidéosurveillance fiable et un réseau stable. Leur équipe est réactive et toujours disponible en cas de problème.",
    textEn: "Thanks to EMS GABON, we finally have a reliable surveillance system and a stable network. Their team is responsive and always available when problems arise.",
    rating: 5,
  },
  {
    id: "3",
    name: "Paul ONDO",
    role: "Gérant",
    company: "Pharmacie du Centre",
    text: "La formation dispensée par EMS GABON a permis à toute notre équipe de maîtriser les outils informatiques. Excellent suivi et pédagogie adaptée à notre niveau.",
    textEn: "The training provided by EMS GABON allowed our entire team to master IT tools. Excellent follow-up and teaching adapted to our level.",
    rating: 5,
  },
  {
    id: "4",
    name: "Sylvie OBAME",
    role: "Chef du Service Informatique",
    company: "Ministère de l'Éducation",
    text: "Nous avons fait appel à EMS GABON pour déployer notre infrastructure Windows Server et Active Directory. Le résultat est au-delà de nos attentes : tout fonctionne parfaitement.",
    textEn: "We called on EMS GABON to deploy our Windows Server and Active Directory infrastructure. The result exceeded our expectations – everything works perfectly.",
    rating: 5,
  },
];
