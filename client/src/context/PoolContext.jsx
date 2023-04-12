import React, {useEffect, useState} from "react";
import { ethers } from "ethers"
// import { contractAbi, contractAddress } from "../utils/constants";

export const PoolContext = React.createContext()

const { ethereum } = window

export const PoolProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("")

    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: "eth_accounts"})
            if(accounts.length){
                setCurrentAccount(accounts[0])
            }
        } catch(error){
            console.log(error)
            alert("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: "eth_requestAccounts"})
            console.log("accountcontext: ", accounts)
            setCurrentAccount(accounts[0])
        } catch(error){
            console.log(error)
            alert("No ethereum object")
        }
    }

    const placeBet = async () => {
        console.log("placing bet...")
        // try{
        //     if(!ethereum) return alert("Please install metamask")
        //     const electionContract = getEthereumContract()
        //     const electionHash = await electionContract.vote(parseInt(formData.candidate))
        //     setIsLoading(true)
        //     console.log(`Loading vote transaction: ${electionHash.hash}`)
        //     electionHash.wait()
        //     console.log(`success vote transaction: ${electionHash.hash}`)
        //     setIsLoading(false)
        // } catch(error){
        //     console.log(error)
        //     alert("No ethereum object")
        // }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return(
        <PoolContext.Provider value={{ connectWallet, currentAccount, placeBet }}>
            {children}
        </PoolContext.Provider>
    )
}