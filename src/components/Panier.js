import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


const Panier = () => {
    const state = useSelector((state) => state.cart);
    const [dataCart , setDataCart] = useState([])
    const [someQuantityValue , setsomeQuantityValue] = useState(null)
    const [totalPriceOrdersValue , setTotalPriceOrdersValue] = useState(null)

    useEffect(()=>{
        let isCancelled = false
        if(!isCancelled){
        // console.log('state')
        }return ()=>{
            // console.log('cart ==> ',state.cart)
            // console.log('event ==> ',state.event)
            // add to cart
                let filtred_array = [];
                let id_order = 0
                state.cart.forEach((element) => {
                    const index = filtred_array.find(
                        ele => ele.eventId == element.eventId && ele.eventPackage == element.eventPackage 
                        ) || null;    
                        if (index){
                            id_order +=1
                            index.id_order = id_order 
                            index.quatity += 1 
                        }     
                    else filtred_array.push({...element, quatity: 1 , id_order :id_order })
                })
                // console.log(filtred_array) ;
                // setDataCart(filtred_array)

                // get info event and price ticket
                let cart_array = [];
                filtred_array.forEach((items_cart)=>{
                    // console.log(items_cart)
                    state.event.forEach(items_event => {
                        // console.log('items_event ==> ',items_event)
                        // console.log('items_cart ==> ',items_cart)
                        if(Number(items_cart.eventId) === Number(items_event.id) ){
                            // console.log(items_cart)
                            // console.log('======')
                            // console.log(items_event)
                            items_event.ticket_Category.forEach((item_ticket_Category)=>{
                                // console.log(item_ticket_Category)
                                if( Number(items_cart.eventPackage) === Number(item_ticket_Category.id_ticket_Category) ){
                                    cart_array.push({...items_cart , 'info_event':items_event , 'category_ticket' : item_ticket_Category })
                                }
                            })
                        }
                    });
                })
                setDataCart(cart_array)
                // console.log(cart_array)
            isCancelled = true
        }
    },[])


    const deleteOrder = (param_idOrder)=>{
        console.log(param_idOrder)
        // console.log(dataCart)
        setDataCart( dataCart.filter((itemOrder)=> itemOrder.id_order !== param_idOrder  ) )
        // deletePost: (state, action) => {
        //     state.posts = state.posts.filter((post) => post.id !== action.payload.id);
        //   },
        // console.log(dataCart)
    }

    useEffect(()=>{
        let someQuantity = 0
        let totalPriceOrders = 0
        dataCart.forEach((itemQuantity)=>{
            // itemQuantity.quatity
            someQuantity += itemQuantity.quatity
            totalPriceOrders += itemQuantity.category_ticket.pric_category
            // console.log(itemQuantity.category_ticket.pric_category)
        })
        // console.log(someQuantity)
        // console.log(totalPriceOrders)
        setsomeQuantityValue(someQuantity)
        setTotalPriceOrdersValue(totalPriceOrders)
    },[dataCart])



    return (
        <div>
            <h1 className='text-center pt-5'> Mon panier</h1>
            <h1> total quantity ticket :  <span className="badge text-bg-danger">{someQuantityValue !== null ? someQuantityValue : 0 }</span></h1>
            <h1> total price : <span className="badge text-bg-danger">{totalPriceOrdersValue !== null ? totalPriceOrdersValue : 0 } MAD</span></h1>
            
                <table className="table">
  <thead>
    <tr>
      <th scope="col">img event</th>
      <th scope="col">title</th>
      <th scope="col">location</th>
      <th scope="col">quatity</th>
      <th scope="col">category</th>
      <th scope="col">price</th>
      <th scope="col">total price</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
    {
    dataCart.length > 0
    ? dataCart.map((item)=>{
        return(
            <tr key={item.id_order}> 
                <td><img className="rounded-circle" style={{'width':'100px'}} src={item.info_event.imageURL} alt=''/></td>
                <td>{item.info_event.title}</td>
                <td>{item.info_event.location}</td>
                <td>{item.quatity}</td>
                <td>{item.category_ticket.category_name}</td>
                <td>{item.category_ticket.pric_category}</td>
                <td>{item.quatity * item.category_ticket.pric_category}</td>
                <td><button onClick={()=> deleteOrder(item.id_order) } type='button' className='btn btn-primary'>delete</button></td>
            </tr>
        )
    })
     : ''
     }
  </tbody>
                </table>
            
        </div>
    );
}

export default Panier;
