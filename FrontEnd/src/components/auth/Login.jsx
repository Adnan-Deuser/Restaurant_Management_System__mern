import { useMutation } from '@tanstack/react-query';
import { React, useState } from 'react'
import { login } from "../../https/index"
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

/* ── tiny shared input wrapper ── */
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

const Login = () => {
  const navigate  = useNavigate()
  const dispatch  = useDispatch()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPw,   setShowPw]   = useState(false)

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    loginMutation.mutate(formData)
  }

  const loginMutation = useMutation({
    mutationFn: reqData => login(reqData),
    onSuccess: res => {
      const { data }                  = res
      const { _id, name, email, phone, role } = data.data
      dispatch(setUser({ _id, name, email, phone, role }))
      enqueueSnackbar(data.message, { variant: 'success' })
      navigate('/')
    },
    onError: error =>
      enqueueSnackbar(error.response.data.message, { variant: 'error' }),
  })

  const isPending = loginMutation.isPending

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <Field label="Email address">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="chef@restro.com"
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
            autoComplete="current-password"
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

      {/* submit */}
      <button
        type="submit"
        disabled={isPending}
        className="relative mt-2 w-full py-3.5 rounded-lg overflow-hidden group
                   text-sm font-semibold tracking-widest uppercase
                   text-[#0f0a00] disabled:opacity-60 disabled:cursor-not-allowed
                   transition-all duration-300"
        style={{ fontFamily: 'Barlow Condensed' }}
      >
        {/* gradient fill */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
                     group-hover:brightness-110 transition-all duration-300"
        />
        {/* shine sweep */}
        <span
          className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                     transition-transform duration-700
                     bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        <span className="relative">
          {isPending ? 'Signing in…' : 'Sign In'}
        </span>
      </button>

    </form>
  )
}

export default Login