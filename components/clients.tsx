import { clients } from "@/data/clients";

export function Clients() {
  const loop = [...clients, ...clients];

  return (
    <section aria-labelledby="clients-heading" className="overflow-hidden py-16 md:py-24">
      <h2 id="clients-heading" className="sr-only">
        Clients
      </h2>
      <div className="fade-x w-full max-w-full">
        <ul tabIndex={0} aria-label="Client logos" className="marquee flex w-max items-center gap-x-14 px-5">
          {loop.map((client, index) => (
            <li key={`${client.name}-${index}`} className={index >= clients.length ? "marquee-clone" : ""}>
              <img
                src={client.logo}
                alt={client.alt}
                width={160}
                height={48}
                loading="lazy"
                className="h-12 w-auto max-w-[9rem] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
