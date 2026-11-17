import Image from "next/image";
import { services } from "@/data/services";
import { contact, nav, socials } from "@/data/site";
import { SocialIcon } from "./social-icons";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-800 via-primary to-primary-600 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/logo-white.png" alt="WB DigiTech" width={300} height={79} className="h-11 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white">
            A digital growth studio in Bur Dubai for branding, marketing, and websites.
          </p>
          <ul className="mt-5 flex gap-2">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon name={social.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold tracking-wide">Navigate</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center text-sm text-white hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-wide">Services</h2>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={`#service-${service.id}`}
                  className="inline-flex min-h-11 items-center text-sm text-white hover:underline"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-white">
            <li>
              <a href={contact.landlineHref} className="inline-flex min-h-11 items-center hover:underline">
                {contact.landline}
              </a>
            </li>
            <li>
              <a href={contact.whatsapp} className="inline-flex min-h-11 items-center hover:underline">
                WhatsApp {contact.mobile}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center hover:underline">
                {contact.email}
              </a>
            </li>
            <li className="leading-6">{contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/25">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-white sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 WB DigiTech</p>
          <div className="flex gap-4">
            <a href={contact.privacy} className="inline-flex min-h-11 items-center hover:underline">
              Privacy Policy
            </a>
            <a href={contact.terms} className="inline-flex min-h-11 items-center hover:underline">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
