import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getEventByCategory } from '../store/shopping-cart/cartSlice';
import Slide from './Slide';


const Product = () => {
  const dispatch = useDispatch();
  const param = useParams()
    const [toggle , setToggle] = useState(false)
    const [eventBycategory , setEventBycategory ] = useState([])
    const state = useSelector((state) => state.cart.event);
    
    // useEffect(() => {

    //   // console.log('param ===>', param.id)
    //   let isCancelled = false
    //   if(!isCancelled){
    //     // console.log('state')
    //   }return ()=>{
    //     let arr = []
    //     // console.log('return ===>',param.id )
    //     state.forEach(element => {
    //       if(String(element.category.toLowerCase()) === String(param.id.replace("-&-", " & ").toLowerCase())){
    //         // console.log('array element by category ==> ',element)
    //         arr.push(element)
    //       }else{
    //         // console.log('error')
    //       }
    //     });
    //     setEventBycategory(arr)
    //     isCancelled = true
    //   }
    // }, [param]);
    
    // useEffect(() => {
    // console.log('=====>')
    // }, []);


    useEffect(() => {
  setTimeout(()=>{
    // console.log('1111')
    //  console.log('dd')
    console.log('return ===>',param.id )

    let arr = []
    state.forEach(element => {
      if(String(element.category.toLowerCase()) === String(param.id.replace("-&-", " & ").toLowerCase())){
        // console.log('array element by category ==> ',element)
        arr.push(element)
      }else{
        // console.log('error')
      }
    });
    setEventBycategory(arr)



    },10)
  }, [param]);
    

    return (

      <div>
         <Slide/>

        <div  className='container'>
            <h2 className='text-center mb-5 mt-5'>À ne pas manquer</h2>

          <div className='row'>

          {eventBycategory.map(arr=>{
              return(
                    <div key={arr.id} className=' col-sm-10 col-md-6 col-lg-4 mb-5'>
                    <div className="card" >
                     <img src={arr.imageURL} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h4> <span className="badge bg-secondary">{arr.category}</span> </h4> 
                     <h6 className="card-title">{arr.name}</h6>
                     <p className="card-text">{arr.location}</p>
                     <p className="card-text"> 05 j 23 h 33 m 50 s</p>
                     <div className='row'>
                     À partir de :
                     <p className=" col card-text">{arr.pric}</p>
                     <a href="#" className=" col btn btn-primary">J'achete</a>
                     </div>
                     <NavLink className=" col btn btn-primary" to={`DetailsEvent/${arr.id}`}>view details</NavLink>

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



export default Product;
