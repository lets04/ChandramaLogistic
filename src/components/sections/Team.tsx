import { Phone } from "lucide-react";
import { teamMembers } from "../../data/content";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { SectionHeading } from "../ui/SectionHeading";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function Team() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })],
  );

  const renderCard = (member: (typeof teamMembers)[number], index: number) => (
    <article
      key={`${member.name}-${member.role}`}
      className={`card-hover overflow-hidden rounded-xl border border-card-border bg-surface transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
      }}
    >
      <div className="h-44 overflow-hidden bg-surface-muted sm:h-52">
        {member.image ? (
          <img
            src={member.image}
            alt={`Foto de ${member.name}`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="gradient-corporate flex h-full w-full items-center justify-center">
            <span className="font-heading text-4xl font-bold text-white">
              {member.initials}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-primary">
          {member.name}
        </h3>

        <p className="mt-2 text-sm font-medium text-accent">{member.role}</p>

        <div className="mt-5 border-t border-card-border pt-4">
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-lg transition hover:text-primary"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-secondary">
              <Phone size={18} />
            </span>

            <span className="text-sm font-medium">{member.phone}</span>
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <section
      id="equipo"
      ref={ref}
      className="section-padding bg-white py-12 sm:py-16 md:py-20"
    >
      <div className="container-page">
        <SectionHeading
          label="Equipo"
          title="Nuestro equipo"
          description="Las personas que coordinan y acompañan cada operación logística."
        />

        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {teamMembers.map((member, index) => (
                <div
                  key={`${member.name}-${member.role}`}
                  className="min-w-[88%] pl-2 pr-4"
                >
                  {renderCard(member, index)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          {teamMembers.map((member, index) => renderCard(member, index))}
        </div>
      </div>
    </section>
  );
}
