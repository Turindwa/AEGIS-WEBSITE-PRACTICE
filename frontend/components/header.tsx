"use client"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Briefcase, Building2, ChevronDown, FileText, Globe, Mail, MapPin, Menu, Moon, Phone, Shield, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);


  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setActiveMegaMenu(null)
  }

  const handleMouseEnter = (menu: string) => {
    if (menuTimeout) clearTimeout(menuTimeout) 
    setActiveMegaMenu(menu)
  }

  const handleMouseLeave = () => {
    if (menuTimeout) clearTimeout(menuTimeout)
    const timeout = setTimeout(() => setActiveMegaMenu(null), 200)
    setMenuTimeout(timeout)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      let touchStartX = 0
      let touchEndX = 0

      const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.changedTouches[0].screenX
      }

      const handleTouchEnd = (e: TouchEvent) => {
        touchEndX = e.changedTouches[0].screenX
        if (touchStartX - touchEndX > 100 && isMenuOpen) {
          // Swipe left to close
          setIsMenuOpen(false)
        } else if (touchEndX - touchStartX > 100 && !isMenuOpen) {
          // Swipe right to open
          setIsMenuOpen(true)
        }
      }

      document.addEventListener("touchstart", handleTouchStart)
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("touchstart", handleTouchStart)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isMenuOpen, setIsMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2 ml-4">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <div
            className="relative group"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-gray-700 dark:text-gray-300",
                activeMegaMenu === "services" ? "text-primary" : "",
              )}
            >
              事業内容 <ChevronDown className="w-4 h-4" />
            </button>
            {activeMegaMenu === "services" && (
              <div className="absolute top-full left-0 mt-2 w-[550px] rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="grid grid-cols-2 gap-4 p-6">
                  <Link
                    href="/services"
                    className="col-span-2 mb-2 text-gray-900 dark:text-white font-medium hover:text-primary"
                  >
                    すべての事業内容を見る
                  </Link>
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/services"
                      className="flex items-start gap-3 group/item rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Shield className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover/item:text-primary">
                          コンセッション事業
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">SPCの代表企業として運営</p>
                      </div>
                    </Link>
                    <Link
                      href="/services"
                      className="flex items-start gap-3 group/item rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Building2 className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover/item:text-primary">
                          指定管理事業
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">施設の指定管理者として運営</p>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/services"
                      className="flex items-start gap-3 group/item rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FileText className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover/item:text-primary">
                          業務委託事業
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">委託を受けた業務のオペレーション</p>
                      </div>
                    </Link>
                    <Link
                      href="/services"
                      className="flex items-start gap-3 group/item rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Globe className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover/item:text-primary">
                          パートナーシップ事業
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          企業とのパートナーシップによる事業展開
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative group"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-gray-700 dark:text-gray-300",
                activeMegaMenu === "about" ? "text-primary" : "",
              )}
            >
              会社案内 <ChevronDown className="w-4 h-4" />
            </button>
            {activeMegaMenu === "about" && (
              <div className="absolute top-full left-0 mt-2 w-[400px] rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="p-6">
                  <Link
                    href="/about"
                    className="mb-4 text-gray-900 dark:text-white font-medium hover:text-primary block"
                  >
                    会社案内を見る
                  </Link>
                  <div className="grid gap-4">
                    <Link
                      href="/about"
                      className="flex items-start gap-3 group/item rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Building2 className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover/item:text-primary">
                          企業理念
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">公共サービスを変える</p>
                      </div>
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-start gap-3 group/item rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Briefcase className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover/item:text-primary">
                          グループ企業
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">イージスグループの企業一覧</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog/latest"
            className="text-sm font-medium transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
          >
            ニュース
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => handleMouseEnter("contact")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-gray-700 dark:text-gray-300",
                activeMegaMenu === "contact" ? "text-primary" : "",
              )}
            >
              お問い合わせ <ChevronDown className="w-4 h-4" />
            </button>
            {activeMegaMenu === "contact" && (
              <div className="absolute top-full right-0 mt-2 w-[400px] rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="p-6">
                  <Link
                    href="/contact"
                    className="mb-4 text-gray-900 dark:text-white font-medium hover:text-primary block"
                  >
                    お問い合わせフォームへ
                  </Link>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">電話</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">0593-24-1234</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">メール</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">info@aegis-group.jp</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">所在地</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">三重県四日市市朝日町1番4号</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/contact">お問い合わせ</Link>
          </Button>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" onClick={toggleMenu} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          style={{ height: "100dvh" }} // Use dynamic viewport height for better mobile experience
        >
          <div className="flex h-20 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4">
            <Logo />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleMenu}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="grid gap-2 p-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-lg font-medium text-gray-900 dark:text-white">事業内容</span>
              </div>
              <div className="ml-4 space-y-3 mt-2">
                <Link
                  href="/services"
                  className="flex items-center py-4 text-base transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="h-5 w-5 mr-3 text-primary" /> コンセッション事業
                </Link>
                <Link
                  href="/services"
                  className="flex items-center py-4 text-base transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Building2 className="h-5 w-5 mr-3 text-primary" /> 指定管理事業
                </Link>
                <Link
                  href="/services"
                  className="flex items-center py-4 text-base transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="h-5 w-5 mr-3 text-primary" /> 業務委託事業
                </Link>
                <Link
                  href="/services"
                  className="flex items-center py-4 text-base transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Globe className="h-5 w-5 mr-3 text-primary" /> パートナーシップ事業
                </Link>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-lg font-medium text-gray-900 dark:text-white">会社案内</span>
              </div>
              <div className="ml-4 space-y-3 mt-2">
                <Link
                  href="/about"
                  className="flex items-center py-4 text-base transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Building2 className="h-5 w-5 mr-3 text-primary" /> 企業理念
                </Link>
                <Link
                  href="/about"
                  className="flex items-center py-4 text-base transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Briefcase className="h-5 w-5 mr-3 text-primary" /> グループ企業
                </Link>
              </div>
            </div>

            <Link
              href="/blog/latest"
              className="flex items-center py-4 text-lg font-medium border-b border-gray-200 dark:border-gray-800 transition-colors hover:text-primary text-gray-900 dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              ニュース
            </Link>

            <Link
              href="/contact"
              className="flex items-center py-4 text-lg font-medium border-b border-gray-200 dark:border-gray-800 transition-colors hover:text-primary text-gray-900 dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </Link>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">電話</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">0593-24-1234</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">メール</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">info@aegis-group.jp</p>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full bg-red-600 hover:bg-red-700" onClick={() => setIsMenuOpen(false)}>
              <Link href="/contact" className="w-full">
                お問い合わせフォームへ
              </Link>
            </Button>
            
          </nav>
        </div>
      </div>
    </header>
  )
}

