import './App.css'
import {useState} from 'react'
import Header from '../components/Header'
import SortBy from '../components/SortForm'
import SearchForm from '../components/SearchForm'
import BoardGrid from '../components/BoardGrid'
import Footer from '../components/Footer'

const [showForm, setShowForm] = useState(false)

const toggleForm = () => {
  setShowForm(!showForm);
}

function App() {

  return (
    <>
      <Header />
      <SortBy />
      <SearchForm />
      <button className="create-btn" onClick={toggleForm}>
        Create new board
      </button>
      {showForm && (
        <NewBoardForm onSuccess={handleCreateSuccess} onClose={toggleForm} />

      )}
      <BoardGrid />
      <Footer />
    </>
  )
}

export default App
