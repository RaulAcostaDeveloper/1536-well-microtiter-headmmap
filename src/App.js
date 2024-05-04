import './styles/page.css';
import './styles/dataLoadingScreen.css';
import './styles/dataVisualizationScreen.css';
import { ContentPage } from './Components/contentPage.tsx';
import { Footer } from './Components/footer.tsx';

function App() {
  return (
    <div className='wellMicrotiterPage'>
        <ContentPage/>
        <Footer/>
    </div>
  );
}

export default App;
