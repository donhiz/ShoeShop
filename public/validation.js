// Handle payment form submission
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const paymentErrors = {}; // Store errors per field

    // Clear previous error messages
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // Get input values
    const cardNumber = document.getElementById('card-number');
    const cvv = document.getElementById('cvv');
    const nameOnCard = document.getElementById('name-on-card');
    const expiryDate = document.getElementById('expiry-date');

    // Validate the inputs
    if (cardNumber.value.trim().length !== 16) {
        paymentErrors['card-number'] = 'Card number must be 16 digits.';
    }
    if (cvv.value.trim().length !== 3 && cvv.value.trim().length !== 4) {
        paymentErrors['cvv'] = 'CVV must be 3 or 4 digits.';
    }
    if (!nameOnCard.value.trim()) {
        paymentErrors['name-on-card'] = 'Name on card is required.';
    }
    if (!expiryDate.value.trim()) {
        paymentErrors['expiry-date'] = 'Expiry date is required.';
    }

    // If errors exist, display them below inputs
    if (Object.keys(paymentErrors).length > 0) {
        Object.keys(paymentErrors).forEach(field => {
            const inputElement = document.getElementById(field);
            const errorElement = document.createElement('div');
            errorElement.classList.add('invalid-feedback');
            errorElement.textContent = paymentErrors[field];
            inputElement.classList.add('is-invalid');
            inputElement.after(errorElement);
        });
    } else {
        // All inputs are valid, show a success message without clearing the form
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = 'Payment details saved successfully!';
        document.getElementById('payment-form').after(successMessage);

        // Optionally disable the form to prevent resubmission
        const formElements = document.getElementById('payment-form').elements;
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = true;
        }
    }
});

// Handle shipping form submission
document.getElementById('shipping-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const shippingErrors = {}; // Store errors per field

    // Clear previous error messages
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // Get input values
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip');

    // Validate the inputs
    if (!firstName.value.trim()) {
        shippingErrors['first-name'] = 'First name is required.';
    }
    if (!lastName.value.trim()) {
        shippingErrors['last-name'] = 'Last name is required.';
    }
    if (!address.value.trim()) {
        shippingErrors['address'] = 'Address is required.';
    }
    if (!city.value.trim()) {
        shippingErrors['city'] = 'City is required.';
    }
    // Adjust the postal code validation for both US ZIP codes and Canadian postal codes
    const zipValue = zip.value.trim();
    const usZipRegex = /^\d{5}$/;
    const canadianPostalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if (!usZipRegex.test(zipValue) && !canadianPostalCodeRegex.test(zipValue)) {
        shippingErrors['zip'] = 'Zip or postal code must be in US ZIP (12345) or Canadian postal code (A1A 1A1) format.';
    }



    // If errors exist, display them below inputs
    if (Object.keys(shippingErrors).length > 0) {
        Object.keys(shippingErrors).forEach(field => {
            const inputElement = document.getElementById(field);
            const errorElement = document.createElement('div');
            errorElement.classList.add('invalid-feedback');
            errorElement.textContent = shippingErrors[field];
            inputElement.classList.add('is-invalid');
            inputElement.after(errorElement);
        });
    } else {
        // All inputs are valid, show a success message without clearing the form
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = 'Shipping details saved successfully!';
        document.getElementById('shipping-form').after(successMessage);

        // Optionally disable the form to prevent resubmission
        const formElements = document.getElementById('shipping-form').elements;
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = true;
        }
    }
});
