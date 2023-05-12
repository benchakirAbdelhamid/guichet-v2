import  Slide  from './Slide';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


const Home = () => {
    const [toggle , setToggle] = useState(false)

    const state = useSelector((state) => state.cart.event);
  

    return (

      <div>

        <Slide/>




        <div className='container'>
            <h2 className='text-center mb-5'>À ne pas manquer</h2>
            <div className='row'>
            {state.map(event=>{
                return (
                    <div key={event.id} className=' col-sm-10 col-md-6 col-lg-4 mb-5'>
                        <div className="card" >
                         <img src={event.imageURL} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <h4> <span className="badge bg-secondary">{event.category}</span> </h4> 
                          <h6 className="card-title">{event.name}</h6>
                          <p className="card-text">{event.location}</p>
                          <p className="card-text"> 05 j 23 h 33 m 50 s</p>
                          <div className='row'>
                          À partir de :
                          <p className=" col card-text">{event.pric}</p>
                          <a href="#" className=" col btn btn-primary">J'achete</a>
                          </div>
                          {/* /products/${event.category}/DetailsEvent/${event.id} */}
                          <NavLink className=" col btn btn-primary" to={`/products/${event.name}/DetailsEvent/${event.id}`}>view details</NavLink>


                        </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
      </div>
    );
};


export default Home;
