import NavMenu from "../NavMenu/NavMenu.tsx";

const App = () => {

  return (
      <div className="fixed inset-0 bg-linear-120 from-[#70139f] from-15% via-[#79156b] via-40% to-[#340575] to-90% overflow-auto">
      <div className="flex h-full w-full">
              <NavMenu />
              <main className="ml-64 p-6 w-full text-white">
                  {/* Контент */}
              </main>
          </div>
      </div>
  )
}

export default App
