import React from 'react';
import '../components/InstrumentosGrid'
import '../styles/InstrumentosGrid.css';
import InstrumentosGrid from '../components/InstrumentosGrid';

const Home: React.FC = () => {
    return (
        <div className='body'>
            <section>
                <InstrumentosGrid/>
            </section>
        </div>
    );
};

export default Home;
