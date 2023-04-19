import React, {useEffect, useState} from "react";
import { ethers } from "ethers"
import { contractAbi, contractAddress } from "../utils/smart-contracts/constants";
//0xD9e68459eb84b604D6dFe7bE1C0079Fc0365C971

export const PoolContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () => {
    //"https://rpc-mumbai.maticvigil.com"
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/6F2K-LHaNFo0kjX6Va7yeOdKpL5dO2NY")
    window.ethereum.enable()
    const signer = provider.getSigner()
    console.log("signer: ", signer)
    // const wallet = new ethers.Wallet(ethPrivkey, provider);
    const poolContract = new ethers.Contract(contractAddress, contractAbi, signer)
    console.log(poolContract)
    return poolContract
}


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

    const placeBet = async (amount, choice) => {
        console.log("placing bet with amount: ", amount, choice)
        try{
            if(!ethereum) return alert("Please install metamask")
            const poolContract = getEthereumContract()
            const amt = ethers.utils.parseEther(amount.toString())
            console.log("amt: ", amt)
            // await ethereum.request({
            //     method: "eth_sendTransaction",
            //     params: [{
            //       from: currentAccount,
            //       to: addressTo,
            //       gas: "0x5208",
            //       value: parsedAmount._hex,
            //     }],
            //   });
            console.log("account: ", currentAccount)
            const poolHash = await poolContract.depositTokens("PMC","CSK",amt)
            setIsLoading(true)
            console.log(`Loading vote transaction: ${electionHash.hash}`)
            electionHash.wait()
            console.log(`success vote transaction: ${electionHash.hash}`)
            setIsLoading(false)
        } catch(error){
            console.log(error)
            alert("No ethereum object")
        }
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