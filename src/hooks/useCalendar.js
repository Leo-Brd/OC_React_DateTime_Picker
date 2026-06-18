import { useState, useCallback } from 'react'
import { getDaysGrid, addMonths, cloneDate, getToday } from '../utils/dateUtils'

/**
 * Hook pour gérer la logique du calendrier
 * @param {Date} initialDate - Date initiale
 * @returns {Object} État et fonctions du calendrier
 */
export function useCalendar(initialDate = null) {
  const today = getToday()
  const [currentMonth, setCurrentMonth] = useState(
    initialDate ? new Date(initialDate.getFullYear(), initialDate.getMonth()) : new Date(today.getFullYear(), today.getMonth())
  )
  const [selectedDate, setSelectedDate] = useState(initialDate)

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, -1))
  }, [])

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1))
  }, [])

  const goToMonth = useCallback((year, month) => {
    setCurrentMonth(new Date(year, month))
  }, [])

  const selectDate = useCallback((day) => {
    if (!day) return
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(newDate)
  }, [currentMonth])

  const selectToday = useCallback(() => {
    setSelectedDate(cloneDate(today))
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth()))
  }, [])

  const clearDate = useCallback(() => {
    setSelectedDate(null)
  }, [])

  const daysGrid = getDaysGrid(currentMonth.getFullYear(), currentMonth.getMonth())

  return {
    currentMonth,
    selectedDate,
    daysGrid,
    goToPreviousMonth,
    goToNextMonth,
    goToMonth,
    selectDate,
    selectToday,
    clearDate,
  }
}
