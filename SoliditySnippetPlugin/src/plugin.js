
/*
test contract creation
*/
var addrResolverByteCode = '0x6060604052341561000f57600080fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061033c8061005f6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806338cc483114610067578063767800de146100bc578063a6f9dae114610111578063d1d80fdf1461014a575b600080fd5b341561007257600080fd5b61007a610183565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100c757600080fd5b6100cf6101ac565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011c57600080fd5b610148600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101d1565b005b341561015557600080fd5b610181600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610271565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561022d57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102cd57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a723058201b23355f578cb9a23c0a43a440ab2631b62df7be0a8e759812a70f01344224da0029'

const ownableURL = "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/Math.sol"
const safemathURL = "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol"
const merkleURL = "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/cryptography/MerkleProof.sol"
const sigURL = "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/cryptography/ECDSA.sol"
const stringURL = "https://github.com/Arachnid/solidity-stringutils/src/strings.sol"
const openzBaseURL ="https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/"

const addrResolverTx = {
  gasLimit: '0x2710',
  from: '0xca35b7d915458ef540ade6068dfe2f44e8fa733c',
  data: addrResolverByteCode,
  value: '0x00',
  useCall: false
}
var extension = new window.RemixExtension()
window.onload = function () {
  extension.listen('compiler', 'compilationFinished', function () {
    console.log(arguments)
  })

  setInterval(function () {
    extension.call('app', 'detectNetWork', [], function (error, result) {
      console.log(error, result)
    })
  }, 5000)

  document.querySelector('input#quoteToFile').addEventListener('click', function () {
    fileParser(fetch(document.getElementById('gitURL').value),
    document.getElementById('codeStart').value,
    document.getElementById('codeEnd').value, document.getElementById('contractName').value,
    document.getElementById('hasFunctionLine').checked
    )

    extension.call('editor','getCurrentFile', [], function (error, result) {
      extension.call('editor','getFile', [result[0]], function (error1, result1) {

        insertImport(result1[0], result[0],  document.getElementById('contractName').value, true)
    })
  })
  })
  document.querySelector('input#quoteToProject').addEventListener('click', function () {
    extension.call('editor','getCurrentFile', [], function (error, result) {
      extension.call('editor','getFile', [result[0]], function (error1, result1) {

        projectParser(fetch(document.getElementById('gitURL').value),
        document.getElementById('codeStart').value,
        document.getElementById('codeEnd').value, result1[0].split('\n'),result[0])
      })

     })
  })
  document.querySelector('input#safeMath').addEventListener('click', function () {

    extension.call('editor','getCurrentFile', [], function (error, result) {
      extension.call('editor','getFile', [result[0]], function (error1, result1) {

        insertImport(result1[0], result[0], safemathURL, false)
    })
  })
  })
  document.querySelector('input#ownable').addEventListener('click', function () {

    extension.call('editor','getCurrentFile', [], function (error, result) {
      extension.call('editor','getFile', [result[0]], function (error1, result1) {

        insertImport(result1[0], result[0], ownableURL, false)
    })
  })
  })
  document.querySelector('input#merkle').addEventListener('click', function () {

    extension.call('editor','getCurrentFile', [], function (error, result) {
      extension.call('editor','getFile', [result[0]], function (error1, result1) {

      insertImport(result1[0], result[0], merkleURL, false)
    })
  })
  })
  document.querySelector('input#sig').addEventListener('click', function () {

    extension.call('editor','getCurrentFile', [], function (error, result) {
      extension.call('editor','getFile', [result[0]], function (error1, result1) {

        insertImport(result1[0], result[0], sigURL, false)
    })
  })
 })
 document.querySelector('input#string').addEventListener('click', function () {

   extension.call('editor','getCurrentFile', [], function (error, result) {
     extension.call('editor','getFile', [result[0]], function (error1, result1) {

       insertImport(result1[0], result[0], stringURL, false)
   })
 })
})

document.querySelector('input#zepplinImport').addEventListener('click', function () {
  zepplinURL = openzBaseURL + document.getElementById('path').value

  extension.call('editor','getCurrentFile', [], function (error, result) {
    extension.call('editor','getFile', [result[0]], function (error1, result1) {

      insertImport(result1[0], result[0], zepplinURL, false)
  })
  })
})
}

async function insertImport(code, currentPath, toImport, isLocal){
  code = await code.split('\n')
  if(isLocal){
    await code.splice(1,0,"import \"./" + toImport + ".sol\"\;")
  }else{
    await code.splice(1,0,"import \"" + toImport + "\"\;")
  }

  currentCode = await code.join('\n')
  await extension.call('editor', 'setFile', [currentPath, currentCode], function (error, result) { console.log(error, result) })
}

async function projectParser(fetchReturn, start, end, code, currentPath){
  let currentCode = await code
  let data = await fetchReturn
  data = await data.text()
  data = data.split('\n')

  let elementsAtEnd = await data.length - end
  await data.splice(0,start-2) //minus two since one is at the start and we want to include start line
  await data.splice(end - start, elementsAtEnd)

  for(i = data.length; i >=0; i = i - 1){
      await currentCode.splice(document.getElementById('insertionLine').value, 0, data[i])
  }

  currentCode = await currentCode.join('\n')
  console.log(currentPath)
  console.log(currentCode)
  await extension.call('editor', 'setFile', [currentPath, currentCode], function (error, result) { console.log(error, result) })
}

async function fileParser(fetchReturn, start, end, contractName, hasFunction) {
  let data = await fetchReturn
  data = await data.text()
  data = data.split('\n')

  let len = await data.length
  if(end === 0){
    end = len
  }
  let elementsAtEnd = await len - end
  await data.splice(1,start-2) //minus two since one is at the start and we want to include start line
  await data.splice(end - start, elementsAtEnd)

  if(start>0){
    await data.splice(1,0, " contract " + contractName + " {")
  }
  if(end<len){
    await data.splice(data.length-1,0," } ")
  }

  if(hasFunction){
    await data.splice(2,0, document.getElementById('functionName').value)
    await data.splice(data.length-1,0," } ")
  }

  let path = await "browser/" + contractName +".sol"
  let content = await data.join('\n')
  extension.call('editor', 'setFile', [path, content], function (error, result) { console.log(error, result) })
}
