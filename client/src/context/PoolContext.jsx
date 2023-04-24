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

    const placeBet = async () => {
        console.log("placing bet...")
        const { poolGasPrice, poolContract } = createPoolContract();
        const { pmcGasPrice, pmcContract } = createPMCContract();

        console.log(poolGasPrice.toString());
        console.log(pmcGasPrice.toString());

        //const estimation = await poolContract.estimateGas.transfer(currentAccount, 100);
        //console.log(estimation);

        //const balance = await poolContract.accountBalance(currentAccount,ethers.utils.formatBytes32String('CSK'))
        //console.log(ethers.utils.formatEther(balance))

        const approve = await pmcContract.approve(poolContract.address,100,{gasPrice:pmcGasPrice,gasLimit:pmcGasPrice})
        approve.wait()
        console.log(approve)
        const deposit = await poolContract.depositTokens(ethers.utils.formatBytes32String('PMC'),ethers.utils.formatBytes32String('CSK'),100,{gasPrice:poolGasPrice,gasLimit:poolGasPrice});
        deposit.wait()
        console.log(deposit)
        //const approve = await pmcContract.approve(poolContract.address,50)
        //console.log(approve)
        //const deposit = await poolContract.depositTokens(ethers.utils.formatBytes32String('PMC'),ethers.utils.formatBytes32String('CSK'),10);
        //console.log(pmcContract);

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
