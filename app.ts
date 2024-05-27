#! /usr/bin/env node 
import chalk from "chalk";
import { differenceInSeconds, DifferenceInSecondsOptions } from "date-fns";
import inquirer from "inquirer";
// for decreasing in seconds
function*countDownTimer(second:number){
    while(second >0){
        yield second;
        second--;
    }
}
let secondInput = await inquirer.prompt({
    name:"timer",
    type:"input",
    message:"Set the initial counter value in seconds:"
})
console.log(`${chalk.bold.italic.green(`Initial Time = `)}${chalk.bold.italic.blue(secondInput.timer)}\n${("-").repeat(23)}`);
//ye arguments pass kr raha ky kis sy countdowntimer ko decreasing sec krna hai
let timerIterator = countDownTimer(secondInput.timer);
function displayCountDown(){
    let result = timerIterator.next() //generator sy next value lena
    if(!result.done){ // agr value done nhi hai to ye baqi second ko dekhata hai ar phir one sec baad dubara dispalycountDown ko call krta hai.
        // current Time & date call
        const now = new Date;
        // Calculate minutes in a seconds
        const countDownTimer = new Date(now.getTime() + (result.value*1000));
        //Calculate remaning seconds in Time
       const remaningSeconds = differenceInSeconds(countDownTimer,now);
       console.log(`${chalk.bold.bold.green(" Remaing Seconds: ")}${chalk.bold.blue(`${remaningSeconds}s`)}`);
       setTimeout(displayCountDown,1000);
    }else{
        console.log(`${("-").repeat(23)}\n${chalk.bold.italic.red("CountDown Complete!")}`);
        
    }
}
displayCountDown();