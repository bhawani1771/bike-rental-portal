import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import '../components/header.css'




function CartBtn(props){

    const [qty , setqty] = useState(1)

function Increase(){
    if(qty < props.availablestock){
         setqty(qty+1)

    }else{
        toast.error("Stock limit reached");
    }
}

function Decrease() {
    if (qty > 1) {
      setqty(qty - 1);
    } else {
      toast.error("Minimum quantity is 1");
    }
  }



    function Addtocart(){
        alert(`${props.cartitem} added in cart....!!`)
    }

    return(
<>
<Toaster position = "top-center"/> 
<strong>{props.cartprice * qty}</strong>
<div className="main">
    <div className="main-in1">

<button onClick={Decrease} className="decrease">-</button>
<span className="qqty">{qty}</span>
<button onClick={Increase} className="increase">+</button>


    </div>
    <div className="main-in2">
<button onClick={Addtocart}className="cartbtn" >Add to Cart</button>

    </div>
</div>


</>

    )

}

export {CartBtn};