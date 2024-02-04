// Termino.js - Terminal App Demo (Advanced)
import { Termino } from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.0/dist/termino.min.js';

// initialize a Terminal via Termino.js   
let term3 = Termino(document.getElementById("Example_Terminal_3"));

// YOUR COOL CUSTOM FUNCTIONS BELOW FOR YOUR APP.
async function SearchGitHubProfile() {
    try {
        let username = await term3.input("What profile would you like to search?");
        term3.echo(username);
        if (!username) {
            throw {
                message: "No username was provided"
            };
        }
        const response = await fetch(`https://api.github.com/users/${username}`);
        let data = await response.json();
        if (data.login === undefined) {
            throw {
                message: "Profile was not found"
            };
        }
        term3.output(`You searched for: ${data.login}, they have ${data.followers} followers, & ${data.public_repos} public repos`);
    } catch (error) {
        term3.output(`Failed to get GitHub info ${error.message}`);
    }
}

function ascii_art() {
    term3.output(`
    █████▒ ██▓ ██▓    ▓█████ ▒███████▒
  ▓██   ▒ ▓██▒▓██▒    ▓█   ▀ ▒ ▒ ▒ ▄▀░
  ▒████ ░ ▒██▒▒██░    ▒███   ░ ▒ ▄▀▒░
  ░▓█▒  ░ ░██░▒██░    ▒▓█  ▄   ▄▀▒   ░
  ░▒█░    ░██░░██████▒░▒████▒▒███████▒
   ▒ ░    ░▓  ░ ▒░▓  ░░░ ▒░ ░░▒▒ ▓░▒░▒
   ░       ▒ ░░ ░ ▒  ░ ░ ░  ░░░▒ ▒ ░ ▒
   ░ ░     ▒ ░  ░ ░      ░   ░ ░ ░ ░ ░
           ░      ░  ░   ░  ░  ░ ░    
                             ░        ⠀⠀⠀
    `);
}

let commandHistory = [];
let commandIndex = 0;

let YOUR_FUNCTIONS = ["SearchGitHubProfile", "printInfoAboutDev","calculator", "help", "demo_menu", "exit", "hello", "cool", "ifconfig", "date", "whoami", "clear", "pwd", "ping","ascii_art","curl","wget","python"];

async function add_numbers() {
    let number1 = await term3.input("First number to add");
    let number2 = await term3.input("Second number to add");
    term3.output(Number(number1) + Number(number2));
}

async function hello() {
    term3.output("Hello! How are you?");
}

async function cool() {
    term3.output("ikr");
}

function date() {
    const currentDate = new Date();
    term3.output(currentDate.toString());
}

function whoami() {
    const userId = localStorage.getItem("customClientID");
    let isRootUser = localStorage.getItem("DevMode");

    // If DevMode is null, set isRootUser to false
    if (isRootUser === null) {
        isRootUser = false;
    }

    if (userId === null) {
        term3.output("user | isRoot=" + isRootUser);
    } else {
        term3.output(userId + " | isRoot=" + isRootUser);
    }
}

function clear() {
    term3.clear();
}

function pwd() {
    term3.output(`${window.location.href}`);
}


async function python() {
    term3.output("Starting Python interpreter. Type 'exit' to return to the terminal.");

    // Initialize Brython
    brython();

    // Create a Python input prompt
    term3.prompt = ">>> ";

    // Handle Python input
    while (true) {
        const pythonInput = await term3.input("");

        if (pythonInput.trim().toLowerCase() === 'exit') {
            term3.prompt = "> "; // Reset the prompt
            term3.output("Exiting Python interpreter.");
            break;
        }

        // Evaluate Python code
        try {
            if (pythonInput.trim() !== '') {
                const result = window.__BRYTHON__.run_script(pythonInput);
                term3.output(result.toString());
            }
        } catch (error) {
            term3.output("Python Error: " + error.message);
        }
    }
}





