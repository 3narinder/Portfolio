import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { contact, personal, social } from "@/data/content";

const links = [
  { name: "GitHub", href: social.github, icon: Github },
  { name: "LinkedIn", href: social.linkedin, icon: Linkedin },
  { name: "Email", href: `mailto:${contact.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="shell grid items-center gap-6 text-sm text-muted-foreground sm:grid-cols-[1fr_auto_1fr]">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} {personal.name}
        </p>
        <ul className="flex items-center justify-center gap-2">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target={link.name === "Email" ? undefined : "_blank"}
                rel={link.name === "Email" ? undefined : "noopener noreferrer"}
                className="icon-btn size-10 hover:text-primary"
                aria-label={link.name}
              >
                <link.icon size={16} />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#top"
          className="group inline-flex items-center justify-center gap-2 justify-self-center hover:text-foreground sm:justify-self-end"
        >
          Back to top
          <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
