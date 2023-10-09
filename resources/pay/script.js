function buypass() {
    const paymentMethod = {
        supportedMethods: [location.origin + "pay/main.json"],
        data: { url: document.querySelector("input").value },
    };

    const paymentDetails = {
        total: {
            label: "_",
            amount: { value: "1", currency: "USD" },
        },
    };

    const paymentOptions = {};

    try {
        const paymentRequest = new PaymentRequest([paymentMethod], paymentDetails, paymentOptions);
        paymentRequest.show();
    } catch (error) {
        console.error('Error creating PaymentRequest:', error);
    }
}

document.querySelector("button").onclick = buypass;
