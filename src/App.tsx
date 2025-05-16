import { BoardProvider } from './context/BoardContext'
import { Board } from './components/Board'
import './styles/App.css'

function App() {
  return (
    <BoardProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              House Wiring Board Simulation
            </h1>
          </div>
        </header>
        <main>
          <Board />
        </main>
      </div>
    </BoardProvider>
  )
}

export default App 