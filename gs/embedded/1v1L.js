

	const location = new URL(window.location.href);
	const url = "https://1v1.lol";

	if (url.length === 0) {
		alert("No URL specified");
		return;
	}

	switch (location.searchParams.get("type")) {
		default: {
			const frame = document.createElement("embed");
			frame.type = "text/plain";
			frame.width = "1024";
			frame.height = "768";
			frame.src = url;
			document.body.appendChild(frame);
			break;
		}
	}
