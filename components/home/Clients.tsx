import { clients, clientSummary } from "@/content/clients";
import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";

const groups = Array.from(new Set(clients.map((client) => client.product))).map((product) => ({
  product,
  entries: clients.filter((client) => client.product === product),
}));

export function Clients() {
  return (
    <Slide tone="light">
      <Container>
        <Reveal className="mx-auto mb-14 grid max-w-4xl justify-items-center gap-5 text-center md:mb-20">
          <Eyebrow>{home.clients.eyebrow}</Eyebrow>
          <Headline level={2}>{home.clients.headline}</Headline>
          <p className="text-[var(--ink-2)]">{clientSummary.headline}</p>
        </Reveal>
        <Reveal stagger={0.06} className="grid gap-12 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group.product} className="grid content-start gap-5 border-t border-[var(--line)] pt-6">
              <Headline level={3}>{group.product}</Headline>
              <ul className="grid gap-5">
                {group.entries.map((client) => (
                  <li key={client.name}>
                    <p className="font-semibold">{client.name}</p>
                    <p className="text-small text-[var(--ink-2)]">{client.type} · {client.city}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Reveal>
      </Container>
    </Slide>
  );
}
