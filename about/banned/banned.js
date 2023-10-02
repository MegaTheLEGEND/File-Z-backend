document.addEventListener('DOMContentLoaded', function() {
    // Create a new div element
    var newDiv = document.createElement('div');

    // Set the HTML content for the new div
    newDiv.innerHTML = `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        margin: 0;
                        overflow: hidden;
                    }

                    @font-face {
                        font-family: 'pricedown';
                        src: url('pricedown.otf');
                    }

                    .black-bar {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        height: 150px;
                        width: 100vw;
                        background-color: black;
                    }

                    .banned-text {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-family: 'pricedown';
                        font-size: 100px;
                        color: red;
                    }
                </style>
            </head>
            <body>
                <div class="black-bar"></div>
                <div class="banned-text">Banned</div>
            </body>
        </html>
    `;

    // Append the new div to the body of the document
    document.body.appendChild(newDiv);
});
