interface RandomImage {
  id: number;
  "alt-text": string;
  "src-attribute": string;
  description: string;
}

export const randomImages = [
  {
    id: 1,
    "alt-text": "GDG Abuja Technical Session Photo",
    "src-attribute": "/gdg_abj_01.jpg",
    description: "Participating in a GDG Abuja technical lab session on building AI integrations with Google Cloud Platform.",
  },
  {
    id: 2,
    "alt-text": "GDG Abuja Technical Session Photo 2",
    "src-attribute": "/gdg_abj_02.jpg",
    description: "Participating in a GDG Abuja technical lab session on building AI integrations with Google Cloud Platform.",
  },
  {
    id: 3,
    "alt-text": "GDG Abuja Dev Fest 2024 Photo",
    "src-attribute": "/dev_fest_24_01.jpg",
    description: "Attending the GDG Abuja Dev Fest 2024 event.",
  },
]