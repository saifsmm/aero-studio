import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, CircleDot, Feather, Gauge, ShieldCheck, Wind } from 'lucide-react'

const assets = {
  hero: '/assets/hero-first-page.png',
  navMark: '/assets/aero-mark-pdf.png',
  riderBack: '/assets/rider-back.jpeg',
  fabric: '/assets/fabric-detail.jpeg',
  helmet: '/assets/helmet-closeup.jpeg',
  mark: '/assets/aero-mark.jpeg',
  whiteJerseySource: '/assets/aero-jersey-white-source.jpg',
  blackKitSource: '/assets/aero-kit-black-source.jpg',
  whiteJersey: '/assets/product-cutout-jersey-white.png',
  blackJersey: '/assets/product-cutout-jersey-black.png',
  whiteBib: '/assets/product-cutout-bib-white.png',
  blackBib: '/assets/product-cutout-bib-black.png',
}

const contactEmail = 'aero.studio@outlook.com'

const storyImages = [
  {
    title: 'White Jersey',
    label: 'race cut / light surface',
    image: assets.whiteJerseySource,
    className: 'md:col-span-7 md:row-span-2',
  },
  {
    title: 'Rider Kit',
    label: 'second-skin silhouette',
    image: assets.riderBack,
    className: 'md:col-span-5',
  },
  {
    title: 'Black Kit',
    label: 'jersey and bib short',
    image: assets.blackKitSource,
    className: 'md:col-span-5',
  },
  {
    title: 'Fabric Detail',
    label: 'mesh / compression',
    image: assets.fabric,
    className: 'md:col-span-4',
  },
  {
    title: 'Cycling Glasses',
    label: 'helmet system',
    image: assets.helmet,
    className: 'md:col-span-4',
  },
  {
    title: 'Bib Short',
    label: 'engineered comfort',
    image: assets.blackBib,
    className: 'md:col-span-4',
  },
]

const performanceDetails = [
  ['aerodynamic fit', Wind],
  ['second skin', CircleDot],
  ['lightweight performance', Feather],
  ['breathable mesh', Activity],
  ['race day ready', Gauge],
  ['engineered comfort', ShieldCheck],
]

const products = [
  {
    title: 'Aero Jersey White',
    image: assets.whiteJersey,
  },
  {
    title: 'Aero Jersey Black',
    image: assets.blackJersey,
  },
  {
    title: 'Aero Bib Short White',
    image: assets.whiteBib,
  },
  {
    title: 'Aero Bib Short Black',
    image: assets.blackBib,
  },
]

const productOptions = [
  'Jersey',
  'Bib Shorts',
  'Full Kit',
  'Socks',
  'Cycling Glasses',
  'General Inquiry',
]

function scrollToHash(id, behavior = 'smooth') {
  const section = document.querySelector(id)
  if (!section) return
  const top = section.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior })
}

function scrollToSection(event, id) {
  event.preventDefault()
  scrollToHash(id)
  window.history.pushState(null, '', id)
}

function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <div className="flex min-h-12 items-center gap-4 px-3 py-4 sm:px-10 lg:px-12">
        <a
          href="#top"
          onClick={(event) => scrollToSection(event, '#top')}
          className="flex shrink-0 items-center gap-3"
          aria-label="Aero Studio home"
        >
          <img src={assets.navMark} alt="" className="h-3.5 w-9 object-contain sm:h-4 sm:w-10" />
          <span className="hidden whitespace-nowrap text-[0.54rem] font-medium uppercase tracking-[0.46em] text-white/90 sm:inline">
            Aero Studio
          </span>
        </a>
        <nav className="ml-auto flex min-w-0 items-center justify-end gap-3 overflow-visible text-[0.47rem] uppercase tracking-[0.18em] text-white/60 min-[390px]:gap-4 min-[390px]:tracking-[0.24em] sm:gap-9 sm:text-[0.5rem] sm:tracking-[0.38em]">
          <a href="#story" onClick={(event) => scrollToSection(event, '#story')} className="transition hover:text-white">
            story
          </a>
          <a href="#performance" onClick={(event) => scrollToSection(event, '#performance')} className="transition hover:text-white">
            performance
          </a>
          <a href="#collection" onClick={(event) => scrollToSection(event, '#collection')} className="transition hover:text-white">
            drop
          </a>
          <a href="#contact" onClick={(event) => scrollToSection(event, '#contact')} className="transition hover:text-white">
            contact
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 130])
  const scale = useTransform(scrollY, [0, 900], [1.02, 1.09])

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <motion.picture style={{ y, scale }} className="absolute inset-0">
        <source srcSet={assets.hero} media="(min-width: 768px)" />
        <img
          src={assets.hero}
          alt="Cinematic black and white cyclist in motion"
          className="h-full w-full object-cover object-center opacity-95"
          loading="eager"
          decoding="async"
        />
      </motion.picture>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.18)_44%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl -translate-y-2 flex-col items-center px-6 text-center sm:-translate-y-5"
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      >
        <h1 className="text-balance text-[2.45rem] font-light uppercase leading-none tracking-[0.16em] text-white sm:text-5xl sm:tracking-[0.34em] lg:text-6xl">
          Aero Studio
        </h1>
        <p className="mt-5 text-[0.64rem] uppercase tracking-[0.56em] text-zinc-300">
          Designed For Speed
        </p>
        <div className="mt-7 grid grid-cols-2 gap-8 text-[0.54rem] uppercase tracking-[0.46em] text-zinc-400">
          <span>25.1237° N</span>
          <span>55.2744° E</span>
        </div>
        <a href="#collection" onClick={(event) => scrollToSection(event, '#collection')} className="mt-8 border border-white/30 px-8 py-3.5 text-[0.56rem] uppercase tracking-[0.36em] text-white transition duration-500 hover:border-white hover:bg-white hover:text-black">
          Coming Soon
        </a>
      </motion.div>
    </section>
  )
}

