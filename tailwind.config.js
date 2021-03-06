/* eslint-disable @typescript-eslint/no-unsafe-return */
module.exports = {
  mode: "jit",
  purge: ["index.html", "./src/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: `'Nunito', sans-serif`,
      },
      boxShadow: {
        DEFAULT:
          "0 1px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.18)",
        inner: "inset 0 1px 4px 0 rgba(0, 0, 0, 0.25)",
      },
      minWidth: (theme) => theme("maxWidth"),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
