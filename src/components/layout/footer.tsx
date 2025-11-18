import { Logo } from "@/components/logo";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground">Simplifying your digital life.</p>
            <p className="text-sm text-muted-foreground">Contact: <a href="mailto:onekit69@gmail.com" className="hover:text-primary">onekit69@gmail.com</a></p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-2">
                <li><Link href="/tools/image-resizer" className="text-muted-foreground hover:text-primary">Image Tools</Link></li>
                <li><Link href="/tools/bmi-calculator" className="text-muted-foreground hover:text-primary">Calculators</Link></li>
                <li><Link href="/tools/word-counter" className="text-muted-foreground hover:text-primary">Text Tools</Link></li>
                <li><Link href="/tools/json-formatter" className="text-muted-foreground hover:text-primary">Developer Tools</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold mb-2">About</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} OneKit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
