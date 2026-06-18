/**
 * Traductions anglaises
 */
export const localeEN = {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthsShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayOfWeek: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ],
  dayOfWeekShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
  clear: 'Clear',
  close: 'Close',
  selectTime: 'Select Time',
  hour: 'Hour',
  minute: 'Minute',
  second: 'Second',
}

/**
 * Traductions françaises
 */
export const localeFR = {
  months: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthsShort: [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
    'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
  ],
  dayOfWeek: [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
    'Jeudi', 'Vendredi', 'Samedi'
  ],
  dayOfWeekShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: 'Aujourd\'hui',
  clear: 'Effacer',
  close: 'Fermer',
  selectTime: 'Sélectionner l\'heure',
  hour: 'Heure',
  minute: 'Minute',
  second: 'Seconde',
}

/**
 * Locales disponibles
 */
export const locales = {
  en: localeEN,
  fr: localeFR,
}

/**
 * Obtient une locale par code
 * @param {string} code - Code de la locale (ex: 'en', 'fr')
 * @returns {Object} Objet locale
 */
export function getLocale(code = 'en') {
  return locales[code] || locales.en
}
