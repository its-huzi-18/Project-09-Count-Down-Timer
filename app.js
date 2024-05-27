#! /usr/bin/env node 
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
function* countDownTimer(second) {
    while (second > 0) {
        yield second;
        second--;
    }
}
let secondInput = await inquirer.prompt({
    name: "timer",
    type: "input",
    message: "Set the initial counter value in seconds:"
});
console.log(`${chalk.bold.italic.green(`Initial Time = `)}${chalk.bold.italic.blue(secondInput.timer)}\n${("-").repeat(23)}`);
let timerIterator = countDownTimer(secondInput.timer);
function displayCountDown() {
    let result = timerIterator.next();
    if (!result.done) {
        // current Time & date call
        const now = new Date;
        // Calculate minutes in a seconds
        const countDownTimer = new Date(now.getTime() + (result.value * 1000));
        //Calculate remaning seconds in Time
        const remaningSeconds = differenceInSeconds(countDownTimer, now);
        console.log(`${chalk.bold.bold.green(" Remaing Seconds: ")}${chalk.bold.blue(`${remaningSeconds}s`)}`);
        setTimeout(displayCountDown, 1000);
    }
    else {
        console.log(`${("-").repeat(23)}\n${chalk.bold.italic.red("CountDown Complete!")}`);
    }
}
displayCountDown();
