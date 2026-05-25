import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, CircleDot, Feather, Gauge, ShieldCheck, Wind } from 'lucide-react'

const assets = {
  hero: '/assets/cyclist-motion.jpeg',
  frame: '/assets/bike-frame-closeup.jpeg',
  desertSun: '/assets/desert-sun.jpeg',
  riderBack: '/assets/rider-back.jpeg',
  fabric: '/assets/fabric-detail.jpeg',
  road: '/assets/desert-road.jpeg',
  mark: '/assets/aero-mark.jpeg',
  helmet: '/assets/helmet-closeup.jpeg',
  speed: '/assets/designed-for-speed.jpeg',
}

const storyImages = [
  {
    title: 'Desert Roads',
    label: '25.1237 N / 55.2744 E',
    image: assets.road,
    className: 'md:col-span-7 md:row-span-2',
  },
  {
    title: 'Black Kits',
    label: 'Race silhouette',
    image: assets.riderBack,
    className: 'md:col-span-5',
  },
  {
    title: 'Frame Precision',
    label: 'Aero profile',
    image: assets.frame,
    className: 'md:col-span-5',
  },
  {
    title: 'Fabric Detail',
    label: 'Second skin texture',
    image: assets.fabric,
    className: 'md:col-span-4',
  },
  {
    title: 'Helmet System',
    label: 'Quiet speed',
    image: assets.helmet,
    className: 'md:col-span-4',
  },
  {
    title: 'Motion Study',
    label: 'Blur / form / velocity',
    image: assets.hero,
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
    title: 'jersey',
    image: assets.riderBack,
  },
  {
    title: 'bib short',
    image: assets.fabric,
  },
  {
    title: 'full race kit',
    image: assets.hero,
  },
]

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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" aria-label="Aero Studio home">
          <img src={assets.mark} alt="" className="h-7 w-7 object-cover invert" />
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white">
            Aero Studio
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-[0.58rem] uppercase tracking-[0.34em] text-zinc-400 sm:flex">
          <a href="#story" className="transition hover:text-white">
            story
          </a>
          <a href="#performance" className="transition hover:text-white">
            performance
          </a>
          <a href="#drop" className="transition hover:text-white">
            drop
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 150])
  const scale = useTransform(scrollY, [0, 900], [1.06, 1.16])

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <motion.img
        src={assets.hero}
        alt="Black and white cyclist in motion"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        style={{ y, scale }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_42%,rgba(0,0,0,0.95)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      >
        <h1 className="text-balance text-[2.55rem] font-light uppercase leading-none tracking-[0.13em] text-white sm:text-7xl sm:tracking-[0.22em] lg:text-8xl">
          Aero Studio
        </h1>
        <p className="mt-7 text-[0.68rem] uppercase tracking-[0.56em] text-zinc-300">
          Designed For Speed
        </p>
        <div className="mt-10 grid grid-cols-2 gap-7 text-[0.62rem] uppercase tracking-[0.46em] text-zinc-400">
          <span>25.1237° N</span>
          <span>55.2744° E</span>
        </div>
        <a href="#drop" className="mt-12 border border-white/35 px-7 py-4 text-[0.62rem] uppercase tracking-[0.36em] text-white transition duration-500 hover:border-white hover:bg-white hover:text-black">
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
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1.02 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-7">
        <h3 className="text-xl font-light uppercase tracking-[0.22em] text-white">{item.title}</h3>
        <p className="max-w-32 text-right text-[0.58rem] uppercase leading-5 tracking-[0.32em] text-zinc-400">
          {item.label}
        </p>
      </div>
    </motion.article>
  )
}

function VisualStory() {
  return (
    <section id="story" className="bg-black px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.52em] text-zinc-500">
              visual story
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extralight uppercase leading-tight tracking-[0.16em] text-white sm:text-6xl">
              Speed rendered in shadow.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-7 tracking-[0.08em] text-zinc-500">
            desert roads, black kits, motion blur, carbon surfaces, fabric grain.
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
    <section className="bg-black px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 text-center">
          <p className="text-[0.62rem] uppercase tracking-[0.52em] text-zinc-500">
            collection preview
          </p>
          <h2 className="mt-5 text-4xl font-extralight uppercase tracking-[0.16em] text-white sm:text-6xl">
            First drop.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((product) => (
            <motion.article
              key={product.title}
              className="group overflow-hidden border border-white/10 bg-zinc-950"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 p-6">
                <h3 className="text-sm font-light uppercase tracking-[0.32em] text-white">
                  {product.title}
                </h3>
                <p className="text-[0.56rem] uppercase tracking-[0.28em] text-zinc-500">
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
      <img
        src={assets.speed}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/55" />
      <FadeIn className="relative z-10">
        <h2 className="text-4xl font-extralight uppercase tracking-[0.32em] text-white sm:text-6xl lg:text-7xl">
          Designed For Speed
        </h2>
        <p className="mt-8 text-[0.68rem] uppercase tracking-[0.38em] text-zinc-400">
          performance cycling apparel from dubai.
        </p>
      </FadeIn>
    </section>
  )
}

function FinalCta() {
  return (
    <section id="drop" className="bg-black px-5 pb-8 pt-28 sm:px-8 lg:px-12">
      <FadeIn className="mx-auto flex min-h-[68vh] max-w-6xl flex-col items-center justify-center text-center">
        <img src={assets.mark} alt="" className="mb-10 h-14 w-14 object-cover invert" />
        <h2 className="text-5xl font-extralight uppercase leading-none tracking-[0.16em] text-white sm:text-7xl lg:text-8xl">
          Race Day Ready
        </h2>
        <p className="mt-8 text-sm font-light uppercase tracking-[0.32em] text-zinc-500">
          technical cycling apparel.
        </p>
        <a href="mailto:drop@aerostudio.ae" className="mt-12 border border-white/30 px-8 py-4 text-[0.62rem] uppercase tracking-[0.36em] text-white transition duration-500 hover:border-white hover:bg-white hover:text-black">
          Join The Drop
        </a>
      </FadeIn>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 py-7 text-[0.6rem] uppercase tracking-[0.34em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <a href="https://www.instagram.com/aerostudio.ae/" target="_blank" rel="noreferrer" className="transition hover:text-white">
          Instagram
        </a>
        <span>aerostudio.ae</span>
        <span>Aero Studio</span>
      </footer>
    </section>
  )
}

export default function App() {
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
      <div className="pointer-events-none fixed inset-0 z-50 grain opacity-[0.075]" />
    </main>
  )
}
