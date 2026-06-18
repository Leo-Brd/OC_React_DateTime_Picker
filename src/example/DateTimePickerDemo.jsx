import React, { useState } from 'react'
import DateTimePicker from '../DateTimePicker'
import '../DateTimePicker.css'

/**
 * Exemple d'utilisation du composant DateTimePicker
 */
export default function DateTimePickerDemo() {
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [dateWithTime, setDateWithTime] = useState(null)

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React DateTimePicker Demo</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Date of Birth (Date Only)</h2>
        <DateTimePicker
          value={dateOfBirth}
          onChange={setDateOfBirth}
          format="MM/DD/YYYY"
          placeholder="Select your date of birth"
          maxDate={new Date()}
        />
        {dateOfBirth && <p>Selected: {dateOfBirth.toLocaleDateString()}</p>}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Start Date</h2>
        <DateTimePicker
          value={startDate}
          onChange={setStartDate}
          format="MM/DD/YYYY"
          placeholder="Select start date"
          minDate={new Date(2020, 0, 1)}
        />
        {startDate && <p>Selected: {startDate.toLocaleDateString()}</p>}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Date and Time</h2>
        <DateTimePicker
          value={dateWithTime}
          onChange={setDateWithTime}
          format="MM/DD/YYYY HH:mm"
          placeholder="Select date and time"
          timepicker={true}
        />
        {dateWithTime && <p>Selected: {dateWithTime.toLocaleString()}</p>}
      </div>

      <div>
        <h2>French Locale</h2>
        <DateTimePicker
          value={null}
          onChange={() => {}}
          locale="fr"
          placeholder="Sélectionnez une date"
        />
      </div>
    </div>
  )
}
