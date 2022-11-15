import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import lotteryContract from '../blockchain/lottery'

export default function Home() {

  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()
  const [lcContract, setLcContract] = useState()
  const [lotteryPot, setLotteryPot] = useState()
  const [lotteryPlayers, setPlayers] = useState([])
  const [lotteryHistory, setLotteryHistory] = useState([])
  const [lotteryId, setLotteryId] = useState()
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    updateState()
  }, [lcContract])

  const updateState = () => {
    if (lcContract) getPot()
    if (lcContract) getPlayers()
    //if (lcContract) getLotteryId()
  }

  const getPot = async () => {
    const pot = await lcContract.methods.getBalance().call()
    setLotteryPot(web3.utils.fromWei(pot, 'ether'))
  }

  const getPlayers = async () => {
    const players = await lcContract.methods.getPlayers().call()
    setPlayers(players)
  }

  const enterLotteryHandler = async () => {
    setError('')
    setSuccessMsg('')
    try {
      await lcContract.methods.enter().send({
        from: address,
        value: '15000000000000000',
        gas: 300000,
        gasPrice: null
      })
      updateState()
    } catch(err) {
      setError(err.message)
    }
  }

  const connectWalletHandler = async () => {

    // check if MetaMask is installed 
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        // request wallet connection 
        await window.ethereum.request({ method: "eth_requestAccounts"})
        // create web3 instance & set to state 
        const web3 = new Web3(window.ethereum)
        // set web3 instance in React state 
        setWeb3(web3)
        // get list of accounts 
        const accounts = await web3.eth.getAccounts()
        // set account 1 to React state 
        setAddress(accounts[0])
        // create local contract copy 
        const lc = lotteryContract(web3)
        setLcContract(lc)

        /* window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()
          console.log(accounts[0])
          // set account 1 to React state 
          setAddress(accounts[0])
        }) */

      } catch(err) {
        setError(err.message)
      }
    } else {
      // MetaMask is not installed 
      console.log("Please install MetaMask")
    }
  }  

  return (
    <div>
      <Head>
        <title>NFT lottery</title>
        <meta name="description" content="An nft lottery dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1>iExec Lottery</h1>
            </div>
            <div className="navbar-end">
              <button onClick={connectWalletHandler} className="button is-link">Connect Wallet</button>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-5">
                  <p>Enter the lottery by sending 0.01 Ether</p>
                  <button onClick={enterLotteryHandler} className="button is-link is-large is-light mt-3">Play now</button>
                </section>
                <section className="mt-6">
                  <p><b>Admin only:</b> Pick winner</p>
                  <button onClick={()=>{}} className="button is-primary is-large is-light mt-3">Pick Winner</button>
                </section>
                <section className="mt-6">
                  <p><b>Admin only:</b> Pay winner</p>
                  <button onClick={()=>{}} className="button is-success is-large is-light mt-3">Pay Winner</button>
                </section>
                <section>
                  <div className="container has-text-danger mt-6">
                    <p>error</p>
                  </div>
                </section>
                <section>
                  <div className="container has-text-success mt-6">
                    <p>success Message</p>
                  </div>
                </section>
              </div>
              <div >
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Lottery History</h2>
                        <div className='history-entry'>
                          <div>Lottery winner number 1</div>
                            <div>
                            <a href={`https://goerli.etherscan.io/address/0x24ed064c2e77943999d3f2983fcf69be92acc672`} target="_blank">
                              0x24Ed064c2E77943999D3F2983fCF69be92ACC672
                            </a>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                      <h2>Players ({lotteryPlayers.length})</h2>
                        <ul className="ml-0">
                          {
                            (lotteryPlayers && lotteryPlayers.length > 0) && lotteryPlayers.map((player, index) => {
                              return <li key={`${player}-${index}`}>
                                <a href={`https://goerli.etherscan.io/address/${player}`} target="_blank">
                                  {player}
                                </a>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Pot</h2>
                        <p>{lotteryPot} ether</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; iExec test</p>
      </footer>
    </div>
  )
}
