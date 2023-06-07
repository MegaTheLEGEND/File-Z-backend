

	const location = new URL(window.location.href);
	const url = "https://megathelegend.github.io/yexsite/run3";

	if (url.length === 0) {
		alert("No URL specified");
		return;
	}

	switch (location.searchParams.get("type")) {
		default: {
			const frame = document.createElement("embed");
			frame.type = "text/plain";
			frame.style.position = 'absolute';
			frame.width = "100%";
			frame.height = "100%";
			frame.src = url;
			document.body.appendChild(frame);
			break;
		}
	}
