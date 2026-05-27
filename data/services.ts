export interface Service {
  id: string;
  slug: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  color: "primary" | "success" | "neon" | "yellow" | "grey";
}

export const services: Service[] = [
  {
    id: "maintenance",
    slug: "services#maintenance",
    icon: "Wrench",
    titleKey: "services.maintenance_title",
    descriptionKey: "services.maintenance_desc",
    color: "primary",
  },
  {
    id: "sage",
    slug: "sage-100",
    icon: "Calculator",
    titleKey: "services.sage_title",
    descriptionKey: "services.sage_desc",
    color: "success",
  },
  {
    id: "security",
    slug: "securite-videosurveillance",
    icon: "Shield",
    titleKey: "services.security_title",
    descriptionKey: "services.security_desc",
    color: "neon",
  },
  {
    id: "fiber",
    slug: "fibre-optique",
    icon: "Cable",
    titleKey: "services.fiber_title",
    descriptionKey: "services.fiber_desc",
    color: "yellow",
  },
  {
    id: "training",
    slug: "formation",
    icon: "GraduationCap",
    titleKey: "services.training_title",
    descriptionKey: "services.training_desc",
    color: "primary",
  },
  {
    id: "server",
    slug: "services#server",
    icon: "Server",
    titleKey: "services.server_title",
    descriptionKey: "services.server_desc",
    color: "grey",
  },
  {
    id: "webdev",
    slug: "services#webdev",
    icon: "Globe",
    titleKey: "services.webdev_title",
    descriptionKey: "services.webdev_desc",
    color: "primary",
  },
  {
    id: "support",
    slug: "support",
    icon: "Headphones",
    titleKey: "services.support_title",
    descriptionKey: "services.support_desc",
    color: "success",
  },
  {
    id: "config",
    slug: "services#config",
    icon: "Settings",
    titleKey: "services.config_title",
    descriptionKey: "services.config_desc",
    color: "grey",
  },
];

export const featuredServices = services.slice(0, 6);
