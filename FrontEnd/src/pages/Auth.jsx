import React, { useState } from 'react'
import Restaurant from "../assets/images/restaurant-img.jpg"
import logo from "../assets/logo.png"
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className='flex min-h-screen w-full overflow-hidden bg-[#080a0d]'>

      {/* ── Left Panel ── */}
      <div className='hidden lg:flex w-1/2 relative flex-col items-center justify-end overflow-hidden'>
        <img
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.38) saturate(0.8)' }}
          src={Restaurant}
          alt="Restaurant"
        />

        {/* layered overlays */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#080a0d] via-[#080a0d]/40 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-transparent to-[#080a0d]/60' />

        {/* decorative vertical line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />

        {/* floating tag */}
        <div className="absolute top-10 left-10 flex items-center gap-3">
          <div className="w-8 h-px bg-amber-400/60" />
          <span className="text-amber-400/80 text-xs tracking-[0.3em] uppercase font-medium" style={{fontFamily:'Barlow Condensed'}}>
            Est. 2024
          </span>
        </div>

        {/* quote block */}
        <div className="relative z-10 mb-14 ml-10 mr-16 select-none">
          <div className="text-amber-400/20 text-[120px] leading-none font-serif -mb-6 -ml-3">"</div>
          <p className="text-gray-200/90 text-2xl leading-relaxed font-light" style={{fontFamily:'Barlow Condensed', letterSpacing:'0.01em'}}>
            Great restaurants don't just serve food —<br/>
            <span className="text-amber-300">they serve memories.</span>
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-px w-10 bg-amber-400/50" />
            <span className="text-amber-400/70 text-xs tracking-[0.25em] uppercase" style={{fontFamily:'Barlow Condensed'}}>
              Restro Philosophy
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 lg:w-1/2 min-h-screen flex flex-col justify-center px-8 sm:px-14 xl:px-20 py-10 relative overflow-hidden">

        {/* background texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)', transform: 'translate(40%,-40%)' }}
        />

        <div className="relative z-10 max-w-md w-full mx-auto">

          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-xl scale-150" />
              <img
                src={logo}
                alt="Restro"
                className='relative h-14 w-14 rounded-full object-cover'
                style={{ border: '1.5px solid rgba(245,158,11,0.4)' }}
              />
            </div>
            <span
              className='mt-3 text-white/90 tracking-[0.35em] text-sm uppercase'
              style={{fontFamily:'Barlow Condensed', fontWeight: 600}}
            >
              Restro
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2
              className="text-4xl font-bold text-white mb-2"
              style={{fontFamily:'Barlow Condensed', letterSpacing:'0.02em'}}
            >
              {isRegister ? 'New Employee' : 'Welcome Back'}
            </h2>
            <p className="text-amber-400/70 text-sm tracking-widest uppercase" style={{fontFamily:'Barlow Condensed'}}>
              {isRegister ? 'Create your account' : 'Sign in to continue'}
            </p>
            {/* underline accent */}
            <div className="mt-3 mx-auto flex items-center justify-center gap-2">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>
          </div>

          {/* Form */}
          {isRegister
            ? <Register setIsRegister={setIsRegister} />
            : <Login />
          }

          {/* Toggle */}
          <div className="flex items-center justify-center gap-2 mt-7">
            <span className='text-sm text-white/30'>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-amber-400 font-semibold hover:text-amber-300 transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Auth