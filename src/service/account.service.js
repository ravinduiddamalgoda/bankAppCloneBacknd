import Account from "../models/account.js";

function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function deduct(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);

}

 function generateACCID() {

  let chars = '0123456789'; // Characters to use for ID
  let accID = '';
  for (let i = 0; i < 8; i++) { // Loop 8 times to create 8 character ID
    accID += chars.charAt(Math.floor(Math.random() * chars.length)); // Add random character from chars to ID
  }
  console.log(accID);
  // Check if ID has already been generated
  const existingAccNO = findACbyACno(accID);

  if (!existingAccNO) {
    // If so, generate a new ID
    return generateACCID();
  } else {
    // Otherwise, add ID to generatedIDs array and return it
    let fAcc = accID.toString();
    return fAcc
  }
}





async function registerAccount(email) {
  
  const accNum = generateACCID();
  // const val = await findACbyACno('123213221')
  // console.log(val)
  const newAccount = new Account({
    accountNo: accNum,
    ownersEmail: email,
    amount: 0,
  });
  // console.log(accNum);
  await newAccount.save();
  
}


async function addAmoutAcc(accno , amount){

  try{
    const userData = await findAccountByAc(accno);

    const tot = add(userData?.amount , amount)

    await Account.findOneAndUpdate({ accountNo: accno }, { amount: amount });
    

  }
  catch(err){
    return { err: "Not Found" }
  }
  
  
  
}


async function findAccByEmail(email){
  const userByEmail = await Account.findOne({ownersEmail:email})
  if(userByEmail)
    return userByEmail
  else
    return { err: "Not Found" }
}

async function findACbyACno(accNo){
  const existinAccount = await Account.findOne({accountNo:accNo});
  if(!existinAccount)
    return true
  else
    return false
}


async function findAccountByAc(accountNo) {
  const existinAccount = await Account.findOne({
    accountNo:accountNo
  });

  return existinAccount;
}

async function calculateBalance(currentAmount, transferAmount) {
  try {
    if (currentAmount > transferAmount) {
      const balance = deduct(currentAmount, transferAmount);

      return balance;
    } else {
      return 0;
    }
  } catch (err) {
    return { err: err.message };
  }
}
async function updateSenderAccount(account, balance) {
  console.log(account);
  console.log(balance);

  await Account.findOneAndUpdate({ accountNo: account }, { amount: balance });
}

async function updateReceiverAccount(account, amount) {
  await Account.findOneAndUpdate({ accountNo: account }, { amount: amount });
}

async function totalAmount(currentAmount, transferamount) {
  const totalamount = add(currentAmount, transferamount);
  return totalamount;

  // [
  //     {
  //       '$lookup': {
  //         'from': 'accounts',
  //         'localField': 'recieverAC',
  //         'foreignField': 'accountNo',
  //         'as': 'result'
  //       }
  //     }, {
  //       '$group': {
  //         '_id': {
  //           '$sum': '$amount'
  //         }
  //       }
  //     }
  //   ]
  
}

export default {
  registerAccount,
  findAccountByAc,
  totalAmount,
  updateReceiverAccount,
  updateSenderAccount,
  calculateBalance,
  findAccByEmail
};
