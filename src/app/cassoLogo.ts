/** Logo từ thư mục gốc ./assest (file png/svg/jpg đầu tiên) */
const logoModules = import.meta.glob<string>('../../assest/*.{png,svg,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const cassoLogoUrl = Object.values(logoModules)[0] ?? '/casso-logo.svg';
