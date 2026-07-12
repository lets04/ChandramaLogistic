import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Services } from './components/sections/Services'
import { StrategicPartner } from './components/sections/StrategicPartner'
import { WhyChooseUs } from './components/sections/WhyChooseUs'
import { Coverage } from './components/sections/Coverage'
import { Process } from './components/sections/Process'
import { Clients } from './components/sections/Clients'
import { Testimonials } from './components/sections/Testimonials'
import { FAQ } from './components/sections/FAQ'
import { Team } from './components/sections/Team'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <StrategicPartner />
        <WhyChooseUs />
        <Coverage />
        <Process />
        <Clients />
        <FAQ />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
