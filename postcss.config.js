export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: 'default',
    },
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: {
        grid: true,
      },
      features: {
        'nesting-rules': false,
      },
    },
  },
}
