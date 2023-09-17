import Home from './components/homePage/Home';
import Signin from './components/signin/Signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SiteContext from './SiteContext';
import TaskProvider from './TaskContext';
import TaskPage from './components/taskPage/taskPage';
import TaskHeader from './components/taskPage/taskHeader';



function App() {
  return (
    <SiteContext>
    <TaskProvider>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signin" element={<Signin />} />
      <Route exact path='/tasks' element={<TaskPage />} />
      {/* <Route path="/contact" component={Contact} /> */}
      </Routes>
    </Router>
    </TaskProvider>
    </SiteContext>
  );
}

export default App;
