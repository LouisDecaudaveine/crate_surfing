#! /usr/bin/env node
import {Command} from "commander";
import dotenv from 'dotenv'
import uploadCommand from "./commands/upload";

dotenv.config();



// Declare the program
const program = new Command();

//Add actins onto that CLI
uploadCommand(program);

// Execute the CLI with given arguments
program.parse(process.argv);

