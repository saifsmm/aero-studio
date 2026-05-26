import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Activity, CircleDot, Feather, Gauge, ShieldCheck, Wind } from 'lucide-react'

const assets = {
  hero: '/assets/hero-cyclist-editorial.png',
  navMark: '/assets/aero-mark-pdf.png',
  riderBack: '/assets/rider-back.jpeg',
  fabric: '/assets/fabric-detail.jpeg',
  helmet: '/assets/helmet-closeup.jpeg',
  mark: '/assets/aero-mark.jpeg',
  whiteKit: '/assets/white-kit-transparent.png',
  editorialWhiteKit: '/assets/editorial-white-kit.png',
  editorialBlackKit: '/assets/editorial-black-kit.png',
  detailBlackZipperWide: '/assets/detail-black-zipper-wide.png',
  detailBlackSleeve: '/assets/detail-black-sleeve.png',
  detailBlackZipperClose: '/assets/detail-black-zipper-close.png',
  detailWhiteKitClose: '/assets/detail-white-kit-close.png',
  detailChamois: '/assets/detail-chamois.png',
  whiteJerseySource: '/assets/aero-jersey-white-source.jpg',
  blackKitSource: '/assets/aero-kit-black-source.jpg',
  whiteJersey: '/assets/product-cutout-jersey-white.png',
  blackJersey: '/assets/product-cutout-jersey-black.png',
  whiteBib: '/assets/product-cutout-bib-white.png',
  blackBib: '/assets/product-cutout-bib-black.png',
}

const contactEmail = 'aero.studio@outlook.com'

const storySelectors = [
  {
    number: '01',
    label: 'White Kit',
    image: assets.editorialWhiteKit,
    alt: 'Aero Studio white jersey and bib short',
    imageClassName: 'object-contain',
  },
  {
    number: '02',
    label: 'Black Kit',
    image: assets.editorialBlackKit,
    alt: 'Aero Studio black jersey and bib short',
    imageClassName: 'object-contain',
  },
  {
    number: '03',
    label: 'Bib Short',
    image: assets.detailChamois,
    alt: 'Aero Studio bib short chamois detail',
    imageClassName: 'object-cover',
  },
  {
    number: '04',
    label: 'Details',
    image: assets.detailBlackZipperClose,
    alt: 'Aero Studio black kit zipper and fabric detail',
    imageClassName: 'object-cover',
  },
]

const storyCards = [
  {
    title: 'Rider Silhouette',
    image: assets.riderBack,
  },
  {
    title: 'Black Kit',
    image: assets.editorialBlackKit,
  },
  {
    title: 'Fabric Detail',
    image: assets.detailBlackSleeve,
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

function VisualStory() {
  const [activeStory, setActiveStory] = useState(0)
  const { scrollYProgress } = useScroll()
  const productY = useTransform(scrollYProgress, [0.15, 0.45], [45, -45])
  const productRotate = useTransform(scrollYProgress, [0.15, 0.45], [-1.2, 1.2])
  const activeScene = storySelectors[activeStory]

  return (
    <section id="story" className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_44%,rgba(255,255,255,0.13),rgba(255,255,255,0.035)_30%,rgba(0,0,0,0)_62%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(0,0,0,0)_24%,rgba(255,255,255,0.025)_74%,rgba(0,0,0,0))] opacity-70" />

      <div className="relative mx-auto max-w-[92rem]">
        <div className="grid min-h-[82vh] items-center gap-14 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.div
            className="relative z-10 max-w-xl"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-10 flex items-center gap-5">
              <p className="text-[0.62rem] uppercase tracking-[0.52em] text-zinc-500">
                visual story
              </p>
              <span className="hidden h-px w-16 bg-white/20 sm:block" />
            </div>
            <h2 className="text-[3.6rem] font-extralight uppercase leading-[0.98] tracking-[0.16em] text-white sm:text-7xl lg:text-[5.3rem]">
              Apparel
              <br />
              Built In
              <br />
              Shadow.
            </h2>
            <p className="mt-10 max-w-sm whitespace-pre-line text-sm font-light leading-8 tracking-[0.08em] text-zinc-400 sm:text-base">
              {`Engineered for speed.
Designed to disappear.

Every stitch, every panel, every detail built to perform so you can focus on what matters.`}
            </p>
            <a
              href="#collection"
              onClick={(event) => scrollToSection(event, '#collection')}
              className="group mt-10 inline-flex items-center gap-6 text-[0.62rem] uppercase tracking-[0.34em] text-white"
            >
              <span>Explore Collection</span>
              <span className="transition duration-500 group-hover:translate-x-2">-&gt;</span>
            </a>
          </motion.div>

          <div className="relative min-h-[34rem] lg:min-h-[44rem]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0.035)_36%,rgba(0,0,0,0)_68%)] blur-sm" />
            <motion.div
              className="relative z-10"
              style={{ y: productY, rotate: productRotate }}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeScene.label}
                  src={activeScene.image}
                  alt={activeScene.alt}
                  className={`aero-float mx-auto h-[34rem] w-full drop-shadow-[0_4rem_4rem_rgba(0,0,0,0.88)] sm:h-[42rem] lg:h-[48rem] ${activeScene.imageClassName}`}
                  initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>
            </motion.div>
            <div className="absolute bottom-8 left-1/2 h-10 w-64 -translate-x-1/2 rounded-full bg-black blur-2xl" />
          </div>
        </div>

        <motion.div
          className="relative z-10 mt-8 grid gap-6 border-t border-white/10 pt-7 lg:grid-cols-[1.1fr_0.9fr]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-0 sm:grid-cols-4">
            {storySelectors.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveStory(index)}
                aria-pressed={activeStory === index}
                className="group border-white/10 py-4 text-left outline-none transition sm:border-r sm:pr-6"
              >
                <span className={`block text-[0.56rem] uppercase tracking-[0.32em] transition ${activeStory === index ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {item.number}
                </span>
                <span className={`mt-4 block text-[0.64rem] uppercase tracking-[0.34em] transition group-hover:text-white ${activeStory === index ? 'text-white' : 'text-zinc-300'}`}>
                  {item.label}
                </span>
                <span className={`mt-5 block h-px bg-white transition-all duration-500 ${activeStory === index ? 'w-20' : 'w-0 group-hover:w-16'}`} />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {storyCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="group relative h-36 overflow-hidden bg-zinc-950 sm:h-40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-4 left-4 text-[0.55rem] uppercase tracking-[0.28em] text-white/70">
                  {card.title}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
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
