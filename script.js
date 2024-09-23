const donateSection = document.getElementById("donate");
const historySection = document.getElementById("history");
const balanceElement = document.getElementById("balance");
const modal = document.getElementById("modal");

document.getElementById("donateBtn").addEventListener("click", function () {
    donateSection.classList.remove("hidden");
    historySection.classList.add("hidden");
    document.getElementById("donateBtn").classList.add("bg-[#B4F461]");
    document.getElementById("historyBtn").classList.remove("bg-[#B4F461]");
    document
        .getElementById("donateBtn")
        .classList.remove("text-[#111111]/30", "border", "border-[#111111]/30");
    document
        .getElementById("historyBtn")
        .classList.add("text-[#111111]/30", "border", "border-[#111111]/30");
});

document.getElementById("historyBtn").addEventListener("click", function () {
    historySection.classList.remove("hidden");
    donateSection.classList.add("hidden");
    document.getElementById("historyBtn").classList.add("bg-[#B4F461]");
    document.getElementById("donateBtn").classList.remove("bg-[#B4F461]");
    document
        .getElementById("historyBtn")
        .classList.remove("text-[#111111]/30", "border", "border-[#111111]/30");
    document
        .getElementById("donateBtn")
        .classList.add("text-[#111111]/30", "border", "border-[#111111]/30");
});

let balance = Number(balanceElement.innerText);

function isValidAmount(amount) {
    if (amount == "" || isNaN(amount) || amount <= 0) {
        alert("Invalid amount!");
        return false;
    } else if (amount > balance) {
        alert("Not enough balance!");
        return false;
    } else {
        return true;
    }
}

function insertInHistory(amount, title) {
    const historyCard = document.createElement("div");
    historyCard.classList.add(
        "border",
        "border-[#111111]/10",
        "p-4",
        "md:p-6",
        "lg:p-8",
        "rounded-2xl"
    );
    historyCard.innerHTML = `
                <h3 class="mb-4 text-lg md:text-xl font-bold text-[#111111]">
                    ${amount} Taka is donated for ${title}
                </h3>
                <p class="text-[#111111]/70 font-light">Date: ${new Date()}</p>
            `;
    document.getElementById("history").appendChild(historyCard);
}

const donateNowButtons = document.querySelectorAll(".btnDonateNow");
for (const button of donateNowButtons) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const card = button.parentElement.parentElement;
        const inputAmount = Number(card.querySelector(".inputAmount").value);
        if (!isValidAmount(inputAmount)) {
            return;
        }
        balance = balance - inputAmount;
        balanceElement.innerText = balance;
        let cardAmount = Number(card.querySelector(".cardAmount").innerText);
        cardAmount = cardAmount + inputAmount;
        card.querySelector(".cardAmount").innerText = cardAmount;
        let cardTitle = card.querySelector(".cardTitle").innerText;
        insertInHistory(inputAmount, cardTitle);
        card.querySelector(".inputAmount").value = "";
        modal.classList.remove("hidden");
    });
}

document.getElementById("closeModal").addEventListener("click", function () {
    modal.classList.add("hidden");
});
