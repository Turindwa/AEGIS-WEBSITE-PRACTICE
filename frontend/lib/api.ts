// lib/api.ts

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;  // icon is now strictly a string
    bgColor: string;  // bgColor is now strictly a string
    hoverColor: string;  // hoverColor is now strictly a string
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
  