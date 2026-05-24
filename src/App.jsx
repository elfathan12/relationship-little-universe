import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaArrowDown,
  FaChevronRight,
  FaChevronUp,
  FaHeart,
  FaMoon,
  FaPause,
  FaPlay,
  FaRegMoon,
  FaRegStar,
  FaStar,
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import cover from './assets/images/cover.jpg';
import photo1 from './assets/images/photo-1.jpg';
import photo2 from './assets/images/photo-2.jpg';
import photo3 from './assets/images/photo-3.jpg';
import photo4 from './assets/images/photo-4.jpg';
import photo5 from './assets/images/photo-5.jpg';
import photo6 from './assets/images/photo-6.jpg';

const song = '/music/song.mp3';

const globalStyles = `
  :root {
    color-scheme: dark;
    background: #050816;
    color: #ffffff;
    font-family: Inter, Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
    background: #050816;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
    background:
      radial-gradient(circle at 50% 0%, rgba(109, 93, 242, 0.18), transparent 36rem),
      linear-gradient(180deg, #050816 0%, #0b1026 45%, #050816 100%);
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }

  ::selection {
    background: rgba(248, 187, 208, 0.34);
    color: #ffffff;
  }

  h1,
  h2,
  h3,
  .font-heading {
    font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    letter-spacing: 0;
  }

  .section-shell {
    position: relative;
    width: 100%;
    max-width: 72rem;
    margin-left: auto;
    margin-right: auto;
    padding: 5rem 1rem;
  }

  .section-kicker {
    margin-bottom: 0.75rem;
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.28em;
    color: rgba(199, 210, 254, 0.8);
  }

  .section-title {
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    font-size: 2.25rem;
    line-height: 1.15;
    color: #ffffff;
    text-shadow: 0 0 28px rgba(199, 210, 254, 0.28);
  }

  .section-copy {
    max-width: 42rem;
    margin: 1.25rem auto 0;
    text-align: center;
    font-size: 1rem;
    line-height: 2rem;
    color: rgba(199, 210, 254, 0.78);
  }

  .glass-card {
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.075);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(24px);
  }

  .glow-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(248, 187, 208, 0.4);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1.25rem;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    box-shadow: 0 0 30px rgba(199, 210, 254, 0.18);
    transition: transform 300ms ease, border-color 300ms ease, background 300ms ease, box-shadow 300ms ease;
  }

  .glow-button:hover {
    transform: translateY(-2px);
    border-color: rgba(248, 187, 208, 0.8);
    background: rgba(248, 187, 208, 0.15);
    box-shadow: 0 0 34px rgba(248, 187, 208, 0.28);
  }

  .glow-button:focus,
  .icon-button:focus {
    outline: 2px solid rgba(248, 187, 208, 0.7);
    outline-offset: 3px;
  }

  .icon-button {
    display: inline-flex;
    height: 2.75rem;
    width: 2.75rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    box-shadow: 0 0 30px rgba(199, 210, 254, 0.18);
    transition: transform 300ms ease, border-color 300ms ease, background 300ms ease;
  }

  .icon-button:hover {
    transform: translateY(-2px);
    border-color: rgba(248, 187, 208, 0.6);
    background: rgba(248, 187, 208, 0.15);
  }

  .text-glow {
    text-shadow: 0 0 22px rgba(248, 187, 208, 0.32), 0 0 44px rgba(109, 93, 242, 0.22);
  }

  .moon-core {
    background:
      radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.88) 34%, rgba(199, 210, 254, 0.55) 66%, rgba(109, 93, 242, 0.22) 100%);
    box-shadow:
      0 0 34px rgba(255, 255, 255, 0.6),
      0 0 82px rgba(199, 210, 254, 0.46),
      0 0 138px rgba(109, 93, 242, 0.36);
  }

  .moon-crater {
    position: absolute;
    border-radius: 9999px;
    background: rgba(109, 93, 242, 0.14);
    box-shadow: inset 0 0 16px rgba(11, 16, 38, 0.2);
  }

  .constellation-card {
    position: relative;
    overflow: hidden;
  }

  .constellation-card::before {
    content: '';
    position: absolute;
    inset: 18px;
    opacity: 0;
    background:
      linear-gradient(122deg, transparent 0 18%, rgba(199, 210, 254, 0.7) 18.4%, transparent 19% 48%, rgba(248, 187, 208, 0.72) 48.4%, transparent 49%),
      radial-gradient(circle at 18% 26%, #ffffff 0 2px, transparent 3px),
      radial-gradient(circle at 48% 52%, #ffffff 0 2px, transparent 3px),
      radial-gradient(circle at 78% 35%, #ffffff 0 2px, transparent 3px),
      radial-gradient(circle at 66% 76%, #ffffff 0 2px, transparent 3px);
    filter: drop-shadow(0 0 10px rgba(199, 210, 254, 0.7));
    transition: opacity 320ms ease;
    pointer-events: none;
  }

  .constellation-card:hover::before {
    opacity: 0.55;
  }

  .star-background {
    background:
      radial-gradient(circle at 22% 14%, rgba(248, 187, 208, 0.08), transparent 28rem),
      radial-gradient(circle at 76% 32%, rgba(109, 93, 242, 0.14), transparent 34rem),
      linear-gradient(180deg, #050816 0%, #0b1026 50%, #050816 100%);
  }

  .soft-star {
    position: absolute;
    width: var(--size);
    height: var(--size);
    left: var(--left);
    top: var(--top);
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 0 12px rgba(199, 210, 254, 0.75);
    animation: twinkle var(--duration) ease-in-out var(--delay) infinite;
  }

  .cloud-layer {
    position: absolute;
    left: -20%;
    width: 140%;
    height: 12rem;
    opacity: 0.22;
    filter: blur(20px);
    background:
      radial-gradient(ellipse at 14% 56%, rgba(255, 255, 255, 0.24), transparent 26%),
      radial-gradient(ellipse at 42% 46%, rgba(199, 210, 254, 0.18), transparent 28%),
      radial-gradient(ellipse at 72% 58%, rgba(248, 187, 208, 0.14), transparent 26%);
    animation: driftClouds 34s ease-in-out infinite alternate;
  }

  .shooting-star {
    position: absolute;
    width: 8rem;
    height: 2px;
    border-radius: 9999px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.96), rgba(248, 187, 208, 0.15));
    box-shadow: 0 0 18px rgba(255, 255, 255, 0.55);
    transform-origin: center;
    pointer-events: none;
  }

  .shooting-star::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 7px;
    height: 7px;
    border-radius: 9999px;
    background: #ffffff;
    box-shadow: 0 0 18px #ffffff, 0 0 26px rgba(248, 187, 208, 0.65);
    transform: translateY(-50%);
  }

  .message-field {
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.07), transparent 28%),
      radial-gradient(circle at 18% 28%, rgba(248, 187, 208, 0.1), transparent 16rem),
      radial-gradient(circle at 80% 44%, rgba(109, 93, 242, 0.12), transparent 18rem);
  }

  .message-field::before {
    content: '';
    position: absolute;
    inset: 2.5rem 2rem;
    opacity: 0.38;
    background:
      linear-gradient(138deg, transparent 0 20%, rgba(199, 210, 254, 0.58) 20.2%, transparent 21% 48%, rgba(248, 187, 208, 0.58) 48.2%, transparent 49%),
      linear-gradient(28deg, transparent 0 28%, rgba(199, 210, 254, 0.42) 28.2%, transparent 29% 74%, rgba(248, 187, 208, 0.42) 74.2%, transparent 75%);
    filter: blur(0.1px) drop-shadow(0 0 10px rgba(199, 210, 254, 0.4));
    pointer-events: none;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.35;
      transform: scale(0.72);
    }
    45% {
      opacity: 1;
      transform: scale(1.22);
    }
  }

  @keyframes driftClouds {
    from {
      transform: translate3d(-3%, 0, 0);
    }
    to {
      transform: translate3d(5%, -0.8rem, 0);
    }
  }

  @media (min-width: 640px) {
    .section-shell {
      padding: 6rem 1.5rem;
    }

    .section-title {
      font-size: 3rem;
    }

    .section-copy {
      font-size: 1.125rem;
    }

    .glow-button {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .section-title {
      font-size: 3.75rem;
    }
  }

  @media (min-width: 1024px) {
    .section-shell {
      padding: 7rem 2rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const timelineItems = [
  {
    date: 'February 14, 2024',
    title: 'The Day We Met',
    description: 'A quiet beginning that somehow felt like the sky had saved a little light for us.',
  },
  {
    date: 'March 02, 2024',
    title: 'The First Smile',
    description: 'One smile, and the ordinary world suddenly became softer around the edges.',
  },
  {
    date: 'May 18, 2024',
    title: 'Our Favorite Moment',
    description: 'That little pocket of time where everything felt warm, easy, and beautifully ours.',
  },
  {
    date: 'August 09, 2024',
    title: 'The Little Things',
    description: 'Your laugh, your messages, your way of caring. Tiny stars I keep noticing.',
  },
  {
    date: 'November 21, 2024',
    title: 'The Day I Realized',
    description: 'I was not just happy with you. I was becoming more myself beside you.',
  },
  {
    date: 'Today',
    title: 'Still Choosing You',
    description: 'In every version of the day, my heart keeps finding its way back to you.',
  },
];

const reasons = [
  {
    icon: FaRegStar,
    title: 'Your Smile',
    description: 'It has this gentle way of turning a normal day into something worth remembering.',
  },
  {
    icon: GiSparkles,
    title: 'Your Kindness',
    description: 'You make love feel calm, thoughtful, and safe without ever making it loud.',
  },
  {
    icon: FaRegMoon,
    title: 'Your Voice',
    description: 'A soft place in the middle of every busy sky, familiar even from far away.',
  },
  {
    icon: FaHeart,
    title: 'Your Heart',
    description: 'The way you care is the kind of beauty people spend lifetimes searching for.',
  },
  {
    icon: FaStar,
    title: 'Your Presence',
    description: 'Being near you makes the world feel less heavy and more full of light.',
  },
  {
    icon: GiSparkles,
    title: 'Your Soul',
    description: 'Rare, warm, and quietly radiant. The kind of constellation I would always follow.',
  },
];

const starMessages = [
  {
    id: 1,
    left: '18%',
    top: '34%',
    size: 27,
    message: 'You make ordinary days feel magical.',
  },
  {
    id: 2,
    left: '42%',
    top: '22%',
    size: 22,
    message: 'Your smile feels like home.',
  },
  {
    id: 3,
    left: '72%',
    top: '36%',
    size: 30,
    message: 'I hope you know how loved you are.',
  },
  {
    id: 4,
    left: '30%',
    top: '68%',
    size: 24,
    message: 'You are my calm in every storm.',
  },
  {
    id: 5,
    left: '58%',
    top: '62%',
    size: 26,
    message: 'Somehow, every road in my heart leads to you.',
  },
  {
    id: 6,
    left: '84%',
    top: '72%',
    size: 21,
    message: 'In a sky full of stars, you are the one I keep choosing.',
  },
];

const galleryItems = [
  {
    image: photo1,
    caption: 'The first little spark',
  },
  {
    image: photo2,
    caption: 'A smile I still replay',
  },
  {
    image: photo3,
    caption: 'Our soft favorite hour',
  },
  {
    image: photo4,
    caption: 'Tiny things, big feelings',
  },
  {
    image: photo5,
    caption: 'Still choosing you',
  },
  {
    image: photo6,
    caption: 'A sky we keep building',
  },
];

const stars = Array.from({ length: 95 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: `${1 + ((index * 7) % 3)}px`,
  delay: `${(index % 9) * 0.45}s`,
  duration: `${2.8 + (index % 6) * 0.55}s`,
}));

const targetDate = new Date('2026-12-31T00:00:00+07:00');
const togetherSince = new Date('2024-02-14T00:00:00+07:00');

export default function App() {
  const [entered, setEntered] = useState(() => new URLSearchParams(window.location.search).get('enter') === '1');
  const [autoStartToken, setAutoStartToken] = useState(() => (entered ? Date.now() : 0));

  const enterUniverse = () => {
    setEntered(true);
    setAutoStartToken(Date.now());
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <style>{globalStyles}</style>
      <StarBackground />

      <AnimatePresence mode="wait">
        {!entered && <OpeningScreen key="opening" onEnter={enterUniverse} />}
      </AnimatePresence>

      {entered && (
        <motion.div
          className="relative z-10"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <MusicPlayer autoStartToken={autoStartToken} />
          <main className="pb-32 sm:pb-24">
            <Hero />
            <MemoryTimeline />
            <ConstellationReasons />
            <StarMessages />
            <PhotoGalaxy />
            <MoonLetter />
            <Countdown />
            <Closing />
          </main>
          <ScrollToTop />
        </motion.div>
      )}
    </div>
  );
}

function StarBackground() {
  return (
    <div className="star-background pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="soft-star"
          style={{
            '--left': star.left,
            '--top': star.top,
            '--size': star.size,
            '--delay': star.delay,
            '--duration': star.duration,
          }}
        />
      ))}
      <div className="cloud-layer top-[12%]" />
      <div className="cloud-layer bottom-[18%] opacity-[0.16]" style={{ animationDelay: '-12s' }} />
    </div>
  );
}

function ShootingStar({ top = '18%', left = '88%', delay = 0, repeatDelay = 8 }) {
  return (
    <motion.span
      className="shooting-star"
      style={{ top, left, rotate: '-22deg' }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, -520],
        y: [0, 260],
        opacity: [0, 0.9, 0],
      }}
      transition={{
        duration: 2.6,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: 'easeOut',
      }}
      aria-hidden="true"
    />
  );
}

function OpeningScreen({ onEnter }) {
  return (
    <motion.section
      className="fixed inset-0 z-50 flex min-h-svh items-center justify-center overflow-hidden bg-[#050816] px-5 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <ShootingStar top="18%" left="92%" delay={0.8} repeatDelay={7} />
      <ShootingStar top="58%" left="82%" delay={3.5} repeatDelay={10} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(109,93,242,0.24),transparent_21rem)]" />
      <motion.div
        className="relative z-10 flex w-full max-w-md flex-col items-center"
        initial={{ opacity: 0.82, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <motion.div
          className="moon-core relative mb-8 grid h-36 w-36 place-items-center rounded-full sm:h-44 sm:w-44"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaMoon className="text-5xl text-[#0B1026]/30" />
          <span className="moon-crater left-8 top-9 h-6 w-6" />
          <span className="moon-crater bottom-10 right-9 h-4 w-4" />
          <span className="moon-crater right-14 top-16 h-3 w-3" />
        </motion.div>

        <p className="section-kicker">written for one heart</p>
        <h1 className="mx-auto w-full max-w-[20rem] font-heading text-3xl leading-tight text-white text-glow sm:max-w-md sm:text-5xl">
          A little universe made just for you
        </h1>
        <button className="glow-button mt-9 w-full max-w-[18rem] sm:max-w-xs" type="button" onClick={onEnter}>
          Enter Our Universe
          <FaChevronRight aria-hidden="true" />
        </button>
      </motion.div>
    </motion.section>
  );
}

function Hero() {
  const startJourney = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <ShootingStar top="16%" left="90%" delay={1.4} repeatDelay={8} />
      <ShootingStar top="44%" left="96%" delay={5.2} repeatDelay={11} />

      <motion.div
        className="absolute right-[-3.5rem] top-20 hidden h-64 w-64 rounded-full md:block lg:right-[9%] lg:h-80 lg:w-80"
        animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="moon-core relative h-full w-full rounded-full">
          <span className="moon-crater left-20 top-24 h-10 w-10" />
          <span className="moon-crater bottom-20 right-20 h-7 w-7" />
          <span className="moon-crater right-28 top-16 h-5 w-5" />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0.88, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#C7D2FE]/75">
            <FaStar className="text-[#F8BBD0]" />
            written among the stars
          </div>
          <h1 className="max-w-[21rem] font-heading text-4xl leading-tight text-white text-glow sm:max-w-2xl sm:text-6xl md:text-7xl">
            You Are My Favorite Universe
          </h1>
          <p className="mt-6 max-w-[21rem] text-base leading-8 text-[#C7D2FE]/[0.82] sm:max-w-xl sm:text-lg">
            Every star reminds me of a reason why I am grateful to have you.
          </p>
          <button className="glow-button mt-9" type="button" onClick={startJourney}>
            Start the Journey
            <FaArrowDown aria-hidden="true" />
          </button>
        </motion.div>

        <motion.div
          className="moon-core relative mx-auto mt-14 grid h-28 w-28 place-items-center rounded-full md:hidden"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <FaMoon className="text-4xl text-[#0B1026]/30" />
          <span className="moon-crater left-8 top-7 h-4 w-4" />
          <span className="moon-crater bottom-7 right-8 h-3 w-3" />
        </motion.div>
      </div>
    </section>
  );
}

function MusicPlayer({ autoStartToken }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  const [audioError, setAudioError] = useState(false);
  const [playBlocked, setPlayBlocked] = useState(false);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = window.setInterval(() => {
      setProgress((current) => (current >= 96 ? 8 : current + 1.4));
    }, 550);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!autoStartToken) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setAudioError(false);
        setPlayBlocked(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setPlayBlocked(true);
      });
  }, [autoStartToken]);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setAudioError(false);
      setPlayBlocked(false);
    } catch {
      setIsPlaying(false);
      setPlayBlocked(true);
    }
  };

  return (
    <aside className="fixed bottom-4 left-3 z-30 w-[min(18rem,calc(100vw-6.25rem))] rounded-lg border border-white/[0.12] bg-[#0B1026]/60 p-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:left-5 sm:w-80 sm:p-3">
      <audio
        ref={audioRef}
        src={song}
        loop
        preload="auto"
        onError={() => setAudioError(true)}
        onCanPlay={() => setAudioError(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => {
          setIsPlaying(true);
          setAudioError(false);
          setPlayBlocked(false);
        }}
      />
      <div className="flex items-center gap-3">
        <img
          className="h-12 w-12 shrink-0 rounded-lg object-cover shadow-[0_0_34px_rgba(248,187,208,0.28)] sm:h-14 sm:w-14"
          src={cover}
          alt="Shape Of My Heart cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white sm:text-base">Shape Of My Heart</p>
          <p className="truncate text-xs text-[#C7D2FE]/70 sm:text-sm">
            {audioError ? 'Audio file not found' : playBlocked ? 'Tap to play music' : 'Backstreet Boys'}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.12]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C7D2FE] via-[#F8BBD0] to-[#6D5DF2] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button className="icon-button h-10 w-10 shrink-0" type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
          {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="ml-0.5 text-sm" />}
        </button>
      </div>
    </aside>
  );
}

function MemoryTimeline() {
  return (
    <section id="timeline" className="section-shell">
      <p className="section-kicker">memory path</p>
      <h2 className="section-title">Our Little Timeline</h2>
      <p className="section-copy">
        Every chapter became a small star, and every star quietly led me closer to you.
      </p>

      <div className="relative mt-14 space-y-5 md:space-y-0">
        <div className="pointer-events-none absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-[#C7D2FE]/[0.55] to-transparent shadow-[0_0_20px_rgba(199,210,254,0.65)] md:left-1/2" />
        {timelineItems.map((item, index) => (
          <div key={item.title} className="relative pl-10 md:min-h-56 md:pl-0">
            <span className="absolute left-4 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(248,187,208,0.95)] md:left-1/2" />
            <TimelineCard item={item} index={index} align={index % 2 === 0 ? 'left' : 'right'} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineCard({ item, index, align }) {
  return (
    <motion.article
      className={`glass-card relative p-5 sm:p-6 md:w-[calc(50%-2rem)] ${
        align === 'right' ? 'md:ml-auto' : 'md:mr-auto'
      }`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay: index * 0.04, ease: 'easeOut' }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#F8BBD0]/[0.35] bg-[#F8BBD0]/10 text-[#F8BBD0] shadow-[0_0_34px_rgba(248,187,208,0.28)]">
          <FaStar className="text-sm" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C7D2FE]/70">{item.date}</p>
      </div>
      <h3 className="font-heading text-2xl text-white sm:text-3xl">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#C7D2FE]/[0.76] sm:text-base">{item.description}</p>
    </motion.article>
  );
}

function ConstellationReasons() {
  return (
    <section className="section-shell">
      <p className="section-kicker">constellation notes</p>
      <h2 className="section-title">Reasons Written in the Stars</h2>
      <p className="section-copy">
        Some reasons are too gentle to say loudly, so I let the sky keep them glowing.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <ReasonCard key={reason.title} reason={reason} index={index} />
        ))}
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }) {
  const Icon = reason.icon;

  return (
    <motion.article
      className="constellation-card glass-card min-h-56 p-5 sm:p-6"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
    >
      <div className="relative z-10">
        <span className="mb-8 grid h-11 w-11 place-items-center rounded-lg border border-[#C7D2FE]/25 bg-[#C7D2FE]/10 text-[#C7D2FE] shadow-[0_0_30px_rgba(199,210,254,0.18)]">
          <Icon className="text-lg" />
        </span>
        <h3 className="font-heading text-2xl text-white">{reason.title}</h3>
        <p className="mt-3 text-sm leading-7 text-[#C7D2FE]/75">{reason.description}</p>
      </div>
    </motion.article>
  );
}

function StarMessages() {
  const [selectedStar, setSelectedStar] = useState(null);

  return (
    <section className="section-shell">
      <p className="section-kicker">secret lights</p>
      <h2 className="section-title">Click a Star, Read a Message</h2>
      <p className="section-copy">
        A few little messages are hidden in this sky, waiting for your touch.
      </p>

      <motion.div
        className="message-field glass-card relative mt-12 h-[23rem] overflow-hidden sm:h-[29rem]"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <FaRegMoon className="absolute right-8 top-8 text-5xl text-[#C7D2FE]/20 sm:right-14 sm:top-12 sm:text-7xl" />
        {starMessages.map((star) => (
          <StarMessageButton key={star.id} star={star} onSelect={setSelectedStar} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedStar && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#050816]/[0.72] px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStar(null)}
          >
            <motion.div
              className="glass-card relative w-full max-w-sm p-6 text-center sm:p-8"
              initial={{ opacity: 0, y: 26, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Romantic star message"
            >
              <button
                className="icon-button absolute right-3 top-3 h-9 w-9"
                type="button"
                onClick={() => setSelectedStar(null)}
                aria-label="Close message"
              >
                <IoClose className="text-xl" />
              </button>
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-lg border border-[#F8BBD0]/[0.35] bg-[#F8BBD0]/10 text-[#F8BBD0] shadow-[0_0_34px_rgba(248,187,208,0.28)]">
                <FaHeart />
              </div>
              <p className="font-heading text-3xl leading-snug text-white text-glow">{selectedStar.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StarMessageButton({ star, onSelect }) {
  return (
    <motion.button
      type="button"
      className="absolute z-10 grid h-12 w-12 place-items-center rounded-lg text-[#F8BBD0] outline-none drop-shadow-[0_0_18px_rgba(248,187,208,0.8)] focus:ring-2 focus:ring-[#F8BBD0]/80"
      style={{ left: star.left, top: star.top, translate: '-50% -50%', fontSize: star.size }}
      onClick={() => onSelect(star)}
      whileHover={{ scale: 1.28, rotate: 8 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Open star message"
    >
      <FaStar />
    </motion.button>
  );
}

function PhotoGalaxy() {
  return (
    <section className="section-shell">
      <p className="section-kicker">photo galaxy</p>
      <h2 className="section-title">Our Memory Galaxy</h2>
      <p className="section-copy">
        A gallery of small universes, each one holding a feeling I never want to forget.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <GalleryCard key={item.caption} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({ item, index }) {
  const [broken, setBroken] = useState(false);

  return (
    <motion.figure
      className="glass-card group overflow-hidden p-2"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
        {!broken ? (
          <img
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.08]"
            src={item.image}
            alt={item.caption}
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#171B3A,#6D5DF2_48%,#F8BBD0)]">
            <FaRegStar className="text-4xl text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.7)]" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 border border-[#F8BBD0]/0 transition duration-500 group-hover:border-[#F8BBD0]/[0.55] group-hover:shadow-[0_0_34px_rgba(248,187,208,0.28)]" />
      </div>
      <figcaption className="px-2 py-4 text-center text-sm text-[#C7D2FE]/[0.78]">{item.caption}</figcaption>
    </motion.figure>
  );
}

function MoonLetter() {
  return (
    <section className="section-shell">
      <div className="relative">
        <motion.div
          className="moon-core absolute -top-10 right-6 h-28 w-28 rounded-full opacity-75 blur-[0.5px] sm:right-16 sm:h-40 sm:w-40"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.article
          className="glass-card relative z-10 mx-auto max-w-4xl p-6 sm:p-10 md:p-12"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-7 flex items-center gap-3 text-[#F8BBD0]">
            <FaMoon />
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#C7D2FE]/75">under the moon</p>
          </div>
          <h2 className="font-heading text-4xl leading-tight text-white text-glow sm:text-5xl">
            A Letter Under The Moon
          </h2>
          <p className="mt-8 text-base leading-8 text-[#C7D2FE]/[0.82] sm:text-lg sm:leading-9">
            Maybe the universe is wide, endless, and full of stars. But somehow, among everything that exists, you
            became my favorite place to stay. You are not just someone I love, you are someone who makes life feel
            softer, warmer, and more beautiful.
          </p>
          <p className="mt-8 font-heading text-3xl text-white">Always choosing you.</p>
        </motion.article>
      </div>
    </section>
  );
}

function getCountdown() {
  const now = new Date();
  const distance = Math.max(targetDate.getTime() - now.getTime(), 0);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);
  const togetherDays = Math.max(Math.floor((now.getTime() - togetherSince.getTime()) / (1000 * 60 * 60 * 24)), 0);

  return { days, hours, minutes, seconds, togetherDays };
}

function Countdown() {
  const [time, setTime] = useState(() => getCountdown());
  const counters = useMemo(
    () => [
      { label: 'Days', value: time.days },
      { label: 'Hours', value: time.hours },
      { label: 'Minutes', value: time.minutes },
      { label: 'Seconds', value: time.seconds },
    ],
    [time],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section-shell">
      <p className="section-kicker">forever counter</p>
      <h2 className="section-title">Counting Moments With You</h2>
      <p className="section-copy">Until our next beautiful memory.</p>

      <motion.div
        className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        {counters.map((counter) => (
          <div key={counter.label} className="glass-card p-4 text-center sm:p-6">
            <p className="font-heading text-4xl text-white sm:text-5xl">{String(counter.value).padStart(2, '0')}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C7D2FE]/[0.65]">{counter.label}</p>
          </div>
        ))}
      </motion.div>

      <p className="mx-auto mt-7 max-w-xl text-center text-sm leading-7 text-[#C7D2FE]/70">
        We have been collecting stars for {time.togetherDays.toLocaleString()} days and counting.
      </p>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C7D2FE]/[0.45] to-transparent" />
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        <div className="mb-7 flex justify-center gap-4 text-[#F8BBD0]">
          <FaMoon />
          <FaHeart />
          <FaStar />
        </div>
        <h2 className="font-heading text-4xl leading-tight text-white text-glow sm:text-5xl md:text-6xl">
          In Every Universe, I would Still Find You
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#C7D2FE]/[0.82] sm:text-lg">
          If the stars could speak, they would tell you what my heart already knows: you are loved more than words can
          ever hold.
        </p>
        <button
          className="glow-button mt-9"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to the Stars
          <FaStar aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 540);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="icon-button fixed bottom-4 right-3 z-40 sm:right-5"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          aria-label="Back to top"
        >
          <FaChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
