var online = true;

function randomExecution() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Check if the random number is less than or equal to 0.1 (10% chance)
  if (randomNumber <= 0.1) {
	var speed = 5
	var wait = 3000
	var place = "File-Z-master/index.html"
lines = [
			"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⠤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠾⠁⠀⠀⠀⠀⠀⠀⢹⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠒⣰⡏⣠⠟⠀⠀⠀⢠⠤⠤⠤⠤⢴⣿⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⢂⢤⣼⣾⣾⣿⠀⠀⠀⠀⢸⠀⠀⠀⠀⠈⣿⡔⢳⡦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠀⠀⠀⠀⣀⣾⣿⣥⣴⣿⣿⣿⣿⣿⣿⣀⣶⡒⢦⡿⠀⠒⡿⠯⢹⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠽⠆⠀⠀⠀⠀⠰⠤⣽⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠒⠂⠀⠀⠀⠀⠐⠲⣿⣿⣿⣿⣿⣿⣿⣷⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⣼⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣿⡁⠀⠀⠀⠈⢹⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⡟⠁⠀⢸⡑⡄⠀⠀⠀⢠⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀",
			"⠀⢠⣿⣿⣿⣿⣿⣿⠟⠛⠉⠀⠀⠀⢧⠀⠀⠀⡇⠈⢢⡀⣠⠇⠀⣿⣿⣿⡟⢿⠻⢿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀",
			"⢀⣼⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⡤⠜⠀⠀⠀⠹⡾⣟⣯⣝⣦⡼⢻⣿⡏⡇⠸⠀⢠⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀",
			"⢨⣿⣿⣿⣿⣿⡿⡆⠀⠀⠀⣄⠀⢣⠀⠀⠀⠀⠀⠹⣖⠲⠽⠿⣧⢀⡏⢹⠁⠀⠀⢀⣿⣿⣿⣿⣿⡿⣿⠀⠀⠀⠀⠀⠀⠀",
			"⢈⣿⣿⣿⣿⣿⠁⢇⠀⠀⠀⠸⡀⠈⢧⠀⠀⠀⠀⠀⢻⢍⣉⡓⣾⠸⡇⢸⠀⠸⡀⡎⢹⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀",
			"⠈⣿⣿⣿⣿⣿⠀⠘⡄⠀⠀⠀⡧⠀⠈⠣⣀⠀⠀⠀⠘⡦⠬⢭⣿⠀⢹⠉⠀⡴⠁⡆⠈⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠐⣿⣿⣿⣿⡏⠀⠐⠚⠀⠀⢀⠇⠀⠀⠀⠈⠓⢤⣀⠀⢹⣿⣿⣯⡀⢸⢀⡞⠀⠀⡇⠀⢿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⢨⣿⣿⣿⡇⠀⢀⣀⣀⣠⣸⠤⣀⠤⠒⠲⠖⠋⠉⡏⠁⠀⢛⣒⡟⢿⡟⠀⠀⠀⡇⠀⢸⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠹⣿⣿⡠⠚⠉⠠⠔⠋⠀⠀⠀⠀⠀⠀⠀⠀⢀⠇⠀⠀⠤⡾⢀⣾⠀⠀⠀⠀⡇⠀⣸⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"⠀⠀⠀⠈⢿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣘⣷⡒⢲⣻⣧⠎⣹⠀⠀⠀⢸⠀⠘⢻⠉⠓⠦⢄⣀⢞⣇⣀⣀⡀⠀⠀",
			"⠀⠀⠀⠀⠀⢣⡀⠀⠀⠀⢀⠀⣀⣀⠤⠤⠼⠿⠞⠛⠁⠑⣤⡖⢶⠀⣼⠀⢠⣀⣸⠀⠀⠀⠀⠀⠀⡎⠁⢾⠁⠀⢠⣽⣿⣶",
			"⠀⠀⠀⠀⠀⠀⠉⠉⠻⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡧⠼⡄⣿⠀⠘⠛⣿⣶⠤⢄⣀⠀⠀⢳⣤⣀⣀⣀⣼⣿⣿⠿",
			"⠀⠀⠀⠀⠀⠀⠀⠀⠢⠈⡛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢯⠈⣷⡿⠀⠀⠀⢻⠀⠀⠀⠀⠈⠑⠚⠷⠤⠋⠙⠿⠈⠛⠀",
			"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠧⠤⠤⠤⠐⠒⠒⠒⠉⠉⠉⠉⠉⠛⢶⠾⠗⠒⠒⠒⠚⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
			"",
			"                    Get Rick Rolled!                    "
			];
		
  } else {
	document.addEventListener('keydown', function(event) {
	    if (event.code === 'Space') {
		window.location.replace('File-Z-master/index.html')
	    }
	});
	  
	lines = [
				"    █████▒ ██▓ ██▓    ▓█████ ▒███████▒",
				"  ▓██   ▒ ▓██▒▓██▒    ▓█   ▀ ▒ ▒ ▒ ▄▀░",
				"  ▒████ ░ ▒██▒▒██░    ▒███   ░ ▒ ▄▀▒░",
				"  ░▓█▒  ░ ░██░▒██░    ▒▓█  ▄   ▄▀▒   ░",
				"  ░▒█░    ░██░░██████▒░▒████▒▒███████▒",
				"   ▒ ░    ░▓  ░ ▒░▓  ░░░ ▒░ ░░▒▒ ▓░▒░▒",
				"   ░       ▒ ░░ ░ ▒  ░ ░ ░  ░░░▒ ▒ ░ ▒",
				"   ░ ░     ▒ ░  ░ ░      ░   ░ ░ ░ ░ ░",
				"           ░      ░  ░   ░  ░  ░ ░    ",
				"                             ░        ",
				"",
				"Welcome to the Terminal!",
				"",
				"Running command: boot File-Z",
				"Booting...",
				"Booting completed.",
					"",
					"initializing connection... <##########################> 100%",
					"checking for network...",
					"Network Connected!",
				"",
				"Running command: start Application-Z",
				"Starting Application-Z...",
				"FileZ is a subsidiary asset of MCI inc.",
				"Application-Z started successfully.",
				"",
				"Running command: runScript script-Z",
				"Executing script-Z...",
				"Script-Z execution completed.",
				"",
				"Running command: exit",
				"Exiting Terminal..."
		  ];
  }
}

// Call the randomExecution function
randomExecution();
