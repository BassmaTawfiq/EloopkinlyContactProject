
// 1. Get HTML Elements

const fullNameInput = document.getElementById("fullName");
const phoneNumberInput = document.getElementById("phoneNumber");
const emailAddressInput = document.getElementById("emailAddress");
const addressInput = document.getElementById("address");
const contactGroupSelection = document.getElementById("contactGroup");
const notesInput = document.getElementById("notes");

const isFavoriteCheck = document.getElementById("isFavorite");
const isEmergencyCheck = document.getElementById("isEmergency");

const contactForm = document.getElementById("contactForm");
const contactsTableContainer = document.querySelector(".contacts-table-container");
const searchInput = document.getElementById("searchInput");

const nameMessage = document.getElementById("nameMessage");
const phoneMessage = document.getElementById("phoneMessage");
const emailMessage = document.getElementById("emailMessage");
const addressMessage = document.getElementById("addressMessage");
const groupMessage = document.getElementById("groupMessage");
const notesMessage = document.getElementById("notesMessage");

let updateIndex = null;


// 2. Contacts Array and Local Storage

let contacts = [];

if (localStorage.getItem("list") !== null) {
    contacts = JSON.parse(localStorage.getItem("list"));
}


// 3. Create Contact

const createContact = () => {

    const contact = {
        fullName: fullNameInput.value.trim(),
        phoneNumber: phoneNumberInput.value.trim(),
        emailAddress: emailAddressInput.value.trim(),
        address: addressInput.value.trim(),
        contactGroup: contactGroupSelection.value,
        notes: notesInput.value.trim(),
        isFavorite: isFavoriteCheck.checked,
        isEmergency: isEmergencyCheck.checked
    };

    contacts.push(contact);

    localStorage.setItem("list", JSON.stringify(contacts));
};


// 4. Validate Full Name

const validateName = () => {

    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]{3,}$/;

    if (nameRegex.test(fullNameInput.value.trim())) {

        fullNameInput.classList.add("is-valid");
        fullNameInput.classList.remove("is-invalid");

        nameMessage.innerHTML = `
            <p class="text-success mb-0 mt-2">
                Full name is valid.
            </p>
        `;

        return true;

    } else {

        fullNameInput.classList.add("is-invalid");
        fullNameInput.classList.remove("is-valid");

        nameMessage.innerHTML = `
            <p class="text-danger mb-0 mt-2">
                Name must contain at least 3 letters and no numbers or symbols.
            </p>
        `;

        return false;
    }
};


// 5. Validate Phone Number

const validatePhone = () => {

    const phoneRegex = /^[0-9]{9,15}$/;

    if (phoneRegex.test(phoneNumberInput.value.trim())) {

        phoneNumberInput.classList.add("is-valid");
        phoneNumberInput.classList.remove("is-invalid");

        phoneMessage.innerHTML = `
            <p class="text-success mb-0 mt-2">
                Phone number is valid.
            </p>
        `;

        return true;

    } else {

        phoneNumberInput.classList.add("is-invalid");
        phoneNumberInput.classList.remove("is-valid");

        phoneMessage.innerHTML = `
            <p class="text-danger mb-0 mt-2">
                Phone number must contain 9 to 15 digits only.
            </p>
        `;

        return false;
    }
};


// 6. Validate Email

const validateEmail = () => {

    const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(emailAddressInput.value.trim())) {

        emailAddressInput.classList.add("is-valid");
        emailAddressInput.classList.remove("is-invalid");

        emailMessage.innerHTML = `
            <p class="text-success mb-0 mt-2">
                Email address is valid.
            </p>
        `;

        return true;

    } else {

        emailAddressInput.classList.add("is-invalid");
        emailAddressInput.classList.remove("is-valid");

        emailMessage.innerHTML = `
            <p class="text-danger mb-0 mt-2">
                Please enter a valid email address. Example: name@gmail.com
            </p>
        `;

        return false;
    }
};


// 7. Validate Address