async function ping() {
    try {
        const host = await term3.input("Enter the host to ping:");
        if (!host) {
            term3.output("Host not provided. Ping aborted.");
            return;
        }

        term3.output(`Pinging ${host} with 32 bytes of data:`);
        term3.output("Press Ctrl+C to stop the ping.");

        let continuePinging = true;
        const times = [];

        const handleKeyPress = (e) => {
            if (e.key === 'c' && e.ctrlKey) {
                term3.output("\nPing interrupted by Ctrl+C.");
                continuePinging = false;
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        const pingCount = 5; // Maximum number of ping requests
        const delayBetweenPings = 1500; // 1.5 seconds delay

        // Limit the ping count to 5 and add a delay between pings
        for (let i = 0; i < pingCount && continuePinging; i++) {
            try {
                const startTime = new Date().getTime();
                await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://${host}`)}`);
                const endTime = new Date().getTime();
                const roundTripTime = endTime - startTime;

                term3.output(`Reply from ${host}: bytes=32 time=${roundTripTime}ms TTL=56`);
                times.push(roundTripTime);
            } catch (error) {
                term3.output(`Ping attempt ${i + 1} failed - ${error.message}`);
            }

            // Check if the user wants to stop pinging
            if (i < pingCount - 1) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenPings));
            }
        }

        document.removeEventListener('keydown', handleKeyPress);

        const packetLoss = (pingCount - times.length) / pingCount * 100;
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const avgTime = times.length > 0 ? Math.round(times.reduce((sum, time) => sum + time, 0) / times.length) : 0;

        term3.output("");
        term3.output(`\nPing statistics for ${host}:`);
        term3.output(`    Packets: Sent = ${pingCount}, Received = ${times.length}, Lost = ${pingCount - times.length} (${packetLoss}% loss),`);
        term3.output(`Approximate round trip times in milli-seconds:`);
        term3.output(`    Minimum = ${minTime}ms, Maximum = ${maxTime}ms, Average = ${avgTime}ms`);
    } catch (error) {
        term3.output(`Ping failed - ${error.message}`);
    }
}

async function ifconfig() {
    try {
        const ipAddressResponse = await fetch('https://api64.ipify.org?format=json');
        const ipAddressData = await ipAddressResponse.json();

        if (!ipAddressData.ip) {
            throw {
                message: "Failed to fetch IP address"
            };
        }

        term3.output(`  Your IP address: ${ipAddressData.ip}`);
        term3.output(`  User Agent: ${navigator.userAgent}`);
        term3.output(`  Screen Resolution: ${window.screen.width}x${window.screen.height}`);
        term3.output(`  Language: ${navigator.language}`);
        term3.output(`  Browser Cookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}`);
    } catch (error) {
        term3.output(`  Failed to execute ifconfig - ${error.message}`);
    }
}

async function exit() {
    term3.output("Quitting Terminal...");
    term3.delay(3000);
    term3.kill();
}

function printInfoAboutDev() {
    term3.output("hello! it is I the creator of File-Z.");
}

async function demo_menu() {
    term3.output(`
        1. Print Hello World
        2. Add Two Numbers
        3. Show ASCII Art
    `);

    let term3value = await term3.input("What would you like to do?");
    if (term3value === "1") {
        term3.output("Hello World");
    }

    if (term3value === "2") {
        term3.echo(term3value);
        await add_numbers();
    }

    if (term3value === "3") {
        ascii_art();
    }

    if (term3value != "1" && term3value != "2" && term3value != "3") {
        term3.output("Invalid choice");
    }
}

async function curl() {
    try {
        const url = await term3.input("Enter the URL to curl:");
        if (!url) {
            term3.output("URL not provided. Curl aborted.");
            return;
        }

        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const responseData = await response.json();

        if (!responseData.contents) {
            term3.output(`Failed to execute curl - ${responseData.error}`);
            return;
        }

        term3.output(responseData.contents);
    } catch (error) {
        term3.output(`Curl failed - ${error.message}`);
    }
}

