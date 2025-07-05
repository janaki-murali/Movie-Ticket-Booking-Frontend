import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register-user', form)
      navigate('/login') // Redirect to login page after success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">User Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
