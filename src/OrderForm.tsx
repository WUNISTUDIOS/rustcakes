import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
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

const EXTRAS_OPTIONS = ['fruit', 'compote', 'chocolate drip']

export default function OrderForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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

    try {
      // Send both emails in parallel
      await Promise.all([
        // Email to customer (confirmation)
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ),
        // Email to owner (order details)
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ),
      ])

      setSubmitStatus('success')
      setFormData(initialFormData)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to send order. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="order-form-page">
        <div className="success-message">
          <h2>thank you for your order!</h2>
          <p>
            I've received your cake order and sent a confirmation to your email.
            I'll get back to you shortly to confirm the details.
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
          please fill in the form below, and I will get back to you shortly.
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
          <span>cake pickups only possible from </span>
          <span className="highlight-italic">wednesday until saturday.</span>
        </p>
        <p className="body-text">
          <span>please place cake orders at least </span>
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
          once your cake is confirmed, production begins. Please be patient as
          cake production takes time. Order at least a week in advance, especially
          if your order is for a weekend.
        </p>
        <p className="body-text">
          make sure to take special care of your cake once you've received it.
          transporting the cake improperly could damage it.
        </p>
        <p className="body-text">
          if you have a specific design or a theme in mind you wish me to follow,
          you will be charged extra for a customization.
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
            <option value="" disabled>select serving</option>
            <option value="6-8">6-8 people</option>
            <option value="10-12">10-12 people</option>
            <option value="14-16">14-16 people</option>
            <option value="18-20">18-20 people</option>
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
            placeholder="keep it short"
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
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleInputChange}
            required
            className={`form-input${!formData.pickupDate ? ' form-input--empty' : ''}`}
          />
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
        </div>

        {submitStatus === 'error' && (
          <p className="error-message">{errorMessage}</p>
        )}

        <p className="privacy-text">
          *by submitting your order, you agree to the{' '}
          <a href="https://www.rustcakes.com/privacy-policy">privacy policy</a>
        </p>
      </form>

    </div>
  )
}
