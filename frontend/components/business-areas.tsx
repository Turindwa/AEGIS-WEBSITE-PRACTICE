"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { renderRichText } from "@/lib/richer"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Building2,
  FileText,
  Droplet,
  Flame,
  MonitorIcon,
  RouteIcon as Road,
  HandshakeIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getBusinessAreas, getDetailedBusinessAreas } from "@/lib/api" // adjust the path as needed
import type { BusinessArea, DetailedBusinessArea } from "@/lib/api" 
const iconMap: Record<string, React.ReactNode>  = {
  Shield: <Shield className="h-8 w-8" />,
  Building2: <Building2 className="h-8 w-8" />,
  FileText: <FileText className="h-8 w-8" />,
  Droplet: <Droplet className="h-6 w-6 text-[#8D7B68]" />,
  Flame: <Flame className="h-6 w-6 text-gray-900 dark:text-gray-300" />,
  MonitorIcon: <MonitorIcon className="h-6 w-6 text-red-600" />,
  Road: <Road className="h-6 w-6 text-red-600" />,
  HandshakeIcon: <HandshakeIcon className="h-6 w-6 text-red-600" />,
  default: <Shield className="h-6 w-6 text-gray-400" /> // Fallback icon
}

export function BusinessAreas() {
  const [businessAreas, setBusinessAreas] = useState<BusinessArea[]>([])
  const [detailedAreas, setDetailedAreas] = useState<DetailedBusinessArea[]>([])
  const [activeArea, setActiveArea] = useState<number | null>(null)

  useEffect(() => {
    async function fetchData() {
      const [main, details] = await Promise.all([
        getBusinessAreas(),
        getDetailedBusinessAreas(),
      ])
      setBusinessAreas(main)
      setDetailedAreas(details)
    }

    fetchData()
  }, [])

  return (
    <section className="w-full py-24 md:py-32 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-gray-900 dark:bg-black opacity-60"></div>
          <Image
            src="/images/engineers-tablet.png"
            alt="Engineers with tablet background"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="text-sm font-medium text-red-600 uppercase tracking-wider">事業領域</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">事業領域</h2>
          <p className="max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed">
            あるべき 官民連携を形に。ワンストップサービスを提供。
          </p>
        </div>

        {/* Main business areas */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12 md:mb-20">
          {businessAreas.map((area) => (
            <div
              key={area.id}
              className="relative group w-full md:w-auto"
              onMouseEnter={() => setActiveArea(area.id)}
              onMouseLeave={() => setActiveArea(null)}
            >
              <div
                className={cn(
                  "w-full h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center p-6 transition-all duration-300 mx-auto",
                  activeArea === area.id ? "scale-105" : "opacity-90",
                )}
              >
                <div className="text-white mb-2">{iconMap[area.iconName]}</div>
                <h3 className="text-xl font-bold text-white mb-2">{area.title}</h3>
               
                <div className="text-sm text-white/80 text-center">
                  {renderRichText(area.description)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed business areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedAreas.map((area) => (
            <Card
              key={area.id}
              className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 overflow-hidden group hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={area.image.url?? "/placeholder.svg"}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  {iconMap[area.iconName]}
                  <h3 className="text-lg font-bold text-white">{area.title}</h3>
                </div>
              </div>
              <CardContent className="pt-4">
              <div className="text-gray-600 dark:text-gray-400">
              {renderRichText(area.description)}
              </div>
                
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Extra section */}
        <div className="mt-20 relative rounded-xl overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/modern-tokyo-cityscape.jpeg"
              alt="Modern Tokyo cityscape aerial view"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-80"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                川上から川下まで、様々な課題にソリューションを提供
              </h3>
              <p className="text-gray-300">
                我々は「官の頼れるパートナー」として、川上から川下まで求められる全ての課題にソリューションを提供できるよう、調整の業務委託から施設自体の指定管理、更には事業自体の運営・収益責任を担うコンセッション方式まで、幅広く取り組んでいます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
