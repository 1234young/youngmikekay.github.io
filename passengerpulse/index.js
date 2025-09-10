const MAX_SEATS = 40; // Maximum number of seats available on the bus
let totalCount = 0;   // Total passengers onboard (adults + children)
let adultCount = 0;   // Number of adults onboard
let childCount = 0;   // Number of children onboard
let occupiedSeats = []; // Array to keep track of which seat numbers are occupied (by adults)

// Update stats and seat list
function updateStats() {
    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('adultCount').textContent = adultCount;
    document.getElementById('childCount').textContent = childCount;
    document.getElementById('emptySeats').textContent = MAX_SEATS - occupiedSeats.length;

    // List empty seat numbers
    let emptySeatsArr = [];
    for (let i = 1; i <= MAX_SEATS; i++) {
        if (!occupiedSeats.includes(i)) {
            emptySeatsArr.push(i);
        }
    }
    document.getElementById('emptySeatList').textContent = emptySeatsArr.length > 0 ? emptySeatsArr.join(', ') : 'None';
}

// Update seat selection dropdown (excluding reserved and occupied seats)
function updateSeatOptions() {
    const seatSelect = document.getElementById('seatSelect');
    if (!seatSelect) return;
    seatSelect.innerHTML = '';
    for (let i = 1; i <= MAX_SEATS; i++) {
        // Skip reserved seats (1-8)
        if (i >= 1 && i <= 8) continue;
        // Skip occupied seats
        if (occupiedSeats.includes(i)) continue;
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Seat ${i}`;
        seatSelect.appendChild(option);
    }
    seatSelect.disabled = seatSelect.options.length === 0;
}

// Toggle empty seats display
document.getElementById('toggleSeatsBtn').addEventListener('click', function() {
    const container = document.getElementById('emptySeatContainer');
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        this.textContent = 'Hide Seats Available';
    } else {
        container.style.display = 'none';
        this.textContent = 'See Seats Available';
    }
});

// Form submission handler
document.getElementById('passengerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const type = document.getElementById('type').value;

    let receiptDiv = document.getElementById('receipt');
    let downloadBtn = document.getElementById('downloadBtn');
    let printBtn = document.getElementById('printBtn');
    let receiptActions = document.querySelector('.receipt-actions');

    receiptDiv.style.display = 'none';
    downloadBtn.style.display = 'none';
    printBtn.style.display = 'none';
    receiptActions.style.display = 'none';

    // Validate form
    if (!name || !phone || !amount || !type) {
        alert('Please fill all fields correctly.');
        return;
    }

    let receiptHtml = `<h2>Passenger Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone No:</strong> ${phone}</p>
        <p><strong>Amount Paid:</strong> $${amount}</p>
        <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>`;

    if (type === 'adult') {
        // Get selected seat
        const seatSelect = document.getElementById('seatSelect');
        const selectedSeat = parseInt(seatSelect.value, 10);

        // Check if seat is already occupied (shouldn't happen, but double check)
        if (occupiedSeats.includes(selectedSeat)) {
            alert('This seat is already occupied. Please select another seat.');
            return;
        }
        occupiedSeats.push(selectedSeat);

        const carNo = 'CAR-' + Math.floor(Math.random() * 9000 + 1000);
        receiptHtml += `
            <h3>Payment Receipt</h3>
            <p><strong>Seat No:</strong> ${selectedSeat}</p>
            <p><strong>Car No Plate:</strong> ${carNo}</p>
            <p style="color:green;"><strong>Receipt Generated Successfully!</strong></p>
        `;
        adultCount++;
    } else if (type === 'child') {
        childCount++;
    }

    totalCount++;
    updateStats();
    updateSeatOptions();

    receiptDiv.innerHTML = receiptHtml;
    receiptDiv.style.display = 'block';
    downloadBtn.style.display = 'block';
    printBtn.style.display = 'block';
    receiptActions.style.display = 'flex';
    document.getElementById('passengerForm').reset();
    updateSeatOptions(); // Update seat dropdown after reset
});

// Reset form handler
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('passengerForm').reset();
    document.getElementById('receipt').style.display = 'none';
    document.getElementById('downloadBtn').style.display = 'none';
    document.getElementById('printBtn').style.display = 'none';
    document.querySelector('.receipt-actions').style.display = 'none';
    updateSeatOptions();
});

// Download receipt handler
document.getElementById('downloadBtn').addEventListener('click', function() {
    const receiptDiv = document.getElementById('receipt');
    const blob = new Blob([receiptDiv.innerHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'receipt.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Print receipt handler
document.getElementById('printBtn').addEventListener('click', function() { 
    const receiptDiv = document.getElementById('receipt');
    if (receiptDiv.innerHTML.trim() === "") return;
    const printWindow = window.open('', '', 'height=600,width=400');
    printWindow.document.write('<html><head><title>Print Receipt</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles.css">');
    printWindow.document.write('</head><body >');
    printWindow.document.write(receiptDiv.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
});

// Initial stats and seat dropdown update
updateStats();
updateSeatOptions();