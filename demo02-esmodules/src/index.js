import database from "./../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANGUAGE = 'pt-br'
const STOP_TERMINAL = "exit"
const terminalController = new TerminalController()
terminalController.initializeTerminal(database,DEFAULT_LANGUAGE) 

async function mainLoop(){
  try{
    const answer = await terminalController.question("What?\n")
    if(answer.toLowerCase().trim() === STOP_TERMINAL.toLowerCase().trim()){
    
      console.log("Process finished!")
      terminalController.closeTerminal()
      return;
    }
    const person = Person.generateInstanceOfString(answer).formatted(DEFAULT_LANGUAGE)
    console.log(person)
    return mainLoop()
  }catch(err){
    console.error("Error",err)
    mainLoop()
  }
}

await mainLoop()