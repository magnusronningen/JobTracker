function Header() {
  return (
    <header className="bg-[rgb(17,23,41)] border-b border-gray-200 text-white">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <h1 className="text-3xl font-bold tracking-tight">JobTracker</h1>

        <p className="mt-1 text-gray-300">
          Hold oversikt over jobbsøknadene dine.
        </p>
      </div>
    </header>
  );
}

export default Header;