function BrandStatement() {
  return (
    <section className="relative bg-black px-5 py-32 sm:px-8 sm:py-44">
      <FadeIn className="mx-auto max-w-5xl text-center">
        <p className="mb-8 text-[0.62rem] uppercase tracking-[0.58em] text-zinc-500">
          technical form
        </p>
        <h2 className="text-5xl font-extralight uppercase leading-[0.95] tracking-[0.16em] text-white sm:text-7xl lg:text-8xl">
          Ride In Form.
        </h2>
        <p className="mx-auto mt-10 max-w-2xl text-sm font-light leading-8 tracking-[0.08em] text-zinc-400 sm:text-base">
          technical cycling apparel designed for aerodynamic performance, second-skin
          comfort, and race-day precision.
        </p>
      </FadeIn>
    </section>
  )
}

function StoryCard({ item, index }) {
  return (
    <motion.article
      className={`group relative min-h-[420px] overflow-hidden border border-white/10 bg-zinc-950 ${item.className}`}
      initial={{ opacity: 0, clipPath: 'inset(18% 0 18% 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1.01 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-7">
        <h3 className="text-xl font-light uppercase tracking-[0.22em] text-white">{item.title}</h3>
        <p className="max-w-36 text-right text-[0.58rem] uppercase leading-5 tracking-[0.32em] text-zinc-400">
          {item.label}
        </p>
      </div>
    </motion.article>
  )
}

function VisualStory() {
  return (
    <section id="story" className="bg-black px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.42fr_0.58fr]">
        <FadeIn className="lg:sticky lg:top-28 lg:h-fit">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.52em] text-zinc-500">
              visual story
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extralight uppercase leading-tight tracking-[0.16em] text-white sm:text-6xl">
              Apparel built in shadow.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-7 tracking-[0.08em] text-zinc-500">
            jerseys, bib shorts, glasses, fabric texture, close stitching, rider fit.
          </p>
        </FadeIn>

        <div className="grid auto-rows-[420px] grid-cols-1 gap-3 md:grid-cols-12">
          {storyImages.map((item, index) => (
            <StoryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PerformanceDetails() {
  return (
    <section id="performance" className="bg-[#050505] px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="text-[0.62rem] uppercase tracking-[0.52em] text-zinc-500">
            performance details
          </p>
          <h2 className="mt-5 text-4xl font-extralight uppercase leading-tight tracking-[0.16em] text-white sm:text-6xl">
            Built for silent watts.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {performanceDetails.map(([label, Icon]) => (
            <FadeIn key={label} className="group border-b border-white/10 p-8 sm:min-h-56">
              <Icon className="mb-12 h-5 w-5 stroke-[1] text-zinc-500 transition group-hover:text-white" />
              <h3 className="text-lg font-light uppercase tracking-[0.24em] text-white">
                {label}
              </h3>
              <div className="mt-8 h-px w-12 bg-white/20 transition group-hover:w-24 group-hover:bg-white" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function CollectionPreview() {
  return (
    <section id="collection" className="bg-black px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 text-center">
          <p className="text-[0.62rem] uppercase tracking-[0.52em] text-zinc-500">
            collection preview
          </p>
          <h2 className="mt-5 text-4xl font-extralight uppercase tracking-[0.16em] text-white sm:text-6xl">
            First drop.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <motion.article
              key={product.title}
              className="group overflow-hidden border border-white/10 bg-[#050505]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.92)_68%)] p-5">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.025]"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="border-t border-white/10 p-6">
                <h3 className="min-h-10 text-sm font-light uppercase leading-6 tracking-[0.28em] text-white">
                  {product.title}
                </h3>
                <p className="mt-5 text-[0.56rem] uppercase tracking-[0.28em] text-zinc-500">
                  Coming Soon
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 text-center">
      <FadeIn className="relative z-10">
        <h2 className="text-4xl font-extralight uppercase tracking-[0.32em] text-white sm:text-6xl lg:text-7xl">
          Designed For Speed
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-8 text-[0.68rem] uppercase tracking-[0.42em] text-zinc-400">
          <span>25.1237° N</span>
          <span>55.2744° E</span>
        </div>
      </FadeIn>
    </section>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [interest, setInterest] = useState('Full Kit')

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-[#050505] px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <FadeIn>
          <p className="text-[0.62rem] uppercase tracking-[0.52em] text-zinc-500">
            contact us
          </p>
          <h2 className="mt-6 text-4xl font-extralight uppercase leading-tight tracking-[0.16em] text-white sm:text-6xl">
            Pre order.
          </h2>
          <p className="mt-8 max-w-md text-sm font-light leading-8 tracking-[0.08em] text-zinc-400">
            Leave your details and Aero Studio will contact you soon. For direct email,
            use {contactEmail}.
          </p>
        </FadeIn>

        <FadeIn>
          {submitted ? (
            <div className="border border-white/10 bg-black p-8 sm:p-10">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-zinc-500">
                request received
              </p>
              <h3 className="mt-5 text-3xl font-extralight uppercase tracking-[0.14em] text-white">
                Thank you, we will contact you soon.
              </h3>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-10 border border-white/25 px-6 py-4 text-[0.62rem] uppercase tracking-[0.34em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="name" name="name" required />
                <FormField label="email" name="email" type="email" required />
              </div>
              <FormField label="phone" name="phone" type="tel" required />
              <label className="grid gap-3">
                <span className="text-[0.58rem] uppercase tracking-[0.36em] text-zinc-500">
                  product interest
                </span>
                <select
                  value={interest}
                  onChange={(event) => setInterest(event.target.value)}
                  className="h-14 border border-white/10 bg-black px-4 text-sm font-light uppercase tracking-[0.18em] text-white outline-none transition focus:border-white/45"
                >
                  {productOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-3">
                <span className="text-[0.58rem] uppercase tracking-[0.36em] text-zinc-500">
                  message
                </span>
                <textarea
                  name="message"
                  rows="6"
                  required
                  className="resize-none border border-white/10 bg-black px-4 py-4 text-sm font-light tracking-[0.08em] text-white outline-none transition placeholder:text-zinc-700 focus:border-white/45"
                  placeholder="Tell us what you are interested in."
                />
              </label>
              <button
                type="submit"
                className="mt-4 border border-white/30 px-8 py-4 text-[0.62rem] uppercase tracking-[0.36em] text-white transition duration-500 hover:border-white hover:bg-white hover:text-black"
              >
                Submit
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}

function FormField({ label, name, type = 'text', required = false }) {
  return (
    <label className="grid gap-3">
      <span className="text-[0.58rem] uppercase tracking-[0.36em] text-zinc-500">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-14 border border-white/10 bg-black px-4 text-sm font-light tracking-[0.08em] text-white outline-none transition placeholder:text-zinc-700 focus:border-white/45"
      />
    </label>
  )
}

function FinalCta() {
  return (
    <section id="drop" className="bg-black px-5 pt-28 sm:px-8 lg:px-12">
      <FadeIn className="mx-auto flex min-h-[68vh] max-w-6xl flex-col items-center justify-center text-center">
        <img src={assets.mark} alt="" className="mb-10 h-14 w-14 object-cover invert" />
        <h2 className="text-5xl font-extralight uppercase leading-none tracking-[0.16em] text-white sm:text-7xl lg:text-8xl">
          Coming Soon
        </h2>
        <p className="mt-8 text-sm font-light uppercase tracking-[0.28em] text-zinc-500">
          Technical cycling apparel from Dubai.
        </p>
        <a href="#contact" onClick={(event) => scrollToSection(event, '#contact')} className="mt-12 border border-white/30 px-8 py-4 text-[0.62rem] uppercase tracking-[0.36em] text-white transition duration-500 hover:border-white hover:bg-white hover:text-black">
          Pre Order
        </a>
      </FadeIn>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-black px-5 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 py-7 text-[0.6rem] uppercase tracking-[0.34em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <a href="https://www.instagram.com/aerostudio.ae/" target="_blank" rel="noreferrer" className="transition hover:text-white">
          Instagram
        </a>
        <a href={`mailto:${contactEmail}`} className="transition hover:text-white">
          {contactEmail}
        </a>
        <span>aerostudio.ae</span>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    function handleHashChange() {
      if (window.location.hash) {
        scrollToHash(window.location.hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    if (window.location.hash) {
      window.requestAnimationFrame(() => scrollToHash(window.location.hash, 'auto'))
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <Hero />
      <BrandStatement />
      <VisualStory />
      <PerformanceDetails />
      <CollectionPreview />
      <QuoteSection />
      <FinalCta />
      <ContactForm />
      <Footer />
      <div className="pointer-events-none fixed inset-0 z-50 grain opacity-[0.075]" />
    </main>
  )
}