async function wget() {
    try {
        const url = await term3.input("Enter the URL to wget:");
        if (!url) {
            term3.output("URL not provided. Wget aborted.");
            return;
        }

        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const responseData = await response.json();

        if (!responseData.contents) {
            term3.output(`Failed to execute wget - ${responseData.error}`);
            return;
        }

        // Simulate saving the content to a file
        const filename = url.split('/').pop();
        term3.output(`Saving ${url} as ${filename}`);
        term3.output(responseData.contents);
    } catch (error) {
        term3.output(`Wget failed - ${error.message}`);
    }
}



//end of functions

document.querySelector('.termino-input').addEventListener('keydown', async (e) => {
    const inputTextArea = document.querySelector('.termino-input');

    if (e.key === 'ArrowUp') {
        if (commandIndex > 0) {
            commandIndex--;
            inputTextArea.value = commandHistory[commandIndex];
        }
    } else if (e.key === 'ArrowDown') {
        if (commandIndex < commandHistory.length - 1) {
            commandIndex++;
            inputTextArea.value = commandHistory[commandIndex];
        } else {
            commandIndex = commandHistory.length;
            inputTextArea.value = '';
        }
    }
});

// MESSAGES TO PRINT AT START!
term3.output("Welcome to the File-Z Terminal!");
term3.output("You can list all the functions available by typing 'help'");

// 
async function AdvancedDemo() {
    // call the terminal for initial input
    let terminal_msg = await term3.input("");

    if (terminal_msg.trim() !== '') {
        commandHistory.push(terminal_msg);
        commandIndex = commandHistory.length;

        if (YOUR_FUNCTIONS.includes(terminal_msg)) {
            // run terminal commands without () example - hello_world 
            await eval(terminal_msg + "()");
        } else {
            //  Handle error if your function is not found
            term3.output("'" + terminal_msg + "'" + " command not found!");
        }
    }

    // after called  - repeat function again
    AdvancedDemo();
}

AdvancedDemo();


async function calculator() {
    term3.output("Simple Calculator. Type 'exit' to return to the terminal.");

    let result = 0;

    const handleKeyPress = (e) => {
        if (e.key === 'c' && e.ctrlKey) {
            term3.output("\nExiting calculator.");
            document.removeEventListener('keydown', handleKeyPress);
        }
    };

    // Add keydown event listener to handle Ctrl+C
    document.addEventListener('keydown', handleKeyPress);

    // Handle calculator input
    while (true) {
        const input = await term3.input("");

        if (input.trim().toLowerCase() === 'exit') {
            term3.output("Exiting calculator.");
            break;
        }

        try {
            const expression = input.replace(/\s/g, ''); // Remove spaces
            result = eval(expression);

            if (isNaN(result)) {
                term3.output("Invalid input. Please enter a valid mathematical expression.");
            } else {
                term3.output(`Result: ${result}`);
            }
        } catch (error) {
            term3.output("Error: " + error.message);
        }
    }

    // Remove the keydown event listener when done
    document.removeEventListener('keydown', handleKeyPress);
}


function help() {
    term3.output("This the File-Z terminal. Functions Include:");
    term3.output("  • help -- this menu.");
    term3.output("  • SearchGitHubProfile -- show stats for github users.");
    term3.output("  • ifconfig -- network info.");
    term3.output("  • whoami");
    term3.output("  • clear -- clears all text.");
    term3.output("  • ping -- pings a site.");
    term3.output("  • exit -- stops the terminal.");
    term3.output("  • date -- displays the date.");
    term3.output("  • pwd -- displays the directory.");
    term3.output("  • printInfoAboutDev -- message from me.");
    term3.output("  • ascii_art -- File-Z logo.");
    term3.output("  • curl");
    term3.output("  • wget");
    term3.output("  • calculator -- calculates things.");
}
