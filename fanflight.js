class Wallet{
    constructor(deposit, bonus, winnings)
    {
        this.deposit = deposit;
        this.bonus = bonus;
        this.winnings = winnings;
        this.total = this.bonus + this.deposit + this.winnings;
    }
}

class Player{
    constructor(id, deposit, bonus, winnings)
    {
        this.id = id;
        this.wallet = new Wallet(deposit, bonus, winnings);
    }

    joinContest(discount, fee)
    {
        fee = fee - Math.round(discount * fee * 0.01);

        if(Math.round(fee * 0.01) <= this.wallet.bonus)
        {
            this.wallet.bonus = this.wallet.bonus - Math.round(fee * 0.1);
            fee = fee - Math.round(fee * 0.1);
        }           
        else
        {
            fee  = fee - this.wallet.bonus;
            this.wallet.bonus = 0;
        }
            
        if(this.wallet.deposit <= fee)
        {
            fee = fee - this.wallet.deposit;
            this.wallet.deposit = 0;
        }
        else
        {
            this.wallet.deposit = this.wallet.deposit - fee;
            fee = 0; 
        }
        
        if(this.wallet.winnings <= fee)
        {
            fee = fee - this.wallet.winnings;
            this.wallet.winnings = 0;           
        }
        else
        {
            this.wallet.winnings = this.wallet.winnings - fee;
            fee = 0;
        }

        this.wallet.total = this.wallet.deposit + this.wallet.winnings + this.wallet.bonus;
    }
}

player = new Player(1, 100, 60, 340);

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Input discount in %: ", function(discount){
    rl.question("Input entry fee: ", function(fee){
        player.joinContest(discount, fee);
        console.log("Wallet: " + player.wallet.total);
        console.log("Bonus: "+ player.wallet.bonus);
        console.log("Deposit: "+ player.wallet.deposit);
        console.log("Winnings: "+ player.wallet.winnings);
        rl.close();
    });
});

