import React, { useState } from 'react'
import { register } from '../../https'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'

const ROLES = ['Admin', 'Cashier', 'Waiter']

/* ── shared field wrapper ── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label
      className="text-xs tracking-[0.18em] uppercase text-white/40"
      style={{ fontFamily: 'Barlow Condensed' }}
    >
      {label}
    </label>
    {children}
  </div>
)

const inputCls = `
  w-full bg-transparent text-white/90 text-sm placeholder-white/20
  border-b border-white/10 py-3
  focus:outline-none focus:border-amber-400/60
  transition-colors duration-200
`.trim()

const Register = ({ setIsRegister }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', role: ''
  })
  const [showPw, setShowPw] = useState(false)

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleRoleSelection = role =>
    setFormData({ ...formData, role })

  const handleSubmit = e => {
    e.preventDefault()
    registerMutation.mutate(formData)
  }

  const registerMutation = useMutation({
    mutationFn: reqData => register(reqData),
    onSuccess: res => {
      enqueueSnackbar(res.data.message, { variant: 'success' })
      setFormData({ name: '', email: '', phone: '', password: '', role: '' })
      setTimeout(() => setIsRegister(false), 1500)
    },
    onError: error =>
      enqueueSnackbar(error.response.data.message, { variant: 'error' }),
  })

  const isPending = registerMutation.isPending

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* two-col row: name + phone */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Full Name">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputCls}
            required
          />
        </Field>
        <Field label="Phone">
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className={inputCls}
            required
          />
        </Field>
      </div>

      <Field label="Email Address">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="employee@restro.com"
          className={inputCls}
          required
        />
      </Field>

      <Field label="Password">
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={inputCls + ' pr-10'}
            required
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPw(p => !p)}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-150 text-xs tracking-widest"
            style={{ fontFamily: 'Barlow Condensed' }}
          >
            {showPw ? 'HIDE' : 'SHOW'}
          </button>
        </div>
      </Field>

      {/* Role selector */}
      <Field label="Role">
        <div className="flex gap-2 pt-1">
          {ROLES.map(role => {
            const active = formData.role === role
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`
                  flex-1 py-2.5 rounded-md text-xs tracking-[0.15em] uppercase
                  border transition-all duration-200 font-medium
                  ${active
                    ? 'bg-amber-400/15 border-amber-400/60 text-amber-300'
                    : 'bg-transparent border-white/10 text-white/35 hover:border-white/25 hover:text-white/60'
                  }
                `}
                style={{ fontFamily: 'Barlow Condensed' }}
              >
                {role}
              </button>
            )
          })}
        </div>
      </Field>

      {/* submit */}
      <button
        type="submit"
        disabled={isPending}
        className="relative mt-1 w-full py-3.5 rounded-lg overflow-hidden group
                   text-sm font-semibold tracking-widest uppercase
                   text-[#0f0a00] disabled:opacity-60 disabled:cursor-not-allowed
                   transition-all duration-300"
        style={{ fontFamily: 'Barlow Condensed' }}
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
                     group-hover:brightness-110 transition-all duration-300"
        />
        <span
          className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                     transition-transform duration-700
                     bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        <span className="relative">
          {isPending ? 'Creating account…' : 'Create Account'}
        </span>
      </button>

    </form>
  )
}

export default Register