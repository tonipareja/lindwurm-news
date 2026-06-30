export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Miniatures" | "Rules" | "Lore" | "Painting" | "Events";
  date: string;
  readingTime: string;
  image: string;
  featured?: boolean;
};

type NewsModule = {
  frontmatter: Omit<NewsItem, "slug">;
  Content: unknown;
};

const rawNews = import.meta.glob("../news/*.md", { eager: true });

export const newsEntries = Object.entries(rawNews)
  .map(([path, module]) => {
    const { frontmatter, Content } = module as NewsModule;
    const slug = path.split("/").pop()?.replace(".md", "") ?? "";

    return {
      slug,
      Content,
      ...frontmatter,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const news = newsEntries.map(({ Content, ...item }) => item);

export const categories = ["All", "Miniatures", "Rules", "Lore", "Painting", "Events"];
