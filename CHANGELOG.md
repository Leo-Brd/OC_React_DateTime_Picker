# Changelog

## [1.1.0] - 2026-07-02

### Added
- Direct keyboard input support for time picker fields (hour, minute, second)
- Click-to-select functionality for time inputs (click selects all, typing replaces)
- Native number input spinners hidden for cleaner UI

### Fixed
- Time picker inputs now use `type="number"` instead of `type="text"` for better UX
- Arrow Up/Down keys now properly increment/decrement time values without affecting calendar navigation
- Fixed global CSS conflicts by using `!important` flags on critical time input styles
- Simplified time input value handling to prevent edge cases with padStart formatting
- Time picker inputs now properly display values typed by the user

### Improved
- Better keyboard navigation separation between calendar (Arrow keys change month) and time inputs (Arrow keys adjust value)
- Reduced code complexity in handleTimeChange and handleTimeKeyDown functions
- Enhanced CSS encapsulation for time input styling

## [1.0.0] - 2024-06-18

### Added
- Initial release
- Date picker component with calendar interface
- Optional time picker (hour, minute, second)
- Keyboard navigation support (Escape, Arrow keys)
- Multi-language support (English, French)
- Min/Max date constraints
- Today button and Clear button
- Disabled state support
- Custom date formatting
- Accessible ARIA labels
- CSS variables for easy customization
- Full responsive design
- PropTypes validation
- Comprehensive documentation

### Features
- Pure React implementation (no jQuery dependency)
- Modern, clean UI design
- Smooth animations
- Lightweight and performant
- Easy integration into existing React apps

## Upcoming
- [ ] Additional locale support (Spanish, German, etc.)
- [ ] Week view
- [ ] Month view
- [ ] Year picker
- [ ] Date range selection
- [ ] Custom styling themes
- [ ] Unit tests
