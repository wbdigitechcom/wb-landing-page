import Image from "next/image";
import { contact, nav, services, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer
      id="about"
      className="scroll-mt-20 bg-gradient-to-br from-primary-800 via-primary to-primary-600 text-white"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-white.png"
            alt="WB DigiTech"
            width={300}
            height={79}
            className="h-11 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/80">
            WB DigiTech is a digital growth studio in Dubai. Branding, marketing,
            and websites for ambitious businesses across the UAE.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  className="text-sm text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold tracking-wide text-white">Navigate</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">Services</h2>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href={contact.landlineHref} className="transition-colors hover:text-white">
                {contact.landline}
              </a>
            </li>
            <li>
              <a href={contact.whatsapp} className="transition-colors hover:text-white">
                WhatsApp {contact.mobile}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="leading-6 text-white/80">{contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 WB DigiTech</p>
          <div className="flex gap-4">
            <a href={contact.privacy} className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href={contact.terms} className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
