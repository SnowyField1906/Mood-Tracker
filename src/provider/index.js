import { ethers } from "ethers"

import { contractABI, contractAddress } from '../utils/index'

const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
provider.send("eth_requestAccounts", [])
const signer = provider.getSigner()
const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)

const addMood = async (date, mood) => {
    await contractInstance.addMood(date, mood, signer.getAddress(), { gasLimit: 3000000 })
}

export const viewMood = async (date) => {
    return new Promise(async (resolve, reject) => {
        const mood = await contractInstance.viewMood(date, signer.getAddress())
        .then((mood) => {
            resolve(mood)
        })
        .catch((err) => {
            reject(err)
        })
    })
}