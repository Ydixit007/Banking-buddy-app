import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";
import LinkButton from '@/components/LinkButton';

const LandingPage = () => {
  return (
    <div className='max-h-[100dvh] w-full bg-background flex justify-center items-center flex-col gap-4 text-primary relative'>
    <motion.img initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }} src="/logo.png" className="w-40 absolute left-4 top-4 z-50" />
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-gray-50 to-slate-100 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Welcome to the bank <br /> of the future
      </motion.h1>
      <motion.div initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          ease: "easeInOut",
        }} className="links mt-10 flex gap-4">
        <LinkButton href='/login' label='Login' />
        <LinkButton href='/signup' label='Signup' />
      </motion.div>
    </LampContainer>
    </div>
  )
}

export default LandingPage