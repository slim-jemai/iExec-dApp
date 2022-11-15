iExec NFT lottery Decentralized Application

A dApp that allows the user to enter in a lottery to win an NFT
first the user has to connect to the application using Metamask
the application provides three functionalities\
Enter lottery ( available for any user ) : allows the user to participate in the lottery\
Pick winner ( available only for admin ) : picks winner from the list of participated players\
Pay winner ( available only for admin ) : transfer the NFT to the lottery winner account (or total deposited amount of eth)\

the winner is decided by a Verifiable Random Function (VRF) that provides a fairly random number to choose the winner\

Along with these functionalities we can view the lottery history as well as the list of participated players and the pot containing all the deposited
ether by all the players\

in case the implementation of the NFT transfer fails the winner gets all the deposited ether amount instead\

Application architecture :\
the application is composed of two main folders\
lottery_dApp : which contains all the necessary files for the frontend UI and to link it with the blockchain part\
smart_contract : which has the solidity smart contracts and deployment scripts along with the necessary dependencies\

Technologies used for the web UI part:\
NextJS , React , Javascript\

Technologies used for the blockchain part:\
Solidity for smart contracts\
Hardhat for Compiling and deploying the smart contract\
Alchemy to create and test the dApp\
Chainlink for off chain computation and random number generation\
