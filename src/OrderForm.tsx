import { useState, useRef, useEffect, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import './OrderForm.css'

interface FormData {
  serving: string
  spongeFlavour: string
  creamFlavour: string
  creamType: string
  extras: string[]
  comments: string
  name: string
  pickupDate: string
  email: string
  phone: string
}

const initialFormData: FormData = {
  serving: '',
  spongeFlavour: '',
  creamFlavour: '',
  creamType: '',
  extras: [],
  comments: '',
  name: '',
  pickupDate: '',
  email: '',
  phone: '',
}

const EXTRAS_OPTIONS = ['fruit', 'compote', 'herbs']

export default function OrderForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [calendarOpen, setCalendarOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false)
      }
    }
    if (calendarOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [calendarOpen])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExtrasChange = (extra: string) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }))
  }

  const handleDaySelect = (day: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      pickupDate: day
        ? `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
        : '',
    }))
  }

  const minPickupDate = new Date()
  minPickupDate.setDate(minPickupDate.getDate() + 7)
  minPickupDate.setHours(0, 0, 0, 0)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Honeypot check - silently reject bot submissions
    if (honeypot) {
      setSubmitStatus('success')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const templateParams = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      pickup_date: formData.pickupDate,
      serving_size: formData.serving,
      sponge_flavour: formData.spongeFlavour,
      cream_flavour: formData.creamFlavour,
      cream_type: formData.creamType,
      extras: formData.extras.join(', ') || 'None selected',
      comments: formData.comments,
    }

    const [customerResult, ownerResult] = await Promise.allSettled([
      // Confirmation email to customer
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ),
      // Order notification to owner (Hana)
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ),
    ])

    const failures = [
      customerResult.status === 'rejected' && `customer: ${(customerResult.reason as any)?.text || customerResult.reason}`,
      ownerResult.status === 'rejected' && `owner: ${(ownerResult.reason as any)?.text || ownerResult.reason}`,
    ].filter(Boolean)

    if (failures.length > 0) {
      console.error('EmailJS failures:', failures)
      setSubmitStatus('error')
      setErrorMessage(`Failed to send: ${failures.join(' | ')}`)
    } else {
      setSubmitStatus('success')
      setFormData(initialFormData)
    }

    setIsSubmitting(false)
  }

  if (submitStatus === 'success') {
    return (
      <div className="order-form-page">
        <div className="success-message">
          <h2>thank you for your order!</h2>
          <p>
            i've received your cake order and a confirmation email will be sent shortly to confirm the details, thank you!
          </p>
          <button
            className="submit-button"
            onClick={() => setSubmitStatus('idle')}
          >
            place another order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="order-form-page">
      <section className="content-section">
        <p className="intro-text">
          please fill in the form below, and I will get back to you shortly via email.
          when your cake is ready, you can pick it up at{' '}
          <span className="highlight-italic">cafe neundrei</span>,{' '}
          <span className="highlight-underline">monbijouplatz 2, 10178 berlin.</span>
        </p>
      </section>

      <section className="content-section">
        <p className="body-text">
          please make sure to take special care of your cake once you've received
          it. a car is recommended for transportation to avoid damage.
        </p>
      </section>

      {/* <div className="spacer" /> */}

      <section className="content-section">
        <p className="body-text">
          <span>cake pickups are only possible from </span>
          <span className="highlight-italic">wednesday until saturday.</span>
        </p>
        <p className="body-text">
          <span>please place orders at least </span>
          <span className="highlight-italic">one week in advance!</span>
        </p>
        <p className="body-text">
          <span>cakes can only be picked up from </span>
          <span className="highlight-italic">9 am to 5 pm</span>
        </p>
      </section>

      {/* <div className="spacer" /> */}

      <section className="content-section">
        <p className="body-text">
          once your cake is confirmed via email, production begins. please be patient as
          production takes time. order at least a week in advance, especially
          if your order is for a weekend.
        </p>
        <p className="body-text">
          make sure to take special care of your cake once you've received it.
          transporting the cake improperly can damage it.
        </p>
        <p className="body-text">
          if you have a specific design or theme you wish me to follow,
          you will be charged extra for customization. please refer to the about page for additional information on the baking process
        </p>
      </section>

      <form onSubmit={handleSubmit} className="order-form">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          className="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        <div className="form-group">
          <label className="form-label">serving</label>
          <select
            name="serving"
            value={formData.serving}
            onChange={handleInputChange}
            required
            className="form-select"
          >
            <option value="" disabled>select servings</option>
            <option value="up to 12 portions: 130€ / customization + 25€ extra (155€)">up to 12 portions: 130€ / customization + 25€ extra (155€)</option>
            <option value="up to 16 portions: 155€ / customization + 25€ extra (180€)">up to 16 portions: 155€ / customization + 25€ extra (180€)</option>
            <option value="up to 22 portions: 185€ / customization + 30€ extra (215€)">up to 22 portions: 185€ / customization + 30€ extra (215€)</option>
            <option value="up to 26 portions: 210€ / customization + 30€ extra (240€)">up to 26 portions: 210€ / customization + 30€ extra (240€)</option>
            <option value="up to 35 portions: 245€ / customization + 40€ extra (285€)">up to 35 portions: 245€ / customization + 40€ extra (285€)</option>
            <option value="up to 45 portions: 280€ / customization + 40€ extra (320€)">up to 45 portions: 280€ / customization + 40€ extra (320€)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">cake sponge flavour</label>
          <input
            type="text"
            name="spongeFlavour"
            value={formData.spongeFlavour}
            onChange={handleInputChange}
            required
            placeholder="cake sponge layer"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">cream flavour</label>
          <input
            type="text"
            name="creamFlavour"
            value={formData.creamFlavour}
            onChange={handleInputChange}
            required
            placeholder="cream flavour"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">cream type</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="creamType"
                value="cream cheese"
                checked={formData.creamType === 'cream cheese'}
                onChange={handleInputChange}
                required
              />
              <span className="radio-circle" />
              <span className="radio-text">cream cheese</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="creamType"
                value="mousse"
                checked={formData.creamType === 'mousse'}
                onChange={handleInputChange}
              />
              <span className="radio-circle" />
              <span className="radio-text">mousse</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">extras</label>
          <div className="checkbox-group">
            {EXTRAS_OPTIONS.map((extra) => (
              <label key={extra} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData.extras.includes(extra)}
                  onChange={() => handleExtrasChange(extra)}
                />
                <span className="checkbox-circle" />
                <span className="checkbox-text">{extra}</span>
              </label>
            ))}
          </div>
        </div>

        <section className="content-section">
          <p className="body-text">
            keep in mind, no two cakes are the same and I only make a specific cake
            one time. the final design is up to me. for any specific designs you
            will be charged extra money.
          </p>
        </section>

        <div className="form-group">
          <label className="form-label">extra wishes / comments / questions (optional)</label>
          <input
            type="text"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            placeholder="please keep it short"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">your name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">when would you like to pick up your cake</label>
          <div className="date-field-wrapper" ref={calendarRef}>
            <button
              type="button"
              className={`date-trigger form-input${!formData.pickupDate ? ' form-input--empty' : ''}`}
              onClick={() => setCalendarOpen((o) => !o)}
              aria-haspopup="dialog"
              aria-expanded={calendarOpen}
            >
              <span className="date-trigger-text">
                {formData.pickupDate
                  ? new Date(formData.pickupDate + 'T12:00:00').toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'select a pickup date'}
              </span>
              <svg className="date-trigger-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </button>

            {calendarOpen && (
              <div className="day-picker-popover" role="dialog">
                <DayPicker
                  mode="single"
                  selected={
                    formData.pickupDate
                      ? new Date(formData.pickupDate + 'T12:00:00')
                      : undefined
                  }
                  onSelect={(day) => {
                    handleDaySelect(day)
                    setCalendarOpen(false)
                  }}
                  disabled={[
                    { dayOfWeek: [0, 1, 2] },
                    { before: minPickupDate },
                    new Date('2026-12-25'),
                    new Date('2026-12-26'),
                    new Date('2027-01-01'),
                  ]}
                />
              </div>
            )}

            {!formData.pickupDate && (
              <input type="text" name="pickupDate" required className="day-picker-required" readOnly />
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="email"
            className="form-input"
          />
        </div>

        <p className="email-warning">
          please make sure your email address is correct, otherwise I won't be able
          to get in touch with you.
        </p>

        <div className="form-group">
          <label className="form-label">phone number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="phone number"
            className="form-input"
          />
        </div>

        <div className="submit-section">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? 'sending...' : 'submit'}
          </button>
          <p className="privacy-text">
            *by submitting your order, you agree to the{' '}
            <a href="#privacy">privacy policy</a>
          </p>
        </div>

        {submitStatus === 'error' && (
          <p className="error-message">{errorMessage}</p>
        )}
      </form>

    </div>
  )
}
