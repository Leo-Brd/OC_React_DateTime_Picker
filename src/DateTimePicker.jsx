import { useState, useRef, useEffect } from 'react'
import { useCalendar } from './hooks/useCalendar.js'
import { getLocale } from './locales/index.js'
import {
  formatDate,
  parseDate,
  isSameDay,
  isBetween,
  setTime,
  getDayOfWeek,
} from './utils/dateUtils.js'
import './DateTimePicker.css'

/**
 * DateTimePicker Component
 *
 * Un composant React moderne et accessible qui remplace le plugin jQuery DateTimePicker.
 * Permet la sélection de date et d'heure avec un calendrier intuitif.
 *
 * @param {Date | null} value - Date sélectionnée
 * @param {Function} onChange - Callback appelé quand la date change
 * @param {string} format - Format de la date (ex: 'MM/DD/YYYY')
 * @param {string} placeholder - Texte placeholder
 * @param {boolean} disabled - Si true, le composant est désactivé
 * @param {boolean} timepicker - Si true, affiche aussi le sélecteur d'heure
 * @param {Date} minDate - Date minimum sélectionnable
 * @param {Date} maxDate - Date maximum sélectionnable
 * @param {string} locale - Locale pour les textes (ex: 'en', 'fr')
 */
function DateTimePicker({
  value = null,
  onChange = () => {},
  format = 'MM/DD/YYYY',
  placeholder = 'Select a date',
  disabled = false,
  timepicker = false,
  minDate = null,
  maxDate = null,
  locale = 'en',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value ? formatDate(value, format) : '')
  const [hours, setHours] = useState(value?.getHours() || 0)
  const [minutes, setMinutes] = useState(value?.getMinutes() || 0)
  const [seconds, setSeconds] = useState(value?.getSeconds() || 0)

  const pickerRef = useRef(null)
  const inputRef = useRef(null)
  const loc = getLocale(locale)

  const calendar = useCalendar(value)

  // Mettre à jour les états quand value change
  useEffect(() => {
    if (value) {
      setInputValue(formatDate(value, format))
      setHours(value.getHours())
      setMinutes(value.getMinutes())
      setSeconds(value.getSeconds())
    } else {
      setInputValue('')
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
  }, [value, format])

  // Fermer le picker quand on clique ailleurs
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Gérer les touches du clavier
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      // Ne pas intercepter les touches si un input d'heure est actif
      if (document.activeElement?.classList.contains('dtp-time-input')) return

      switch (e.key) {
        case 'Escape':
          setIsOpen(false)
          break
        case 'ArrowUp':
          e.preventDefault()
          calendar.goToPreviousMonth()
          break
        case 'ArrowDown':
          e.preventDefault()
          calendar.goToNextMonth()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, calendar])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (!newValue) {
      onChange(null)
      return
    }

    const parsed = parseDate(newValue, format)
    if (parsed) {
      const dateWithTime = setTime(parsed, hours, minutes, seconds)
      onChange(dateWithTime)
    }
  }

  const handleDateSelect = (day) => {
    if (!day) return

    let selected = calendar.selectedDate || new Date()
    selected = new Date(calendar.currentMonth.getFullYear(), calendar.currentMonth.getMonth(), day)
    selected = setTime(selected, hours, minutes, seconds)

    if (!isBetween(selected, minDate, maxDate)) {
      return
    }

    calendar.selectDate(day)
    onChange(selected)

    if (!timepicker) {
      setIsOpen(false)
    }
  }

  const handleTimeChange = (type, rawValue) => {
    const parsed = parseInt(rawValue) || 0
    const max = type === 'hour' ? 23 : 59
    const val = Math.max(0, Math.min(max, parsed))

    let h = hours, m = minutes, s = seconds
    if (type === 'hour') { setHours(val); h = val }
    else if (type === 'minute') { setMinutes(val); m = val }
    else if (type === 'second') { setSeconds(val); s = val }

    if (calendar.selectedDate) {
      onChange(setTime(calendar.selectedDate, h, m, s))
    }
  }

  const handleTimeKeyDown = (type, e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const max = type === 'hour' ? 23 : 59
      const current = type === 'hour' ? hours : type === 'minute' ? minutes : seconds
      const newVal = e.key === 'ArrowUp'
        ? (current + 1) % (max + 1)
        : (current === 0 ? max : current - 1)
      handleTimeChange(type, String(newVal))
    }
  }

  const isDateDisabled = (day) => {
    if (!day) return true
    const date = new Date(calendar.currentMonth.getFullYear(), calendar.currentMonth.getMonth(), day)
    return !isBetween(date, minDate, maxDate)
  }

  const isDateToday = (day) => {
    if (!day) return false
    const today = new Date()
    const date = new Date(calendar.currentMonth.getFullYear(), calendar.currentMonth.getMonth(), day)
    return isSameDay(date, today)
  }

  const isDateSelected = (day) => {
    if (!day || !calendar.selectedDate) return false
    const date = new Date(calendar.currentMonth.getFullYear(), calendar.currentMonth.getMonth(), day)
    return isSameDay(date, calendar.selectedDate)
  }

  return (
    <div ref={pickerRef} className="dtp-container">
      <div className="dtp-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="dtp-input"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Select date"
        />
        <button
          className="dtp-toggle-btn"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label="Open date picker"
          type="button"
        >
          📅
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="dtp-picker" onMouseDown={(e) => e.stopPropagation()}>
          {/* Header avec mois/année et navigation */}
          <div className="dtp-header">
            <button
              className="dtp-nav-btn dtp-prev"
              onClick={() => calendar.goToPreviousMonth()}
              aria-label="Previous month"
              type="button"
            >
              ‹
            </button>
            <h3 className="dtp-month-year">
              {loc.months[calendar.currentMonth.getMonth()]} {calendar.currentMonth.getFullYear()}
            </h3>
            <button
              className="dtp-nav-btn dtp-next"
              onClick={() => calendar.goToNextMonth()}
              aria-label="Next month"
              type="button"
            >
              ›
            </button>
          </div>

          {/* Grille du calendrier */}
          <div className="dtp-calendar">
            {/* Jours de la semaine */}
            <div className="dtp-weekdays">
              {loc.dayOfWeekShort.map((day) => (
                <div key={day} className="dtp-weekday">
                  {day}
                </div>
              ))}
            </div>

            {/* Jours */}
            <div className="dtp-days">
              {calendar.daysGrid.map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const dayKey = `${weekIndex}-${dayIndex}`
                  const isDisabled = isDateDisabled(day)
                  const isToday = isDateToday(day)
                  const isSelected = isDateSelected(day)

                  return (
                    <button
                      key={dayKey}
                      className={`dtp-day ${isToday ? 'dtp-today' : ''} ${isSelected ? 'dtp-selected' : ''} ${
                        isDisabled ? 'dtp-disabled' : ''
                      }`}
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      aria-label={day ? `${day} ${loc.months[calendar.currentMonth.getMonth()]}` : undefined}
                      aria-pressed={isSelected}
                      type="button"
                    >
                      {day}
                    </button>
                  )
                })
              )}
            </div>
          </div>

          {/* Sélecteur d'heure (optionnel) */}
          {timepicker && (
            <div className="dtp-time">
              <label>
                {loc.hour}:
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => handleTimeChange('hour', e.target.value)}
                  onKeyDown={(e) => handleTimeKeyDown('hour', e)}
                  onClick={(e) => e.target.select()}
                  className="dtp-time-input"
                />
              </label>
              <label>
                {loc.minute}:
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => handleTimeChange('minute', e.target.value)}
                  onKeyDown={(e) => handleTimeKeyDown('minute', e)}
                  onClick={(e) => e.target.select()}
                  className="dtp-time-input"
                />
              </label>
              <label>
                {loc.second}:
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => handleTimeChange('second', e.target.value)}
                  onKeyDown={(e) => handleTimeKeyDown('second', e)}
                  onClick={(e) => e.target.select()}
                  className="dtp-time-input"
                />
              </label>
            </div>
          )}

          {/* Actions */}
          <div className="dtp-actions">
            <button className="dtp-btn dtp-btn-today" onClick={() => calendar.selectToday()} type="button">
              {loc.today}
            </button>
            <button className="dtp-btn dtp-btn-clear" onClick={() => { calendar.clearDate(); onChange(null); setIsOpen(false) }} type="button">
              {loc.clear}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateTimePicker
