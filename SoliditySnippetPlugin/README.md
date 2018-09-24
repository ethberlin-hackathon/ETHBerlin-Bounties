# Solidity Snippet Plugin for Remix
The following documents the guide to using the Solidity snippet plugin for truffle that was developed to statisfy a gitcoin bounty put out by Remix:

To inport the plugin follow the steps in https://github.com/yann300/remix-plugin .

This system works based on three possible types of butttons: quote to file, quote to project, and auto inport buttons.

To work the first two buttons you need to put the github raw code url into the first blank then but the line to start quoting at in the second blank and the line to stop quoting at in the thrid blank.

The quote to file has several options to make setting up the file easier. If startline > 0 it will insert the contract name as the properly formated solidity contract declartion line. For this reason always either quote the whole file or a code snippet within the body of a contract. Additionally if endline is equal to zero the code will automaticly inport the whole file so that you do not need to know the exact length of the code inported. If you wish to quote code within a function without getting the whole function you can check the check box and then provide the solidity code function line to insert.

Example usage: URL: https://raw.githubusercontent.com/auth-os/core/dev/contracts/core/AbstractStorage.sol , Startline: 47, Endline:57, contract name: registry, Function Line unchecked will write a file registry.sol:

    pragma solidity ^0.4.23;

    contract registry{

    function createRegistry(address _registry_idx, address _implementation) external returns (bytes32) {
        bytes32 new_exec_id = keccak256(++nonce);
        put(new_exec_id, keccak256(msg.sender, EXEC_PERMISSIONS), bytes32(1));
        put(new_exec_id, APP_IDX_ADDR, bytes32(_registry_idx));
        put(new_exec_id, keccak256(REG_APP, 'implementation'), bytes32(_implementation));
        put(new_exec_id, keccak256(REG_APP_VER, 'implementation'), bytes32(_implementation));
        put(new_exec_id, keccak256(UPDATE_INST_SEL, 'implementation'), bytes32(_implementation));
        put(new_exec_id, keccak256(UPDATE_EXEC_SEL, 'implementation'), bytes32(_implementation));
        emit ApplicationInitialized(new_exec_id, _registry_idx, msg.sender);
        return new_exec_id;
    }
    }
  
URL: https://raw.githubusercontent.com/auth-os/core/dev/contracts/core/AbstractStorage.sol , Startline: 48, Endline:56, contract name: registry, Function Line checked with value "function createRegistry(address _registry_idx, address _implementation) external returns (bytes32) {" will write a file registry.sol which is identical to the one above.

Both URL: https://raw.githubusercontent.com/auth-os/core/dev/contracts/core/AbstractStorage.sol , Startline: 0, Endline: 0, contract name: registry, Function Line unchecked 
and URL: https://raw.githubusercontent.com/auth-os/core/dev/contracts/core/AbstractStorage.sol , Startline: 0, Endline: 590, contract name: registry, Function Line unchecked
Will output files called registry.sol which contain all of the code of AbstractStorage.sol

The quote to project takes a selected snippet of a github raw file or other pure text code file and inserts in the given line in the project you are currently working on. Place the url to the code in the url imput field, the start line of the quote in the second and the end line of the quote in the thrid. Then under quote to project specify the line at which you want the code to be inserted and click the button.

Example usage: URL: https://raw.githubusercontent.com/auth-os/core/dev/contracts/core/AbstractStorage.sol , Startline: 48, Endline:56 Insert Position: 0 will place the following on the first line of your file:

    bytes32 new_exec_id = keccak256(++nonce);
    put(new_exec_id, keccak256(msg.sender, EXEC_PERMISSIONS), bytes32(1));
    put(new_exec_id, APP_IDX_ADDR, bytes32(_registry_idx));
    put(new_exec_id, keccak256(REG_APP, 'implementation'), bytes32(_implementation));
    put(new_exec_id, keccak256(REG_APP_VER, 'implementation'), bytes32(_implementation));
    put(new_exec_id, keccak256(UPDATE_INST_SEL, 'implementation'), bytes32(_implementation));
    put(new_exec_id, keccak256(UPDATE_EXEC_SEL, 'implementation'), bytes32(_implementation));
    emit ApplicationInitialized(new_exec_id, _registry_idx, msg.sender);
    return new_exec_id;

The project inport buttons will place a copy of the current master branch of the project they reference in your browser directory and place an inport line for the project after the 0th line of your code. 

The Inport Safe Math button inport the openzepplin safemath library "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol"
The Inport Ownable button inports the openzepplin ownable library "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol"
The Inport Merkle Proofs button inports the openzepplin merkle library "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/cryptography/MerkleProof.sol"
The Inport Eleptic Curve Signatures button inports the openzepplin ECDSA library "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/cryptography/ECDSA.sol"
