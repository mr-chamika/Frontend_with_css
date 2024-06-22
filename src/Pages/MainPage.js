import React, { useEffect,useState } from 'react'
import axios from "axios"

function MainPage(){

    const [date,setDate]=useState("");
    const [sourceCurrency,setsCurrency]=useState(0);
    const [tCurrency,settCurrency]=useState(0);
    const [amount,setAmount]=useState(0);
    const [currencyNames,setCurrencyNames]=useState([]);
    const [finalPrice,setFinalPrice]=useState(0);
    const [confirm, setConfirm]=useState(false);

    const handleSubmit= async (e)=>{

        setConfirm(true);

        e.preventDefault();

        const response = await axios.get("https://backend-with-css.onrender.com/convert",{params:{date,sourceCurrency,tCurrency,amount,},});

        setFinalPrice(response.data);


    }

    useEffect(()=>{

        const getList = async ()=>{

            try{
                
              const responce = await axios.get("https://backend-with-css.onrender.com/getAllCurrency",{

                params:{date,sourceCurrency,tCurrency,amount}

              });
              
              setCurrencyNames(responce.data);


            }catch(err){

                console.error(err);

            }

        }

        getList();

    });

    return(

        <>

            <div>

                <section>

                    <div className="container">
                        
                        <h1>Convert Your Currencies Today</h1>
                    
                        <p>Welcome to "Convert Your Currencies Today"! This application
                        allows you to easily convert currencies based on the latest exchange
                        rates. Whether you're planning a trip, managing Your
                        finances or simply curious about the value of your money in
                        different currencies, this tool is here to help.
                        </p>

                    </div>

                <div>
                    
                        <form onSubmit={handleSubmit}>

                            <label>Date</label>
                            <br></br>
                            <input onChange={(e)=>setDate(e.target.value)} type="Date"/>

                            <br></br>

                            <label>Source Currency</label>
                            <br></br>
                            <select onChange={(e)=>setsCurrency(e.target.value)} name="" id="">

                                <option>select a source currency</option>
                                {Object.keys(currencyNames).map((x)=>(

                                    <option value={x}>{x} : {currencyNames[x]}</option>

                                ))}
                                

                            </select>

                            <br></br>

                            <label>Target Currency</label>
                            <br></br>
                            <select onChange={(e)=>settCurrency(e.target.value)} >

                                <option>select a target currency </option>

                                {Object.keys(currencyNames).map((y)=>(

                                    <option value={y}>{y} : {currencyNames[y]}</option>

                                ))}

                            </select>

                            <br></br>

                            <label>Amount in source currency</label>
                            <br></br>
                            <input onChange={(e)=>setAmount(e.target.value)} type="text" placeholder='Amount in source currency.........' />

                            <br></br>

                            <button>Get the target Currency</button>

                            <br></br>

                             {(confirm && date)?   
                            
                            <label>{amount} {sourceCurrency} is {finalPrice.toFixed(2)} {tCurrency}</label>
                             
                             :""}

                        </form>
                    </div>
                </section>    
            </div>

        </>

    );

}

export default MainPage
