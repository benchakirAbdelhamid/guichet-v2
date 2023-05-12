import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import AlertDialogSlide from './Alert_dialog';
import {addToCart, setshowModalDetails} from '../store/shopping-cart/cartSlice'
// ==============material ui=====================


const DetailsEvent = () => {
    const dispatch = useDispatch();
    const param = useParams()
    const [eventBycategory , setEventBycategory ] = useState([])
    const state = useSelector((state) => state.cart.event);
    const valueShowModal = useSelector((state) => state.cart.showModalBox);


    
  const [quantityVal, setQuantityVal] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [resultat, setResultat] = useState(0);
  const [showModalBox, setShowModalBox] = useState(false);


    useEffect(() => {
        let isCancelled = false
        if(!isCancelled){
          // console.log('state')
        }return ()=>{
          state.forEach(element => {

            if(element.id == param.idEvent){
              setEventBycategory(element)
            }else{
              // console.log('error')
            }
          });
          isCancelled = true
        }
      }, [param]);



const handleOptionChange = (event)=>{
  setSelectedOption(event.target.value)
}

const handleResult = (quantityVal1,selectedOption1) => {
  // console.log( Number(quantityVal1) )
  // console.log( Number(selectedOption1) )

if(Number(quantityVal1) * Number(selectedOption1) > 0){
    console.log('yees')

      // Current date and time 
      const currentDateTime = new Date();
      const year = currentDateTime.getFullYear();
      const month = currentDateTime.getMonth() + 1;
      const day = currentDateTime.getDate();
      const hours = currentDateTime.getHours();
      const minutes = currentDateTime.getMinutes();
      const seconds = currentDateTime.getSeconds();
      // console.log(`Current date and time: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
      
      // Generates a random number => id_ticket_category
      let randomNumber = Math.random(Math.floor(Math.random() * Math.random())); 
      // console.log(randomNumber);

      // console.log(`id_ticket_category ==> ${randomNumber} `)
      // console.log(` eventPackage ===> ${Number(selectedOption1)}` )
      // console.log( `eventId ==> ${eventBycategory.id} `)
      // console.log(`quantityValue ==>  ${Number(quantityVal1)}` )
      // console.log( `date ===> ${year}-${month}-${day} ${hours}:${minutes}:${seconds}` )

      dispatch(addToCart({
        'id_ticket_category' : randomNumber,
        'eventPackage' : Number(selectedOption1) , //referenceTicketId
        'eventId':eventBycategory.id, 
        'quantityValueTicket':Number(quantityVal1),
        'date':`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      }))
}

}



    return (
        <div>




          
            <h2>id : {eventBycategory.id}</h2>
            <h2>category : {eventBycategory.category}</h2>
            <h2>date : {eventBycategory.date}</h2>
            <h2>location : {eventBycategory.location}</h2>
            <h2>name : {eventBycategory.name}</h2>
            <h2>pric : {eventBycategory.pric}</h2>
            <h2>title : {eventBycategory.title}</h2>
            <h2>Description : {eventBycategory.Description}</h2>
            <img src={eventBycategory.imageURL} alt=''/>

            <form className='container mt-5'>
                  <legend>{eventBycategory.date}</legend>
                  <div className="mb-3 col-9 ">
                    <select className="form-select" value={selectedOption} onChange={handleOptionChange} > 
                    <option value='' key='0' disabled > chose in option </option> 
                              {
                              eventBycategory.ticket_Category !== undefined 
                              ? eventBycategory.ticket_Category.map((e)=>{
                                return(
                                <option value={e.id_ticket_Category}  key={e.id_ticket_Category} >
                                  category : {e.category_name} | price : {e.pric_category}
                                </option>
                                )
                              })
                              : ''
                              } 
                    </select>
                  </div>
              

                  <input
              value={quantityVal}
              onChange={({ target }) => setQuantityVal(target.value)}
              type="number"
              className="form-control"
            />

            <button
              className="btn btn-primary w-100 mt-1"
              type="button"
              onClick={()=> handleResult(quantityVal,selectedOption)}
            >
              Acheter maintenant
            </button>

            {/* {
            showModalBox === true && resultat>0
            ?  <AlertDialogSlide  title={eventBycategory.title} pric={eventBycategory.pric} />
            : ''
            } */}
      
                 

            
              
            </form>

        </div>
    );
}

export default DetailsEvent;
