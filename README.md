# React DateTimePicker

A modern, performant React component that replaces the jQuery DateTimePicker plugin. Built to be lightweight, accessible, and easy to use.

## Features

✨ **Date and Time Selection** - Choose dates and times with an intuitive calendar interface
📱 **Responsive Design** - Works beautifully on all screen sizes
♿ **Accessible** - Built with accessibility in mind (keyboard navigation, ARIA labels)
🎨 **Customizable** - Easy to style with CSS variables
⚡ **Performance** - No jQuery dependency, pure React implementation
🌍 **i18n Ready** - Support for multiple languages
⌨️ **Keyboard Support** - Full keyboard navigation support

## Installation

```bash
npm install @hrnet/react-datetimepicker
```

or with yarn:

```bash
yarn add @hrnet/react-datetimepicker
```

## Basic Usage

```jsx
import React, { useState } from 'react'
import DateTimePicker from '@hrnet/react-datetimepicker'
import '@hrnet/react-datetimepicker/dist/index.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div>
      <DateTimePicker
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </div>
  )
}

export default App
```

## Props

### `value`
- **Type**: `Date | null`
- **Default**: `null`
- **Description**: The currently selected date

### `onChange`
- **Type**: `(date: Date | null) => void`
- **Description**: Callback function called when the date changes

### `format`
- **Type**: `string`
- **Default**: `"MM/DD/YYYY"`
- **Description**: Date format string (MM = month, DD = day, YYYY = year)

### `placeholder`
- **Type**: `string`
- **Default**: `"Select a date"`
- **Description**: Placeholder text for the input field

### `disabled`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether the picker is disabled

### `minDate`
- **Type**: `Date`
- **Description**: Minimum selectable date

### `maxDate`
- **Type**: `Date`
- **Description**: Maximum selectable date

### `timepicker`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable time selection in addition to date selection

### `locale`
- **Type**: `string`
- **Default**: `"en"`
- **Description**: Language locale (e.g., 'en', 'fr', 'es')

## Examples

### Date Only

```jsx
<DateTimePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Choose a date"
/>
```

### Date and Time

```jsx
<DateTimePicker
  value={selectedDate}
  onChange={setSelectedDate}
  timepicker={true}
  format="MM/DD/YYYY HH:mm"
/>
```

### With Min/Max Dates

```jsx
<DateTimePicker
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date()}
/>
```

### Different Locale

```jsx
<DateTimePicker
  value={selectedDate}
  onChange={setSelectedDate}
  locale="fr"
/>
```

## Styling

The component comes with default styles. You can customize them using CSS variables:

```css
:root {
  --dtp-primary-color: #3b82f6;
  --dtp-hover-color: #1e40af;
  --dtp-border-color: #e5e7eb;
  --dtp-text-color: #1f2937;
  --dtp-bg-color: #ffffff;
}
```

## Accessibility

- Full keyboard navigation (arrow keys, Enter, Escape)
- ARIA labels for screen readers
- Focus management
- Proper semantic HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Migration from jQuery DateTimePicker

### Old (jQuery)

```javascript
$('#date-input').datetimepicker({
  timepicker: false,
  format: 'm/d/Y'
})
```

### New (React)

```jsx
<DateTimePicker
  value={selectedDate}
  onChange={setSelectedDate}
  timepicker={false}
  format="MM/DD/YYYY"
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please visit: https://github.com/yourusername/react-datetimepicker/issues