const validateAddress = () => {

    const addressRegex = /^.{3,}$/;

    if (addressRegex.test(addressInput.value.trim())) {

        addressInput.classList.add("is-valid");
        addressInput.classList.remove("is-invalid");

        addressMessage.innerHTML = `
            <p class="text-success mb-0 mt-2">
                Address is valid.
            </p>
        `;

        return true;

    } else {

        addressInput.classList.add("is-invalid");
        addressInput.classList.remove("is-valid");

        addressMessage.innerHTML = `
            <p class="text-danger mb-0 mt-2">
                Address must contain at least 3 characters.
            </p>
        `;

        return false;
    }
};


// 8. Validate Contact Group

const validateGroup = () => {

    if (contactGroupSelection.value !== "") {

        contactGroupSelection.classList.add("is-valid");
        contactGroupSelection.classList.remove("is-invalid");

        groupMessage.innerHTML = `
            <p class="text-success mb-0 mt-2">
                Group selected successfully.
            </p>
        `;

        return true;

    } else {

        contactGroupSelection.classList.add("is-invalid");
        contactGroupSelection.classList.remove("is-valid");

        groupMessage.innerHTML = `
            <p class="text-danger mb-0 mt-2">
                Please select a contact group.
            </p>
        `;

        return false;
    }
};


// 9. Validate Notes

const validateNotes = () => {

    const notesRegex = /^.{4,}$/;

    if (
        notesInput.value.trim() === "" ||
        notesRegex.test(notesInput.value.trim())
    ) {

        notesInput.classList.add("is-valid");
        notesInput.classList.remove("is-invalid");

        notesMessage.innerHTML = `
            <p class="text-success mb-0 mt-2">
                Notes are valid.
            </p>
        `;

        return true;

    } else {

        notesInput.classList.add("is-invalid");
        notesInput.classList.remove("is-valid");

        notesMessage.innerHTML = `
            <p class="text-danger mb-0 mt-2">
                Notes must contain at least 4 characters.
            </p>
        `;

        return false;
    }
};


// 10. Validate While Typing

// Full Name
fullNameInput.addEventListener("input", () => {

    fullNameInput.value = fullNameInput.value.replace(
        /[^A-Za-z\u0600-\u06FF\s]/g, ""
    );

    validateName();

});


// Phone
phoneNumberInput.addEventListener("input", () => {

    phoneNumberInput.value = phoneNumberInput.value.replace(
        /[^0-9]/g, ""
    );

    validatePhone();

});


// Email
emailAddressInput.addEventListener("input", () => {

    validateEmail();

});


// Address
addressInput.addEventListener("input", () => {

    validateAddress();

});


// Group
contactGroupSelection.addEventListener("change", () => {

    validateGroup();

});


// Notes
notesInput.addEventListener("input", () => {

    validateNotes();

});


// 11. Clean Validation

const cleanValidation = () => {

    const inputs = [
        fullNameInput,
        phoneNumberInput,
        emailAddressInput,
        addressInput,
        contactGroupSelection,
        notesInput
    ];

    for (let i = 0; i < inputs.length; i++) {

        inputs[i].classList.remove("is-valid", "is-invalid");

    }

    nameMessage.innerHTML = "";
    phoneMessage.innerHTML = "";
    emailMessage.innerHTML = "";
    addressMessage.innerHTML = "";
    groupMessage.innerHTML = "";
    notesMessage.innerHTML = "";
};


// 12. Clean Form

const cleanForm = () => {

    fullNameInput.value = "";
    phoneNumberInput.value = "";
    emailAddressInput.value = "";
    addressInput.value = "";
    contactGroupSelection.value = "";
    notesInput.value = "";

    isFavoriteCheck.checked = false;
    isEmergencyCheck.checked = false;

    cleanValidation();

    updateIndex = null;
};


