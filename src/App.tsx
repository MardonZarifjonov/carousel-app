import { Carousel } from './components/Carousel';
import Image1 from './assets/images/1.jpeg';
import Image2 from './assets/images/2.jpeg';
import Image3 from './assets/images/3.jpeg';
import Image4 from './assets/images/4.jpeg';

export default function App() {
  return (
    <main>
      <section className='wrapper'>
        <h2>Simple text items without gap</h2>
        <Carousel>
          <div className='car-item' style={{ color: 'green' }}>
            <h3>Slide {1}</h3>
          </div>
          <div className='car-item' style={{ color: 'green' }}>
            <h3>Slide {2}</h3>
          </div>
          <div className='car-item' style={{ color: 'green' }}>
            <h3>Slide {3}</h3>
          </div>
          <div className='car-item' style={{ color: 'green' }}>
            <h3>Slide {4}</h3>
          </div>
        </Carousel>
      </section>
      <hr />
      <section className='wrapper'>
        <h2>Simple text items wit gap</h2>
        {/* <Carousel gap={10} autoPlay delay={5}> */}
        <Carousel gap={12}>
          <div className='car-item'>
            <h3>Slide {1}</h3>
          </div>
          <div className='car-item'>
            <h3>Slide {2}</h3>
          </div>
          <div className='car-item'>
            <h3>Slide {3}</h3>
          </div>
          <div className='car-item'>
            <h3>Slide {4}</h3>
          </div>
        </Carousel>
      </section>
      <hr />
      <section>
        <h2>Image items without gaps</h2>
        <Carousel>
          <img className='img' src={Image1} alt='test tag' />
          <img className='img' src={Image2} alt='test tag' />
          <img className='img' src={Image3} alt='test tag' />
          <img className='img' src={Image4} alt='test tag' />
        </Carousel>
      </section>
      <hr />
      <section>
        <h2>Image items with gaps</h2>
        {/* <Carousel gap={12} autoPlay delay={3}> */}
        <Carousel gap={12}>
          <img className='img' src={Image1} alt='test tag' />
          <img className='img' src={Image2} alt='test tag' />
          <img className='img' src={Image3} alt='test tag' />
          <img className='img' src={Image4} alt='test tag' />
        </Carousel>
      </section>
    </main>
  );
}
