import { Provider } from 'react-redux'
import './App.css'
import MainSpace from './pages/MainPage'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchInfoOfServer } from './features/dataHandler/slices/dataAboutServerSlice'

function App() {
  
//   const dispatch  = useDispatch()
//   const infoAboutServer = useSelector((state) => state.dataAboutServer)
//   const infoString = JSON.stringify(infoAboutServer)
//   console.log("Data From server:" + infoString)

//   useEffect(() => {
//     dispatch(fetchInfoOfServer());
// }, [dispatch]);

  return (
    <>
    <MainSpace/>
    </>
  )
}

export default App