// 13. Submit Form: Add or Update

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isAddressValid = validateAddress();
    const isGroupValid = validateGroup();
    const isNotesValid = validateNotes();

    if (
        isNameValid &&
        isPhoneValid &&
        isEmailValid &&
        isAddressValid &&
        isGroupValid &&
        isNotesValid
    ) {

        if (updateIndex === null) {

            createContact();

        } else {

            updateTwo();

        }

        TotalContacts();
        TotalFavorites();
        TotalEmergancy();

        cleanForm();

        if (searchInput.value.trim() !== "") {

            searchContacts();

        } else {

            displayContact();

        }

        // Close Modal
        const modalElement = document.getElementById("contactModal");
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

        modal.hide();

    } else {

        console.log("Please check the invalid fields");

    }

});


// 14. Display Contacts
// Default Parameter: contactList = contacts

const displayContact = (contactList = contacts) => {

    let cartona = `
        <table class="table contacts-table">

            <thead>
                <tr>
                    <th>ACTIONS</th>
                    <th>NAME</th>
                    <th>FLAGS</th>
                    <th>GROUP</th>
                    <th>PHONE</th>
                </tr>
            </thead>

            <tbody>
    `;

    if (contactList.length === 0) {

        cartona += `
            <tr>
                <td colspan="5" class="text-center">
                    No contacts found
                </td>
            </tr>
        `;

    } else {

        for (let i = 0; i < contactList.length; i++) {

            const {
                fullName,
                emailAddress,
                phoneNumber,
                contactGroup,
                isFavorite,
                isEmergency
            } = contactList[i];

            cartona += `
                <tr>

                    <td>

                        <button type="button"
                            class="btn btn-link text-success text-decoration-none p-0 edit-btn"
                            data-index="${i}">
                            Edit
                        </button>

                        <button type="button"
                            class="btn btn-link text-danger text-decoration-none p-0 ms-2 delete-btn"
                            data-index="${i}">
                            Delete
                        </button>

                    </td>

                    <td>
                        <div class="d-flex flex-column">

                            <span>${fullName}</span>

                            <small class="text-secondary">
                                ${emailAddress}
                            </small>

                        </div>
                    </td>

                    <td>
                        ${isFavorite ? "⭐" : ""}
                        ${isEmergency ? "❤️" : ""}
                    </td>

                    <td>
                        <span class="badge rounded-pill bg-info-subtle text-info-emphasis">
                            ${contactGroup}
                        </span>
                    </td>

                    <td>${phoneNumber}</td>

                </tr>
            `;
        }
    }

    cartona += `
            </tbody>
        </table>
    `;

    contactsTableContainer.innerHTML = cartona;
};


// 15. Total Contacts

const TotalContacts = () => {

    document.getElementById("totalContacts").textContent = contacts.length;

};


// 16. Total Favorites

const TotalFavorites = () => {

    let total = 0;

    for (let i = 0; i < contacts.length; i++) {

        if (contacts[i].isFavorite) {

            total++;

        }
    }

    document.getElementById("favoriteContacts").textContent = total;
};


// 17. Total Emergency

const TotalEmergancy = () => {

    let totalEmergancy = 0;

    for (let i = 0; i < contacts.length; i++) {

        if (contacts[i].isEmergency) {

            totalEmergancy++;

        }
    }

    document.getElementById("emergencyContacts").textContent = totalEmergancy;
};


// 18. Search Contacts

