import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { FacebookIcon, GithubIcon, InstagramIcon, XIcon } from "@/components/shared/SocialIcons";
import { CONTACT, NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

const socials = [
  { label: "X", href: SOCIAL_LINKS.x, Icon: XIcon },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "GitHub", href: SOCIAL_LINKS.github, Icon: GithubIcon },
];

const contactItems = [
  { Icon: Mail, text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { Icon: Phone, text: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}` },
  { Icon: Clock, text: CONTACT.hours },
];

export function Footer() {
  const publicLinks = NAV_LINKS.filter((link) => !link.private);

  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            {SITE.tagline} A small online library for readers who love to share.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {publicLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {contactItems.map(({ Icon, text, href }) => (
              <li key={text} className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-primary" />
                {href ? (
                  <a href={href} className="transition-colors hover:text-primary">
                    {text}
                  </a>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`BookNook on ${label}`}
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
