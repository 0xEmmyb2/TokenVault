const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
    >
      <p>© 2025 AgriToken. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
