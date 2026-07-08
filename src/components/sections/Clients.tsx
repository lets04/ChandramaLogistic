import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { clients } from "../../data/content";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { SectionHeading } from "../ui/SectionHeading";

export function Clients() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
      }),
    ],
  );

  return (
    <section
      id="clientes"
      ref={ref}
      className="section-padding bg-white py-12 sm:py-16 md:py-20"
    >
      <div className="container-page">
        <SectionHeading
          label="Confianza"
          title="Nuestros clientes"
          description="Empresas que confían en Chandrama Logistic para mover su carga."
        />

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {clients.map((client) => (
                <div key={client.name} className="min-w-[75%] px-3">
                  <div
                    className={`flex h-24 items-center justify-center transition-all duration-700 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div
          className={`hidden grid-cols-4 gap-6 lg:grid transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {clients.map((client) => (
            <div key={client.name} className="flex h-24 items-center justify-center">
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