const searchContacts = () => {

    const searchWord = searchInput.value.trim().toLowerCase();

    let cartona = "";

    for (let i = 0; i < contacts.length; i++) {

        const {
            fullName,
            emailAddress,
            phoneNumber,
            contactGroup,
            isFavorite,
            isEmergency
        } = contacts[i];

        if (
            fullName.toLowerCase().includes(searchWord) ||
            phoneNumber.includes(searchWord)
        ) {

            cartona += `
                <tr>

                    <td>

                        <button type="button"
                            class="btn btn-link text-success text-decoration-none p-0 edit-btn"
                            data-index="${i}">
                            Edit
                        </button>

                        <button type="button"
                            class="btn btn-link text-danger text-decoration-none p-0 ms-2 delete-btn"
                            data-index="${i}">
                            Delete
                        </button>

                    </td>

                    <td>
                        <div class="d-flex flex-column">

                            <span>${fullName}</span>

                            <small class="text-secondary">
                                ${emailAddress}
                            </small>

                        </div>
                    </td>

                    <td>
                        ${isFavorite ? "⭐" : ""}
                        ${isEmergency ? "❤️" : ""}
                    </td>

                    <td>${contactGroup}</td>

                    <td>${phoneNumber}</td>

                </tr>
            `;
        }
    }

    if (cartona === "") {

        cartona = `
            <tr>
                <td colspan="5" class="text-center">
                    No contacts yet. Click "New Contact" to get started.
                </td>
            </tr>
        `;
    }

    contactsTableContainer.innerHTML = `
        <table class="table contacts-table">

            <thead>
                <tr>
                    <th>ACTIONS</th>
                    <th>NAME</th>
                    <th>FLAGS</th>
                    <th>GROUP</th>
                    <th>PHONE</th>
                </tr>
            </thead>

            <tbody>
                ${cartona}
            </tbody>

        </table>
    `;
};


// Search Event
searchInput.addEventListener("input", searchContacts);


// 19. Delete Contact

// Default Parameter: deleteCount = 1

const deleteContact = (index, deleteCount = 1) => {

    Swal.fire({

        title: "Delete this contact?",
        text: "This action can't be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",

    }).then((result) => {

        if (result.isConfirmed) {

            contacts.splice(index, deleteCount);

            localStorage.setItem("list", JSON.stringify(contacts));

            Swal.fire({

                title: "Deleted!",
                text: "Your contact has been deleted.",
                icon: "success",

            });

            TotalContacts();
            TotalFavorites();
            TotalEmergancy();

            if (searchInput.value.trim() !== "") {

                searchContacts();

            } else {

                displayContact();

            }
        }
    });
};


// 20. Editing Contacts

const updateOne = (index) => {

    updateIndex = index;

    // Destructuring
    const {
        fullName,
        phoneNumber,
        emailAddress,
        address,
        contactGroup,
        notes,
        isFavorite,
        isEmergency
    } = contacts[index];

    fullNameInput.value = fullName;
    phoneNumberInput.value = phoneNumber;
    emailAddressInput.value = emailAddress;
    addressInput.value = address;
    contactGroupSelection.value = contactGroup;
    notesInput.value = notes;

    isFavoriteCheck.checked = isFavorite;
    isEmergencyCheck.checked = isEmergency;

    cleanValidation();
};


// 21. Update Contact

const updateTwo = () => {

    contacts[updateIndex].fullName = fullNameInput.value.trim();
    contacts[updateIndex].phoneNumber = phoneNumberInput.value.trim();
    contacts[updateIndex].emailAddress = emailAddressInput.value.trim();
    contacts[updateIndex].address = addressInput.value.trim();
    contacts[updateIndex].contactGroup = contactGroupSelection.value;
    contacts[updateIndex].notes = notesInput.value.trim();

    contacts[updateIndex].isFavorite = isFavoriteCheck.checked;
    contacts[updateIndex].isEmergency = isEmergencyCheck.checked;

    localStorage.setItem("list", JSON.stringify(contacts));
};


// 22. Edit and Delete Events

contactsTableContainer.addEventListener("click", (event) => {

    // Edit Button
    const editButton = event.target;

    if (editButton.classList.contains("edit-btn")) {

        const index = Number(editButton.getAttribute("data-index"));

        if (contacts[index] != null) {

            updateOne(index);

            const modalElement = document.getElementById("contactModal");
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

            modal.show();

        }
    }


    // Delete Button
    const deleteButton = event.target;

    if (deleteButton.classList.contains("delete-btn")) {

        const index = Number(deleteButton.getAttribute("data-index"));

        if (contacts[index] != null) {

            deleteContact(index);

        }
    }

});


// 23. Initial Display

displayContact();
TotalContacts();
TotalFavorites();
TotalEmergancy();
