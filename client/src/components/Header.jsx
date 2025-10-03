const Header = () => {
  
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <h2 className="text-xl sm:text-2xl font-bold text-green-600">HealthyfyMe</h2>
      <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
        Login
      </button>
    </header>
  );
};

export default Header;
