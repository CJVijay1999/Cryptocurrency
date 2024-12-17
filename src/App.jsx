import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CoinsPages from './Pages/CoinsPages'
import ExchangePage from './Pages/ExchangePage'
const App = () => {
  return (
    <div>
        <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<CoinsPages />} />
                <Route path='/exchange' element={<ExchangePage />}/>
            </Routes>
        </BrowserRouter>
        </>
    </div>
  )
}

export default App