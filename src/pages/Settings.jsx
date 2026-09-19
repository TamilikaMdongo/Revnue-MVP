import { useState } from 'react'
import { FaBell, FaCalendarAlt, FaCheck, FaGlobeAfrica, FaLock, FaPalette, FaWallet } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'

const defaults = {
  currency: 'ZAR',
  dateFormat: 'DD/MM/YYYY',
  weekStarts: 'Monday',
  monthlySummary: true,
  lowBalanceAlerts: true,
  productUpdates: false,
  compactTables: false,
}

const getStoredSettings = () => {
  try {
    const stored = localStorage.getItem('revnue_settings')
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
  } catch {
    localStorage.removeItem('revnue_settings')
    return defaults
  }
}

const SettingToggle = ({ label, copy, checked, onChange }) => (
  <label className="setting-row">
    <span><strong>{label}</strong><small>{copy}</small></span>
    <input className="toggle-input" type="checkbox" checked={checked} onChange={onChange}/>
    <i className="toggle-ui" aria-hidden="true"></i>
  </label>
)

const Settings = () => {
  const [settings, setSettings] = useState(getStoredSettings)
  const [saved, setSaved] = useState(false)

  const setValue = (name, value) => {
    setSettings((current) => ({ ...current, [name]: value }))
    setSaved(false)
  }

  const saveSettings = () => {
    localStorage.setItem('revnue_settings', JSON.stringify(settings))
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2600)
  }

  return (
    <div className="app-page">
      <Sidebar/>
      <main className="main-content">
        <header className="header page-header">
          <div><span className="eyebrow">Workspace</span><h1>Settings</h1><p>Choose how Revnue works for you.</p></div>
          <button className="primary-button header-save" type="button" onClick={saveSettings}>{saved ? <><FaCheck/> Saved</> : 'Save settings'}</button>
        </header>

        <div className="settings-layout">
          <nav className="settings-nav" aria-label="Settings sections">
            <a href="#regional"><FaGlobeAfrica/> Regional</a>
            <a href="#notifications"><FaBell/> Notifications</a>
            <a href="#appearance"><FaPalette/> Appearance</a>
            <a href="#security"><FaLock/> Security</a>
          </nav>

          <div className="settings-panels">
            <section className="form-panel" id="regional">
              <div className="section-heading"><span className="section-icon"><FaGlobeAfrica/></span><div><h2>Regional preferences</h2><p>Set the formats used across your dashboard and reports.</p></div></div>
              <div className="form-grid">
                <label className="field"><span>Currency</span><div className="input-with-icon"><FaWallet/><select value={settings.currency} onChange={(event) => setValue('currency', event.target.value)}><option value="ZAR">South African Rand (ZAR)</option><option value="BWP">Botswana Pula (BWP)</option><option value="USD">US Dollar (USD)</option><option value="GBP">British Pound (GBP)</option></select></div></label>
                <label className="field"><span>Date format</span><div className="input-with-icon"><FaCalendarAlt/><select value={settings.dateFormat} onChange={(event) => setValue('dateFormat', event.target.value)}><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div></label>
                <label className="field"><span>Week starts on</span><select value={settings.weekStarts} onChange={(event) => setValue('weekStarts', event.target.value)}><option>Monday</option><option>Sunday</option></select></label>
              </div>
            </section>

            <section className="form-panel" id="notifications">
              <div className="section-heading"><span className="section-icon"><FaBell/></span><div><h2>Notifications</h2><p>Control which financial updates you want to receive.</p></div></div>
              <div className="settings-list">
                <SettingToggle label="Monthly cash-flow summary" copy="A monthly snapshot of income, expenses and net cash flow." checked={settings.monthlySummary} onChange={(event) => setValue('monthlySummary', event.target.checked)}/>
                <SettingToggle label="Low balance alerts" copy="Get notified when your available balance needs attention." checked={settings.lowBalanceAlerts} onChange={(event) => setValue('lowBalanceAlerts', event.target.checked)}/>
                <SettingToggle label="Product updates" copy="Occasional updates about new Revnue features." checked={settings.productUpdates} onChange={(event) => setValue('productUpdates', event.target.checked)}/>
              </div>
            </section>

            <section className="form-panel" id="appearance">
              <div className="section-heading"><span className="section-icon"><FaPalette/></span><div><h2>Appearance</h2><p>Adjust how information is displayed.</p></div></div>
              <div className="theme-choice"><span className="theme-preview"><i></i><i></i><i></i></span><div><strong>Revnue light</strong><small>Clean, high-contrast interface</small></div><FaCheck className="theme-check"/></div>
              <SettingToggle label="Compact transaction tables" copy="Fit more transactions on screen with tighter rows." checked={settings.compactTables} onChange={(event) => setValue('compactTables', event.target.checked)}/>
            </section>

            <section className="form-panel security-panel" id="security">
              <div className="section-heading"><span className="section-icon"><FaLock/></span><div><h2>Security</h2><p>Password and session controls require your authentication backend.</p></div></div>
              <div className="backend-badge">Backend connection required</div>
              <p>Connect this section after token-based authentication and password hashing are implemented. It is intentionally disabled in this frontend build.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings
