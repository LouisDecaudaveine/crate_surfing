#! /usr/bin/env node
import {Command} from "commander";
import { openLoginWebsite, setupLoginServer } from "./login";
import dotenv from 'dotenv'

dotenv.config();

const RESPONSE_TYPE = "code";
const REDIRECT = `http://localhost:${process.env.PORT}/callback`;
const SCOPE = [
    encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile"),
    encodeURIComponent("https://www.googleapis.com/auth/userinfo.email")
].join(" ");
const oAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;


// Declare the program
const program = new Command();

//Add actins onto that CLI
program
    // .argument("<string>", "string to log")
    .action(async () => {
        console.log("CRATE_SURF CLI: ");
        setupLoginServer(); 
        await openLoginWebsite(oAuthUrl);

    })
    .description("Says hello");

// Execute the CLI with given arguments
program.parse(process.argv);

