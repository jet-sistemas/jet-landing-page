import { Benefit, Publication, Sponsor } from "@/types/entities";
import {
  Calendar,
  Eye,
  Gift,
  Medal,
  Share2,
  Star,
  Trophy,
  Users,
} from "lucide-react";

export const associateBenefits: Benefit[] = [
  {
    icon: Calendar,
    title: "Treinos Regulares",
    description:
      "Participe de treinos semanais de vôlei com orientação profissional.",
  },
  {
    icon: Trophy,
    title: "Campeonatos",
    description:
      "Acesso garantido a todos os campeonatos organizados pela associação.",
  },
  {
    icon: Gift,
    title: "Benefícios Exclusivos",
    description: "Descontos e vantagens em parceiros comerciais da associação.",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description:
      "Faça parte de uma comunidade apaixonada por esportes no sul do Piauí.",
  },
];

export const sponsorBenefits: Benefit[] = [
  {
    icon: Eye,
    title: "Visibilidade em Eventos",
    description:
      "Sua marca exposta em todos os campeonatos e eventos esportivos.",
  },
  {
    icon: Share2,
    title: "Divulgação nas Redes",
    description:
      "Presença garantida em todas as publicações e redes sociais da associação.",
  },
  {
    icon: Medal,
    title: "Categorias Exclusivas",
    description:
      "Escolha entre Ouro, Prata ou Bronze com benefícios diferenciados.",
  },
  {
    icon: Star,
    title: "Destaque na Plataforma",
    description: "Logo e informações da empresa em destaque no site oficial.",
  },
];

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Empresa Exemplo Ouro",
    logo: "/sponsors/gold-1.png",
    tier: "gold",
    website: "https://exemplo.com",
  },
  {
    id: "2",
    name: "Parceiro Premium",
    logo: "/sponsors/gold-2.png",
    tier: "gold",
    website: "https://parceiro.com",
  },
  {
    id: "3",
    name: "Empresa Prata A",
    logo: "/sponsors/silver-1.png",
    tier: "silver",
  },
  {
    id: "4",
    name: "Empresa Prata B",
    logo: "/sponsors/silver-2.png",
    tier: "silver",
  },
  {
    id: "5",
    name: "Comércio Local",
    logo: "/sponsors/bronze-1.png",
    tier: "bronze",
  },
  {
    id: "6",
    name: "Loja Parceira",
    logo: "/sponsors/bronze-2.png",
    tier: "bronze",
  },
  {
    id: "7",
    name: "Serviços Gerais",
    logo: "/sponsors/bronze-3.png",
    tier: "bronze",
  },
];

export const publications: Publication[] = [
  // {
  //   id: "1",
  //   title: "Campeonato Regional de Vôlei 2025",
  //   excerpt:
  //     "A Associação J&T está organizando o maior campeonato regional de vôlei do sul do Piauí. Inscrições abertas!",
  //   coverImage: "/publications/campeonato.jpg",
  //   publishedAt: "2025-06-15",
  //   slug: "campeonato-regional-volei-2025",
  //   category: "Eventos",
  // },
  // {
  //   id: "2",
  //   title: "Novos Parceiros se Juntam à Família J&T",
  //   excerpt:
  //     "Celebramos a chegada de três novos patrocinadores que acreditam no poder transformador do esporte.",
  //   coverImage: "/publications/parceiros.jpg",
  //   publishedAt: "2025-06-10",
  //   slug: "novos-parceiros-familia-jt",
  //   category: "Parcerias",
  // },
  // {
  //   id: "3",
  //   title: "Treinos de Verão: Vagas Limitadas",
  //   excerpt:
  //     "Os treinos intensivos de verão começam em julho. Garanta sua vaga e desenvolva suas habilidades.",
  //   coverImage: "/publications/treinos.jpg",
  //   publishedAt: "2025-06-05",
  //   slug: "treinos-verao-vagas-limitadas",
  //   category: "Treinos",
  // },
  // {
  //   id: "4",
  //   title: "História de Sucesso: João Pedro",
  //   excerpt:
  //     "Conheça a trajetória de João Pedro, que descobriu o amor pelo vôlei através da nossa associação.",
  //   coverImage: "/publications/historia.jpg",
  //   publishedAt: "2025-05-28",
  //   slug: "historia-sucesso-joao-pedro",
  //   category: "Histórias",
  // },
  // {
  //   id: "5",
  //   title: "História de Sucesso: João Pedro",
  //   excerpt:
  //     "Conheça a trajetória de João Pedro, que descobriu o amor pelo vôlei através da nossa associação.",
  //   coverImage: "/publications/historia.jpg",
  //   publishedAt: "2025-05-28",
  //   slug: "historia-sucesso-joao-pedro",
  //   category: "Histórias",
  // },
  // {
  //   id: "6",
  //   title: "História de Sucesso: João Pedro",
  //   excerpt:
  //     "Conheça a trajetória de João Pedro, que descobriu o amor pelo vôlei através da nossa associação.",
  //   coverImage: "/publications/historia.jpg",
  //   publishedAt: "2025-05-28",
  //   slug: "historia-sucesso-joao-pedro",
  //   category: "Histórias",
  // },
  // {
  //   id: "7",
  //   title: "História de Sucesso: João Pedro",
  //   excerpt:
  //     "Conheça a trajetória de João Pedro, que descobriu o amor pelo vôlei através da nossa associação.",
  //   coverImage: "/publications/historia.jpg",
  //   publishedAt: "2025-05-28",
  //   slug: "historia-sucesso-joao-pedro",
  //   category: "Histórias",
  // },
];

// Informações de contato
export const contactInfo = {
  whatsapp: "(89) 9 9465-9400",
  whatsappLink: "https://wa.me/5589994659400",
  email: "associacaojet@gmail.com",
  address: "Sul do Piauí, Brasil",
  instagram: "@associacaojet",
  instagramLink: "https://instagram.com/associacaojet",
};

// Links de navegação
export const navLinks = [
  { label: "Início", href: "/" },
  { label: "Benefícios", href: "/#beneficios" },
  { label: "Patrocinadores", href: "/#patrocinadores" },
  { label: "Notícias", href: "/noticias" },
  { label: "Contato", href: "/#contato" },
];

// Valor da mensalidade
export const membershipFee = "R$ 0,00";
