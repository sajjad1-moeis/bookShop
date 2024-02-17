/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.js", "./*.{html,js}", "./html/*.html", "./js/*.js"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        md: "5px",
      },
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1410px",
    },
    extend: {
      colors: {
        primary: "#758bfd",
        secondary: "#f7f7f7",
        success: "#198754",
        info: "#0dcaf0",
        //
        warning: "#fbbc34",
        danger: "#dc3545",
        light: "#f8f9fa",
        white: "#fff",
        purple: "#6e41c0",
        dark: "#212529",
        darkBlue: "#092143",
        silver: "#3A4D69",
        blueText: "#2b73e3",
      },
    },
  },
  plugins: [],
};
