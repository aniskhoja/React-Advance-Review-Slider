import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people, setPeople] = useState(data)
  const [value, setValue] = useState(0)
  
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0
    }
    if (number < 0) {
      return people.length -1
    }
    return number
  }
  const handlePrevious = () => {
     const number =  value - 1
    setValue(checkNumber(number))
  }
  const handleNext = () => {
     const number = value + 1
    setValue(checkNumber(number))
  }

  useEffect(() => {
    let slider = setInterval(() => {
      setValue(checkNumber(value + 1))
    }, 3000);
    return () => {
      clearInterval(slider)
    }
  }, [value])
  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span> Reviews
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          const { id, name, image, title, quote } = person;

          let position = 'nextSlide';
          if (personIndex === value) position = 'activeSlide'
          if(personIndex === value - 1 || (value === 0 && personIndex === people.length -1)) position= 'lastSlide'
          return (<article className={position} key={id}>
            <img src={image} alt="name" className='person-img' />
            <h4>{name}</h4>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon'/>
          </article>)
        })}
        <button className='prev' onClick={handlePrevious}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={handleNext}>
          <FiChevronRight />
        </button>
      </div>
    </section>
    );
}

export default App;
