// lib/api.ts

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;  // icon is now strictly a string
    bgColor: string;  // bgColor is now strictly a string
    hoverColor: string;  // hoverColor is now strictly a string
  }
  interface RichText {
    type: string;
    children: {
      type: string;
      text: string;
    }[];
  }
  
  interface HeroData {
    tagline: string;
    title: RichText[];
    description: RichText[];
    button1Label: string;
    button1Link: string;
    button2Label: string;
    button2Link: string;
    backgroundImage?: string | null;
    stat?: {
      value: string;
      label: string;
    }[];
  }
  
  
  
  
  export async function getServices(): Promise<Service[]> {
    const res = await fetch("http://localhost:1337/api/services");
    if (!res.ok) throw new Error("Failed to fetch services");
    const json = await res.json();
  
    const data: Service[] = json.data;
    console.log(json.data);
  
    return data.map((item) => ({
      id: item.id || 1,
      title: item.title || "The default title",
      description: item.description || "Default description",
      icon: item.icon || "",  // Provide a default empty string if icon is undefined
      bgColor: item.bgColor || "",  // Provide a default empty string if bgColor is undefined
      hoverColor: item.hoverColor || "",  // Provide a default empty string if hoverColor is undefined
    }));
  }
  export async function getHeroData(): Promise<HeroData> {
    const res = await fetch("http://localhost:1337/api/hero-sections?populate=*");
    if (!res.ok) throw new Error("Failed to fetch hero data");
    const json = await res.json();
    // Ensure "data" is an array and safely get the first item
    const heroItem = json.data?.[0];
    if (!heroItem) throw new Error("Hero data is missing");

    return {
      tagline: heroItem.tagline,
      title: heroItem.title,
      description: heroItem.description,
      button1Label: heroItem.button1Label,
      button1Link: heroItem.button1Link,
      button2Label: heroItem.button2Label,
      button2Link: heroItem.button2Link,
      backgroundImage: heroItem.backgroundImage?.url
      ? `http://localhost:1337${heroItem.backgroundImage.url}`
      : null,
      stat: heroItem.stat || [],
    };
}
  
  