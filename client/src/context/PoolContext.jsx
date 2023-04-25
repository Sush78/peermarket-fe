import React, {useEffect, useState} from "react";
import { ethers } from "ethers"
import { poolContractABI, poolContractAddress, pmcContractABI, pmcContractAddress} from "../utils/constants/contract";

export const PoolContext = React.createContext()

const { ethereum } = window

export const PoolProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("")

    const createPoolContract = () => {
      const provider = new ethers.providers.Web3Provider(ethereum); //new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gasPrice = provider.getGasPrice();
      const erc20VerifierContract = new ethers.Contract(poolContractAddress, poolContractABI, signer);
      return {
        poolGasPrice:gasPrice,
        poolContract:erc20VerifierContract
      };
    };

    const createPMCContract = () => {
      const provider = new ethers.providers.Web3Provider(ethereum); //new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gasPrice = provider.getGasPrice();
      const erc20VerifierContract = new ethers.Contract(pmcContractAddress, pmcContractABI, signer);
      return {
        pmcGasPrice:gasPrice,
        pmcContract:erc20VerifierContract
      };
    };

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

    const selectChoice = async (choice) => {
      if (choice){
        return ethers.utils.formatBytes32String('CSK')
      } else{
        return ethers.utils.formatBytes32String('RCB')
      }
    }

    const placeBet = async (amount,choice) => {
        console.log("placing bet...")
        try{
          if(!ethereum) return alert("Please install metamask")

          const betChoice = await selectChoice(choice)

          const { poolGasPrice, poolContract } = createPoolContract();
          const { pmcGasPrice, pmcContract } = createPMCContract();

          const allow = await pmcContract.approve(poolContract.address,amount,{gasPrice:pmcGasPrice,gasLimit:100000})
          const deposit = await poolContract.depositTokens(ethers.utils.formatBytes32String('PMC'),betChoice,amount,{gasPrice:poolGasPrice,gasLimit:100000});

          console.log(deposit.hash)
        }  catch(error){
          console.log(error)
          alert("Could not deposit into pool")
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
