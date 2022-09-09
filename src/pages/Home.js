import { useState } from 'react'
import { ethers } from "ethers"

import { contractABI, contractAddress } from '../utils/index';

function Home() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Account:", signer.getAddress());

    const [addCardState, setAddCardState] = useState({
        name: "",
        price: "",
        lifeSpan: "",
    });

    const handleAddCardState = (e) => {
        setAddCardState({ ...addCardState, [e.target.name]: e.target.value });
    }

    const handleAddCardAction = async () => {
        await contractInstance.addCard(addCardState.name, addCardState.price, addCardState.lifeSpan);
    }

    return (
        <div className="rounded-lg shadow-lg w-auto my-6 mx-auto max-w-3xl justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="flex-col w-full bg-slate-900">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-white">Administrator mode</h3>
                </div>

                <div className="relative p-5 flex-auto">

                    <div className='flex w-full justify-evenly'>
                        <div className='grid overflow-hidden grid-cols-3 grid-rows-4 gap-x-3 gap-y-1 text-right items-center'>
                            <p className='box text-white text-xl'>Name</p>
                            <input type="text" name="name" value={addCardState.name} onChange={handleAddCardState}
                                className='box col-start-2 col-end-4 form-control block w-full px-3 py-1.5 text-base font-normal text-white bg-gray-800 bg-clip-padding border-solid border-2 border-gray-500 rounded transition ease-in-out focus:text-white focus:bg-gray-800 focus:border-blue-500 focus:outline-none'
                            />
                            <p className='box text-white text-xl'>Price</p>
                            <input type="text" name="price" value={addCardState.price} onChange={handleAddCardState}
                                className='box col-start-2 col-end-4 form-control block w-full px-3 py-1.5 text-base font-normal text-white bg-gray-800 bg-clip-padding border-solid border-2 border-gray-500 rounded transition ease-in-out focus:text-white focus:bg-gray-800 focus:border-blue-500 focus:outline-none'
                            />
                            <p className='box text-white text-xl'>Life span</p>
                            <input type="text" name="lifeSpan" value={addCardState.lifeSpan} onChange={handleAddCardState}
                                className='box col-start-2 col-end-4 form-control block w-full px-3 py-1.5 text-base font-normal text-white bg-gray-800 bg-clip-padding border-solid border-2 border-gray-500 rounded transition ease-in-out focus:text-white focus:bg-gray-800 focus:border-blue-500 focus:outline-none'
                            />
                            <button onClick={handleAddCardAction} className='box col-start-2 col-end-4 text-white text-3xl'>Add card</button>
                        </div>
                    </div>

                    <div>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Home
