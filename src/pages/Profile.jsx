import { useEffect, useState } from 'react'
import {
  FaBuilding,
  FaCheck,
  FaMapMarkerAlt,
  FaUser,
} from 'react-icons/fa'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

const defaultProfile = {
  user_id: null,
  first_name: '',
  company_name: '',
  company_description: '',
}

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const API_URL = "https://revnue-mvp.onrender.com"
    const getUserProfile = async () => {
      const userId = localStorage.getItem('user_id')

      if (!userId) {
        setError('No logged-in user was found.')
        setLoading(false)
        return
      }

      try {
        setError('')

        const response = await axios.get(
          `${API_URL}/users/profile/${userId}`
        )

        console.log('Profile returned by API:', response.data)

        setProfile({
          user_id: response.data.user_id,
          first_name: response.data.first_name ?? '',
          company_name: response.data.company_name ?? '',
          company_description:
            response.data.company_description ?? '',
        })
      } catch (error) {
        console.error('Failed to load profile:', error)
        console.error('Status:', error.response?.status)
        console.error('Response:', error.response?.data)

        setError(
          error.response?.data?.msg ||
            'We could not load your profile.'
        )
      } finally {
        setLoading(false)
      }
    }

    getUserProfile()
  }, [])

  const update = (event) => {
    const { name, value } = event.target

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }))

    setSaved(false)
    setError('')
  }

  const saveProfile = async (event) => {
    event.preventDefault()

    const userId = localStorage.getItem('user_id')
const API_URL = "https://revnue-mvp.onrender.com"
    if (!userId) {
      setError('No logged-in user was found.')
      return
    }

    if (!profile.first_name.trim()) {
      setError('First name is required.')
      return
    }

    try {
      setSaving(true)
      setSaved(false)
      setError('')

      const response = await axios.patch(
        `${API_URL}/users/profile/${userId}`,
        {
          first_name: profile.first_name,
          company_description: profile.company_description,
        }
      )

      console.log('Profile update response:', response.data)

      setProfile((currentProfile) => ({
        ...currentProfile,
        ...response.data.profile,
      }))

      setSaved(true)

      window.setTimeout(() => {
        setSaved(false)
      }, 2600)
    } catch (error) {
      console.error('Failed to update profile:', error)
      console.error('Status:', error.response?.status)
      console.error('Response:', error.response?.data)

      setError(
        error.response?.data?.msg ||
          'We could not update your profile.'
      )
    } finally {
      setSaving(false)
    }
  }

  const initials =
    profile.first_name
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name[0])
      .join('')
      .toUpperCase() || 'U'

  if (loading) {
    return (
      <div className="app-page">
        <Sidebar />

        <main className="main-content">
          <p>Loading profile...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="app-page">
      <Sidebar />

      <main className="main-content">
        <header className="header page-header">
          <div>
            <span className="eyebrow">Account</span>
            <h1>Profile</h1>
            <p>Manage your personal and business information.</p>
          </div>

          <span className="profile-status">
            <i></i> Profile active
          </span>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="profile-layout"
          onSubmit={saveProfile}
        >
          <aside className="profile-summary">
            <div className="profile-avatar">
              {initials}
            </div>

            <h2>{profile.first_name || 'Your name'}</h2>

            <p>
              {profile.company_description ||
                'Add a description of your business.'}
            </p>

            <div className="profile-meta">
              <span>
                <FaBuilding />
                {profile.company_name || 'Your business'}
              </span>

              <span>
                <FaMapMarkerAlt />
                Johannesburg, South Africa
              </span>
            </div>

            <div className="local-note">
              Your profile changes are stored in the Revnue
              database.
            </div>
          </aside>

          <div className="profile-panels">
            <section className="form-panel">
              <div className="section-heading">
                <span className="section-icon">
                  <FaUser />
                </span>

                <div>
                  <h2>Profile details</h2>
                  <p>
                    Update your name and business description.
                  </p>
                </div>
              </div>

              <div className="form-grid">
                <label className="field">
                  <span>First name</span>

                  <input
                    name="first_name"
                    value={profile.first_name}
                    onChange={update}
                    required
                  />
                </label>

                <label className="field">
                  <span>Business name</span>

                  <input
                    name="company_name"
                    value={profile.company_name}
                    disabled
                  />
                </label>

                <label className="field">
                  <span>Business description</span>

                  <textarea
                    name="company_description"
                    value={profile.company_description}
                    onChange={update}
                    rows="5"
                    placeholder="Tell us about your business"
                  />
                </label>
              </div>
            </section>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setProfile((currentProfile) => ({
                    ...currentProfile,
                    first_name: '',
                    company_description: '',
                  }))

                  setSaved(false)
                  setError('')
                }}
              >
                Clear changes
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving ? (
                  'Saving...'
                ) : saved ? (
                  <>
                    <FaCheck /> Saved
                  </>
                ) : (
                  'Save changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Profile