import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCalendar } from '../hooks/useCalendar'
import { getLocale } from '../locales'
import {
  formatDate,
  parseDate,
  isSameDay,
  isBetween,
  setTime,
  getDayOfWeek,
} from '../utils/dateUtils'
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

  const handleTimeChange = (type, value) => {
    let h = hours
    let m = minutes
    let s = seconds

    if (type === 'hour') h = Math.max(0, Math.min(23, parseInt(value) || 0))
    if (type === 'minute') m = Math.max(0, Math.min(59, parseInt(value) || 0))
    if (type === 'second') s = Math.max(0, Math.min(59, parseInt(value) || 0))

    setHours(h)
    setMinutes(m)
    setSeconds(s)

    if (calendar.selectedDate) {
      const updated = setTime(calendar.selectedDate, h, m, s)
      onChange(updated)
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
        >
          📅
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="dtp-picker">
          {/* Header avec mois/année et navigation */}
          <div className="dtp-header">
            <button
              className="dtp-nav-btn dtp-prev"
              onClick={() => calendar.goToPreviousMonth()}
              aria-label="Previous month"
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
                  value={String(hours).padStart(2, '0')}
                  onChange={(e) => handleTimeChange('hour', e.target.value)}
                  className="dtp-time-input"
                />
              </label>
              <label>
                {loc.minute}:
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={String(minutes).padStart(2, '0')}
                  onChange={(e) => handleTimeChange('minute', e.target.value)}
                  className="dtp-time-input"
                />
              </label>
              <label>
                {loc.second}:
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={String(seconds).padStart(2, '0')}
                  onChange={(e) => handleTimeChange('second', e.target.value)}
                  className="dtp-time-input"
                />
              </label>
            </div>
          )}

          {/* Actions */}
          <div className="dtp-actions">
            <button className="dtp-btn dtp-btn-today" onClick={() => calendar.selectToday()}>
              {loc.today}
            </button>
            <button className="dtp-btn dtp-btn-clear" onClick={() => { calendar.clearDate(); onChange(null); setIsOpen(false) }}>
              {loc.clear}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

DateTimePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  timepicker: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
}

export default DateTimePicker
