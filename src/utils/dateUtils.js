/**
 * Utilitaires pour manipulation de dates
 */

/**
 * Formate une date selon un pattern donné
 * @param {Date} date - Date à formater
 * @param {string} format - Pattern de format (MM, DD, YYYY, HH, mm, ss)
 * @returns {string} Date formatée
 */
export function formatDate(date, format = 'MM/DD/YYYY') {
  if (!date) return ''
  
  const pad = (num) => String(num).padStart(2, '0')
  
  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = date.getFullYear()
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * Parse une chaîne de date selon un pattern donné
 * @param {string} dateString - Chaîne de date à parser
 * @param {string} format - Pattern du format
 * @returns {Date | null} Date parsée ou null
 */
export function parseDate(dateString, format = 'MM/DD/YYYY') {
  if (!dateString) return null
  
  const dateRegex = format
    .replace('DD', '(\\d{2})')
    .replace('MM', '(\\d{2})')
    .replace('YYYY', '(\\d{4})')
    .replace('HH', '(\\d{2})')
    .replace('mm', '(\\d{2})')
    .replace('ss', '(\\d{2})')
  
  const match = dateString.match(new RegExp(`^${dateRegex}$`))
  if (!match) return null
  
  let day = 1, month = 0, year = 2024, hours = 0, minutes = 0
  let groupIndex = 1
  
  for (const part of format.split(/(\d+)/)) {
    if (part === 'DD') day = parseInt(match[groupIndex++])
    else if (part === 'MM') month = parseInt(match[groupIndex++]) - 1
    else if (part === 'YYYY') year = parseInt(match[groupIndex++])
    else if (part === 'HH') hours = parseInt(match[groupIndex++])
    else if (part === 'mm') minutes = parseInt(match[groupIndex++])
  }
  
  return new Date(year, month, day, hours, minutes)
}

/**
 * Obtient les jours du mois sous forme de grille
 * @param {number} year - Année
 * @param {number} month - Mois (0-11)
 * @returns {number[][]} Grille de jours (vide pour jours hors mois)
 */
export function getDaysGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const grid = []
  let week = new Array(firstDay).fill(null)
  
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day)
    if (week.length === 7) {
      grid.push(week)
      week = []
    }
  }
  
  if (week.length > 0) {
    while (week.length < 7) week.push(null)
    grid.push(week)
  }
  
  return grid
}

/**
 * Vérifie si deux dates sont le même jour
 * @param {Date} date1 - Première date
 * @param {Date} date2 - Deuxième date
 * @returns {boolean}
 */
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Obtient le jour de la semaine (0 = dimanche, 6 = samedi)
 * @param {Date} date - Date
 * @returns {number} Jour de la semaine
 */
export function getDayOfWeek(date) {
  return date.getDay()
}

/**
 * Clone une date
 * @param {Date} date - Date à cloner
 * @returns {Date} Copie de la date
 */
export function cloneDate(date) {
  return new Date(date.getTime())
}

/**
 * Crée une date avec une heure définie
 * @param {Date} date - Date source
 * @param {number} hours - Heures
 * @param {number} minutes - Minutes
 * @param {number} seconds - Secondes
 * @returns {Date} Nouvelle date avec heure définie
 */
export function setTime(date, hours = 0, minutes = 0, seconds = 0) {
  const newDate = cloneDate(date)
  newDate.setHours(hours, minutes, seconds, 0)
  return newDate
}

/**
 * Ajoute/soustrait des jours à une date
 * @param {Date} date - Date source
 * @param {number} days - Nombre de jours à ajouter
 * @returns {Date} Nouvelle date
 */
export function addDays(date, days) {
  const newDate = cloneDate(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

/**
 * Ajoute/soustrait des mois à une date
 * @param {Date} date - Date source
 * @param {number} months - Nombre de mois à ajouter
 * @returns {Date} Nouvelle date
 */
export function addMonths(date, months) {
  const newDate = cloneDate(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

/**
 * Vérifie si une date est entre deux dates
 * @param {Date} date - Date à vérifier
 * @param {Date} min - Date minimum
 * @param {Date} max - Date maximum
 * @returns {boolean}
 */
export function isBetween(date, min, max) {
  return (!min || date >= min) && (!max || date <= max)
}

/**
 * Obtient aujourd'hui
 * @returns {Date}
 */
export function getToday() {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

/**
 * Crée une date simple sans heure
 * @param {number} year
 * @param {number} month (0-11)
 * @param {number} day
 * @returns {Date}
 */
export function createDate(year, month, day) {
  return new Date(year, month, day)
}
