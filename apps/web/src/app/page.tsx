import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, Users, BarChart3, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">Football Manager</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Connexion
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
            Inscription
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Gérez votre club comme un Pro
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  La plateforme tout-en-un pour les clubs amateurs. Gestion d'effectif, finances, licences et statistiques avancées.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-white text-black hover:bg-gray-200">
                  <Link href="/register">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="text-white border-white hover:bg-white/10">
                  <Link href="/login">
                    Se connecter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">Gestion d'Effectif</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Suivez vos joueurs, gérez les présences aux entraînements et composez vos équipes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">Back-office Complet</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Simplifiez la gestion administrative : cotisations, licences, et inventaire matériel.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black rounded-full">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">IA & Stats</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Profitez de suggestions de composition et d'analyses de risque de blessure basées sur l'IA.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Football Manager. Tous droits réservés.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Conditions d'utilisation
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Confidentialité
          </Link>
        </nav>
      </footer>
    </div>
  )
}
