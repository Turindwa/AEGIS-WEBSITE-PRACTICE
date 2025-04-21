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
  export interface RichTextChild {
    text: string;
  }
  
  export interface RichTextBlock {
    type: string;
    children: RichTextChild[];
  }
  export interface BusinessArea {
    id: number;
    title: string;
    description: RichTextBlock[];
    iconName: string;
    image: {
      url: string;
    }
  }
  
  export interface DetailedBusinessArea {
    id: number;
    title: string;
    description: RichTextBlock[];
    iconName: string;
    image: {
      url: string;
    }
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
  
 // Fetch business areas
export async function getBusinessAreas(): Promise<BusinessArea[]> {
  const res = await fetch("http://localhost:1337/api/business-areas?populate=*");
  if (!res.ok) throw new Error("Failed to fetch business areas");
  const json = await res.json();

  const data: BusinessArea[] = json.data;
  console.log(json.data);

  return data.map((item) => ({
    id: item.id || 1,
    title: item.title || "Business Area title",
    description: item.description || [],
    iconName: item.iconName || "default",  // Match your `iconMap` key
    image: {
      url: item.image && item.image.url
        ? `http://localhost:1337${item.image.url}`
        : "/placeholder.svg"
    },
  }));
}

// Fetch detailed business areas
export async function getDetailedBusinessAreas(): Promise<DetailedBusinessArea[]> {
  const res = await fetch("http://localhost:1337/api/detailed-business-areas?populate=*");
  if (!res.ok) throw new Error("Failed to fetch detailed business areas");
  const json = await res.json();

  const data: DetailedBusinessArea[] = json.data;
  console.log(json.data);

  return data.map((item) => ({
    id: item.id || 1,
    title: item.title || "Detailed Business Area title",
    description: item.description || [],
    
    iconName: item.iconName || "default-icon",  // Provide a default if iconName is undefined
    image: {
      url: item.image && item.image.url
        ? `http://localhost:1337${item.image.url}`
        : "/placeholder.svg" // Provide a default image URL if image is missing
    },
  }));
} 