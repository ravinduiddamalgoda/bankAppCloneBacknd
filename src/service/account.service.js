import Account from "../models/account.js";

function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function deduct(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}
async function registerAccount(email) {
  const newAccount = new Account({
    accountNo: "ABC5",
    ownersEmail: email,
    amount: 0,
  });

  await newAccount.save();
}

async function findAccountByAc(accountNo) {
  const existinAccount = await Account.findOne({
    accountNo,
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
};
