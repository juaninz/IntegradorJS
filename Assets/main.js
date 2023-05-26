const menu = document.getElementById("menu-toggle");
const navBarList = document.querySelector(".navbar-list");
const productsContainer = document.querySelector(".productos-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".category-container");
const categoriesList = document.querySelectorAll(".category");

const registerForm = document.getElementById("form-contacto");
const nameInput = document.getElementById("form-nombre");
const dirInput = document.getElementById("form-direccion");
const emailInput = document.getElementById("form-email");
const phoneInput = document.getElementById("form-tel");


//menu hamburguesa
const mostrarMenu = () => {
    navBarList.classList.toggle("show")
};

//rendirazado
const createProductTemplate = (product) => {
    const {id, name, precio, category, icecreamImg } = product;
    return `
    <div class="productos-it">
        <img src="${icecreamImg}" alt="${name}">
        <h3>${name}</h3>
        <span>$ ${precio}</span>
        <button
            class = "btn-add"
            data-id = "${id}"
            data-name = "${name}"
            data-precio = "${precio}"
            data-img = "${icecreamImg}"
        >
        Agregar
        </button>
    </div>
`;
};


const renderProducts = (producList) => {
    productsContainer.innerHTML += producList.map(createProductTemplate).join("");
};


const isLastIndexOf = () => {
	return appState.currentProductsIndex === appState.productsLimit - 1;
};

const showMoreProducts = () => {
	appState.currentProductsIndex += 1;
	let { products, currentProductsIndex } = appState;
	renderProducts(products[currentProductsIndex]);
	if (isLastIndexOf()) {
		showMoreBtn.classList.add("hidden");
	}
};

//filtros
const isInactiveFilterBtn = (element) => {
	return (
		element.classList.contains("category") &&
		!element.classList.contains("active")
	);
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove("active");
			return;
		}
		categoryBtn.classList.add("active");
	});
};

const setShowMoreVisibility = () => {
	if (!appState.activeFilter) {
		showMoreBtn.classList.remove("hidden");
		return;
	}
	showMoreBtn.classList.add("hidden");
};

const changeFilterState = (btn) => {
	appState.activeFilter = btn.dataset.category;
	changeBtnActiveState(appState.activeFilter);
	setShowMoreVisibility();
};

const renderFilteredProducts = () => {
	const filteredProducts = productsData.filter((product) => {
		return product.category === appState.activeFilter;
	});
	renderProducts(filteredProducts);
};

const applyFilter = ({ target }) => {
	//Chequear que sea boton y no este activo
	if (!isInactiveFilterBtn(target)) {
		return;
	}
	//cambiar el estado del filtro
	changeFilterState(target);

	//si hay filtro activo, renderizo prod filtrados
	productsContainer.innerHTML = "";
	if (appState.activeFilter) {
		renderFilteredProducts();
		appState.currentProductsIndex = 0;
		return;
	}
	//Si no hay filtro activo, renderizo 1er array
	renderProducts(appState.products[0]);
};

// Validación formulario

//---------------Funciones auxiliares----------------

const isEmpty = (input) => {
	return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
	return input.value.length >= min && input.value.length <= max;
};

const isEmailValid = (input) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	return re.test(input.value.trim());
};


const isPassSecure = (input) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	return re.test(input.value.trim());
};

const isPhoneValid = (input) => {
	const re = /^[0-9]{10}$/;
	return re.test(input.value.trim());
};

const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");
	const error = formField.querySelector("small");
	error.style.display = "block";
	error.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");
	const error = formField.querySelector("small");
	error.style.display = "none";
	error.textContent = "";
};

//-------------Funciones de validación de inputs-------------

const checkTextInput = (input) => {
	let valid = false;
	const minCharacters = 3;
	const maxCharacters = 16;
	//si el input esta vacio, mostramos error
	if (isEmpty(input)) {
		showError(input, "Este campo es obligatorio");
		return;
	}
	//Si el input tiene mal la cantidad de caracteres, mostramos error
	if (!isBetween(input, minCharacters, maxCharacters)) {
		showError(
			input,
			`Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
		);
		return;
	}
	showSuccess(input);
	valid = true;
	return valid;
};

const checkEmail = (input) => {
	let valid = false;

	if (isEmpty(input)) {
		showError(input, "El email es obligatorio");
		return;
	}
	//Si es un mail
	if (!isEmailValid(input)) {
		showError(input, "El mail no es válido");
		return;
	}

	showSuccess(input);
	valid = true;
	return valid;
};

const checkPhone = (input) => {
	let valid = false;

	if (isEmpty(input)) {
		showError(input, "El teléfono es obligatorio");
		return;
	}
	if (!isPhoneValid(input)) {
		showError(input, "El telefono no es válido");
		return;
	}

	showSuccess(input);
	valid = true;
	return valid;
};


// ---------validación general y almacenamiento de datos--------

const submitHandler = (e) => {
	e.preventDefault();
	let isNameValid = checkTextInput(nameInput);
	let isDirValid = checkTextInput(dirInput);
	let isEmailValid = checkEmail(emailInput);
	let isPhoneValid = checkPhone(phoneInput);

	let isValidForm =
		isNameValid &&
		isDirValid &&
		isEmailValid &&
		isPhoneValid;

	if (isValidForm) {
		alert("Gracias por contactarnos!!!!");
		window.location.href = "index.html";
	}
};

const init = () => {
    menu.addEventListener("click", mostrarMenu);
    renderProducts(appState.products[appState.currentProductsIndex]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);


	registerForm.addEventListener("submit", submitHandler);
	nameInput.addEventListener("input", () => checkTextInput(nameInput));
	dirInput.addEventListener("input", () => checkTextInput(dirInput));
	emailInput.addEventListener("input", () => checkEmail(emailInput));
	phoneInput.addEventListener("input", () => checkPhone(phoneInput));
};

init();