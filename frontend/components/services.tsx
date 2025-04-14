"use client"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, FileText, Globe, Shield } from "lucide-react";
import { useState } from "react";
//import Image from "next/image";
import Link from "next/link";

// Define the type for a Service object
type Service = {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  hoverColor: string;
};

// Icon mapping based on the text from Strapi
const iconMapping: { [key: string]: React.ReactNode } = {
  shield: <Shield className="h-10 w-10 text-red-600" />,
  building: <Building2 className="h-10 w-10 text-gray-900 dark:text-gray-300" />,
  fileText: <FileText className="h-10 w-10 text-[#8D7B68]" />,
  globe: <Globe className="h-10 w-10 text-red-600" />,
};

// Define the component to accept services as a prop
type ServicesProps = {
  services: Service[];
};

export function Services({ services }: ServicesProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="w-full py-24 md:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="text-sm font-medium text-red-600 uppercase tracking-wider">事業内容</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">事業内容</h2>
          <p className="max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed">
            イージスグループは様々なサービスを通じて公共サービスの質的向上と効率化を図ります。
            専門知識と経験を活かし、最適なソリューションを提供します。
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 overflow-hidden ${hoveredCard === index ? "shadow-lg shadow-red-600/10 border-2 border-transparent bg-clip-padding bg-gradient-to-r from-red-500 to-yellow-400" : "hover:shadow-md"}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.hoverColor} to-transparent opacity-0 transition-opacity duration-300 ${hoveredCard === index ? "opacity-100" : ""}`}></div>

              <CardHeader className="relative z-10">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100/50 dark:bg-gray-800/50 transition-all duration-300 ${hoveredCard === index ? service.bgColor : ""}`}
                >
                  {/* Rendering icon dynamically from the mapping */}
                  {iconMapping[service.icon]}
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">{service.title}</CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <CardDescription className="text-base text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </CardDescription>
                <Button
                  variant="ghost"
                  className={`p-0 h-auto text-sm font-medium text-red-600 hover:text-red-500 hover:bg-transparent group/btn ${hoveredCard === index ? "translate-x-1" : ""}`}
                  asChild
                >
                  <Link href="/services" className="flex items-center hover:underline hover:tracking-wide transition-all duration-200">
                    詳細を見る
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
